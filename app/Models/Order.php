<?php

namespace App\Models;

use App\Events\SellerDashboardUpdated;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Schema;

class Order extends Model
{
    use HasUuids;

    protected $fillable = [
        'buyer_id',
        'seller_id',
        'order_number',
        'status',
        'subtotal',
        'tax',
        'fees',
        'total',
        'notes',
        'placed_at',
        'completed_at',
        'payment_method',
        'down_payment',
        'loan_term',
        'monthly_payment',
        'accessories',
        'next_payment_due_at',
    ];

    protected $appends = ['installment_summary', 'installment_months'];

    protected function casts(): array
    {
        return [
            'subtotal' => 'decimal:2',
            'tax' => 'decimal:2',
            'fees' => 'decimal:2',
            'total' => 'decimal:2',
            'placed_at' => 'datetime',
            'completed_at' => 'datetime',
            'down_payment' => 'decimal:2',
            'monthly_payment' => 'decimal:2',
            'accessories' => 'array',
            'next_payment_due_at' => 'datetime',
        ];
    }

    protected static function booted()
    {
        static::created(function ($order) {
            // Broadcast dashboard update for seller
            if ($order->seller_id) {
                \App\Events\SellerDashboardUpdated::dispatch($order->seller_id);
            }
        });

        static::updated(function ($order) {
            // Broadcast dashboard update for seller
            if ($order->seller_id) {
                \App\Events\SellerDashboardUpdated::dispatch($order->seller_id);
            }
        });

        static::deleted(function ($order) {
            // Broadcast dashboard update for seller
            if ($order->seller_id) {
                \App\Events\SellerDashboardUpdated::dispatch($order->seller_id);
            }
        });
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function installments(): HasMany
    {
        return $this->hasMany(OrderInstallment::class)->orderBy('month_number');
    }

    public function createInstallments(): void
    {
        if (!$this->loan_term || !$this->monthly_payment) {
            return;
        }

        try {
            if (!Schema::hasTable('order_installments')) {
                \Log::warning('order_installments table does not exist, skipping installment creation', [
                    'order_id' => $this->id,
                    'loan_term' => $this->loan_term,
                ]);
                return;
            }

            $startDate = $this->next_payment_due_at ?? now()->addMonth();

            for ($i = 1; $i <= $this->loan_term; $i++) {
                $this->installments()->create([
                    'month_number' => $i,
                    'amount' => $this->monthly_payment,
                    'due_at' => $startDate->copy()->addMonths($i - 1),
                    'status' => 'pending',
                ]);
            }

            $this->update(['next_payment_due_at' => $startDate]);
        } catch (\Throwable $e) {
            \Log::error('Failed to create installments', [
                'order_id' => $this->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }

    public function getNextInstallment(): ?OrderInstallment
    {
        return $this->installments()->where('status', 'pending')->orderBy('month_number')->first();
    }

    public function markInstallmentPaid(int $monthNumber, string $transactionId): void
    {
        $installment = $this->installments()->where('month_number', $monthNumber)->first();
        
        if ($installment && $installment->status !== 'paid') {
            $installment->update([
                'status' => 'paid',
                'paid_at' => now(),
                'transaction_id' => $transactionId,
            ]);

            $nextDue = $this->installments()->where('status', 'pending')->orderBy('month_number')->first();
            $this->update(['next_payment_due_at' => $nextDue?->due_at]);

            if (!$this->installments()->where('status', 'pending')->exists()) {
                $this->update(['status' => 'completed', 'completed_at' => now()]);
            }
        }
    }

    public function getInstallmentSummaryAttribute(): array
    {
        if (!$this->relationLoaded('installments')) {
            $this->load('installments');
        }

        $installments = $this->installments;
        $totalMonths = $this->loan_term ?? $installments->count();
        $paidCount = $installments->where('status', 'paid')->count();
        $pendingCount = $installments->where('status', 'pending')->count();
        $overdueCount = $installments->where('status', 'pending')
            ->where('due_at', '<', now())->count();

        return [
            'total_months' => $totalMonths,
            'paid_months' => $paidCount,
            'pending_months' => $pendingCount,
            'overdue_months' => $overdueCount,
            'progress_percentage' => $totalMonths > 0 ? round(($paidCount / $totalMonths) * 100) : 0,
            'is_completed' => $paidCount === $totalMonths && $totalMonths > 0,
            'next_due_date' => $this->next_payment_due_at,
        ];
    }

    public function getInstallmentMonthsAttribute(): array
    {
        if (!$this->relationLoaded('installments')) {
            $this->load('installments');
        }

        return $this->installments->map(function ($installment) {
            return [
                'month_number' => $installment->month_number,
                'amount' => $installment->amount,
                'due_at' => $installment->due_at,
                'paid_at' => $installment->paid_at,
                'status' => $installment->status,
                'transaction_id' => $installment->transaction_id,
                'is_paid' => $installment->status === 'paid',
                'is_overdue' => $installment->status === 'pending' && $installment->due_at < now(),
            ];
        })->values()->toArray();
    }
}

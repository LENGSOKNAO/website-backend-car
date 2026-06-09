<?php

namespace App\Models;

use App\Events\SellerDashboardUpdated;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
    ];

    protected function casts(): array
    {
        return [
            'subtotal' => 'decimal:2',
            'tax' => 'decimal:2',
            'fees' => 'decimal:2',
            'total' => 'decimal:2',
            'placed_at' => 'datetime',
            'completed_at' => 'datetime',
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
}

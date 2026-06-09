<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PreOrder extends Model
{
    use HasUuids;

    protected $table = 'pre_orders';

    protected $fillable = [
        'listing_id',
        'make_id',
        'model_id',
        'customer_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'quantity',
        'color',
        'interior_color',
        'trim_level',
        'engine_preference',
        'transmission_preference',
        'drivetrain_preference',
        'fuel_type',
        'year_min',
        'year_max',
        'mileage_max',
        'total_price',
        'budget_min',
        'budget_max',
        'source',
        'preferred_contact',
        'status',
        'notes',
        'internal_notes',
        'special_requests',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'budget_min' => 'decimal:2',
            'budget_max' => 'decimal:2',
            'total_price' => 'decimal:2',
            'year_min' => 'integer',
            'year_max' => 'integer',
            'mileage_max' => 'integer',
        ];
    }

    public function listing(): BelongsTo
    {
        return $this->belongsTo(CarListing::class, 'listing_id');
    }

    public function make(): BelongsTo
    {
        return $this->belongsTo(CarMake::class, 'make_id');
    }

    public function model(): BelongsTo
    {
        return $this->belongsTo(CarModel::class, 'model_id');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(PreOrderPayment::class, 'pre_order_id');
    }

    public function totalPaid(): float
    {
        return (float) $this->payments()
            ->where('status', 'completed')
            ->sum('amount');
    }
}

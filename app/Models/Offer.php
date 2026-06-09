<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offer extends Model
{
    use HasUuids;

    protected $table = 'offers';

    protected $fillable = [
        'listing_id',
        'buyer_id',
        'seller_id',
        'offered_price',
        'message',
        'status',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'offered_price' => 'decimal:2',
            'expires_at' => 'datetime',
        ];
    }

    public function listing(): BelongsTo
    {
        return $this->belongsTo(CarListing::class, 'listing_id');
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }
}

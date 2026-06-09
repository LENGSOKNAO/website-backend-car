<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SellerReview extends Model
{
    use HasUuids;

    protected $table = 'seller_reviews';

    protected $fillable = [
        'reviewer_id',
        'seller_id',
        'listing_id',
        'rating',
        'communication_rating',
        'accuracy_rating',
        'comment',
        'is_verified_purchase',
    ];

    protected function casts(): array
    {
        return [
            'is_verified_purchase' => 'boolean',
        ];
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function listing(): BelongsTo
    {
        return $this->belongsTo(CarListing::class, 'listing_id');
    }
}

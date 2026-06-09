<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ListingFeature extends Model
{
    use HasUuids;

    protected $table = 'listing_features';

    protected $fillable = [
        'name',
        'category',
    ];

    public function listings(): BelongsToMany
    {
        return $this->belongsToMany(CarListing::class, 'car_listing_feature', 'feature_id', 'listing_id');
    }
}

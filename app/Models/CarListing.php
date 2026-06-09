<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class CarListing extends Model
{
    use HasUuids, SoftDeletes;

    protected $table = 'car_listings';

    protected $fillable = [
        'seller_id',
        'make_id',
        'model_id',
        'category_id',
        'year',
        'price',
        'original_price',
        'mileage',
        'fuel_type',
        'transmission',
        'engine_size',
        'color',
        'interior_color',
        'condition',
        'number_of_owners',
        'vin',
        'license_plate',
        'description',
        'location',
        'views_count',
        'status',
        'total',
        'expires_at',
        'order_date',
        'expected_arrival',
        'actual_arrival',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'original_price' => 'decimal:2',
            'expires_at' => 'datetime',
            'order_date' => 'date',
            'expected_arrival' => 'date',
            'actual_arrival' => 'date',
            'total' => 'integer',
        ];
    }

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function make(): BelongsTo
    {
        return $this->belongsTo(CarMake::class, 'make_id');
    }

    public function model(): BelongsTo
    {
        return $this->belongsTo(CarModel::class, 'model_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ListingImage::class, 'listing_id');
    }

    public function primaryImage(): HasOne
    {
        return $this->hasOne(ListingImage::class, 'listing_id')->where('is_primary', true);
    }

    public function features(): BelongsToMany
    {
        return $this->belongsToMany(ListingFeature::class, 'car_listing_feature', 'listing_id', 'feature_id');
    }

    public function savedBy(): HasMany
    {
        return $this->hasMany(SavedListing::class, 'listing_id');
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class, 'listing_id');
    }

    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class, 'listing_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(SellerReview::class, 'listing_id');
    }

    public function vehicleHistories(): HasMany
    {
        return $this->hasMany(VehicleHistory::class, 'listing_id');
    }

    public function serviceAppointments(): HasMany
    {
        return $this->hasMany(ServiceAppointment::class, 'listing_id');
    }

    public function orders(): HasManyThrough
    {
        return $this->hasManyThrough(Order::class, OrderItem::class, 'listing_id', 'id', 'id', 'order_id');
    }

    public function preOrders(): HasMany
    {
        return $this->hasMany(PreOrder::class, 'listing_id');
    }
}

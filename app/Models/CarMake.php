<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CarMake extends Model
{
    use HasUuids;

    protected $table = 'car_makes';

    protected $fillable = [
        'name',
        'logo_url',
        'country',
    ];

    public function models(): HasMany
    {
        return $this->hasMany(CarModel::class, 'make_id');
    }

    public function listings(): HasMany
    {
        return $this->hasMany(CarListing::class, 'make_id');
    }
}

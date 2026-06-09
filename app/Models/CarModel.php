<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CarModel extends Model
{
    use HasUuids;

    protected $table = 'car_models';

    protected $fillable = [
        'make_id',
        'name',
        'start_year',
        'end_year',
    ];

    public function make(): BelongsTo
    {
        return $this->belongsTo(CarMake::class, 'make_id');
    }

    public function listings(): HasMany
    {
        return $this->hasMany(CarListing::class, 'model_id');
    }
}

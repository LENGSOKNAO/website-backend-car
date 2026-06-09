<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceAppointment extends Model
{
    use HasUuids;

    protected $table = 'service_appointments';

    protected $fillable = [
        'customer_id',
        'listing_id',
        'service_type',
        'description',
        'scheduled_date',
        'scheduled_time',
        'mileage',
        'status',
        'technician_notes',
        'cost',
        'assigned_to',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_date' => 'date',
            'scheduled_time' => 'datetime',
            'cost' => 'decimal:2',
            'completed_at' => 'datetime',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function listing(): BelongsTo
    {
        return $this->belongsTo(CarListing::class, 'listing_id');
    }

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}

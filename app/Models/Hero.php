<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Hero extends Model
{
    protected $fillable = [
        'seller_id',
        'title',
        'subtitle',
        'is_active',
        'sort_order',
    ];

    public function seller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    protected function casts(): array
    {
        return [
            'subtitle' => 'array',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getSubtitleTextAttribute(): array
    {
        return array_map(fn ($entry) => is_string($entry) ? $entry : ($entry['text'] ?? ''), $this->subtitle ?? []);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class StoredFile extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'original_name', 'mime_type', 'size', 'data'];
    protected $hidden = ['data'];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(fn ($file) => $file->id ??= Str::uuid());
    }
}

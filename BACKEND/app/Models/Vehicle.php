<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    protected $primaryKey = 'vehicle_id';

    protected $fillable = [
        'plate_number',
        'body_number',
        'vehicle_type',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function pings(): HasMany
    {
        return $this->hasMany(Ping::class, 'vehicle_id', 'vehicle_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
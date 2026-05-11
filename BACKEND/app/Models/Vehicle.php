<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    protected $primaryKey = 'vehicle_id';
    
    /**
     * Defines the PUV registry (Ikot or Toda).
     */
    protected $fillable = [
        'plate_number', 
        'body_number', 
        'vehicle_type', 
        'status' // Changed from is_active to match your Stats logic
    ];

    /**
     * Relationship: View the sighting history of this vehicle.
     */
    public function pings(): HasMany
    {
        return $this->hasMany(Ping::class, 'vehicle_id', 'vehicle_id');
    }

    /**
     * Scope: Easily filter active vehicles.
     * This allows you to do Vehicle::active()->count()
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
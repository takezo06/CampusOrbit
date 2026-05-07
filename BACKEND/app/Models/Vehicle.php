<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $primaryKey = 'vehicle_id';
    
    /**
     * Defines the PUV registry (Ikot or Toda).
     */
    protected $fillable = ['plate_number', 'body_number', 'vehicle_type', 'is_active'];

    /**
     * Relationship: View the sighting history of this vehicle.
     */
    public function pings() {
        return $this->hasMany(LivePing::class, 'vehicle_id', 'vehicle_id');
    }
}
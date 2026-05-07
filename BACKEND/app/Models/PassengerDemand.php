<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PassengerDemand extends Model
{
    /**
     * Custom Primary Key for Demand tracking.
     */
    protected $primaryKey = 'demand_id';

    protected $fillable = ['location_id', 'passenger_count', 'status'];

    /**
     * Relationship: Demand is linked to a specific Campus Location.
     */
    public function location()
    {
        return $this->belongsTo(Location::class, 'location_id', 'location_id');
    }
}
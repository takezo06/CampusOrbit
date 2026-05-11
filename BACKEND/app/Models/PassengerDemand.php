<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PassengerDemand extends Model
{
    use HasFactory;

    /**
     * Custom Primary Key for Demand tracking.
     */
    protected $primaryKey = 'demand_id';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'location_id', 
        'passenger_count', 
        'status'
    ];

    /**
     * Relationship: Demand is linked to a specific Campus Location.
     */
    public function location()
    {
        // Ensure the Location model exists in App\Models
        return $this->belongsTo(Location::class, 'location_id', 'location_id');
    }
}
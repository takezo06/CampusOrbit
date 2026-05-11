<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    // Use location_id as the primary key for XAMPP compatibility
    protected $primaryKey = 'location_id';
    
    /**
     * Fields that can be inserted into the database.
     */
    protected $fillable = [
        'location_name', 
        'description', 
        'latitude', 
        'longitude'
    ];

    /**
     * Relationship: See all pings that happened at this stop.
     * We point this to 'Ping::class' to match your Controller.
     */
    public function pings(): HasMany
    {
        return $this->hasMany(Ping::class, 'location_id', 'location_id');
    }

    /**
     * Relationship: See current passenger demand at this stop.
     */
    public function demands(): HasMany
    {
        return $this->hasMany(PassengerDemand::class, 'location_id', 'location_id');
    }
}
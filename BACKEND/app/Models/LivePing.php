<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LivePing extends Model
{
    protected $primaryKey = 'ping_id';

    /**
     * The 'Bridge' table connecting Users, Vehicles, and Locations.
     */
    protected $fillable = ['vehicle_id', 'location_id', 'user_id', 'type', 'note'];

    public function user() { 
        return $this->belongsTo(User::class, 'user_id', 'user_id'); 
    }
    public function vehicle() { 
        return $this->belongsTo(Vehicle::class, 'vehicle_id', 'vehicle_id'); 
    }
    public function location() { 
        return $this->belongsTo(Location::class, 'location_id', 'location_id'); 
    }
}
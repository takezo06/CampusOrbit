<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $primaryKey = 'location_id';
    
    /**
     * Defines physical stops around UP Mindanao.
     */
    protected $fillable = ['location_name', 'description'];

    /**
     * Relationship: See all activity that happened at this stop.
     */
    public function pings() {
        return $this->hasMany(LivePing::class, 'location_id', 'location_id');
    }
}
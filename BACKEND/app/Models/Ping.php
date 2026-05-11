<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ping extends Model
{
    // Points Laravel to the correct table name
    protected $table = 'live_pings';
    
    protected $primaryKey = 'ping_id';

    /**
     * These fields can be filled during creation.
     */
    protected $fillable = [
        'vehicle_id', 
        'location_id', 
        'user_id', 
        'type', 
        'note', 
        'status', 
        'timestamp'
    ];

    // Relationships
    public function user(): BelongsTo { 
        return $this->belongsTo(User::class, 'user_id', 'user_id'); 
    }
    
    public function vehicle(): BelongsTo { 
        return $this->belongsTo(Vehicle::class, 'vehicle_id', 'vehicle_id'); 
    }
    
    public function location(): BelongsTo { 
        return $this->belongsTo(Location::class, 'location_id', 'location_id'); 
    }
}
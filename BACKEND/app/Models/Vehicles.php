<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicles extends Model
{
    protected $fillable = [
        'plate_number',
        'body_number',
        'vehicle_type'
    ];
    public function (): HasMany{
        return $this->HasMany(Live_pings::class)
    }
}

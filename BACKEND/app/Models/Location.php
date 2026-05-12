<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    protected $primaryKey = 'location_id';

    protected $fillable = [
        'location_name',
        'description',
    ];

    public function pings(): HasMany
    {
        return $this->hasMany(Ping::class, 'location_id', 'location_id');
    }

}
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    /**
     * Custom Primary Key for Orbit User table.
     */
    protected $primaryKey = 'user_id';

    /**
     * Attributes that can be filled via mass assignment.
     * Includes Orbit-specific gamification fields.
     */
    protected $fillable = [
        'username', 'email', 'password', 'role', 
        'device_ip', 'points', 'level'
    ];

    protected $hidden = ['password', 'remember_token'];

    /**
     * Relationship: A user can submit many pings.
     */
    public function pings()
    {
        return $this->hasMany(LivePing::class, 'user_id', 'user_id');
    }
}
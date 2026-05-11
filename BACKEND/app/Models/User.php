<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Custom Primary Key for Orbit User table.
     */
    protected $primaryKey = 'user_id';

    /**
     * Attributes that can be filled via mass assignment.
     * Includes Orbit-specific gamification fields.
     */
    protected $fillable = [
        'name',
        'username', 
        'email', 
        'password', 
        'role', 
        'device_ip', 
        'points', 
        'level', 
        'last_ping_time'
    ];

    protected $hidden = [
        'password', 
        'remember_token',
    ];

    /**
     * Relationship: A user can submit many pings.
     * Changed LivePing to Ping to match your verified Ping model.
     */
    public function pings(): HasMany
    {
        return $this->hasMany(Ping::class, 'user_id', 'user_id');
    }
}
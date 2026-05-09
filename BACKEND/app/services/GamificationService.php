<?php

namespace App\Services;

use App\Models\User;

class GamificationService
{
    // Define constants for easy balancing later
    private const POINTS_PER_PING = 10;
    private const STREAK_BONUS = 5;

    public function awardPingPoints(User $user): void
    {
        $pointsToAdd = self::POINTS_PER_PING;

        $pointsToAdd += self::STREAK_BONUS;

        // 1. Check for Streak Bonus
        /*
        if ($this->hasActiveStreak($user)) {
            $pointsToAdd += self::STREAK_BONUS;
        }
        */
        // 2. Update User Stats
        $user->increment('points', $pointsToAdd);

        // 3. Check for Level Up
        $this->checkLevelUp($user);
    }
    /*
    private function hasActiveStreak(User $user): bool
    {
        if (!$user->last_ping_time) return false;

        return $user->last_ping_time->diffInHours(now()) < 24;
    }
    */
    private function checkLevelUp(User $user): void
    {   
        $newLevel = floor(sqrt($user->points / 100)) + 1;

        if ($newLevel > $user->level) {
            $user->update(['level' => $newLevel]);
        }
    }
    
}
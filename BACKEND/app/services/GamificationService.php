<?php

namespace App\Services;

use App\Models\User;

class GamificationService
{
    private int $pointsPerPing;
    private int $levelThreshold;

    public function __construct()
    {
        $this->pointsPerPing   = (int) config('gamification.points_per_ping',  10);
        $this->levelThreshold  = (int) config('gamification.level_threshold', 100);
    }

    public function awardPingPoints(User $user): void
    {
        $newPoints = $user->points + $this->pointsPerPing;
        $newLevel  = $this->calculateLevel($newPoints);

        $user->update([
            'points' => $newPoints,
            'level'  => $newLevel,
        ]);
    }

    private function calculateLevel(int $points): int
    {
        return (int) floor($points / $this->levelThreshold) + 1;
    }
}
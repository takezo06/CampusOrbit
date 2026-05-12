<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Points Per Ping
    |--------------------------------------------------------------------------
    | How many points a user earns each time they submit a live ping.
    */
    'points_per_ping' => env('GAMIFICATION_POINTS_PER_PING', 10),

    /*
    |--------------------------------------------------------------------------
    | Level Threshold
    |--------------------------------------------------------------------------
    | How many total points are required to advance one level.
    | Level = floor(points / level_threshold) + 1
    */
    'level_threshold' => env('GAMIFICATION_LEVEL_THRESHOLD', 100),

];
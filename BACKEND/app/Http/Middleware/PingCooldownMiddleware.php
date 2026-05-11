<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\Response;

class PingCooldownMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Check if the user has pinged before
        if ($user && $user->last_ping_time) {
            $lastPing = Carbon::parse($user->last_ping_time);
            $now = Carbon::now();

            // Calculate the difference in minutes
            $diffInMinutes = $lastPing->diffInMinutes($now);

            if ($diffInMinutes < 5) {
                $minutesLeft = 5 - $diffInMinutes;
                return response()->json([
                    'success' => false,
                    'message' => "Slow down! You can ping again in {$minutesLeft} minute(s).",
                    'cooldown_remaining' => $minutesLeft
                ], 429); // 429 is the standard 'Too Many Requests' code
            }
        }

        return $next($request);
    }
}
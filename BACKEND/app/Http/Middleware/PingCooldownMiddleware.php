<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth; // Added for safety
use Symfony\Component\HttpFoundation\Response;

class PingCooldownMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Use Auth::user() if $request->user() is failing
        $user = Auth::user();

        if (!$user) {
            return $next($request);
        }

        $cooldownMinutes = 2; 
        $cacheKey = 'ping_expiration_' . $user->id;

        // 1. Get the "Expires At" timestamp from the cache
        $expiresAt = Cache::get($cacheKey);

        // 2. Check if the current time is still before the expiration
        if ($expiresAt && time() < $expiresAt) {
            $secondsLeft = $expiresAt - time();

            return response()->json([
                'success' => false,
                'message' => "ORBIT in cooldown. Try again in {$secondsLeft} seconds."
            ], 429);
        }

        // 3. Set the expiration timestamp to 2 minutes (120 seconds) from now
        $expiryTimestamp = time() + ($cooldownMinutes * 60);
        
        // Store the timestamp in the cache
        Cache::put($cacheKey, $expiryTimestamp, $cooldownMinutes * 60);

        return $next($request);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Ping;
use App\Http\Requests\StorePingRequest;
use Illuminate\Http\JsonResponse;
use App\Services\GamificationService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LivePingsController extends Controller
{
    /**
     * Injecting the GamificationService to handle points.
     */
    public function __construct(private GamificationService $gamification) {}

    /**
     * Display a listing of pings.
     */
    public function index(): JsonResponse
    {
        $vehicleId = request()->query('vehicle_id');
        $limit     = min((int) request()->query('limit', 20), 50);

        $pings = Ping::with(['vehicle', 'location', 'user:user_id,username'])
            ->when($vehicleId, function ($query, $vehicleId) {
                return $query->where('vehicle_id', $vehicleId);
            })
            ->latest('timestamp')
            ->limit($limit)
            ->get();

        return response()->json(['success' => true, 'data' => $pings], 200);
    }

    /**
     * Store a new ping with cooldown and points.
     */
    public function store(StorePingRequest $request): JsonResponse
    {
        $user = $request->user();
        $userId = $user->getKey(); 
        
        $cooldownKey = "action_cooldown_{$userId}";
        $cooldownSeconds = 300;

        // 1. Check Cooldown using Cache
        if (Cache::has($cooldownKey)) {
            $expiresAt = Cache::get($cooldownKey);
            $remaining = $expiresAt - now()->timestamp;
            
            return response()->json([
                'success' => false,
                'message' => "Please wait before submitting another ping.",
                'retry_after_seconds' => max(0, $remaining)
            ], 429);
        }

        // 2. Process the Ping and Points inside a transaction
        // We use ($this) so the closure can access $this->gamification
        return DB::transaction(function () use ($request, $user, $cooldownKey, $cooldownSeconds) {
            
            $ping = Ping::create([
                ...$request->validated(),
                'user_id' => $user->getKey(),
            ]);
            
            // Award points via the Service
            $this->gamification->awardPingPoints($user);

            // Update user tracking
            $user->update(['last_ping_time' => now()]);
            
            // Set the cooldown in Cache
            Cache::put(
                $cooldownKey, 
                now()->addSeconds($cooldownSeconds)->timestamp, 
                $cooldownSeconds
            );

            return response()->json([
                'success' => true,
                'message' => 'Ping submitted successfully.',
                'data'    => $ping->load(['vehicle', 'location', 'user:user_id,username']),
            ], 201);
        });
    }

    /**
     * Remove a ping.
     */
    public function destroy(int $id): JsonResponse
    {
        $ping = Ping::findOrFail($id);

        // Security: Only owner or admin can delete
        if (auth()->id() !== $ping->user_id && auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $ping->delete();

        return response()->json(['success' => true, 'message' => 'Ping removed.'], 200);
    }
}
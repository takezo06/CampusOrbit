<?php

namespace App\Http\Controllers;

use App\Models\Ping;
use Illuminate\Http\Request\StorePingRequest;
use Illuminate\Http\JsonResponse;
use App\Services\GamificationService;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class LivePingsController extends Controller
{
    public function __construct(private GamificationService $gamification) {}

    public function index(): JsonResponse
    {
        $vehicleId = request()->query('vehicle_id');
        $limit     = min((int) request()->query('limit', 20), 50); // cap at 50

        $pings = Ping::with(['vehicle', 'location', 'user:user_id,username'])
            ->when($vehicleId, function ($query, $vehicleId) {
                return $query->where('vehicle_id', $vehicleId);
            })
            ->latest('timestamp')
            ->limit($limit)
            ->get();

        return response()->json(['success' => true, 'data' => $pings]);
    }

    public function store(StorePingRequest $request): JsonResponse
    {
        $userId = $request->user()->id;
        $cooldownKey = "action_cooldown_{$userId}";
        $cooldownSeconds = 300;

        if (Cache::has($cooldownKey)) {
            $remaining = Cache::get($cooldownKey) - now()->timestamp;
            return response()->json([
                'success' => false,
                'message' => "Please wait before submitting another ping",
                'retry_after_seconds' => $remaining
            ], 429);
        }
        $ping = Ping::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);
        
        // Award points
        $this->gamification->awardPingPoints(auth()->user());

        // Update the user's last_ping_time for cooldown tracking
        auth()->user()->update(['last_ping_time' => now()]);

        //set cooldown
        Cache::put($cooldownKey, now()->addSeconds($cooldownSeconds)->timestamp, $cooldownSeconds);

        return response()->json([
            'success' => true,
            'message' => 'Ping submitted successfully.',
            'data'    => $ping->load(['vehicle', 'location', 'user:user_id,username']),
        ], 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $ping = Ping::findOrFail($id);

        // Only owner or admin can delete
        if (auth()->id() !== $ping->user_id && auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $ping->delete();

        return response()->json(['success' => true, 'message' => 'Ping removed.']);
    }
}

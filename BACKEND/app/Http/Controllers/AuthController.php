<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'login'    => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        // Find user by email or username
        $user = User::where('email', $request->login)
            ->orWhere('username', $request->login)
            ->first();

        // Check user existence and password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'The credentials you entered are incorrect.',
            ], 401);
        }

        // Update device IP on login
        $user->update(['device_ip' => $request->ip()]);

        // Create Sanctum token
        $token = $user->createToken('orbit-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'data'    => [
                'token' => $token, 
                'user'  => $user->makeHidden(['password'])
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['success' => true, 'message' => 'Logged out.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['success' => true, 'data' => $request->user()]);
    }

    public function dashboard(Request $request): JsonResponse
    {
        $user = $request->user();
        $threshold = (int) config('gamification.level_threshold', 100);

        return response()->json([
            'success' => true,
            'data'    => [
                'user'           => $user,
                'level_progress' => [
                    'current'       => $user->points,
                    'next_level_at' => $user->level * $threshold,
                    'percentage'    => (($user->points % $threshold) / $threshold) * 100,
                ],
                'recent_pings' => $user->pings()->with('location', 'vehicle')->latest()->limit(10)->get(),
                'ping_count'   => $user->pings()->count(),
            ],
        ]);
    }

    public function stats(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => [
                'daily_passengers'    => 100,  // Replace with real query when data exists
                'active_locations'    => \App\Models\Location::count(),
                'active_vehicles'     => \App\Models\Vehicle::active()->count(),
                'registered_operators' => \App\Models\User::where('role', 'driver')->count(),
            ],
        ]);
    }
}
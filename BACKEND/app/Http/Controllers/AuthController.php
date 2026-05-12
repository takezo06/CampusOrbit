<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name'                  => 'required|string|max:255',
            'username'              => 'required|string|unique:users',
            'email'                 => 'required|string|email|unique:users',
            'password'              => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'name'      => $request->name,
            'username'  => $request->username,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'role'      => 'passenger',
            'device_ip' => $request->ip(),
            'points'    => 0,
            'level'     => 1,
        ]);

        return response()->json([
            'success' => true,
            'data'    => [
                'token' => $user->createToken('orbit-token')->plainTextToken,
                'user'  => $user->makeHidden(['password']),
            ],
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'login'    => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $request->login)
            ->orWhere('username', $request->login)
            ->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'The credentials you entered are incorrect.',
            ], 401);
        }

        $user->update(['device_ip' => $request->ip()]);

        return response()->json([
            'success' => true,
            'data'    => [
                'token' => $user->createToken('orbit-token')->plainTextToken,
                'user'  => $user->makeHidden(['password']),
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }

    // FIX: Added Request $request parameter so Sanctum can resolve the
    // authenticated user via the token guard. Using auth()->user() without
    // the request context can return null when running under Sanctum middleware.
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => $request->user()->makeHidden(['password']),
        ]);
    }

    public function dashboard(Request $request): JsonResponse
    {
        $user      = $request->user();
        $threshold = (int) config('gamification.level_threshold', 100);

        return response()->json([
            'success' => true,
            'data'    => [
                'user'           => $user->makeHidden(['password']),
                'level_progress' => [
                    'current'       => $user->points,
                    'next_level_at' => $user->level * $threshold,
                    'percentage'    => round((($user->points % $threshold) / $threshold) * 100, 2),
                ],
                'recent_pings' => $user->pings()
                    ->with(['location', 'vehicle'])
                    ->latest('timestamp')
                    ->limit(10)
                    ->get(),
                'ping_count' => $user->pings()->count(),
            ],
        ]);
    }

    // FIX: Replaced hardcoded daily_passengers value of 100 with a real
    // DB aggregate — sum of all passenger_count records from today.
    public function stats(): JsonResponse
    {
        $dailyPassengers = \App\Models\PassengerDemand::whereDate('created_at', today())
            ->sum('passenger_count');

        return response()->json([
            'success' => true,
            'data'    => [
                'daily_passengers'     => (int) $dailyPassengers,
                'active_locations'     => Location::count(),
                'active_vehicles'      => Vehicle::where('is_active', true)->count(),
                'registered_operators' => User::where('role', 'driver')->count(),
            ],
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vehicle; 
use App\Models\Location; 
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'username' => 'required|string|unique:users',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed', 
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'passenger', 
            'device_ip' => $request->ip(),
            'points' => 0,
            'level' => 1,
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'token' => $user->createToken('orbit-token')->plainTextToken,
                'user' => $user
            ]
        ]);
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

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'The credentials you entered are incorrect.'], 401);
        }

        $user->update(['device_ip' => $request->ip()]);
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

    public function me(): JsonResponse
{
    // If auth()->user() is null for some reason, this could 500
    $user = auth()->user();
    
    if (!$user) {
        return response()->json(['success' => false, 'message' => 'Not authenticated'], 401);
    }

    return response()->json([
        'success' => true,
        'data' => $user
    ]);
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
                // Make sure your User model has the pings() relationship!
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
                'daily_passengers'    => 100,
                'active_locations'    => Location::count(),
                'active_vehicles'     => Vehicle::where('status', 'active')->count(),
                'registered_operators' => User::where('role', 'driver')->count(),
            ],
        ]);
    }
}
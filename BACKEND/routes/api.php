<?php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// --- Public Routes ---
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

// --- Protected Routes (Token Required) ---
Route::middleware('auth:sanctum')->group(function () {
    
    // User Profile
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Admin Only Routes
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/check', function() {
            return response()->json(['message' => 'Hello Admin, system is online.']);
        });
        // Add more admin routes here (e.g., manage units, view all logs)
    });

    // Ping Logic (Protected by Cooldown)
    Route::middleware('cooldown')->post('/ping', function(Request $request) {
        $user = $request->user();
        
        // Update user status
        $user->update([
            'last_ping_time' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Ping successful! You earned 10 points.',
            'current_points' => $user->points,
            'next_ping_available' => now()->addMinutes(5)->toDateTimeString()
        ]);
    });
});
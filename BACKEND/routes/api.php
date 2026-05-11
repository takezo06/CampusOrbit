<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LivePingsController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PassengerDemandController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// --- Public Routes ---
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

// --- Protected Routes (Token Required) ---
Route::middleware('auth:sanctum')->group(function () {
    
    // 1. User & Stats
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::get('/stats', [AuthController::class, 'stats']); // The dashboard data
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // 2. Locations (Campus Stops)
    Route::get('/locations', [LocationController::class, 'index']);

    // 3. Passenger Demand (Crowd levels)
    Route::get('/demand', [PassengerDemandController::class, 'index']);
    Route::post('/demand', [PassengerDemandController::class, 'store']);

    // 4. Ping Logic (The actual tracking)
    // Note: We point this to the Controller so it handles points & validation
    Route::middleware('cooldown')->group(function () {
        Route::get('/pings', [LivePingsController::class, 'index']);
        Route::post('/pings', [LivePingsController::class, 'store']);
    });

    // 5. Admin Only Routes
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/check', function() {
            return response()->json(['message' => 'Hello Admin, system is online.']);
        });
    });
});
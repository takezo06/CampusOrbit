<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LivePingsController;
use App\Http\Controllers\LocationsController;
use App\Http\Controllers\VehiclesController; // Ensure this is imported
use Illuminate\Support\Facades\Route;

// --- Public Routes (No Token Required) ---
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

// Public data for the Home Page
Route::get('/locations', [LocationsController::class, 'index']); 
Route::get('/vehicles', [VehiclesController::class, 'index']);
Route::get('/pings', [LivePingsController::class, 'index']); // <--- ADD THIS LINE

// --- Protected Routes (Token Required) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::get('/stats', [AuthController::class, 'stats']); 
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/dashboard', [AuthController::class, 'dashboard']);

    Route::middleware('cooldown')->group(function () {
        Route::post('/pings', [LivePingsController::class, 'store']);
    });
});
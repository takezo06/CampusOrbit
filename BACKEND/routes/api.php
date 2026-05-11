<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LivePingsController;
use App\Http\Controllers\LocationsController;
use App\Http\Controllers\VehiclesController;
use Illuminate\Support\Facades\Route;

// --- Public Routes (No Token Required) ---
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

// Public data for the Home Page
Route::get('/locations', [LocationsController::class, 'index']); 
Route::get('/vehicles', [VehiclesController::class, 'index']);
Route::get('/pings', [LivePingsController::class, 'index']);

// --- Protected Routes (Token Required) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    
    // ADD THIS LINE: This fixes the 404 error for the dashboard request
    Route::get('/dashboard', [AuthController::class, 'dashboard']); 
    
    Route::get('/stats', [AuthController::class, 'stats']); 
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::middleware('cooldown')->group(function () {
        Route::post('/pings', [LivePingsController::class, 'store']);
    });
});
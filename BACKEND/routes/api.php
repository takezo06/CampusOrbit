<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LivePingsController;
use App\Http\Controllers\LocationsController;
use Illuminate\Support\Facades\Route;

// --- Public Routes (No Token Required) ---
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

// FIX: Make these public so dropdowns load immediately
Route::get('/locations', [LocationsController::class, 'index']); 
Route::get('/vehicles', [App\Http\Controllers\VehiclesController::class, 'index']);

// --- Protected Routes (Token Required) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::get('/stats', [AuthController::class, 'stats']); 
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::middleware('cooldown')->group(function () {
        Route::post('/pings', [LivePingsController::class, 'store']);
    });
});
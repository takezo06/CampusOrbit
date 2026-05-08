<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController, VehiclesController, LocationsController,
    LivePingsController, PassengerDemandController, NewsController
};

// Public routes — no auth required
Route::post('/auth/login',  [AuthController::class, 'login']);

Route::get('/vehicles',        [VehiclesController::class, 'index']);
Route::get('/vehicles/{id}',   [VehiclesController::class, 'show']);
Route::get('/locations',       [LocationsController::class, 'index']);
Route::get('/pings',           [LivePingsController::class, 'index']);
Route::get('/demand',          [PassengerDemandController::class, 'index']);
Route::get('/stats',           [AuthController::class, 'stats']);
Route::get('/news',            [NewsController::class, 'index']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);
    Route::get('/dashboard',    [AuthController::class, 'dashboard']);

    Route::post('/pings',          [LivePingsController::class, 'store'])->middleware('ping.cooldown');
    Route::delete('/pings/{id}',   [LivePingsController::class, 'destroy']);

    Route::post('/demand',         [PassengerDemandController::class, 'store']);

    // Admin-only routes
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('/vehicles',  VehiclesController::class)->except(['index', 'show']);
        Route::apiResource('/locations', LocationsController::class)->except(['index']);
        Route::apiResource('/news',      NewsController::class)->except(['index']);
        Route::get('/admin/users',       [AuthController::class, 'listUsers']);
    });
});
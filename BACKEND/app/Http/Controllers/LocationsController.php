<?php

namespace App\Http\Controllers;

use App\Models\Locations;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLocationRequest;
use Illuminate\Http\JsonResponse;

class LocationsController extends Controller
{
    public function index(): JsonResponse
    {
        $locations = Locations::all();
        // Changed 201 to 200 (201 is only for "Created")
        return response()->json(['success' => true, 'data' => $locations], 200);
    }

    public function store(StoreLocationRequest $request): JsonResponse
    {
        // 1. SECURITY CHECK FIRST
        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        // 2. DATA ACTION SECOND
        $location = Locations::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            "success" => true,
            "data"    => $location,
            "message" => "Location created successfully."
        ], 201);
    }

    public function update(StoreLocationRequest $request, int $id): JsonResponse
    {
        // 1. SECURITY CHECK FIRST
        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $location = Locations::findOrFail($id);
        
        $location->update([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            "success" => true,
            "data"    => $location,
            "message" => "Location updated successfully."
        ], 200);
    }

    public function destroy(int $id): JsonResponse
    {
        // 1. SECURITY CHECK FIRST
        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $location = Locations::findOrFail($id);
        $location->delete();

        return response()->json([
            'success' => true, 
            'message' => 'Location removed successfully.'
        ], 200); // 204 is usually empty, 200 is better if sending a message
    }
}
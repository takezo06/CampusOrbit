<?php

namespace App\Http\Controllers;

use App\Models\Location; 
use Illuminate\Http\Request;
use App\Http\Requests\StoreLocationRequest;
use Illuminate\Http\JsonResponse;

class LocationsController extends Controller
{
    public function index(): JsonResponse
    {
     
        $locations = Location::all();
        return response()->json(['success' => true, 'data' => $locations], 200);
    }

    public function store(StoreLocationRequest $request): JsonResponse
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        
        $location = Location::create([
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
        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

       
        $location = Location::findOrFail($id);
        
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
        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

      
        $location = Location::findOrFail($id);
        $location->delete();

        return response()->json([
            'success' => true, 
            'message' => 'Location removed successfully.'
        ], 200);
    }
}
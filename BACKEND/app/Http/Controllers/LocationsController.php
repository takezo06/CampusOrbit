<?php

namespace App\Http\Controllers;

use App\Models\Locations;
use Illuminate\Http\Request;
use App\Http\Requests\StoreLocationRequest;
use Illuminate\Http\JsonResponse;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $locations = Locations::all();
        return response()->json(['success' => true, 'data' => $locations], 201);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLocationRequest $request): JsonResponse
    {
        $locations = Locations::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);
        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }
        return response()->json([
            "success" => true,
            "data"    => $locations,
            "message" => "Location created successfully."
        ],201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreLocationRequest $request, Locations $locations): JsonResponse
    {
        $locations->update([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);
        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }
        return response()->json([
            "success" => true,
            "data"    => $locations,
            "message" => "Location created successfully."
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $locations = Locations::findOrFail($id);

        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $locations->delete();

        return response()->json(['success' => true, 'message' => 'Vehicle removed.'],204);
    }
}

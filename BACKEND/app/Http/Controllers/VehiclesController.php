<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use App\Http\Requests\StoreVehicleRequest;
use Illuminate\Http\JsonResponse;

class VehiclesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        // Eager load the pings relationship and the location associated with that ping
        $vehicles = Vehicle::with(['pings' => function($query) {
            $query->latest('timestamp')->with('location');
        }])->get();

        // Format the data so the frontend can easily read 'lastLandmark' and 'timestamp'
        $data = $vehicles->map(function ($vehicle) {
            $latestPing = $vehicle->pings->first();
            return [
                'vehicle_id'   => $vehicle->vehicle_id,
                'plate_number' => $vehicle->plate_number,
                'body_number'  => $vehicle->body_number,
                'vehicle_type' => $vehicle->vehicle_type,
                'is_active'    => $vehicle->is_active,
                // Map the nested relationship to the flat keys the UI expects
                'lastLandmark' => $latestPing ? $latestPing->location->location_name : 'No data',
                'timestamp'    => $latestPing ? $latestPing->timestamp : null,
                'routeHistory' => $vehicle->pings->take(5)->map(function($p) {
                    return [
                        'landmark' => $p->location->location_name,
                        'note' => $p->note,
                        'time' => \Carbon\Carbon::parse($p->timestamp)->format('h:i A')
                    ];
                })
            ];
        });

        return response()->json(['success' => true, 'data' => $data], 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request): JsonResponse
    {   
        $vehicles = Vehicles::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);
        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }
        return response()->json([
            "success" => true,
            "data"    => $vehicles,
            "message" => "Vehicle created successfully."
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicles $vehicles): JsonResponse
    {
        $type = request()->query('type');
        $data = $vehicles
        ->when($type, function ($query, $type) {
            return $query->where('type', $type);
        })
        ->latest('timestamp')->get();
        return response()->json(['success' => true, 'data' => $data],200);
    }

   
    /**
     * Update the specified resource in storage.
     */
    public function update(StoreVehicleRequest $request, Vehicles $vehicles): JsonResponse
    {
        $vehicles->update([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);
        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }
        return response()->json([
            "success" => true,
            "data"    => $vehicles,
            "message" => "Vehicle updated successfully."
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $vehicles = Vehicles::findOrFail($id);

        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $vehicles->delete();

        return response()->json(['success' => true, 'message' => 'Vehicle removed.'],204);
    }
}

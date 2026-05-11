<?php

namespace App\Http\Controllers;

use App\Models\PassengerDemand;
use Illuminate\Http\Request;
use App\Http\Requests\StoreDemandRequest;
use Illuminate\Http\JsonResponse;

class PassengerDemandController extends Controller
{
    /**
     * Display a listing of passenger demands.
     */
    public function index(): JsonResponse
    {
        // Use with('location') if you want to see where people are waiting
        $demand = PassengerDemand::with('location')->get(); 
        
        return response()->json([
            'success' => true, 
            'data' => $demand
        ], 200);
    }

    /**
     * Store a newly created demand record.
     */
    public function store(StoreDemandRequest $request): JsonResponse
    {
        // 1. Get the validated data from the request first
        $validatedData = $request->validated();

        // 2. Create the record using that array
        $demand = PassengerDemand::create($validatedData);

        return response()->json([
            'success' => true, 
            'data' => $demand,
            'message' => 'Demand recorded successfully.'
        ], 201);
    }
}
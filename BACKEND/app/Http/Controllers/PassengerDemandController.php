<?php

namespace App\Http\Controllers;

use App\Models\PassengerDemand;
use Illuminate\Http\Request;
use App\Http\Requests\StoreDemandRequest;
use Illuminate\Http\JsonResponse;

class PassengerDemandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():JsonResponse
    {
        $demand = PassengerDemand::all(); 
        return response()->json(['success' => true, 'data' => $demand], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDemandRequest $request): JsonResponse
    {
        $data=PassengerDemand::create($request)->validated();
        return response()->json(['success' => true, 'data' => $data],201);
    }
}

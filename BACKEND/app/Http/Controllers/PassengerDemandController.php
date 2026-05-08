<?php

namespace App\Http\Controllers;

use App\Models\PassengerDemand;
use Illuminate\Http\Request;

class PassengerDemandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $demand = PassengerDemand::all(); 
        return view('demand.index', compact('demand'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('demand.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        PassengerDemand::create($request);
        return redirect()->route('demand.index')->with('success', 'Demand created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(PassengerDemand $demand)
    {
        return view('demand.show', compact('demand'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PassengerDemand $demand)
    {
        return view('demand.edit')
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PassengerDemand $demand)
    {
        PassengerDemand::create($request);
        return redirect()->route('demand.index')->with('success', 'Demand created!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PassengerDemand $demand)
    {
        $demand->delete();
        return redirect()->route('demand.index')->with('success', 'Demand deleted!');
    }
}

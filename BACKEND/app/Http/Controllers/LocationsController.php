<?php

namespace App\Http\Controllers;

use App\Models\Locations;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $locations = Locations::all();
        return view('locations.index', compact('locations'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('locations.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'location_name' => 'required|max:100',
            'description' => '',
        ]);
        return redirect()->route('locations.index')->with('success', 'Location created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Locations $locations)
    {
        return view('locations.index', compact('locations'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Locations $locations)
    {
        return view('locations.edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Locations $locations)
    {
        $validated = $request->validate([
            'location_name' => 'required|max:100',
            'description' => '',
        ]);
        return redirect()->route('locations.index')->with('success', 'Location updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Locations $locations)
    {
        $locations->delete();
        return redirect()->route('demand.index')->with('success', 'Demand deleted!');
    }
}

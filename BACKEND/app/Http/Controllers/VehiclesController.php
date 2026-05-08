<?php

namespace App\Http\Controllers;

use App\Models\Vehicles;
use Illuminate\Http\Request;

class VehiclesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vehicles = Vehicles::all(); 
        return view('vehicles.index', compact('vehicles'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('vehicles.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'plate_number' => 'required|max:10|unique',
            'body_number' => 'required|max:10',
        ]);
        Vehicles::create($validated);
        return redirect()->route('vehicles.index')->with('success', 'Vehicle created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicles $vehicles)
    {
        return view('posts.show', compact('post'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicles $vehicles)
    {
        return view('vehicles.edit')
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vehicles $vehicles)
    {
        $validated = $request->validate([
            'plate_number' => 'required|max:10|unique',
            'body_number' => 'required|max:10',
        ]);
        Vehicles::create($validated);
        return redirect()->route('vehicles.index')->with('success', 'Vehicle updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicles $vehicles)
    {
        $vehicles->delete();
        return redirect()->route('vehicles.index')->with('success', 'Vehicle deleted');
    }
}

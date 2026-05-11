<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LivePing;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Location;

class LivePingSeeder extends Seeder
{
    public function run(): void
    {
        $passengers = User::where('role', 'passenger')->get();
        $vehicles = Vehicle::all();
        $locations = Location::all();

        for ($i = 0; $i < 25; $i++) {
            $vehicle = $vehicles->random();
            LivePing::create([
                'vehicle_id' => $vehicle->vehicle_id,
                'location_id' => $locations->random()->location_id,
                'user_id' => $passengers->random()->user_id,
                'type' => $vehicle->vehicle_type,
                'note' => 'Demo ping sighting.',
            ]);
        }
    }
}
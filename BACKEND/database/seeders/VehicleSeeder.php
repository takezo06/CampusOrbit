<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehicle;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $vehicles = [
            ['plate_number' => 'VFK307', 'body_number' => '01', 'vehicle_type' => 'ikot', 'is_active' => true],
            ['plate_number' => 'GAP670', 'body_number' => '02', 'vehicle_type' => 'ikot', 'is_active' => true],
            ['plate_number' => 'ABX123', 'body_number' => 'T1', 'vehicle_type' => 'toda', 'is_active' => true],
            ['plate_number' => 'TDA456', 'body_number' => 'T2', 'vehicle_type' => 'toda', 'is_active' => true],
        ];

        foreach ($vehicles as $v) {
            Vehicle::create($v);
        }
    }
}
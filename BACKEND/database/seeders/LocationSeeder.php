<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            ['location_name' => 'Sports Complex', 'description' => 'Sports Complex'],
            ['location_name' => 'CSM', 'description' => 'College of Science and Mathematics'],
            ['location_name' => 'Carim', 'description' => 'Center for the Advancement of Research in Mindanao'],
            ['location_name' => 'Cultural Complex', 'description' => 'Cultural Complex'],
            ['location_name' => 'CHSS/Admin', 'description' => 'College of Humanities and Social Sciences or Admin Building'],
            ['location_name' => 'Kalimudan', 'description' => 'Kalimudan'],
            ['location_name' => 'Basak', 'description' => 'Basak'],
            ['location_name' => 'Mintal', 'description' => 'Mintal'],
        ];

        foreach ($locations as $loc) {
            Location::create($loc);
        }
    }
}
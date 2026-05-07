<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. The Team (Admins)
        $admins = [
            ['username' => 'josh', 'email' => 'josh@up.edu.ph'],
            ['username' => 'zach', 'email' => 'zach@up.edu.ph'],
            ['username' => 'jed',  'email' => 'jed@up.edu.ph'],
        ];

        foreach ($admins as $admin) {
            User::create([
                'username' => $admin['username'],
                'email' => $admin['email'],
                'password' => 'password', // Hashed by User model cast
                'role' => 'admin',
                'device_ip' => '127.0.0.1',
            ]);
        }

        // 2. Dummy Passengers (Whoever is not Admin)
        $passengers = [
            ['username' => 'student_alpha', 'email' => 'alpha@up.edu.ph'],
            ['username' => 'student_beta',  'email' => 'beta@up.edu.ph'],
            ['username' => 'student_gamma', 'email' => 'gamma@up.edu.ph'],
            ['username' => 'student_delta', 'email' => 'delta@up.edu.ph'],
        ];

        foreach ($passengers as $passenger) {
            User::create([
                'username' => $passenger['username'],
                'email' => $passenger['email'],
                'password' => 'password',
                'role' => 'passenger',
                'points' => rand(10, 200),
                'level' => 1,
                'device_ip' => '127.0.0.1',
            ]);
        }
    }
}
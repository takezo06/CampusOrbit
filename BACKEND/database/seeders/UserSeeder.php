<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. The Team (Admins)
        $admins = [
            ['username' => 'josh', 'email' => 'yacobpapica@gmail.com'],
            ['username' => 'zach', 'email' => 'zachenrico.tia@gmail.com'],
            ['username' => 'jed',  'email' => 'somera.jed@gmail.com'],
        ];

        foreach ($admins as $admin) {
            User::create([
                'name'      => ucfirst($admin['username']), // Added 'name'
                'username'  => $admin['username'],
                'email'     => $admin['email'],
                'password'  => Hash::make('password'), 
                'role'      => 'admin',
                'device_ip' => '127.0.0.1',
            ]);
        }

        // 2. Dummy Passengers
        $passengers = [
            ['username' => 'student_alpha', 'email' => 'alpha@up.edu.ph'],
            ['username' => 'student_beta',  'email' => 'beta@up.edu.ph'],
            ['username' => 'student_gamma', 'email' => 'gamma@up.edu.ph'],
            ['username' => 'student_delta', 'email' => 'delta@up.edu.ph'],
        ];

        foreach ($passengers as $passenger) {
            User::create([
                'name'      => ucfirst($passenger['username']), 
                'username'  => $passenger['username'],
                'email'     => $passenger['email'],
                'password'  => Hash::make('password'), 
                'role'      => 'passenger',
                'points'    => rand(10, 200),
                'level'     => 1,
                'device_ip' => '127.0.0.1',
            ]);
        }
    }
}
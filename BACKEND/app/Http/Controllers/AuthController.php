<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    // 1. MANUAL LOGIN
    public function login(Request $request) {
        $user = User::where('email', $request->login)->orWhere('username', $request->login)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'token' => $user->createToken('orbit-token')->plainTextToken,
                'user' => $user
            ]
        ]);
    }

    // 2. MANUAL SIGN UP (Matches your React UI)
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed', // 'confirmed' expects password_confirmation from frontend
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false, 
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'passenger', // Default role for new signups
            'device_ip' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'token' => $user->createToken('orbit-token')->plainTextToken,
                'user' => $user
            ]
        ]);
    }

    // 3. GOOGLE REDIRECT
    public function redirectToGoogle() {
        return Socialite::driver('google')->stateless()->redirect();
    }

    // 4. GOOGLE CALLBACK
    public function handleGoogleCallback() {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            
            // Check if user exists, otherwise create
            $user = User::where('email', $googleUser->getEmail())->first();

            if (!$user) {
                $user = User::create([
                    'username' => strtolower(explode('@', $googleUser->getEmail())[0]) . rand(10, 99),
                    'email' => $googleUser->getEmail(),
                    'password' => Hash::make(Str::random(24)),
                    'role' => 'passenger',
                    'device_ip' => request()->ip(),
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'token' => $user->createToken('orbit-token')->plainTextToken, 
                    'user' => $user
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Google Login Failed'], 401);
        }
    }

    // 5. GET LOGGED IN USER DATA
    public function me(Request $request) {
        return response()->json(['success' => true, 'data' => $request->user()]);
    }
}
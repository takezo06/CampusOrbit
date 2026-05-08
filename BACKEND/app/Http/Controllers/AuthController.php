<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
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

    public function redirectToGoogle() {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback() {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'username' => strtolower(explode('@', $googleUser->getEmail())[0]),
                    'password' => Hash::make(Str::random(24)),
                    'role' => 'passenger'
                ]
            );

            return response()->json([
                'success' => true,
                'data' => ['token' => $user->createToken('orbit-token')->plainTextToken, 'user' => $user]
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Google Login Failed'], 401);
        }
    }

    public function me(Request $request) {
        return response()->json(['success' => true, 'data' => $request->user()]);
    }
}
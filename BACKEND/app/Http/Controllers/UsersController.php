<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Http\JsonResponse;
class UsersController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {   
        $users = Users::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);
        return response()->json([
            "success" => true,
            "data"    => $users,
            "message" => "User created successfully."
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Users $users): JsonResponse
    {   
        $id = $users->id();
        $data = $users
        ->when($id, function ($query, $id) {
            return $query->where('type', $id);
        })
        ->latest('timestamp')->get();
        return response()->json(['success' => true, 'data' => $data],200);
    }

   
    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUserRequest $request, Users $users): JsonResponse
    {
        $users->update([
            ...$request->validated(),
        ]);
        return response()->json([
            "success" => true,
            "data"    => $users,
            "message" => "User updated successfully."
        ],200);
    }

   
}

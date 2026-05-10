<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Requests\StoreNewsRequest;
use Illuminate\Http\JsonResponse;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $news = News::all();
        return response()->json(['success' => true, 'data' => $news], 201);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDemandRequest $request): JsonResponse
    {
        $news = News::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);
        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }
        return response()->json([
            "success" => true,
            "data"    => $news,
            "message" => "News created successfully."
        ],201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreNewsRequest $request, News $news): JsonResponse
    {
        $news->update([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);
        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }
        return response()->json([
            "success" => true,
            "data"    => $news,
            "message" => "News created successfully."
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $news = News::findOrFail($id);

        if (auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $news->delete();

        return response()->json(['success' => true, 'message' => 'News removed.'], 204);
    }
}

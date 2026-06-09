<?php

namespace App\Http\Controllers\Seller\Admin;

use App\Helpers\FileStore;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{
    public function store(Request $request, $type)
    {
        $request->validate([
            'image' => 'required|mimes:jpg,jpeg,png,webp,avif,heic,heif|max:4096',
        ]);

        $user = Auth::user();

        $validTypes = ['slider', 'banner1', 'banner2'];
        if (!in_array($type, $validTypes)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid image type.'
            ], 400);
        }

        $file = $request->file('image');
        $imageUrl = FileStore::store('seller-images', $file);

        return response()->json([
            'success' => true,
            'data' => [
                'image_url' => $imageUrl
            ]
        ]);
    }

    public function getSettings(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => []
        ]);
    }
}

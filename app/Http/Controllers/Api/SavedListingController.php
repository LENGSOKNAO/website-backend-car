<?php

namespace App\Http\Controllers\Api;

use App\Models\SavedListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SavedListingController extends ApiController
{
    public function index()
    {
        $saved = SavedListing::with('listing.make', 'listing.model', 'listing.primaryImage')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return $this->success($saved);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'listing_id' => 'required|exists:car_listings,id',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $existing = SavedListing::where('user_id', auth()->id())
            ->where('listing_id', $request->listing_id)
            ->first();

        if ($existing) {
            return $this->error('Already saved', 409);
        }

        $saved = SavedListing::create([
            'user_id' => auth()->id(),
            'listing_id' => $request->listing_id,
            'saved_at' => now(),
        ]);

        return $this->success($saved, 'Listing saved', 201);
    }

    public function destroy(string $id)
    {
        $saved = SavedListing::where('user_id', auth()->id())
            ->where('listing_id', $id)
            ->firstOrFail();

        $saved->delete();

        return $this->success(null, 'Listing unsaved');
    }
}

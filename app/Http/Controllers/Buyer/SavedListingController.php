<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\SavedListing;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SavedListingController extends Controller
{
    public function index()
    {
        $saved = SavedListing::with([
            'listing.make', 'listing.model', 'listing.category', 'listing.primaryImage',
        ])
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(15);

        $saved->getCollection()->transform(function ($item) {
            $raw = $item->listing?->primaryImage?->image_url;
            $item->listing->image_url = $raw
                ? (str_starts_with($raw, 'http') ? $raw : Storage::disk('public')->url($raw))
                : null;
            unset($item->listing->primaryImage);

            return $item;
        });

        return Inertia::render('buyer/saved-listings/index', [
            'listings' => $saved,
        ]);
    }

    public function destroy(string $id)
    {
        $saved = SavedListing::where('user_id', auth()->id())
            ->where('listing_id', $id)
            ->firstOrFail();

        $saved->delete();

        return redirect()->back()->with('success', 'Listing removed from saved.');
    }
}

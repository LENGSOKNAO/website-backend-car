<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfferController extends Controller
{
    public function index(Request $request)
    {
        $query = Offer::with(['listing.make', 'listing.model', 'seller'])
            ->where('buyer_id', auth()->id());

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $offers = $query->latest()->paginate(15);

        return Inertia::render('buyer/offers/index', [
            'offers' => $offers,
            'filters' => $request->only(['status']),
        ]);
    }

    public function show(string $id)
    {
        $offer = Offer::with([
            'listing.make', 'listing.model', 'listing.primaryImage',
            'seller',
        ])->where('buyer_id', auth()->id())->findOrFail($id);

        return Inertia::render('buyer/offers/show', [
            'offer' => $offer,
        ]);
    }
}

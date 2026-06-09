<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PreOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OfferController extends Controller
{
    public function index(Request $request)
    {
        $query = Offer::with(['listing.make', 'listing.model', 'buyer'])
            ->where('seller_id', auth()->id());

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $offers = $query->latest()->paginate(15);

        return Inertia::render('seller/offers/index', [
            'offers' => $offers,
            'filters' => $request->only(['status']),
        ]);
    }

    public function show(string $id)
    {
        $offer = Offer::with([
            'listing.make', 'listing.model', 'listing.primaryImage',
            'buyer',
        ])->where('seller_id', auth()->id())->findOrFail($id);

        return Inertia::render('seller/offers/show', [
            'offer' => $offer,
        ]);
    }

    public function accept(string $id)
    {
        $offer = Offer::with('listing')->where('seller_id', auth()->id())->findOrFail($id);

        if ($offer->status !== 'pending') {
            return redirect()->back()->with('error', 'Only pending offers can be accepted.');
        }

        DB::transaction(function () use ($offer) {
            $offer->update(['status' => 'accepted']);
            $offer->listing()->update(['status' => 'out_of_stock', 'total' => 0]);

            PreOrder::where('listing_id', $offer->listing_id)
                ->whereIn('status', ['pending', 'confirmed'])
                ->update(['status' => 'cancelled']);

            $order = Order::create([
                'buyer_id' => $offer->buyer_id,
                'seller_id' => $offer->seller_id,
                'order_number' => 'ORD-'.strtoupper(uniqid()),
                'status' => 'confirmed',
                'subtotal' => $offer->offered_price,
                'tax' => 0,
                'fees' => 0,
                'total' => $offer->offered_price,
                'placed_at' => now(),
            ]);

            OrderItem::create([
                'order_id' => $order->id,
                'listing_id' => $offer->listing_id,
                'offer_id' => $offer->id,
                'price' => $offer->offered_price,
                'condition' => $offer->listing->condition,
            ]);
        });

        return redirect()->back()->with('success', 'Offer accepted and order created.');
    }

    public function reject(string $id)
    {
        $offer = Offer::where('seller_id', auth()->id())->findOrFail($id);

        $offer->update(['status' => 'rejected']);

        return redirect()->back()->with('success', 'Offer rejected.');
    }
}

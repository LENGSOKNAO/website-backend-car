<?php

namespace App\Http\Controllers\Api;

use App\Models\CarListing;
use App\Models\Offer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PreOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OfferController extends ApiController
{
    public function index()
    {
        $offers = Offer::with('listing.make', 'listing.model', 'buyer')
            ->where('seller_id', auth()->id())
            ->orWhere('buyer_id', auth()->id())
            ->latest()
            ->paginate(15);

        return $this->success($offers);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'listing_id' => 'required|exists:car_listings,id',
            'offered_price' => 'required|numeric|min:0',
            'message' => 'nullable|string|max:1000',
            'payment_method' => 'nullable|in:finance,cash',
            'down_payment' => 'nullable|numeric|min:0',
            'loan_term' => 'nullable|integer|min:1',
            'accessories' => 'nullable|array',
            'accessories.*' => 'string',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $listing = CarListing::findOrFail($request->listing_id);

        $offer = Offer::create([
            'listing_id' => $request->listing_id,
            'buyer_id' => auth()->id(),
            'seller_id' => $listing->seller_id,
            'offered_price' => $request->offered_price,
            'message' => $request->message,
            'payment_method' => $request->payment_method,
            'down_payment' => $request->down_payment,
            'loan_term' => $request->loan_term,
            'accessories' => $request->accessories,
            'status' => 'pending',
            'expires_at' => now()->addDays(3),
        ]);

        return $this->success($offer->load('listing.make', 'listing.model'), 'Offer sent', 201);
    }

    public function show(string $id)
    {
        $offer = Offer::with('listing.make', 'listing.model', 'buyer', 'seller')
            ->findOrFail($id);

        if ($offer->buyer_id !== auth()->id() && $offer->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        return $this->success($offer);
    }

    public function accept(string $id)
    {
        $offer = Offer::with('listing.make', 'listing.model', 'buyer', 'seller')->findOrFail($id);

        if ($offer->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        DB::transaction(function () use ($offer) {
            $offer->update(['status' => 'accepted']);
            $offer->listing()->update(['status' => 'out_of_stock', 'total' => 0]);

            PreOrder::where('listing_id', $offer->listing_id)
                ->whereIn('status', ['pending', 'confirmed'])
                ->update(['status' => 'cancelled']);

            $accessoriesTotal = collect($offer->accessories ?? [])->sum(fn ($a) => $a['price'] ?? 0);
            $totalPrice = $offer->offered_price + $accessoriesTotal;

            $orderData = [
                'buyer_id' => $offer->buyer_id,
                'seller_id' => $offer->seller_id,
                'order_number' => 'ORD-'.strtoupper(uniqid()),
                'status' => 'confirmed',
                'subtotal' => $totalPrice,
                'tax' => 0,
                'fees' => 0,
                'total' => $totalPrice,
                'notes' => json_encode([
                    'payment_method' => $offer->payment_method,
                    'down_payment' => $offer->down_payment,
                    'loan_term' => $offer->loan_term,
                    'accessories' => $offer->accessories,
                ]),
                'placed_at' => now(),
            ];

            if ($offer->payment_method === 'finance' && $offer->loan_term) {
                $orderData['payment_method'] = 'finance';
                $orderData['down_payment'] = $offer->down_payment ?? 0;
                $orderData['loan_term'] = $offer->loan_term;
                $financedAmount = $totalPrice - ($offer->down_payment ?? 0);
                $monthlyRate = 0.069 / 12;
                $orderData['monthly_payment'] = round(
                    $financedAmount * ($monthlyRate * pow(1 + $monthlyRate, $offer->loan_term)) / (pow(1 + $monthlyRate, $offer->loan_term) - 1),
                    2
                );
                $orderData['accessories'] = $offer->accessories;
                $orderData['next_payment_due_at'] = now()->addMonth();
            } elseif ($offer->payment_method === 'cash') {
                $orderData['payment_method'] = 'cash';
                $orderData['down_payment'] = $totalPrice;
                $orderData['status'] = 'completed';
                $orderData['completed_at'] = now();
            }

            $order = Order::create($orderData);

            OrderItem::create([
                'order_id' => $order->id,
                'listing_id' => $offer->listing_id,
                'offer_id' => $offer->id,
                'price' => $offer->offered_price,
                'condition' => $offer->listing->condition,
            ]);

            if ($offer->payment_method === 'finance' && $offer->loan_term) {
                $order->createInstallments();
            }
        });

        return $this->success($offer, 'Offer accepted');
    }

    public function reject(string $id)
    {
        $offer = Offer::findOrFail($id);

        if ($offer->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $offer->update(['status' => 'rejected']);

        return $this->success($offer, 'Offer rejected');
    }

    public function counter(Request $request, string $id)
    {
        $offer = Offer::findOrFail($id);

        if ($offer->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $validator = Validator::make($request->all(), [
            'countered_price' => 'required|numeric|min:0',
            'message' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $offer->update([
            'status' => 'countered',
            'offered_price' => $request->countered_price,
        ]);

        return $this->success($offer->fresh(), 'Counter offer sent', 201);
    }
}

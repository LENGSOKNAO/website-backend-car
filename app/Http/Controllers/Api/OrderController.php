<?php

namespace App\Http\Controllers\Api;

use App\Models\CarListing;
use App\Models\Order;
use App\Models\OrderInstallment;
use App\Models\OrderItem;
use App\Models\PreOrder;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends ApiController
{
    public function index(Request $request)
    {
        $query = Order::with(['seller', 'items.listing.make', 'items.listing.model', 'items.listing.primaryImage', 'installments'])
            ->where('buyer_id', auth()->id());

        $orders = $query->latest()->get();

        return response()->json(['data' => $orders]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'listing_id' => 'required|exists:car_listings,id',
            'price' => 'required|numeric|min:0',
            'message' => 'nullable|string|max:1000',
            'payment_method' => 'nullable|in:finance,cash',
            'down_payment' => 'nullable|numeric|min:0',
            'loan_term' => 'nullable|integer|min:1',
            'accessories' => 'nullable|array',
            'accessories.*.id' => 'string',
            'accessories.*.name' => 'string',
            'accessories.*.price' => 'numeric|min:0',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $listing = CarListing::findOrFail($request->listing_id);

        $accessoriesTotal = collect($request->accessories ?? [])->sum(fn ($a) => $a['price'] ?? 0);
        $totalPrice = $request->price + $accessoriesTotal;

        $order = DB::transaction(function () use ($request, $listing, $totalPrice) {
            $listing->update(['status' => 'out_of_stock', 'total' => 0]);

            PreOrder::where('listing_id', $listing->id)
                ->whereIn('status', ['pending', 'confirmed'])
                ->update(['status' => 'cancelled']);

            $orderData = [
                'buyer_id' => auth()->id(),
                'seller_id' => $listing->seller_id,
                'order_number' => 'ORD-'.strtoupper(uniqid()),
                'subtotal' => $totalPrice,
                'tax' => 0,
                'fees' => 0,
                'total' => $totalPrice,
                'notes' => $request->message,
                'placed_at' => now(),
            ];

            if ($request->payment_method === 'finance' && $request->loan_term) {
                $orderData['status'] = 'confirmed';
                $orderData['payment_method'] = 'finance';
                $orderData['down_payment'] = $request->down_payment ?? 0;
                $orderData['loan_term'] = $request->loan_term;
                $financedAmount = $totalPrice - ($request->down_payment ?? 0);
                $monthlyRate = 0.069 / 12;
                $orderData['monthly_payment'] = round(
                    $financedAmount * ($monthlyRate * pow(1 + $monthlyRate, $request->loan_term)) / (pow(1 + $monthlyRate, $request->loan_term) - 1),
                    2
                );
                $orderData['accessories'] = $request->accessories;
                $orderData['next_payment_due_at'] = now()->addMonth();
            } elseif ($request->payment_method === 'cash') {
                $orderData['status'] = 'completed';
                $orderData['payment_method'] = 'cash';
                $orderData['down_payment'] = $totalPrice;
                $orderData['completed_at'] = now();
            } else {
                $orderData['status'] = 'confirmed';
            }

            $order = Order::create($orderData);

            OrderItem::create([
                'order_id' => $order->id,
                'listing_id' => $listing->id,
                'price' => $request->price,
                'condition' => $listing->condition,
            ]);

            if ($request->payment_method === 'finance' && $request->loan_term) {
                $order->createInstallments();
            }

            return $order;
        });

        return $this->success($order->load('items.listing.make', 'items.listing.model'), 'Order placed', 201);
    }

    public function show(string $id)
    {
        $order = Order::with([
            'seller',
            'items.listing' => function ($q) {
                $q->with(['make', 'model', 'category', 'primaryImage']);
            },
            'transactions',
            'installments',
        ])->where('buyer_id', auth()->id())->findOrFail($id);

        return response()->json(['data' => $order]);
    }

    public function payInstallment(Request $request, string $id)
    {
        $order = Order::with('installments')->where('buyer_id', auth()->id())->findOrFail($id);

        if ($order->payment_method !== 'finance') {
            return $this->error('Order is not financed', 400);
        }

        $validator = Validator::make($request->all(), [
            'month_number' => 'required|integer|min:1',
            'transaction_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $installment = $order->installments()->where('month_number', $request->month_number)->first();

        if (!$installment) {
            return $this->error('Installment not found', 404);
        }

        if ($installment->status === 'paid') {
            return $this->error('Installment already paid', 400);
        }

        DB::transaction(function () use ($order, $installment, $request) {
            $installment->update([
                'status' => 'paid',
                'paid_at' => now(),
                'transaction_id' => $request->transaction_id,
            ]);

            Transaction::create([
                'order_id' => $order->id,
                'type' => 'payment',
                'method' => 'installment',
                'reference' => $request->transaction_id,
                'amount' => $installment->amount,
                'status' => 'completed',
                'processed_at' => now(),
            ]);

            $nextDue = $order->installments()->where('status', 'pending')->orderBy('month_number')->first();
            $order->update(['next_payment_due_at' => $nextDue?->due_at]);

            if (!$order->installments()->where('status', 'pending')->exists()) {
                $order->update(['status' => 'completed', 'completed_at' => now()]);
            }
        });

        return $this->success($order->fresh()->load('installments'), 'Payment recorded');
    }
}
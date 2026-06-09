<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\OrderInstallment;
use App\Models\OrderItem;
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
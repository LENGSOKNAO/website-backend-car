<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends ApiController
{
    public function index(Request $request)
    {
        $query = Order::with(['seller', 'items.listing.make', 'items.listing.model', 'items.listing.primaryImage'])
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
        ])->where('buyer_id', auth()->id())->findOrFail($id);

        return response()->json(['data' => $order]);
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use Illuminate\Http\Request;

class SellerSaleController extends ApiController
{
    public function index(Request $request)
    {
        $query = Order::with([
            'buyer',
            'items.listing.make',
            'items.listing.model',
            'items.listing.category',
            'items.listing.primaryImage',
            'transactions',
            'installments',
        ])->where('seller_id', auth()->id());

        $sales = $query->latest()->paginate($request->per_page ?? 15);

        return response()->json(['data' => $sales]);
    }

    public function show(string $id)
    {
        $sale = Order::with([
            'buyer',
            'items.listing' => function ($q) {
                $q->with(['make', 'model', 'category', 'primaryImage']);
            },
            'transactions',
            'installments',
        ])->where('seller_id', auth()->id())->findOrFail($id);

        return response()->json(['data' => $sale]);
    }
}

<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('seller', 'items.listing.make', 'items.listing.model')
            ->where('buyer_id', auth()->id())
            ->latest()
            ->paginate(15);

        return Inertia::render('buyer/orders/index', [
            'orders' => $orders,
        ]);
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

        $order->items->each(function ($item) {
            $raw = $item->listing?->primaryImage?->image_url;
            $item->listing->image_url = $raw
                ? (str_starts_with($raw, 'http') ? $raw : Storage::disk('public')->url($raw))
                : null;
            unset($item->listing->primaryImage);
        });

        return Inertia::render('buyer/orders/show', [
            'order' => $order,
        ]);
    }
}

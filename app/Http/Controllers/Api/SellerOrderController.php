<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\PreOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SellerOrderController extends ApiController
{
    public function index(Request $request)
    {
        $tab = $request->input('tab', 'orders');

        $orders = collect();
        $preOrders = collect();

        if ($tab === 'orders' || !$request->has('tab')) {
            $orderQuery = Order::with('buyer', 'items.listing.make', 'items.listing.model', 'items.listing.primaryImage', 'items.listing.images', 'installments')
                ->where('seller_id', auth()->id());

            if ($request->search) {
                $search = $request->search;
                $orderQuery->where(function ($q) use ($search) {
                    $q->where('order_number', 'like', "%{$search}%")
                        ->orWhereHas('buyer', fn($bq) => $bq->where('full_name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%"))
                        ->orWhereHas('items.listing.make', fn($mq) => $mq->where('name', 'like', "%{$search}%"))
                        ->orWhereHas('items.listing.model', fn($mq) => $mq->where('name', 'like', "%{$search}%"));
                });
            }

            if ($request->status) {
                $orderQuery->where('status', $request->status);
            }

            $orders = $orderQuery->latest()->paginate($request->per_page ?? 15);

            $orders->getCollection()->each(function ($order) {
                $order->items->each(function ($item) {
                    $listing = $item->listing;
                    $raw = $listing->primaryImage?->image_url ?? $listing->images?->first()?->image_url;
                    $listing->image_url = $raw
                        ? (str_starts_with($raw, 'http') ? $raw : '/storage/' . $raw)
                        : null;
                });

                if ($order->payment_method === 'finance' && $order->loan_term) {
                    $order->installment_summary = $order->installment_summary;
                    $order->installment_months = $order->installment_months;
                }
            });
        }

        if ($tab === 'pre-orders') {
            $poQuery = PreOrder::whereHas('listing', fn($q) => $q->where('seller_id', auth()->id()))
                ->with([
                    'listing.make:id,name',
                    'listing.model:id,name',
                    'listing.primaryImage',
                    'listing.images',
                    'customer:id,full_name,email,phone',
                ]);

            if ($request->search) {
                $search = $request->search;
                $poQuery->where(function ($q) use ($search) {
                    $q->where('customer_name', 'like', "%{$search}%")
                        ->orWhere('customer_email', 'like', "%{$search}%")
                        ->orWhereHas('listing.make', fn($mq) => $mq->where('name', 'like', "%{$search}%"))
                        ->orWhereHas('listing.model', fn($mq) => $mq->where('name', 'like', "%{$search}%"));
                });
            }

            if ($request->status) {
                $poQuery->where('status', $request->status);
            }

            $preOrders = $poQuery->latest()->paginate($request->per_page ?? 15);

            $preOrders->getCollection()->each(function ($preOrder) {
                $listing = $preOrder->listing;
                if ($listing) {
                    $raw = $listing->primaryImage?->image_url ?? $listing->images?->first()?->image_url;
                    $listing->image_url = $raw
                        ? (str_starts_with($raw, 'http') ? $raw : '/storage/' . $raw)
                        : null;
                }
            });
        }

        return $this->success([
            'orders' => $orders,
            'preOrders' => $preOrders,
            'filters' => $request->only(['search', 'status', 'tab']),
        ]);
    }

    public function show(string $id)
    {
        $order = Order::with([
            'buyer',
            'items.listing' => function ($q) {
                $q->with(['make', 'model', 'category', 'primaryImage', 'images']);
            },
            'transactions',
            'installments',
        ])->where('seller_id', auth()->id())->findOrFail($id);

        $order->items->each(function ($item) {
            $listing = $item->listing;
            $raw = $listing->primaryImage?->image_url ?? $listing->images?->first()?->image_url;
            $listing->image_url = $raw
                ? (str_starts_with($raw, 'http') ? $raw : Storage::disk('public')->url($raw))
                : null;
        });

        return $this->success($order);
    }

    public function update(Request $request, string $id)
    {
        $order = Order::where('seller_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|in:confirmed,processing,completed,cancelled',
        ]);

        $data = ['status' => $validated['status']];

        if ($validated['status'] === 'completed') {
            $data['completed_at'] = now();
        }

        $order->update($data);

        return $this->success($order->fresh(), "Order status updated to {$validated['status']}.");
    }
}

<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\PreOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $tab = $request->input('tab', 'orders');

        $orders = collect();
        $preOrders = collect();

        if ($tab === 'orders' || ! $request->has('tab')) {
            $orderQuery = Order::with('buyer', 'items.listing.make', 'items.listing.model', 'items.listing.primaryImage', 'installments')
                ->where('seller_id', auth()->id());

            if ($request->search) {
                $search = $request->search;
                $orderQuery->where(function ($q) use ($search) {
                    $q->where('order_number', 'like', "%{$search}%")
                        ->orWhereHas('buyer', fn ($bq) => $bq->where('full_name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%"))
                        ->orWhereHas('items.listing.make', fn ($mq) => $mq->where('name', 'like', "%{$search}%"))
                        ->orWhereHas('items.listing.model', fn ($mq) => $mq->where('name', 'like', "%{$search}%"));
                });
            }

            if ($request->status) {
                $orderQuery->where('status', $request->status);
            }

            $orders = $orderQuery->latest()->paginate(15);

            $orders->getCollection()->each(function ($order) {
                $order->items->each(function ($item) {
                    $raw = $item->listing?->primaryImage?->image_url;
                    $item->listing->image_url = $raw
                        ? (str_starts_with($raw, 'http') ? $raw : '/storage/'.$raw)
                        : null;
                    unset($item->listing->primaryImage);
                });
                
                // Add installment summary for finance orders
                if ($order->payment_method === 'finance' && $order->loan_term) {
                    $order->installment_summary = $order->installment_summary;
                    $order->installment_months = $order->installment_months;
                }
            });
        }

        if ($tab === 'pre-orders') {
            $poQuery = PreOrder::whereHas('listing', fn ($q) => $q->where('seller_id', auth()->id()))
                ->with([
                    'listing.make:id,name',
                    'listing.model:id,name',
                    'listing.primaryImage',
                    'customer:id,full_name,email,phone',
                ]);

            if ($request->search) {
                $search = $request->search;
                $poQuery->where(function ($q) use ($search) {
                    $q->where('customer_name', 'like', "%{$search}%")
                        ->orWhere('customer_email', 'like', "%{$search}%")
                        ->orWhereHas('listing.make', fn ($mq) => $mq->where('name', 'like', "%{$search}%"))
                        ->orWhereHas('listing.model', fn ($mq) => $mq->where('name', 'like', "%{$search}%"));
                });
            }

            if ($request->status) {
                $poQuery->where('status', $request->status);
            }

            $preOrders = $poQuery->latest()->paginate(15);
        }

        return Inertia::render('seller/orders/index', [
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
                $q->with(['make', 'model', 'category', 'primaryImage']);
            },
            'transactions',
            'installments',
        ])->where('seller_id', auth()->id())->findOrFail($id);

        $order->items->each(function ($item) {
            $raw = $item->listing?->primaryImage?->image_url;
            $item->listing->image_url = $raw
                ? (str_starts_with($raw, 'http') ? $raw : Storage::disk('public')->url($raw))
                : null;
            unset($item->listing->primaryImage);
        });

        return Inertia::render('seller/orders/show', [
            'order' => $order,
        ]);
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

        return redirect()->back()->with('success', "Order status updated to {$validated['status']}.");
    }
}

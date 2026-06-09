<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('buyer', 'seller', 'items.listing.make', 'items.listing.model', 'items.listing.primaryImage')
            ->latest()
            ->paginate(15);

        $orders->getCollection()->each(function ($order) {
            $order->items->each(function ($item) {
                $raw = $item->listing?->primaryImage?->image_url;
                $item->listing->image_url = $raw
                    ? (str_starts_with($raw, 'http') ? $raw : '/storage/'.$raw)
                    : null;
                unset($item->listing->primaryImage);
            });
        });

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
        ]);
    }

    public function show(string $id)
    {
        $order = Order::with([
            'buyer',
            'seller',
            'items.listing' => function ($q) {
                $q->with(['make', 'model', 'category', 'primaryImage']);
            },
            'transactions',
        ])->findOrFail($id);

        $order->items->each(function ($item) {
            $raw = $item->listing?->primaryImage?->image_url;
            $item->listing->image_url = $raw
                ? (str_starts_with($raw, 'http') ? $raw : Storage::disk('public')->url($raw))
                : null;
            unset($item->listing->primaryImage);
        });

        return Inertia::render('admin/orders/show', [
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,processing,completed,cancelled,refunded',
        ]);

        $oldStatus = $order->status;
        $order->status = $validated['status'];

        if ($validated['status'] === 'completed' && ! $order->completed_at) {
            $order->completed_at = now();
        }

        if ($validated['status'] === 'cancelled' || $validated['status'] === 'refunded') {
            $order->completed_at = null;
        }

        $order->save();

        return redirect()->back()->with('success', "Order status updated from {$oldStatus} to {$validated['status']}.");
    }

    public function addTransaction(Request $request, Order $order)
    {
        $validated = $request->validate([
            'type' => 'required|in:payment,refund,deposit,adjustment',
            'method' => 'nullable|string|max:255',
            'reference' => 'nullable|string|max:255',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:pending,completed,failed,refunded',
            'notes' => 'nullable|string|max:1000',
        ]);

        $transaction = $order->transactions()->create([
            'type' => $validated['type'],
            'method' => $validated['method'],
            'reference' => $validated['reference'],
            'amount' => $validated['amount'],
            'status' => $validated['status'],
            'notes' => $validated['notes'] ?? null,
            'processed_at' => $validated['status'] === 'completed' ? now() : null,
        ]);

        if ($validated['status'] === 'completed' && $order->status === 'pending') {
            $order->status = 'confirmed';
            $order->save();
        }

        return redirect()->back()->with('success', 'Transaction added successfully.');
    }

    public function updateTransactionStatus(Request $request, Order $order, Transaction $transaction)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,completed,failed,refunded',
        ]);

        $transaction->status = $validated['status'];

        if ($validated['status'] === 'completed' && ! $transaction->processed_at) {
            $transaction->processed_at = now();
        }

        $transaction->save();

        return redirect()->back()->with('success', 'Transaction status updated.');
    }
}

<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Order;
use App\Models\SavedListing;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $buyerId = auth()->id();

        $totalOrders = Order::where('buyer_id', $buyerId)->count();
        $totalSpent = Order::where('buyer_id', $buyerId)
            ->whereIn('status', ['confirmed', 'completed', 'processing'])
            ->sum('total');
        $pendingOrders = Order::where('buyer_id', $buyerId)->where('status', 'pending')->count();
        $completedOrders = Order::where('buyer_id', $buyerId)->where('status', 'completed')->count();

        $savedListings = SavedListing::where('user_id', $buyerId)->count();
        $pendingInquiries = Inquiry::where('buyer_id', $buyerId)->where('status', 'new')->count();

        $statusBreakdown = Order::where('buyer_id', $buyerId)
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();

        $recentOrders = Order::with('seller', 'items.listing.make', 'items.listing.model')
            ->where('buyer_id', $buyerId)
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($o) => [
                'id' => $o->id,
                'order_number' => $o->order_number,
                'seller_name' => $o->seller->full_name ?? 'N/A',
                'total' => $o->total,
                'status' => $o->status,
                'item' => $o->items->first()
                    ? ($o->items->first()->listing->make->name ?? '').' '.($o->items->first()->listing->model->name ?? '')
                    : 'N/A',
                'placed_at' => $o->placed_at,
            ]);

        return Inertia::render('buyer/dashboard', [
            'stats' => [
                'total_orders' => $totalOrders,
                'total_spent' => $totalSpent,
                'pending_orders' => $pendingOrders,
                'completed_orders' => $completedOrders,
                'saved_listings' => $savedListings,
                'pending_inquiries' => $pendingInquiries,
                'status_breakdown' => $statusBreakdown,
                'recent_orders' => $recentOrders,
            ],
        ]);
    }
}

<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\CarListing;
use App\Models\Inquiry;
use App\Models\Offer;
use App\Models\Order;
use App\Models\SellerReview;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $sellerId = auth()->id();

        $totalSales = Order::where('seller_id', $sellerId)->count();
        $totalRevenue = Order::where('seller_id', $sellerId)
            ->whereIn('status', ['confirmed', 'completed', 'processing'])
            ->sum('total');
        $pendingOrders = Order::where('seller_id', $sellerId)->where('status', 'pending')->count();
        $completedOrders = Order::where('seller_id', $sellerId)->where('status', 'completed')->count();
        $cancelledOrders = Order::where('seller_id', $sellerId)->where('status', 'cancelled')->count();

        $activeListings = CarListing::where('seller_id', $sellerId)->where('status', 'in_stock')->count();
        $pendingInquiries = Inquiry::where('seller_id', $sellerId)->where('status', 'new')->count();
        $pendingOffers = Offer::where('seller_id', $sellerId)->where('status', 'pending')->count();
        $avgRating = SellerReview::where('seller_id', $sellerId)->avg('rating');

        $monthlyRevenue = Order::where('seller_id', $sellerId)
            ->whereIn('status', ['confirmed', 'completed', 'processing'])
            ->where('placed_at', '>=', now()->subMonths(6))
            ->select(
                DB::raw("to_char(placed_at, 'YYYY-MM') as month"),
                DB::raw('SUM(total) as revenue')
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $statusBreakdown = Order::where('seller_id', $sellerId)
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();

        $recentOrders = Order::with('buyer', 'items.listing.make', 'items.listing.model')
            ->where('seller_id', $sellerId)
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($o) => [
                'id' => $o->id,
                'order_number' => $o->order_number,
                'buyer_name' => $o->buyer->full_name ?? 'N/A',
                'total' => $o->total,
                'status' => $o->status,
                'item' => $o->items->first()
                    ? ($o->items->first()->listing->make->name ?? '').' '.($o->items->first()->listing->model->name ?? '')
                    : 'N/A',
                'placed_at' => $o->placed_at,
            ]);

        return Inertia::render('seller/dashboard', [
            'stats' => [
                'total_sales' => $totalSales,
                'total_revenue' => $totalRevenue,
                'pending_orders' => $pendingOrders,
                'completed_orders' => $completedOrders,
                'cancelled_orders' => $cancelledOrders,
                'active_listings' => $activeListings,
                'pending_inquiries' => $pendingInquiries,
                'pending_offers' => $pendingOffers,
                'avg_rating' => $avgRating ? round($avgRating, 1) : null,
                'monthly_revenue' => $monthlyRevenue,
                'status_breakdown' => $statusBreakdown,
                'recent_orders' => $recentOrders,
            ],
        ]);
    }

    /**
     * Get dashboard stats as JSON for API consumption
     */
    public function apiIndex()
    {
        $sellerId = auth()->id();

        $totalSales = Order::where('seller_id', $sellerId)->count();
        $totalRevenue = Order::where('seller_id', $sellerId)
            ->whereIn('status', ['confirmed', 'completed', 'processing'])
            ->sum('total');
        $pendingOrders = Order::where('seller_id', $sellerId)->where('status', 'pending')->count();
        $completedOrders = Order::where('seller_id', $sellerId)->where('status', 'completed')->count();
        $cancelledOrders = Order::where('seller_id', $sellerId)->where('status', 'cancelled')->count();

        $activeListings = CarListing::where('seller_id', $sellerId)->where('status', 'in_stock')->count();
        $pendingInquiries = Inquiry::where('seller_id', $sellerId)->where('status', 'new')->count();
        $pendingOffers = Offer::where('seller_id', $sellerId)->where('status', 'pending')->count();
        $avgRating = SellerReview::where('seller_id', $sellerId)->avg('rating');

        $monthlyRevenue = Order::where('seller_id', $sellerId)
            ->whereIn('status', ['confirmed', 'completed', 'processing'])
            ->where('placed_at', '>=', now()->subMonths(6))
            ->select(
                DB::raw("to_char(placed_at, 'YYYY-MM') as month"),
                DB::raw('SUM(total) as revenue')
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $statusBreakdown = Order::where('seller_id', $sellerId)
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();

        $recentOrders = Order::with('buyer', 'items.listing.make', 'items.listing.model')
            ->where('seller_id', $sellerId)
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($o) => [
                'id' => $o->id,
                'order_number' => $o->order_number,
                'buyer_name' => $o->buyer->full_name ?? 'N/A',
                'total' => $o->total,
                'status' => $o->status,
                'item' => $o->items->first()
                    ? ($o->items->first()->listing->make->name ?? '').' '.($o->items->first()->listing->model->name ?? '')
                    : 'N/A',
                'placed_at' => $o->placed_at,
            ]);

        return response()->json([
            'total_sales' => $totalSales,
            'total_revenue' => $totalRevenue,
            'pending_orders' => $pendingOrders,
            'completed_orders' => $completedOrders,
            'cancelled_orders' => $cancelledOrders,
            'active_listings' => $activeListings,
            'pending_inquiries' => $pendingInquiries,
            'pending_offers' => $pendingOffers,
            'avg_rating' => $avgRating ? round($avgRating, 1) : null,
            'monthly_revenue' => $monthlyRevenue,
            'status_breakdown' => $statusBreakdown,
            'recent_orders' => $recentOrders,
        ]);
    }
}

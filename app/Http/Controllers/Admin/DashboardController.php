<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CarListing;
use App\Models\Inquiry;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $recentCars = CarListing::with('seller')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($car) => [
                'id' => $car->id,
                'make_name' => $car->make->name ?? 'N/A',
                'model_name' => $car->model->name ?? 'N/A',
                'year' => $car->year,
                'price' => $car->price,
                'status' => $car->status,
                'seller' => ['name' => $car->seller->full_name ?? 'N/A'],
                'condition' => $car->condition ?? 'used',
            ]);

        $recentOrders = Order::with('buyer', 'items.listing.make', 'items.listing.model')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($order) => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'buyer_name' => $order->buyer->full_name ?? 'N/A',
                'total' => $order->total,
                'status' => $order->status,
                'placed_at' => $order->placed_at,
                'item' => $order->items->first()
                    ? ($order->items->first()->listing->make->name ?? '').' '.($order->items->first()->listing->model->name ?? '')
                    : 'N/A',
            ]);

        $newCars = CarListing::where('condition', 'new')->count();
        $usedCars = CarListing::where('condition', 'used')->count();
        $pendingInquiries = Inquiry::where('status', 'pending')->count();

        $currentMonthlyRevenue = Order::whereIn('status', ['confirmed', 'completed', 'processing'])
            ->whereMonth('placed_at', now()->month)
            ->whereYear('placed_at', now()->year)
            ->sum('total');

        $totalOrders = Order::count();
        $pendingOrders = Order::where('status', 'pending')->count();
        $recentOrderCount = Order::where('placed_at', '>=', now()->subDays(7))->count();

        $revenueTrendMonths = collect();
        for ($i = 5; $i >= 0; $i--) {
            $revenueTrendMonths->push(now()->subMonths($i)->format('Y-m'));
        }

        $rawRevenue = Order::where('placed_at', '>=', now()->subMonths(6))
            ->select(
                DB::raw("to_char(placed_at, 'YYYY-MM') as month"),
                'status',
                DB::raw('SUM(total) as revenue')
            )
            ->groupBy('month', 'status')
            ->orderBy('month')
            ->get()
            ->groupBy('month');

        $revenueStatuses = ['pending', 'confirmed', 'processing', 'completed', 'cancelled', 'refunded'];
        $revenueTrend = $revenueTrendMonths->map(fn ($month) => array_merge(
            ['month' => $month],
            collect($revenueStatuses)->mapWithKeys(fn ($s) => [$s => (float) (optional($rawRevenue->get($month)?->firstWhere('status', $s))->revenue ?? 0)])->all()
        ));

        $orderStatusBreakdown = Order::select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get();

        $topSellers = Order::select(
            'seller_id',
            DB::raw('COUNT(*) as total_orders'),
            DB::raw('SUM(total) as total_revenue')
        )
            ->whereIn('status', ['confirmed', 'completed', 'processing'])
            ->groupBy('seller_id')
            ->orderByDesc('total_revenue')
            ->take(5)
            ->get()
            ->map(fn ($row) => [
                'seller_name' => User::find($row->seller_id)?->full_name ?? 'Unknown',
                'total_orders' => $row->total_orders,
                'total_revenue' => $row->total_revenue,
            ]);

        $monthlyOrders = collect();
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $count = Order::whereIn('status', ['confirmed', 'completed', 'processing'])
                ->whereYear('placed_at', $date->year)
                ->whereMonth('placed_at', $date->month)
                ->count();
            $monthlyOrders->push([
                'month' => $date->format('M'),
                'orders' => $count,
            ]);
        }

        $inventoryTrendMonths = collect();
        for ($i = 5; $i >= 0; $i--) {
            $inventoryTrendMonths->push(now()->subMonths($i)->format('Y-m'));
        }

        $rawInventory = CarListing::whereNotNull('created_at')
            ->where('created_at', '>=', now()->subMonths(6))
            ->select(
                DB::raw("to_char(created_at, 'YYYY-MM') as month"),
                DB::raw("COALESCE(condition, 'other') as cond"),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('month', 'cond')
            ->orderBy('month')
            ->get()
            ->groupBy('month');

        $inventoryConditions = ['new', 'used', 'other'];
        $inventoryTrend = $inventoryTrendMonths->map(fn ($month) => array_merge(
            ['month' => $month],
            collect($inventoryConditions)->mapWithKeys(fn ($c) => [$c => (int) (optional($rawInventory->get($month)?->firstWhere('cond', $c))->count ?? 0)])->all()
        ));

        $listingsByCondition = CarListing::select('condition', DB::raw('COUNT(*) as value'))
            ->groupBy('condition')
            ->get()
            ->map(fn ($item) => [
                'name' => $item->condition ?? 'other',
                'value' => $item->value,
            ]);

        $listingsByStatus = CarListing::select('status', DB::raw('COUNT(*) as value'))
            ->groupBy('status')
            ->get()
            ->map(fn ($item) => [
                'name' => $item->status ?? 'other',
                'value' => $item->value,
            ]);

        $inquiriesByStatus = Inquiry::select('status', DB::raw('COUNT(*) as value'))
            ->groupBy('status')
            ->get()
            ->map(fn ($item) => [
                'name' => $item->status,
                'value' => $item->value,
            ]);

        $stats = [
            'total_employees' => User::employees()->count(),
            'total_customers' => User::customers()->count(),
            'total_inventory' => CarListing::count(),
            'available_cars' => CarListing::where('status', 'in_stock')->count(),
            'sold_cars' => CarListing::where('status', 'out_of_stock')->count(),
            'pending_cars' => CarListing::where('status', 'coming_soon')->count(),
            'new_cars' => $newCars,
            'used_cars' => $usedCars,
            'total_sellers' => User::role('seller')->count(),
            'total_buyers' => User::role('buyer')->count(),
            'pending_inquiries' => $pendingInquiries,
            'current_monthly_revenue' => $currentMonthlyRevenue,
            'revenue_trend' => $revenueTrend,
            'order_status_breakdown' => $orderStatusBreakdown,
            'top_sellers' => $topSellers,
            'recent_cars' => $recentCars,
            'recent_orders' => $recentOrders,
            'total_orders' => $totalOrders,
            'pending_orders' => $pendingOrders,
            'recent_order_count' => $recentOrderCount,
            'inventory_value' => CarListing::whereIn('status', ['in_stock', 'coming_soon'])->sum('price'),
            'monthly_orders' => $monthlyOrders,
            'inventory_trend' => $inventoryTrend,
            'inventory_by_condition' => $listingsByCondition,
            'inventory_by_status' => $listingsByStatus,
            'inquiries_by_status' => $inquiriesByStatus,
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
        ]);
    }
}

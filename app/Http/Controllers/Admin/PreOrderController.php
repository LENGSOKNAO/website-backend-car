<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CarListing;
use App\Models\CarMake;
use App\Models\Order;
use App\Models\PreOrder;
use App\Models\PreOrderPayment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = PreOrder::with([
            'listing.make:id,name',
            'listing.model:id,name',
            'listing.seller:id,full_name',
            'listing.primaryImage',
            'make:id,name',
            'model:id,name',
            'customer:id,full_name,email',
            'createdBy:id,full_name',
        ]);

        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_email', 'like', "%{$search}%")
                    ->orWhere('customer_phone', 'like', "%{$search}%")
                    ->orWhere('source', 'like', "%{$search}%")
                    ->orWhereHas('make', fn ($mq) => $mq->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('model', fn ($mq) => $mq->where('name', 'like', "%{$search}%"));
            });
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $preOrders = $query->latest()->paginate(15);

        $stats = [
            'total' => PreOrder::count(),
            'pending' => PreOrder::where('status', 'pending')->count(),
            'confirmed' => PreOrder::where('status', 'confirmed')->count(),
            'fulfilled' => PreOrder::where('status', 'fulfilled')->count(),
            'cancelled' => PreOrder::where('status', 'cancelled')->count(),
        ];

        return Inertia::render('admin/pre-orders/index', [
            'preOrders' => $preOrders,
            'filters' => $request->only(['search', 'status']),
            'stats' => $stats,
        ]);
    }

    public function create()
    {
        $makes = CarMake::with('models')->orderBy('name')->get();
        $listings = CarListing::with(['make:id,name', 'model:id,name'])
            ->where('status', 'coming_soon')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($l) => [
                'id' => $l->id,
                'label' => ($l->make->name ?? '?').' '.($l->model->name ?? '?').' ('.$l->year.') - '.$l->status,
            ]);

        return Inertia::render('admin/pre-orders/create', [
            'makes' => $makes,
            'listings' => $listings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'listing_id' => 'nullable|exists:car_listings,id',
            'make_id' => 'nullable|exists:car_makes,id|required_without:listing_id',
            'model_id' => 'nullable|exists:car_models,id|required_without:listing_id',
            'customer_id' => 'nullable|exists:users,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'quantity' => 'required|integer|min:1',
            'color' => 'nullable|string|max:100',
            'interior_color' => 'nullable|string|max:100',
            'trim_level' => 'nullable|string|max:100',
            'engine_preference' => 'nullable|string|max:100',
            'transmission_preference' => 'nullable|string|max:100',
            'drivetrain_preference' => 'nullable|string|max:100',
            'fuel_type' => 'nullable|string|max:100',
            'year_min' => 'nullable|integer|min:1900|max:2100',
            'year_max' => 'nullable|integer|min:1900|max:2100',
            'mileage_max' => 'nullable|integer|min:0',
            'total_price' => 'nullable|numeric|min:0',
            'budget_min' => 'nullable|numeric|min:0',
            'budget_max' => 'nullable|numeric|min:0',
            'source' => 'nullable|string|max:255',
            'preferred_contact' => 'nullable|string|max:50',
            'status' => 'required|in:pending,confirmed,fulfilled,cancelled',
            'notes' => 'nullable|string',
            'internal_notes' => 'nullable|string',
            'special_requests' => 'nullable|string',
        ]);

        if (empty($validated['customer_id'])) {
            $user = User::where('email', $validated['customer_email'])->first();
            if ($user) {
                $validated['customer_id'] = $user->id;
            }
        }

        if (! empty($validated['listing_id'])) {
            $hasOrders = Order::whereHas('items', fn ($q) => $q->where('listing_id', $validated['listing_id']))->exists();
            if ($hasOrders) {
                return redirect()->back()->with('error', 'Cannot create pre-order — this vehicle already has an order.')->withInput();
            }
        }

        $validated['created_by'] = auth()->id();

        PreOrder::create($validated);

        return redirect()->route('admin.pre-orders.index')
            ->with('success', 'Pre-order created successfully.');
    }

    public function show(PreOrder $preOrder)
    {
        $preOrder->load([
            'listing.make:id,name',
            'listing.model:id,name',
            'listing.primaryImage',
            'listing.seller:id,full_name,email,phone',
            'make:id,name',
            'model:id,name',
            'customer:id,full_name,email,phone',
            'createdBy:id,full_name',
            'payments' => fn ($q) => $q->with('createdBy:id,full_name')->latest(),
        ]);

        $totalPaid = $preOrder->totalPaid();

        $paymentsByType = $preOrder->payments()
            ->selectRaw('payment_type, sum(amount) as total, count(*) as count')
            ->groupBy('payment_type')
            ->pluck('total', 'payment_type');

        $paymentSummary = [
            'total_paid' => round((float) $totalPaid, 2),
            'deposit' => round((float) ($paymentsByType['deposit'] ?? 0), 2),
            'partial' => round((float) ($paymentsByType['partial'] ?? 0), 2),
            'full' => round((float) ($paymentsByType['full'] ?? 0), 2),
            'refund' => round((float) ($paymentsByType['refund'] ?? 0), 2),
            'payment_count' => $preOrder->payments()->count(),
            'completed_count' => $preOrder->payments()->where('status', 'completed')->count(),
        ];

        return Inertia::render('admin/pre-orders/show', [
            'preOrder' => $preOrder,
            'totalPaid' => $totalPaid,
            'paymentSummary' => $paymentSummary,
        ]);
    }

    public function addPayment(Request $request, PreOrder $preOrder)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'payment_type' => 'required|in:deposit,partial,full,refund',
            'payment_method' => 'nullable|string|max:255',
            'reference' => 'nullable|string|max:255',
            'payment_date' => 'required|date',
            'status' => 'required|in:completed,pending,refunded,failed',
            'notes' => 'nullable|string',
        ]);

        $validated['pre_order_id'] = $preOrder->id;
        $validated['created_by'] = auth()->id();

        PreOrderPayment::create($validated);

        return redirect()->route('admin.pre-orders.show', $preOrder->id)
            ->with('success', 'Payment added successfully.');
    }

    public function deletePayment(PreOrder $preOrder, $paymentId)
    {
        $payment = PreOrderPayment::where('pre_order_id', $preOrder->id)
            ->findOrFail($paymentId);
        $payment->delete();

        return redirect()->route('admin.pre-orders.show', $preOrder->id)
            ->with('success', 'Payment removed.');
    }

    public function edit(PreOrder $preOrder)
    {
        $makes = CarMake::with('models')->orderBy('name')->get();
        $listings = CarListing::with(['make:id,name', 'model:id,name'])
            ->where('status', 'coming_soon')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($l) => [
                'id' => $l->id,
                'label' => ($l->make->name ?? '?').' '.($l->model->name ?? '?').' ('.$l->year.') - '.$l->status,
            ]);

        $preOrder->load(['listing', 'make', 'model']);

        return Inertia::render('admin/pre-orders/edit', [
            'preOrder' => $preOrder,
            'makes' => $makes,
            'listings' => $listings,
        ]);
    }

    public function update(Request $request, PreOrder $preOrder)
    {
        $validated = $request->validate([
            'listing_id' => 'nullable|exists:car_listings,id',
            'make_id' => 'nullable|exists:car_makes,id|required_without:listing_id',
            'model_id' => 'nullable|exists:car_models,id|required_without:listing_id',
            'customer_id' => 'nullable|exists:users,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'quantity' => 'required|integer|min:1',
            'color' => 'nullable|string|max:100',
            'interior_color' => 'nullable|string|max:100',
            'trim_level' => 'nullable|string|max:100',
            'engine_preference' => 'nullable|string|max:100',
            'transmission_preference' => 'nullable|string|max:100',
            'drivetrain_preference' => 'nullable|string|max:100',
            'fuel_type' => 'nullable|string|max:100',
            'year_min' => 'nullable|integer|min:1900|max:2100',
            'year_max' => 'nullable|integer|min:1900|max:2100',
            'mileage_max' => 'nullable|integer|min:0',
            'total_price' => 'nullable|numeric|min:0',
            'budget_min' => 'nullable|numeric|min:0',
            'budget_max' => 'nullable|numeric|min:0',
            'source' => 'nullable|string|max:255',
            'preferred_contact' => 'nullable|string|max:50',
            'status' => 'required|in:pending,confirmed,fulfilled,cancelled',
            'notes' => 'nullable|string',
            'internal_notes' => 'nullable|string',
            'special_requests' => 'nullable|string',
        ]);

        if (empty($validated['customer_id'])) {
            $user = User::where('email', $validated['customer_email'])->first();
            if ($user) {
                $validated['customer_id'] = $user->id;
            }
        }

        if (! empty($validated['listing_id']) && $validated['listing_id'] !== $preOrder->listing_id) {
            $hasOrders = Order::whereHas('items', fn ($q) => $q->where('listing_id', $validated['listing_id']))->exists();
            if ($hasOrders) {
                return redirect()->back()->with('error', 'Cannot assign this vehicle — it already has an order.')->withInput();
            }
        }

        $preOrder->update($validated);

        return redirect()->route('admin.pre-orders.index')
            ->with('success', 'Pre-order updated successfully.');
    }

    public function destroy(PreOrder $preOrder)
    {
        $preOrder->delete();

        return redirect()->route('admin.pre-orders.index')
            ->with('success', 'Pre-order deleted successfully.');
    }
}

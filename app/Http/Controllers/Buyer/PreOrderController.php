<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\CarListing;
use App\Models\CarMake;
use App\Models\Order;
use App\Models\PreOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreOrderController extends Controller
{
    public function index()
    {
        $preOrders = PreOrder::with([
            'listing.make:id,name',
            'listing.model:id,name',
            'make:id,name',
            'model:id,name',
        ])
            ->where('customer_id', auth()->id())
            ->orWhere('customer_email', auth()->user()->email)
            ->latest()
            ->paginate(15);

        return Inertia::render('buyer/pre-orders/index', [
            'preOrders' => $preOrders,
        ]);
    }

    public function create()
    {
        $makes = CarMake::with('models')->orderBy('name')->get();
        $listings = CarListing::with(['make:id,name', 'model:id,name', 'primaryImage'])
            ->whereIn('status', ['in_stock', 'coming_soon'])
            ->orderByRaw("CASE status WHEN 'in_stock' THEN 0 WHEN 'coming_soon' THEN 1 ELSE 2 END")
            ->latest('created_at')
            ->get()
            ->map(fn ($l) => [
                'id' => $l->id,
                'label' => ($l->make->name ?? '?').' '.($l->model->name ?? '?').' ('.$l->year.')',
                'make' => $l->make->name ?? null,
                'model' => $l->model->name ?? null,
                'year' => $l->year,
                'price' => $l->price ?? $l->original_price ?? null,
                'mileage' => $l->mileage,
                'fuel_type' => $l->fuel_type,
                'transmission' => $l->transmission,
                'status' => $l->status,
                'image' => $l->primaryImage?->image_url ?? null,
            ]);

        return Inertia::render('buyer/pre-orders/create', [
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
            'budget_min' => 'nullable|numeric|min:0',
            'budget_max' => 'nullable|numeric|min:0',
            'source' => 'nullable|string|max:255',
            'preferred_contact' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
        ]);

        $validated['customer_id'] = auth()->id();
        $validated['created_by'] = auth()->id();
        $validated['status'] = 'pending';

        if (! empty($validated['listing_id'])) {
            $hasOrders = Order::whereHas('items', fn ($q) => $q->where('listing_id', $validated['listing_id']))->exists();
            if ($hasOrders) {
                return redirect()->back()->with('error', 'This vehicle already has an order and cannot be pre-ordered.')->withInput();
            }
        }

        PreOrder::create($validated);

        return redirect()->route('buyer.pre-orders.index')
            ->with('success', 'Pre-order placed successfully.');
    }

    public function show(PreOrder $preOrder)
    {
        if ($preOrder->customer_id !== auth()->id() && $preOrder->customer_email !== auth()->user()->email) {
            abort(403);
        }

        $preOrder->load([
            'listing.make:id,name',
            'listing.model:id,name',
            'listing.primaryImage',
            'make:id,name',
            'model:id,name',
            'payments' => fn ($q) => $q->latest(),
        ]);

        return Inertia::render('buyer/pre-orders/show', [
            'preOrder' => $preOrder,
        ]);
    }
}

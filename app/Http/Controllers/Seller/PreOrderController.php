<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\PreOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = PreOrder::whereHas('listing', fn ($q) => $q->where('seller_id', auth()->id()))
            ->with([
                'listing.make:id,name',
                'listing.model:id,name',
                'listing.primaryImage',
                'customer:id,full_name,email,phone',
            ]);

        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_email', 'like', "%{$search}%")
                    ->orWhere('customer_phone', 'like', "%{$search}%")
                    ->orWhere('source', 'like', "%{$search}%")
                    ->orWhereHas('listing.make', fn ($mq) => $mq->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('listing.model', fn ($mq) => $mq->where('name', 'like', "%{$search}%"));
            });
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $preOrders = $query->latest()->paginate(15);

        return Inertia::render('seller/pre-orders/index', [
            'preOrders' => $preOrders,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function show(PreOrder $preOrder)
    {
        if ($preOrder->listing && $preOrder->listing->seller_id !== auth()->id()) {
            abort(403);
        }

        $preOrder->load([
            'listing.make:id,name',
            'listing.model:id,name',
            'listing.primaryImage',
            'make:id,name',
            'model:id,name',
            'customer:id,full_name,email,phone',
            'payments',
        ]);

        $totalPaid = $preOrder->totalPaid();

        return Inertia::render('seller/pre-orders/show', [
            'preOrder' => $preOrder,
            'totalPaid' => $totalPaid,
        ]);
    }
}

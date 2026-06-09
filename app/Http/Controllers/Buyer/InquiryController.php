<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InquiryController extends Controller
{
    public function index(Request $request)
    {
        $query = Inquiry::with(['listing.make', 'listing.model', 'seller'])
            ->where('buyer_id', auth()->id());

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('seller', function ($bq) use ($request) {
                    $bq->where('full_name', 'like', "%{$request->search}%");
                })->orWhereHas('listing', function ($lq) use ($request) {
                    $lq->whereHas('make', function ($mq) use ($request) {
                        $mq->where('name', 'like', "%{$request->search}%");
                    })->orWhereHas('model', function ($mq) use ($request) {
                        $mq->where('name', 'like', "%{$request->search}%");
                    });
                })->orWhere('message', 'like', "%{$request->search}%");
            });
        }

        $inquiries = $query->latest('sent_at')->paginate(15);

        return Inertia::render('buyer/inquiries/index', [
            'inquiries' => $inquiries,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function show(string $id)
    {
        $inquiry = Inquiry::with(['listing.make', 'listing.model', 'listing.primaryImage', 'seller'])
            ->where('buyer_id', auth()->id())
            ->findOrFail($id);

        return Inertia::render('buyer/inquiries/show', [
            'inquiry' => $inquiry,
        ]);
    }
}

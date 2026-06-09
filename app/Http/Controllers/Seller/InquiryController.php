<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InquiryController extends Controller
{
    public function index(Request $request)
    {
        $query = Inquiry::with(['listing.make', 'listing.model', 'buyer'])
            ->where('seller_id', auth()->id());

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('buyer', function ($bq) use ($request) {
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

        return Inertia::render('seller/inquiries/index', [
            'inquiries' => $inquiries,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function show(string $id)
    {
        $inquiry = Inquiry::with(['listing.make', 'listing.model', 'listing.primaryImage', 'buyer'])
            ->where('seller_id', auth()->id())
            ->findOrFail($id);

        if ($inquiry->status === 'new') {
            $inquiry->update(['status' => 'read']);
        }

        return Inertia::render('seller/inquiries/show', [
            'inquiry' => $inquiry,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $inquiry = Inquiry::where('seller_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|in:new,read,replied,archived',
        ]);

        $inquiry->update($validated);

        return redirect()->back()->with('success', 'Inquiry status updated.');
    }
}

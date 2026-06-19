<?php

namespace App\Http\Controllers\Api;

use App\Models\CarListing;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InquiryController extends ApiController
{
    public function index()
    {
        $inquiries = Inquiry::with('listing.make', 'listing.model', 'buyer')
            ->where('seller_id', auth()->id())
            ->latest()
            ->paginate(15);

        return $this->success($inquiries);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'listing_id' => 'required|exists:car_listings,id',
            'message' => 'required|string|max:1000',
            'phone_number' => 'nullable|string|max:20',
            'preferred_contact' => 'nullable|in:email,phone,chat',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $listing = CarListing::findOrFail($request->listing_id);

        $inquiry = Inquiry::create([
            'listing_id' => $request->listing_id,
            'buyer_id' => auth()->id(),
            'seller_id' => $listing->seller_id,
            'message' => $request->message,
            'phone_number' => $request->phone_number,
            'preferred_contact' => $request->preferred_contact ?? 'email',
            'status' => 'new',
            'sent_at' => now(),
        ]);

        return $this->success($inquiry->load('listing.make', 'listing.model'), 'Inquiry sent', 201);
    }

    public function show(string $id)
    {
        $inquiry = Inquiry::with('listing.make', 'listing.model', 'buyer', 'seller')
            ->findOrFail($id);

        if ($inquiry->buyer_id !== auth()->id() && $inquiry->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        return $this->success($inquiry);
    }

    public function update(Request $request, string $id)
    {
        $inquiry = Inquiry::findOrFail($id);

        if ($inquiry->seller_id !== auth()->id()) {
            return $this->error('Unauthorized', 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:new,read,replied,archived',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $inquiry->update($validator->validated());

        return $this->success($inquiry, 'Inquiry updated');
    }
}

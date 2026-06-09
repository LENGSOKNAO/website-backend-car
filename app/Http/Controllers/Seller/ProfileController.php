<?php

namespace App\Http\Controllers\Seller;

use App\Helpers\FileStore;
use App\Http\Controllers\Controller;
use App\Models\SellerVerification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $user = auth()->user()->load('sellerVerification');

        return Inertia::render('seller/profile/index', [
            'user' => $user,
            'verification' => $user->sellerVerification,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'dealer_name' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        $user = auth()->user();
        $user->update($validated);

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }

    public function submitVerification(Request $request)
    {
        $validated = $request->validate([
            'id_type' => 'required|string|in:passport,drivers_license,national_id',
            'id_number' => 'required|string|max:255',
            'id_image' => 'nullable|image|max:4096',
            'business_license' => 'nullable|image|max:4096',
        ]);

        $user = auth()->user();

        $data = [
            'seller_id' => $user->id,
            'id_type' => $validated['id_type'],
            'id_number' => $validated['id_number'],
            'verification_status' => 'pending',
            'submitted_at' => now(),
        ];

        if ($request->hasFile('id_image')) {
            $data['id_image_url'] = FileStore::storeReturningPath('verifications', $request->file('id_image'));
        }

        if ($request->hasFile('business_license')) {
            $data['business_license_url'] = FileStore::storeReturningPath('verifications', $request->file('business_license'));
        }

        SellerVerification::updateOrCreate(
            ['seller_id' => $user->id],
            $data
        );

        return redirect()->back()->with('success', 'Verification documents submitted.');
    }
}

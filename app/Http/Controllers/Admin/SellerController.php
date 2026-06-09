<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');

        $sellers = User::with('roles')
            ->role('seller')
            ->when($search, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('dealer_name', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/sellers/index', [
            'sellers' => $sellers,
            'search' => $search,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/sellers/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:20',
            'dealer_name' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
        ]);

        $sellerRole = UserRole::firstOrCreate(
            ['name' => 'seller'],
            ['description' => 'Private seller listing cars for sale']
        );

        $user = User::create([
            'role_id' => $sellerRole->id,
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'phone' => $validated['phone'],
            'dealer_name' => $validated['dealer_name'],
            'location' => $validated['location'],
            'type' => 'customer',
            'is_dealer' => true,
            'is_verified' => true,
            'join_date' => now(),
            'last_active' => now(),
        ]);

        $user->assignRole('seller');

        return redirect()->route('admin.sellers.index')
            ->with('success', 'Seller created successfully.');
    }

    public function show(User $seller)
    {
        if (! $seller->hasRole('seller')) {
            abort(404);
        }

        return Inertia::render('admin/sellers/show', [
            'seller' => $seller,
        ]);
    }

    public function edit(User $seller)
    {
        if (! $seller->hasRole('seller')) {
            abort(404);
        }

        return Inertia::render('admin/sellers/edit', [
            'seller' => $seller,
        ]);
    }

    public function update(Request $request, User $seller)
    {
        if (! $seller->hasRole('seller')) {
            abort(404);
        }

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,'.$seller->id,
            'phone' => 'nullable|string|max:20',
            'dealer_name' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:8',
        ]);

        $seller->update([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? $seller->phone,
            'dealer_name' => $validated['dealer_name'],
            'location' => $validated['location'],
        ]);

        if (! empty($validated['password'])) {
            $seller->update(['password' => bcrypt($validated['password'])]);
        }

        return redirect()->route('admin.sellers.index')
            ->with('success', 'Seller updated successfully.');
    }

    public function destroy(User $seller)
    {
        if (! $seller->hasRole('seller')) {
            return redirect()->route('admin.sellers.index')
                ->with('error', 'Cannot delete this seller.');
        }

        $seller->delete();

        return redirect()->route('admin.sellers.index')
            ->with('success', 'Seller deleted successfully.');
    }
}

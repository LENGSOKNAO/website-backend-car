<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');

        $users = User::with('roles')
            ->customers()
            ->whereDoesntHave('roles', function ($q) {
                $q->where('name', 'seller');
            })
            ->when($search, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'search' => $search,
        ]);
    }

    public function show(User $user)
    {
        if ($user->type !== 'customer' || $user->hasRole('seller')) {
            abort(404);
        }

        return Inertia::render('admin/users/show', [
            'user' => $user->load('roles'),
        ]);
    }

    public function edit(User $user)
    {
        if ($user->type !== 'customer') {
            abort(404);
        }

        return Inertia::render('admin/users/edit', [
            'user' => $user->load('roles'),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,'.$user->id,
        ]);

        $user->update([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Customer updated successfully.');
    }

    public function destroy(User $user)
    {
        if ($user->hasRole('super-admin')) {
            return redirect()->route('admin.users.index')
                ->with('error', 'Cannot delete super admin.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'Customer deleted successfully.');
    }
}

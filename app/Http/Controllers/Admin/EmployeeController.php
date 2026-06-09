<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Role;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');

        $employees = User::with('roles')
            ->employees()
            ->when($search, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/employees/index', [
            'employees' => $employees,
            'search' => $search,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/employees/create', [
            'roles' => Role::whereIn('name', ['admin', 'staff'])->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|string|exists:roles,name',
            'phone' => 'nullable|string|max:20|unique:users,phone',
        ]);

        $adminRole = UserRole::firstOrCreate(
            ['name' => 'admin'],
            ['description' => 'Platform administrator']
        );

        try {
            $user = User::create([
                'role_id' => $adminRole->id,
                'full_name' => $validated['full_name'],
                'email' => $validated['email'],
                'password' => $validated['password'],
                'phone' => $validated['phone'],
                'type' => 'employee',
                'is_verified' => true,
                'join_date' => now(),
                'last_active' => now(),
            ]);
        } catch (QueryException $e) {
            if ($e->getCode() === '23505') {
                return back()->withErrors([
                    'phone' => 'This phone number is already in use.',
                ])->withInput();
            }
            throw $e;
        }

        $user->assignRole($validated['role']);

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employee created successfully.');
    }

    public function show(User $employee)
    {
        if ($employee->type !== 'employee') {
            abort(404);
        }

        return Inertia::render('admin/employees/show', [
            'employee' => $employee->load('roles'),
        ]);
    }

    public function edit(User $employee)
    {
        if ($employee->type !== 'employee') {
            abort(404);
        }

        return Inertia::render('admin/employees/edit', [
            'employee' => $employee->load('roles'),
            'roles' => Role::whereIn('name', ['admin', 'staff'])->get(),
        ]);
    }

    public function update(Request $request, User $employee)
    {
        if ($employee->type !== 'employee') {
            abort(404);
        }

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,'.$employee->id,
            'role' => 'required|string|exists:roles,name',
            'phone' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8',
        ]);

        $employee->update([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? $employee->phone,
        ]);

        if (! empty($validated['password'])) {
            $employee->update(['password' => bcrypt($validated['password'])]);
        }

        $employee->syncRoles([$validated['role']]);

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employee updated successfully.');
    }

    public function destroy(User $employee)
    {
        $employee->roles()->detach();
        $employee->delete();

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employee deleted successfully.');
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends ApiController
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        $roleFilter = $request->get('role');
        $typeFilter = $request->get('type');
        $perPage = min((int) $request->get('per_page', 10), 50);

        $users = User::with('roles')
            ->when($search, function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%");
                });
            })
            ->when($roleFilter, function ($q, $roleFilter) {
                $q->role($roleFilter);
            })
            ->when($typeFilter, function ($q, $typeFilter) {
                $q->where('type', $typeFilter);
            })
            ->latest()
            ->paginate($perPage);

        return $this->success($users);
    }

    public function show(User $user)
    {
        return $this->success($user->load('roles'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|string|exists:roles,name',
            'type' => 'required|string|in:employee,customer',
            'phone' => 'nullable|string|max:20|unique:users,phone',
            'location' => 'nullable|string|max:255',
            'dealer_name' => 'nullable|string|max:255',
            'is_verified' => 'boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $validated = (object) $validator->validated();

        $userRole = UserRole::firstOrCreate(
            ['name' => $validated->role],
            ['description' => ucfirst($validated->role) . ' role']
        );

        try {
            $user = User::create([
                'role_id' => $userRole->id,
                'full_name' => $validated->full_name,
                'email' => $validated->email,
                'password' => Hash::make($validated->password),
                'phone' => $validated->phone ?? null,
                'location' => $validated->location ?? null,
                'dealer_name' => $validated->dealer_name ?? null,
                'type' => $validated->type,
                'is_dealer' => $validated->role === 'seller',
                'is_verified' => $validated->is_verified ?? true,
                'join_date' => now(),
                'last_active' => now(),
            ]);
        } catch (QueryException $e) {
            if ($e->getCode() === '23505') {
                return $this->error('Phone number already in use', 422, [
                    'phone' => ['This phone number is already in use.'],
                ]);
            }
            throw $e;
        }

        $user->assignRole($validated->role);

        return $this->success($user->load('roles'), 'User created successfully', 201);
    }

    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
            'role' => 'sometimes|string|exists:roles,name',
            'phone' => 'nullable|string|max:20|unique:users,phone,' . $user->id,
            'location' => 'nullable|string|max:255',
            'dealer_name' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:8',
            'type' => 'sometimes|string|in:employee,customer',
            'is_verified' => 'sometimes|boolean',
            'is_dealer' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $validated = $validator->validated();

        $fillable = ['full_name', 'email', 'phone', 'location', 'dealer_name', 'type', 'is_verified', 'is_dealer'];
        $data = [];
        foreach ($fillable as $field) {
            if (array_key_exists($field, $validated)) {
                $data[$field] = $validated[$field];
            }
        }

        if (! empty($validated['password'] ?? null)) {
            $data['password'] = Hash::make($validated['password']);
        }

        $user->update($data);

        if (isset($validated['role'])) {
            $user->syncRoles([$validated['role']]);

            if ($validated['role'] === 'seller') {
                $user->update(['is_dealer' => true, 'type' => 'customer']);
            }
        }

        return $this->success($user->fresh()->load('roles'), 'User updated successfully');
    }

    public function destroy(User $user)
    {
        if ($user->hasRole('super-admin')) {
            return $this->error('Cannot delete super admin', 403);
        }

        $user->roles()->detach();
        $user->delete();

        return $this->success(null, 'User deleted successfully');
    }

    public function roles()
    {
        return $this->success(Role::all());
    }
}

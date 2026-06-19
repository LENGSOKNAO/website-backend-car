<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
class AuthController extends ApiController
{
    public function update(Request $request)
    {
        $user = auth('api')->user();

        $validator = Validator::make($request->all(), [
            'full_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20|unique:users,phone,' . $user->id,
            'avatar_url' => 'nullable|string|max:255',
            'dealer_name' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $fillable = $user->getFillable();
        foreach ($request->only($fillable) as $key => $value) {
            $user->$key = $value;
        }
        $user->save();

        return $this->success($user->fresh()->load('userRole'), 'Profile updated successfully');
    }

    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $user = auth('api')->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return $this->error('Current password is incorrect', 422);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return $this->success(null, 'Password updated successfully');
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $credentials = $request->only('email', 'password');

        if (! $token = auth('api')->attempt($credentials)) {
            return $this->error('Invalid credentials', 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $buyerRole = UserRole::firstOrCreate(
            ['name' => 'buyer'],
            ['description' => 'Buyer role']
        );

        $spatieRole = Role::firstOrCreate(['name' => 'buyer']);
        $user = User::create([
            'role_id' => $buyerRole?->id,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'is_verified' => false,
            'join_date' => now(),
            'last_active' => now(),
        ]);
        $user->assignRole($spatieRole);

        $token = auth('api')->login($user);

        return $this->success([
            'user' => $user->load('userRole'),
            'token' => $token,
            'token_type' => 'bearer',
        ], 'User registered successfully', 201);
    }

    public function me()
    {
        return $this->success(auth('api')->user()->load('userRole'));
    }

    public function logout()
    {
        auth('api')->logout();

        return $this->success(null, 'Successfully logged out');
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        try {
            $status = Password::sendResetLink(
                $request->only('email')
            );

            return $status === Password::RESET_LINK_SENT
                ? $this->success(null, 'Password reset link sent to your email')
                : $this->error('Unable to send reset link', 400);
        } catch (\Throwable $e) {
            return $this->error($e->getMessage(), 500);
        }
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation failed', 422, $validator->errors());
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? $this->success(null, 'Password reset successfully')
            : $this->error('Invalid or expired reset token', 400);
    }

    protected function respondWithToken(string $token): JsonResponse
    {
        return response()->json([
            'success' => true,
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl', 60) * 60,
            'user' => auth('api')->user()->load('userRole'),
        ]);
    }
}

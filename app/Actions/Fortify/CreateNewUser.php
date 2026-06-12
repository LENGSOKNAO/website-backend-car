<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use App\Models\Role;
use App\Models\UserRole;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
            'role' => ['required', Rule::in(['buyer', 'seller'])],
        ])->validate();

        $role = UserRole::firstOrCreate(
            ['name' => $input['role']],
            ['description' => ucfirst($input['role']) . ' role']
        );

        $user = User::create([
            'role_id' => $role?->id,
            'full_name' => $input['full_name'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);

        $spatieRole = Role::firstOrCreate(['name' => $input['role']]);
        $user->assignRole($spatieRole);

        return $user;
    }
}

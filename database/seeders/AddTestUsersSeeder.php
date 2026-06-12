<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Seeder;

class AddTestUsersSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            'buyer' => UserRole::firstOrCreate(['name' => 'buyer'], ['description' => 'Buyer role']),
            'seller' => UserRole::firstOrCreate(['name' => 'seller'], ['description' => 'Seller role']),
        ];

        Role::firstOrCreate(['name' => 'buyer']);
        Role::firstOrCreate(['name' => 'seller']);

        $users = [
            // 10 buyers
            ['full_name' => 'Alice Johnson', 'email' => 'alice@test.com', 'role' => 'buyer'],
            ['full_name' => 'Bob Williams', 'email' => 'bob@test.com', 'role' => 'buyer'],
            ['full_name' => 'Carol Brown', 'email' => 'carol@test.com', 'role' => 'buyer'],
            ['full_name' => 'Dave Miller', 'email' => 'dave@test.com', 'role' => 'buyer'],
            ['full_name' => 'Eve Davis', 'email' => 'eve@test.com', 'role' => 'buyer'],
            ['full_name' => 'Frank Garcia', 'email' => 'frank@test.com', 'role' => 'buyer'],
            ['full_name' => 'Grace Martinez', 'email' => 'grace@test.com', 'role' => 'buyer'],
            ['full_name' => 'Hank Robinson', 'email' => 'hank@test.com', 'role' => 'buyer'],
            ['full_name' => 'Ivy Clark', 'email' => 'ivy@test.com', 'role' => 'buyer'],
            ['full_name' => 'Jack Lewis', 'email' => 'jack@test.com', 'role' => 'buyer'],
            // 10 sellers
            ['full_name' => 'Karen Walker', 'email' => 'karen@test.com', 'role' => 'seller', 'is_dealer' => true, 'dealer_name' => 'Karen Auto Sales'],
            ['full_name' => 'Leo Hall', 'email' => 'leo@test.com', 'role' => 'seller', 'is_dealer' => true, 'dealer_name' => 'Leo Motors'],
            ['full_name' => 'Mia Allen', 'email' => 'mia@test.com', 'role' => 'seller', 'is_dealer' => true, 'dealer_name' => 'Mia Dealership'],
            ['full_name' => 'Noah Young', 'email' => 'noah@test.com', 'role' => 'seller'],
            ['full_name' => 'Olivia King', 'email' => 'olivia@test.com', 'role' => 'seller'],
            ['full_name' => 'Paul Wright', 'email' => 'paul@test.com', 'role' => 'seller'],
            ['full_name' => 'Quinn Lopez', 'email' => 'quinn@test.com', 'role' => 'seller', 'is_dealer' => true, 'dealer_name' => 'Quinn Cars'],
            ['full_name' => 'Rachel Hill', 'email' => 'rachel@test.com', 'role' => 'seller'],
            ['full_name' => 'Sam Scott', 'email' => 'sam@test.com', 'role' => 'seller'],
            ['full_name' => 'Tina Green', 'email' => 'tina@test.com', 'role' => 'seller'],
        ];

        foreach ($users as $data) {
            $role = $data['role'];
            $userRole = $roles[$role];
            $spatieRole = Role::where('name', $role)->first();

            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'role_id' => $userRole->id,
                    'full_name' => $data['full_name'],
                    'type' => $role === 'seller' ? 'customer' : 'customer',
                    'phone' => fake()->unique()->phoneNumber(),
                    'password' => bcrypt('password'),
                    'is_verified' => true,
                    'is_dealer' => $data['is_dealer'] ?? false,
                    'dealer_name' => $data['dealer_name'] ?? null,
                    'location' => fake()->city() . ', ' . fake()->state(),
                    'join_date' => now(),
                    'last_active' => now(),
                ]
            );

            if ($spatieRole) {
                $user->assignRole($spatieRole);
            }
        }

        $this->command->info('20 test users added (10 buyers, 10 sellers). Password for all: password');
    }
}

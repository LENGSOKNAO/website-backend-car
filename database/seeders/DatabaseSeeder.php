<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
            CategorySeeder::class,
            UserRoleSeeder::class,
            CarAttributeSeeder::class,
        ]);

        $adminRole = UserRole::where('name', 'admin')->first();
        $sellerRole = UserRole::where('name', 'seller')->first();
        $buyerRole = UserRole::where('name', 'buyer')->first();

        User::firstOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'full_name' => 'Super Admin',
                'role_id' => $adminRole->id,
                'type' => 'employee',
                'password' => bcrypt('password'),
            ]
        )->assignRole('super-admin');

        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'full_name' => 'Admin User',
                'role_id' => $adminRole->id,
                'type' => 'employee',
                'password' => bcrypt('password'),
            ]
        )->assignRole('admin');

        User::firstOrCreate(
            ['email' => 'staff@example.com'],
            [
                'full_name' => 'Staff Member',
                'role_id' => $adminRole->id,
                'type' => 'employee',
                'password' => bcrypt('password'),
            ]
        )->assignRole('staff');

        User::firstOrCreate(
            ['email' => 'seller@example.com'],
            [
                'full_name' => 'Seller User',
                'role_id' => $sellerRole->id,
                'type' => 'customer',
                'is_dealer' => true,
                'dealer_name' => 'Premium Auto Sales',
                'password' => bcrypt('password'),
            ]
        )->assignRole('seller');

        User::firstOrCreate(
            ['email' => 'buyer@example.com'],
            [
                'full_name' => 'Buyer User',
                'role_id' => $buyerRole->id,
                'type' => 'customer',
                'password' => bcrypt('password'),
            ]
        )->assignRole('buyer');

        User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'full_name' => 'Regular User',
                'role_id' => $buyerRole->id,
                'type' => 'customer',
                'password' => bcrypt('password'),
            ]
        )->assignRole('buyer');

        $this->call([
            CarListingSeeder::class,
            OrderSeeder::class,
            MessageSeeder::class,
            ListingImageSeeder::class,
            VehicleHistorySeeder::class,
            WarrantySeeder::class,
            ServiceAppointmentSeeder::class,
            PreOrderSeeder::class,
        ]);
    }
}

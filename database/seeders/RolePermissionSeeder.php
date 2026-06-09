<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Employee permissions
        Permission::firstOrCreate(['name' => 'view dashboard']);
        Permission::firstOrCreate(['name' => 'manage users']);
        Permission::firstOrCreate(['name' => 'manage employees']);
        Permission::firstOrCreate(['name' => 'manage cars']);
        Permission::firstOrCreate(['name' => 'manage categories']);
        Permission::firstOrCreate(['name' => 'view inventory']);
        Permission::firstOrCreate(['name' => 'manage own cars']);
        Permission::firstOrCreate(['name' => 'view customers']);
        Permission::firstOrCreate(['name' => 'manage inquiries']);
        Permission::firstOrCreate(['name' => 'view reports']);
        Permission::firstOrCreate(['name' => 'manage settings']);

        // Employee roles
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin']);
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $staff = Role::firstOrCreate(['name' => 'staff']);

        // Customer roles
        $seller = Role::firstOrCreate(['name' => 'seller']);
        $buyer = Role::firstOrCreate(['name' => 'buyer']);

        // Super-admin gets everything
        $superAdmin->givePermissionTo(Permission::all());

        // Admin gets full management permissions
        $admin->givePermissionTo([
            'view dashboard',
            'manage users',
            'manage employees',
            'manage cars',
            'manage categories',
            'view inventory',
            'view customers',
            'manage inquiries',
            'view reports',
            'manage settings',
        ]);

        // Staff gets operational permissions
        $staff->givePermissionTo([
            'view dashboard',
            'manage cars',
            'view inventory',
            'view customers',
            'manage inquiries',
        ]);

        // Seller can manage their own listings
        $seller->givePermissionTo([
            'view dashboard',
            'manage own cars',
        ]);

        // Buyer just browses
        $buyer->givePermissionTo([
            'view dashboard',
        ]);
    }
}

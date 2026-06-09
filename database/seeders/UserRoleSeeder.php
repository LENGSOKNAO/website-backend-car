<?php

namespace Database\Seeders;

use App\Models\UserRole;
use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'buyer', 'description' => 'Regular buyer browsing and purchasing cars'],
            ['name' => 'seller', 'description' => 'Private seller listing cars for sale'],
            ['name' => 'dealer', 'description' => 'Professional car dealer'],
            ['name' => 'admin', 'description' => 'Platform administrator'],
        ];

        foreach ($roles as $role) {
            UserRole::create($role);
        }
    }
}

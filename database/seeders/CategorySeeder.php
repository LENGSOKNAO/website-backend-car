<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Sedan', 'slug' => 'sedan', 'description' => 'Four-door passenger cars'],
            ['name' => 'SUV', 'slug' => 'suv', 'description' => 'Sport utility vehicles'],
            ['name' => 'Truck', 'slug' => 'truck', 'description' => 'Pickup trucks and light trucks'],
            ['name' => 'Coupe', 'slug' => 'coupe', 'description' => 'Two-door cars'],
            ['name' => 'Convertible', 'slug' => 'convertible', 'description' => 'Cars with retractable roofs'],
            ['name' => 'Hatchback', 'slug' => 'hatchback', 'description' => 'Cars with rear door that swings upward'],
            ['name' => 'Minivan', 'slug' => 'minivan', 'description' => 'Multi-passenger vans'],
            ['name' => 'Electric', 'slug' => 'electric', 'description' => 'Electric and hybrid vehicles'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}

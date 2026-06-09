<?php

namespace Database\Seeders;

use App\Models\Condition;
use App\Models\FuelType;
use App\Models\Transmission;
use Illuminate\Database\Seeder;

class CarAttributeSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['New', 'Used', 'Certified Pre-Owned'] as $name) {
            Condition::firstOrCreate(['name' => $name]);
        }

        foreach (['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid'] as $name) {
            FuelType::firstOrCreate(['name' => $name]);
        }

        foreach (['Automatic', 'Manual', 'CVT', 'Semi-Automatic'] as $name) {
            Transmission::firstOrCreate(['name' => $name]);
        }
    }
}

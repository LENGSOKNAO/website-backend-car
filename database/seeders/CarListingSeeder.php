<?php

namespace Database\Seeders;

use App\Models\CarListing;
use App\Models\CarMake;
use App\Models\CarModel;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class CarListingSeeder extends Seeder
{
    public function run(): void
    {
        $makes = [
            'Toyota' => ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma'],
            'Honda' => ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'],
            'BMW' => ['3 Series', '5 Series', 'X3', 'X5', 'M4'],
            'Mercedes-Benz' => ['C-Class', 'E-Class', 'GLC', 'GLE', 'A-Class'],
            'Ford' => ['Mustang', 'F-150', 'Explorer', 'Escape', 'Bronco'],
            'Tesla' => ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'],
        ];

        $categories = Category::all();
        $sellers = User::role('seller')->get();

        $carMakeModels = [];
        foreach ($makes as $makeName => $modelNames) {
            $make = CarMake::create(['name' => $makeName]);
            foreach ($modelNames as $modelName) {
                $model = CarModel::create([
                    'make_id' => $make->id,
                    'name' => $modelName,
                    'start_year' => 2015,
                    'end_year' => 2025,
                ]);
                $carMakeModels[] = ['make' => $make, 'model' => $model];
            }
        }

        $fuelTypes = ['gasoline', 'diesel', 'electric', 'hybrid'];
        $transmissions = ['automatic', 'manual', 'cvt'];
        $colors = ['Black', 'White', 'Silver', 'Blue', 'Red', 'Gray', 'Green', 'Navy'];
        $statuses = ['in_stock', 'in_stock', 'in_stock', 'out_of_stock', 'out_of_stock', 'coming_soon', 'coming_soon'];
        $conditions = ['used', 'used', 'used', 'new', 'certified'];

        for ($i = 0; $i < 50; $i++) {
            $entry = $carMakeModels[array_rand($carMakeModels)];
            $seller = $sellers->random();
            $category = $categories->random();
            $status = $statuses[array_rand($statuses)];

            CarListing::create([
                'seller_id' => $seller->id,
                'make_id' => $entry['make']->id,
                'model_id' => $entry['model']->id,
                'category_id' => $category->id,
                'year' => rand(2018, 2025),
                'price' => rand(15000, 80000),
                'original_price' => rand(18000, 90000),
                'mileage' => rand(5000, 120000),
                'fuel_type' => $fuelTypes[array_rand($fuelTypes)],
                'transmission' => $transmissions[array_rand($transmissions)],
                'engine_size' => ['2.0L', '2.5L', '3.0L', '3.5L', 'Electric'][array_rand([0, 1, 2, 3, 4])],
                'color' => $colors[array_rand($colors)],
                'interior_color' => $colors[array_rand($colors)],
                'condition' => $conditions[array_rand($conditions)],
                'number_of_owners' => rand(1, 4),
                'vin' => strtoupper(substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 17)),
                'license_plate' => strtoupper(substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 7)),
                'description' => "Well-maintained {$entry['make']->name} {$entry['model']->name} in {$colors[array_rand($colors)]}. Great condition, regularly serviced. Perfect for daily commute or family use.",
                'location' => ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Miami, FL'][array_rand([0, 1, 2, 3, 4])],
                'views_count' => rand(10, 500),
                'status' => $status,
                'total' => $status === 'in_stock' ? rand(1, 3) : 0,
                'expires_at' => now()->addDays(rand(10, 60)),
                'expected_arrival' => $status === 'coming_soon' ? now()->addDays(rand(14, 60)) : null,
            ]);
        }
    }
}

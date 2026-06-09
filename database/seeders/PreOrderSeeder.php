<?php

namespace Database\Seeders;

use App\Models\CarListing;
use App\Models\CarMake;
use App\Models\CarModel;
use App\Models\PreOrder;
use App\Models\User;
use Illuminate\Database\Seeder;

class PreOrderSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::role('admin')->first() ?? User::first();
        $buyer = User::role('buyer')->first() ?? User::skip(1)->first();

        $listings = CarListing::with(['make', 'model'])
            ->where('status', 'coming_soon')
            ->get();

        $makes = CarMake::all();
        $models = CarModel::all();

        $preOrders = [
            [
                'listing_id' => $listings->first()?->id,
                'make_id' => null,
                'model_id' => null,
                'customer_name' => 'Alice Johnson',
                'customer_email' => 'alice@example.com',
                'customer_phone' => '(555) 123-4567',
                'quantity' => 1,
                'color' => 'Black',
                'interior_color' => 'Black Leather',
                'trim_level' => 'Limited',
                'engine_preference' => 'V6',
                'transmission_preference' => 'automatic',
                'drivetrain_preference' => 'awd',
                'fuel_type' => 'gasoline',
                'year_min' => 2025,
                'year_max' => 2026,
                'mileage_max' => null,
                'total_price' => 35000,
                'budget_min' => 25000,
                'budget_max' => 35000,
                'source' => 'website',
                'preferred_contact' => 'email',
                'status' => 'confirmed',
                'notes' => 'Would like the black color option if available.',
                'internal_notes' => 'Alice has been a repeat customer. Offer VIP treatment.',
                'special_requests' => 'Please include all-weather floor mats and roof rails.',
                'customer_id' => $buyer?->id,
                'created_by' => $admin?->id,
            ],
            [
                'listing_id' => null,
                'make_id' => $makes->first()?->id,
                'model_id' => $models->first()?->id,
                'customer_name' => 'Bob Smith',
                'customer_email' => 'bob@example.com',
                'customer_phone' => '(555) 987-6543',
                'quantity' => 2,
                'color' => 'White',
                'interior_color' => null,
                'trim_level' => 'XLE',
                'engine_preference' => 'Hybrid',
                'transmission_preference' => 'cvt',
                'drivetrain_preference' => 'fwd',
                'fuel_type' => 'hybrid',
                'year_min' => null,
                'year_max' => null,
                'mileage_max' => null,
                'budget_min' => 40000,
                'budget_max' => 60000,
                'source' => 'referral',
                'preferred_contact' => 'phone',
                'status' => 'pending',
                'notes' => 'Interested in the new model year. Please notify when available.',
                'internal_notes' => null,
                'special_requests' => null,
                'customer_id' => null,
                'created_by' => $admin?->id,
            ],
            [
                'listing_id' => $listings->skip(1)->first()?->id,
                'make_id' => null,
                'model_id' => null,
                'customer_name' => 'Carol Davis',
                'customer_email' => 'carol@example.com',
                'customer_phone' => null,
                'quantity' => 1,
                'color' => 'Silver',
                'interior_color' => 'Gray Cloth',
                'trim_level' => 'SE',
                'engine_preference' => 'V4',
                'transmission_preference' => 'automatic',
                'drivetrain_preference' => null,
                'fuel_type' => 'gasoline',
                'year_min' => 2024,
                'year_max' => 2025,
                'mileage_max' => 20000,
                'total_price' => 28000,
                'budget_min' => null,
                'budget_max' => 30000,
                'source' => 'walk-in',
                'preferred_contact' => 'email',
                'status' => 'fulfilled',
                'notes' => null,
                'internal_notes' => 'Carol preferred cash payment. No trade-in.',
                'special_requests' => null,
                'customer_id' => null,
                'created_by' => $admin?->id,
            ],
            [
                'listing_id' => null,
                'make_id' => $makes->skip(1)->first()?->id,
                'model_id' => $models->skip(1)->first()?->id,
                'customer_name' => 'David Wilson',
                'customer_email' => 'david@example.com',
                'customer_phone' => '(555) 555-5555',
                'quantity' => 1,
                'color' => 'Blue',
                'interior_color' => null,
                'trim_level' => null,
                'engine_preference' => 'Electric',
                'transmission_preference' => 'automatic',
                'drivetrain_preference' => 'awd',
                'fuel_type' => 'electric',
                'year_min' => 2026,
                'year_max' => null,
                'mileage_max' => null,
                'budget_min' => null,
                'budget_max' => null,
                'source' => 'social_media',
                'preferred_contact' => 'text',
                'status' => 'pending',
                'notes' => 'Prefer financing. Please contact me with options.',
                'internal_notes' => null,
                'special_requests' => 'Would like to inspect the vehicle before purchase.',
                'customer_id' => null,
                'created_by' => $admin?->id,
            ],
            [
                'listing_id' => $listings->last()?->id,
                'make_id' => null,
                'model_id' => null,
                'customer_name' => 'Eve Martin',
                'customer_email' => 'eve@example.com',
                'customer_phone' => '(555) 321-7654',
                'quantity' => 1,
                'color' => null,
                'interior_color' => null,
                'trim_level' => null,
                'engine_preference' => null,
                'transmission_preference' => null,
                'drivetrain_preference' => null,
                'fuel_type' => null,
                'year_min' => null,
                'year_max' => null,
                'mileage_max' => null,
                'budget_min' => null,
                'budget_max' => null,
                'source' => 'website',
                'preferred_contact' => 'email',
                'status' => 'cancelled',
                'notes' => 'Changed mind, will look at other options.',
                'internal_notes' => null,
                'special_requests' => null,
                'customer_id' => null,
                'created_by' => $admin?->id,
            ],
        ];

        foreach ($preOrders as $order) {
            $preOrder = PreOrder::create($order);

            if ($preOrder->status === 'confirmed') {
                $preOrder->payments()->create([
                    'amount' => 500.00,
                    'payment_type' => 'deposit',
                    'payment_method' => 'credit_card',
                    'reference' => 'CH-DEP-'.strtoupper(substr($preOrder->id, 0, 6)),
                    'payment_date' => now()->subDays(5),
                    'status' => 'completed',
                    'notes' => 'Initial deposit to reserve vehicle.',
                    'created_by' => $admin?->id,
                ]);
            } elseif ($preOrder->status === 'fulfilled') {
                $preOrder->payments()->create([
                    'amount' => 1000.00,
                    'payment_type' => 'deposit',
                    'payment_method' => 'bank_transfer',
                    'reference' => 'DEP-'.strtoupper(substr($preOrder->id, 0, 6)),
                    'payment_date' => now()->subDays(20),
                    'status' => 'completed',
                    'notes' => 'Deposit paid.',
                    'created_by' => $admin?->id,
                ]);
                $preOrder->payments()->create([
                    'amount' => 8500.00,
                    'payment_type' => 'full',
                    'payment_method' => 'bank_transfer',
                    'reference' => 'FULL-'.strtoupper(substr($preOrder->id, 0, 6)),
                    'payment_date' => now()->subDays(2),
                    'status' => 'completed',
                    'notes' => 'Remaining balance paid upon arrival.',
                    'created_by' => $admin?->id,
                ]);
            }
        }

        $this->command->info('Seeded '.count($preOrders).' pre-orders with payments.');
    }
}

<?php

namespace Database\Seeders;

use App\Models\CarListing;
use App\Models\Order;
use App\Models\Warranty;
use Illuminate\Database\Seeder;

class WarrantySeeder extends Seeder
{
    public function run(): void
    {
        $orders = Order::whereIn('status', ['confirmed', 'completed', 'processing'])->get();

        if ($orders->isEmpty()) {
            $this->command->warn('No confirmed/completed orders found. Skipping WarrantySeeder.');

            return;
        }

        $warrantyTypes = [
            'powertrain' => ['Powertrain Limited Warranty', 'Covers engine, transmission, and drivetrain components.', 60, 60000],
            'bumper_to_bumper' => ['Bumper-to-Bumper Warranty', 'Comprehensive coverage for most vehicle components.', 36, 36000],
            'extended' => ['Extended Service Contract', 'Additional coverage beyond factory warranty period.', 48, 48000],
            'certified' => ['Certified Pre-Owned Warranty', 'Factory-backed warranty for certified pre-owned vehicles.', 24, 24000],
        ];
        $statuses = ['active', 'active', 'active', 'expired', 'cancelled', 'claimed'];

        $warranties = [];
        foreach ($orders->random(min(20, $orders->count())) as $order) {
            $type = array_rand($warrantyTypes);
            [$name, $details, $months, $miles] = $warrantyTypes[$type];
            $status = $statuses[array_rand($statuses)];
            $startDate = $status === 'active' ? now()->subDays(rand(1, 365)) : now()->subDays(rand(366, 730));
            $endDate = (clone $startDate)->addMonths($months);

            if ($status === 'expired') {
                $endDate = now()->subDays(rand(1, 30));
            }

            $warranties[] = [
                'order_id' => $order->id,
                'listing_id' => $order->items->first()?->listing_id ?? CarListing::inRandomOrder()->first()?->id,
                'type' => $type,
                'name' => $name,
                'coverage_details' => $details,
                'duration_months' => $months,
                'duration_miles' => $miles,
                'price' => rand(999, 4999),
                'start_date' => $startDate,
                'end_date' => $endDate,
                'status' => $status,
            ];
        }

        foreach ($warranties as $data) {
            Warranty::firstOrCreate(
                ['order_id' => $data['order_id'], 'type' => $data['type']],
                $data
            );
        }

        $this->command->info('Seeded '.Warranty::count().' warranties.');
    }
}

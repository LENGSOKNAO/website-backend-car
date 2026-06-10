<?php

namespace Database\Seeders;

use App\Models\CarListing;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Transaction;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $listings = CarListing::where('status', 'in_stock')->get();

        if ($listings->isEmpty()) {
            $this->command->warn('No active listings found. Skipping OrderSeeder.');

            return;
        }

        $sellerRole = UserRole::where('name', 'seller')->first();
        $buyerRole = UserRole::where('name', 'buyer')->first();
        if (! $buyerRole || ! $sellerRole) {
            $this->command->error('Buyer/seller roles not found.');

            return;
        }

        $sellers = [];
        $sellerEmails = [
            'seller1@autodeals.com' => 'Premium Auto Sales',
            'seller2@autodeals.com' => 'City Motors Inc.',
            'seller3@autodeals.com' => 'Elite Car Traders',
            'seller4@autodeals.com' => 'Meridian Auto Group',
        ];
        foreach ($sellerEmails as $email => $dealerName) {
            $seller = User::firstOrCreate(
                ['email' => $email],
                [
                    'full_name' => explode('@', $email)[0],
                    'role_id' => $sellerRole->id,
                    'type' => 'customer',
                    'is_dealer' => true,
                    'dealer_name' => $dealerName,
                    'password' => bcrypt('password'),
                ]
            );
            if (! $seller->hasRole('seller')) {
                $seller->assignRole('seller');
            }
            $sellers[] = $seller;
        }

        $buyers = [];
        $buyerEmails = [
            'buyer1@example.com' => 'Alice Johnson',
            'buyer2@example.com' => 'Bob Smith',
            'buyer3@example.com' => 'Carol Williams',
            'buyer4@example.com' => 'David Brown',
            'buyer5@example.com' => 'Emma Davis',
        ];
        foreach ($buyerEmails as $email => $name) {
            $buyer = User::firstOrCreate(
                ['email' => $email],
                [
                    'full_name' => $name,
                    'role_id' => $buyerRole->id,
                    'type' => 'customer',
                    'password' => bcrypt('password'),
                ]
            );
            if (! $buyer->hasRole('buyer')) {
                $buyer->assignRole('buyer');
            }
            $buyers[] = $buyer;
        }

        $statuses = ['confirmed', 'completed', 'processing', 'cancelled'];
        $now = now();

        foreach (range(1, 24) as $i) {
            $listing = $listings->random();
            $seller = $sellers[array_rand($sellers)];
            $buyer = $buyers[array_rand($buyers)];
            $status = $statuses[array_rand($statuses)];
            $daysAgo = rand(1, 60);
            $placedAt = (clone $now)->subDays($daysAgo);

            $subtotal = max(1000, $listing->price - rand(100, 5000));
            $tax = round($subtotal * 0.08, 2);
            $fees = 499;
            $total = $subtotal + $tax + $fees;
            $completedAt = $status === 'completed' ? (clone $placedAt)->addDays(rand(1, 7)) : null;

            $orderNumber = 'ORD-'.now()->format('Ymd').'-'.str_pad((string) $i, 4, '0', STR_PAD_LEFT);
            $order = Order::firstOrCreate(
                ['order_number' => $orderNumber],
                [
                    'buyer_id' => $buyer->id,
                    'seller_id' => $seller->id,
                    'status' => $status,
                    'subtotal' => $subtotal,
                    'tax' => $tax,
                    'fees' => $fees,
                    'total' => $total,
                    'placed_at' => $placedAt,
                    'completed_at' => $completedAt,
                ]
            );

            OrderItem::firstOrCreate(
                ['order_id' => $order->id, 'listing_id' => $listing->id],
                [
                    'price' => $subtotal,
                    'condition' => $listing->condition,
                ]
            );

            Transaction::firstOrCreate(
                ['order_id' => $order->id, 'type' => 'payment'],
                [
                    'method' => collect(['credit_card', 'bank_transfer', 'financing', 'cash'])->random(),
                    'reference' => 'TXN-'.strtoupper(substr(uniqid(), -8)),
                    'amount' => $total,
                    'status' => in_array($status, ['completed', 'confirmed', 'processing']) ? 'completed' : 'refunded',
                    'processed_at' => in_array($status, ['completed', 'confirmed', 'processing'])
                        ? (clone $placedAt)->addHours(rand(1, 48))
                        : null,
                ]
            );
        }

        $this->command->info('Seeded '.Order::count().' demo orders across '.count($sellers).' sellers.');
    }
}

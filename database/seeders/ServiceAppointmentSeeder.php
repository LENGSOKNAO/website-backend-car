<?php

namespace Database\Seeders;

use App\Models\CarListing;
use App\Models\ServiceAppointment;
use App\Models\User;
use Illuminate\Database\Seeder;

class ServiceAppointmentSeeder extends Seeder
{
    public function run(): void
    {
        $customers = User::role('buyer')->get();
        $listings = CarListing::all();
        $staff = User::whereIn('type', ['employee'])->get();

        if ($customers->isEmpty() || $staff->isEmpty()) {
            $this->command->warn('Buyers or employees not found. Skipping ServiceAppointmentSeeder.');

            return;
        }

        $serviceTypes = ['maintenance', 'repair', 'inspection', 'recall'];
        $statuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
        $descriptions = [
            'maintenance' => ['Oil change and filter replacement', 'Tire rotation and balance', 'Brake pad replacement', 'Transmission fluid flush', 'Coolant system service'],
            'repair' => ['Check engine light diagnostic', 'AC compressor replacement', 'Battery replacement', 'Alternator repair', 'Suspension repair'],
            'inspection' => ['Annual vehicle inspection', 'Pre-trip inspection', 'State-mandated emissions test'],
            'recall' => ['Airbag control module recall fix', 'Fuel pump recall replacement', 'Software update recall'],
        ];

        $appointments = [];
        foreach (range(1, 25) as $i) {
            $customer = $customers->random();
            $listing = $listings->isNotEmpty() ? $listings->random() : null;
            $type = $serviceTypes[array_rand($serviceTypes)];
            $descList = $descriptions[$type];
            $status = $statuses[array_rand($statuses)];
            $dayOffset = $status === 'completed' ? rand(-60, -1) : rand(0, 30);
            $scheduledDate = now()->addDays($dayOffset);
            $assignedStaff = $status !== 'pending' ? $staff->random() : null;

            $appointments[] = [
                'customer_id' => $customer->id,
                'listing_id' => $listing?->id,
                'service_type' => $type,
                'description' => $descList[array_rand($descList)],
                'scheduled_date' => $scheduledDate,
                'scheduled_time' => now()->setTime(rand(8, 16), collect([0, 15, 30, 45])->random(), 0),
                'mileage' => rand(10000, 120000),
                'status' => $status,
                'technician_notes' => $status === 'completed' ? 'Service completed successfully.' : ($status === 'in_progress' ? 'Currently working on vehicle.' : null),
                'cost' => $status !== 'cancelled' ? rand(50, 1500) + 0.99 : null,
                'assigned_to' => $assignedStaff?->id,
                'completed_at' => $status === 'completed' ? (clone $scheduledDate)->addHours(rand(1, 8)) : null,
            ];
        }

        foreach ($appointments as $data) {
            ServiceAppointment::firstOrCreate(
                ['scheduled_date' => $data['scheduled_date'], 'listing_id' => $data['listing_id'], 'service_type' => $data['service_type']],
                $data
            );
        }

        $this->command->info('Seeded '.ServiceAppointment::count().' service appointments.');
    }
}

<?php

namespace Database\Seeders;

use App\Models\CarListing;
use App\Models\User;
use App\Models\VehicleHistory;
use Illuminate\Database\Seeder;

class VehicleHistorySeeder extends Seeder
{
    public function run(): void
    {
        $listings = CarListing::all();
        $users = User::whereIn('type', ['employee'])->get();

        if ($listings->isEmpty() || $users->isEmpty()) {
            $this->command->warn('Listings or employees not found. Skipping VehicleHistorySeeder.');

            return;
        }

        $reportTypes = ['inspection', 'carfax', 'autocheck', 'service_record'];
        $templates = [
            'inspection' => [
                'titles' => ['Pre-Purchase Inspection', 'Full Vehicle Inspection', 'Safety Inspection Report'],
                'summaries' => ['All systems checked and functioning properly.', 'Minor wear noted on brake pads. Overall good condition.', 'Vehicle passes safety inspection with no major issues.'],
            ],
            'carfax' => [
                'titles' => ['CARFAX Vehicle History Report', 'CARFAX Buyback Protection Report'],
                'summaries' => ['No accidents reported. Clean title. 2 previous owners.', 'Minor damage reported in 2021. Title status: clean.'],
            ],
            'autocheck' => [
                'titles' => ['AutoCheck Score Report', 'AutoCheck Vehicle History'],
                'summaries' => ['Vehicle scored 85/100. Above average for its class.', 'Clean history with regular service records.'],
            ],
            'service_record' => [
                'titles' => ['Complete Service History', 'Maintenance Records Summary'],
                'summaries' => ['Regular oil changes every 5,000 miles. Transmission serviced at 60,000 miles.', 'All scheduled maintenance completed at dealership.'],
            ],
        ];

        $histories = [];
        foreach ($listings->random(min(30, $listings->count())) as $listing) {
            $numReports = rand(1, 3);
            foreach (range(1, $numReports) as $j) {
                $type = $reportTypes[array_rand($reportTypes)];
                $template = $templates[$type];

                $histories[] = [
                    'listing_id' => $listing->id,
                    'report_type' => $type,
                    'title' => $template['titles'][array_rand($template['titles'])],
                    'file_url' => '/storage/vehicle-histories/'.$type.'_'.str_replace('-', '', $listing->id).'_'.$j.'.pdf',
                    'summary' => $template['summaries'][array_rand($template['summaries'])],
                    'report_date' => now()->subDays(rand(1, 180)),
                    'created_by' => $users->random()->id,
                ];
            }
        }

        foreach ($histories as $data) {
            VehicleHistory::firstOrCreate(
                ['listing_id' => $data['listing_id'], 'title' => $data['title'], 'report_date' => $data['report_date']],
                $data
            );
        }

        $this->command->info('Seeded '.VehicleHistory::count().' vehicle history reports.');
    }
}

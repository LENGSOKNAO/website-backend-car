<?php

namespace Database\Seeders;

use App\Models\CarListing;
use App\Models\ListingImage;
use Illuminate\Database\Seeder;

class ListingImageSeeder extends Seeder
{
    public function run(): void
    {
        $listings = CarListing::with('make', 'model')->get();

        foreach ($listings as $listing) {
            $slug = strtolower("{$listing->make->name}-{$listing->model->name}");

            ListingImage::create([
                'listing_id' => $listing->id,
                'image_url' => "https://loremflickr.com/800/600/{$slug},car/all",
                'is_primary' => true,
                'sort_order' => 0,
                'uploaded_at' => now(),
            ]);
        }

        $this->command->info('Created '.$listings->count().' listing images.');
    }
}

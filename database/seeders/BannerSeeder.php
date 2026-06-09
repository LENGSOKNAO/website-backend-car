<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        $banners = [
            // ── Sliders (Hero carousel) ──
            [
                'title' => 'Nissan GT-R',
                'subtitle' => 'Godzilla',
                'tagline' => 'Unleash the Beast',
                'description' => 'Experience the legendary performance of the Nissan GT-R. A masterpiece of Japanese engineering.',
                'image_url' => '/images/slider/gtr.jpg',
                'badge_text' => 'Limited Edition',
                'type' => 'slider',
                'sort_order' => 0,
                'is_active' => true,
            ],
            [
                'title' => 'Tesla Model 3',
                'subtitle' => 'Electric Performance',
                'tagline' => 'Drive the Future',
                'description' => 'The safest, quickest, and most efficient sedan ever built.',
                'image_url' => '/images/slider/tesla-model-3.jpg',
                'type' => 'slider',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'BMW X5',
                'subtitle' => 'The Ultimate',
                'tagline' => 'Sheer Driving Pleasure',
                'image_url' => '/images/slider/bmw-x5.jpg',
                'type' => 'slider',
                'sort_order' => 3,
                'is_active' => true,
            ],

            // ── Box Trips (3-column brand grid) ──
            [
                'title' => 'Tesla Powerwall',
                'tagline' => 'Home Energy Storage',
                'description' => 'Store solar energy for use at any time, providing backup power during outages and reducing reliance on the grid with seamless integration to your home\'s electrical system.',
                'image_url' => '/images/boxTrips/tesla-1.jpg',
                'button_text' => 'Offer Detail',
                'button_url' => '/listings?make=tesla&condition=used',
                'brand_slug' => 'tesla',
                'type' => 'boxTrips',
                'sort_order' => 0,
                'is_active' => true,
            ],
            [
                'title' => 'Tesla Solar Panels',
                'tagline' => 'Sustainable Energy Generation',
                'description' => 'Efficient, low-profile solar panels that convert sunlight into electricity, designed to integrate seamlessly with your roof while providing clean, renewable energy for your home.',
                'image_url' => '/images/boxTrips/tesla-2.jpg',
                'button_text' => 'Offer Detail',
                'button_url' => '/listings?make=tesla&condition=used',
                'brand_slug' => 'tesla',
                'type' => 'boxTrips',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Tesla Charging Network',
                'tagline' => 'Global Supercharger Access',
                'description' => 'The world\'s largest fast-charging network with over 45,000 Superchargers strategically located along major highways and convenient destinations for effortless long-distance travel.',
                'image_url' => '/images/boxTrips/tesla-3.jpg',
                'button_text' => 'Offer Detail',
                'button_url' => '/listings?make=tesla&condition=used',
                'brand_slug' => 'tesla',
                'type' => 'boxTrips',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'BMW',
                'tagline' => 'Ultimate Driving',
                'description' => 'Precision engineering meets luxury. Discover the joy of driving a BMW.',
                'image_url' => '/images/boxTrips/bmw.jpg',
                'button_text' => 'Offer Detail',
                'button_url' => '/listings?make=bmw&condition=used',
                'brand_slug' => 'bmw',
                'type' => 'boxTrips',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Porsche',
                'tagline' => 'Timeless Design',
                'description' => 'Every Porsche tells a story of passion, performance, and precision.',
                'image_url' => '/images/boxTrips/porsche.jpg',
                'button_text' => 'Offer Detail',
                'button_url' => '/listings?make=porsche&condition=used',
                'brand_slug' => 'porsche',
                'type' => 'boxTrips',
                'sort_order' => 4,
                'is_active' => true,
            ],

            // ── Box One (full-screen hero) ──
            [
                'title' => 'Tesla Model Y Performance',
                'tagline' => 'Electric SUV Excellence',
                'description' => 'Combining the versatility of an SUV with track-capable performance, the Model Y Performance offers dual-motor all-wheel drive and enhanced handling for an exhilarating driving experience.',
                'image_url' => '/images/boxOne/tesla.jpg',
                'button_text' => 'Order Now',
                'button_url' => '/listings?make=tesla',
                'brand_slug' => 'tesla',
                'type' => 'boxone',
                'sort_order' => 0,
                'is_active' => true,
            ],
            [
                'title' => 'Nissan GT-R',
                'tagline' => 'Legend Reborn',
                'description' => 'The iconic supercar that continues to dominate with raw power and precision.',
                'image_url' => '/images/boxOne/gtr.jpg',
                'button_text' => 'Order Now',
                'button_url' => '/listings?make=gtr',
                'brand_slug' => 'gtr',
                'type' => 'boxone',
                'sort_order' => 1,
                'is_active' => true,
            ],

            // ── Box Left (image left, text right) ──
            [
                'title' => 'Tesla Model 3 Performance',
                'tagline' => 'Track-Ready Electric Sedan',
                'description' => 'Performance upgrades including enhanced brakes, suspension, and wheels transform the Model 3 into a true driver\'s car while maintaining everyday practicality and efficiency.',
                'image_url' => '/images/boxLeft/tesla.jpg',
                'button_text' => 'Order Now',
                'button_url' => '/listings?make=tesla',
                'brand_slug' => 'tesla',
                'type' => 'boxLeft',
                'sort_order' => 0,
                'is_active' => true,
            ],

            // ── Box Right (text left, image right) ──
            [
                'title' => 'Tesla Model Y Long Range',
                'tagline' => 'Maximum Electric Range',
                'description' => 'Optimized for efficiency with an extended range battery and aerodynamic improvements, delivering exceptional real-world range for daily commutes and road trips alike.',
                'image_url' => '/images/boxRight/tesla.jpg',
                'button_text' => 'Order Now',
                'button_url' => '/listings?make=tesla',
                'brand_slug' => 'tesla',
                'type' => 'boxRight',
                'sort_order' => 0,
                'is_active' => true,
            ],
            [
                'title' => 'Nissan GT-R',
                'tagline' => 'Pure Performance',
                'description' => 'Experience the thrill of 565 horsepower. The GT-R continues to set benchmarks.',
                'image_url' => '/images/boxRight/gtr.jpg',
                'button_text' => 'Order Now',
                'button_url' => '/listings?make=gtr',
                'brand_slug' => 'gtr',
                'type' => 'boxRight',
                'sort_order' => 1,
                'is_active' => true,
            ],

            // ── Box Ten (horizontal carousel) ──
            [
                'title' => 'Tesla Full Self-Driving',
                'tagline' => 'Autonomous Driving Technology',
                'description' => 'Advanced driver assistance system that navigates urban streets, handles complex intersections, and parks automatically, continuously improving through over-the-air updates.',
                'image_url' => '/images/boxTen/tesla-1.jpg',
                'badge_text' => 'Best Seller',
                'brand_slug' => 'tesla',
                'type' => 'boxTen',
                'sort_order' => 0,
                'is_active' => true,
            ],
            [
                'title' => 'Tesla Safety Features',
                'tagline' => 'Industry-Leading Protection',
                'description' => 'Every Tesla is designed to be the safest vehicle in its class with innovative active safety features and a rigid passenger cell that has earned top safety ratings worldwide.',
                'image_url' => '/images/boxTen/tesla-2.jpg',
                'badge_text' => 'Top Rated',
                'brand_slug' => 'tesla',
                'type' => 'boxTen',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'BMW X5',
                'tagline' => 'Luxury SUV',
                'description' => 'Where luxury meets capability. The BMW X5 offers unmatched comfort.',
                'image_url' => '/images/boxTen/bmw-x5.jpg',
                'brand_slug' => 'bmw',
                'type' => 'boxTen',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Porsche 911',
                'tagline' => 'Iconic Sports Car',
                'description' => 'The sports car that defined a generation. Timeless design meets modern engineering.',
                'image_url' => '/images/boxTen/porsche-911.jpg',
                'brand_slug' => 'porsche',
                'type' => 'boxTen',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($banners as $banner) {
            Banner::create($banner);
        }
    }
}

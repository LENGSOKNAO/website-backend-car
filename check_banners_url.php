<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Banner;

$banners = Banner::select('id', 'image_url')->get();

foreach ($banners as $banner) {
    echo "Banner {$banner->id}: image_url = {$banner->image_url}" . PHP_EOL;
    // Check if it starts with http
    if (str_starts_with($banner->image_url, 'http')) {
        echo "  -> Starts with http, good\n";
    } else {
        echo "  -> Does NOT start with http, will be prefixed with storage URL\n";
    }
}
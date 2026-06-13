<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$count = App\Models\CarListing::count();
echo "Total listings: $count\n";

$seller = App\Models\User::where('email', 'seller@example.com')->first();
if ($seller) {
    $count = App\Models\CarListing::where('seller_id', $seller->id)->count();
    echo "Seller listings: $count\n";
}

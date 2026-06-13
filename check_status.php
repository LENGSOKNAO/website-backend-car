<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$statuses = App\Models\CarListing::select('status')->distinct()->pluck('status');
echo "Statuses: " . implode(', ', $statuses->toArray()) . "\n";

$counts = App\Models\CarListing::select('status')
    ->selectRaw('count(*) as count')
    ->groupBy('status')
    ->get();

foreach ($counts as $c) {
    echo "$c->status: $c->count\n";
}

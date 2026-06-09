<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

// Check if stored_files exists
$exists = DB::selectOne('SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = \'public\' AND table_name = \'stored_files\') as exists');
echo 'Table stored_files exists: ' . ($exists->exists ? 'yes' : 'no') . PHP_EOL;

if ($exists->exists) {
    // Get columns
    $columns = DB::select('SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_schema = \'public\' AND table_name = \'stored_files\' ORDER BY ordinal_position');
    echo 'Columns:' . PHP_EOL;
    foreach ($columns as $col) {
        echo ' - ' . $col->column_name . ': ' . $col->data_type . ' (nullable: ' . $col->is_nullable . ', default: ' . $col->column_default . ')' . PHP_EOL;
    }
    
    // Check row count
    $count = DB::table('stored_files')->count();
    echo 'Row count: ' . $count . PHP_EOL;
} else {
    echo 'Table does not exist.' . PHP_EOL;
}
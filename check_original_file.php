<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

// Check the original test file
$file = DB::table('stored_files')->where('id', '37892dd9-532d-4e5d-ad06-ba7e0b13735b')->first();
if ($file) {
    echo "Original test file:\n";
    echo "  ID: " . $file->id . "\n";
    echo "  Name: " . $file->original_name . "\n";
    echo "  MIME: " . $file->mime_type . "\n";
    echo "  Size: " . $file->size . "\n";
    
    $data = $file->data;
    if (is_resource($data)) {
        echo "  Data is a stream resource\n";
        $data = stream_get_contents($data);
        echo "  Data length after stream_get_contents: " . strlen($data) . "\n";
    } else {
        echo "  Data length: " . strlen($data) . "\n";
    }
    if (!empty($data)) {
        echo "  Data (first 20 bytes): " . bin2hex(substr($data, 0, 20)) . "\n";
    } else {
        echo "  Data is empty!\n";
    }
} else {
    echo "Original test file not found\n";
}
?>
<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\StoredFile;
use Illuminate\Support\Facades\DB;

// Get the file using Eloquent
$file = StoredFile::find('37892dd9-532d-4e5d-ad06-ba7e0b13735b');
if ($file) {
    echo "=== ELOQUENT FILE ===\n";
    echo "ID: " . $file->id . "\n";
    echo "Name: " . $file->original_name . "\n";
    echo "MIME: " . $file->mime_type . "\n";
    echo "Size: " . $file->size . "\n";
    echo "Data type: " . gettype($file->data) . "\n";
    
    if (is_resource($file->data)) {
        echo "Data is a stream resource\n";
        $data = stream_get_contents($file->data);
        echo "Data length after stream_get_contents: " . strlen($data) . "\n";
        if (!empty($data)) {
            echo "Data (first 20 bytes): " . bin2hex(substr($data, 0, 20)) . "\n";
        } else {
            echo "Data is empty after stream_get_contents\n";
        }
    } else {
        echo "Data is not a resource\n";
        echo "Data length: " . strlen($file->data) . "\n";
        if (!empty($file->data)) {
            echo "Data (first 20 bytes): " . bin2hex(substr($file->data, 0, 20)) . "\n";
        } else {
            echo "Data is empty\n";
        }
    }
    
    // Also check raw DB value
    echo "\n=== RAW DB VALUE ===\n";
    $raw = DB::table('stored_files')->where('id', '37892dd9-532d-4e5d-ad06-ba7e0b13735b')->first();
    if ($raw) {
        echo "Raw data type: " . gettype($raw->data) . "\n";
        if (is_resource($raw->data)) {
            echo "Raw data is a stream resource\n";
            $rawData = stream_get_contents($raw->data);
            echo "Raw data length: " . strlen($rawData) . "\n";
            if (!empty($rawData)) {
                echo "Raw data (first 20 bytes): " . bin2hex(substr($rawData, 0, 20)) . "\n";
            } else {
                echo "Raw data is empty\n";
            }
        } else {
            echo "Raw data is not a resource\n";
            echo "Raw data length: " . strlen($raw->data) . "\n";
            if (!empty($raw->data)) {
                echo "Raw data (first 20 bytes): " . bin2hex(substr($raw->data, 0, 20)) . "\n";
            } else {
                echo "Raw data is empty or null\n";
                echo "Is null: " . (is_null($raw->data) ? 'YES' : 'NO') . "\n";
            }
        }
    }
} else {
    echo "File not found\n";
}
?>
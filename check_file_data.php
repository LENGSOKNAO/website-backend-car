<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\StoredFile;
use Illuminate\Support\Facades\DB;

$file = StoredFile::find('37892dd9-532d-4e5d-ad06-ba7e0b13735b');
if ($file) {
    echo "File found:\n";
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
        echo "  Data is empty: " . (empty($data) ? 'YES' : 'NO') . "\n";
        if (!empty($data)) {
            echo "  Data (first 20 bytes): " . bin2hex(substr($data, 0, 20)) . "\n";
        } else {
            echo "  Data is NULL or empty string\n";
            // Check if it's actually null in the database
            $raw = DB::select("SELECT data FROM stored_files WHERE id = ?", [$file->id])[0];
            echo "  Raw data from DB: " . (is_null($raw->data) ? 'NULL' : 'NOT NULL') . "\n";
            if (!is_null($raw->data)) {
                echo "  Raw data length: " . strlen($raw->data) . "\n";
            }
        }
    }
} else {
    echo "File not found\n";
}
?>
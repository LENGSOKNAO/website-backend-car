<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

// Check if the data is NULL in the database
$result = DB::select("SELECT id, original_name, mime_type, size, data IS NULL as is_null, LENGTH(data) as data_length FROM stored_files WHERE id = '37892dd9-532d-4e5d-ad06-ba7e0b13735b'");
if ($result) {
    $row = $result[0];
    echo "Database check for test file:\n";
    echo "  ID: " . $row->id . "\n";
    echo "  Name: " . $row->original_name . "\n";
    echo "  MIME: " . $row->mime_type . "\n";
    echo "  Size: " . $row->size . "\n";
    echo "  Is NULL: " . ($row->is_null ? 'YES' : 'NO') . "\n";
    echo "  Data length: " . $row->data_length . "\n";
} else {
    echo "No result found\n";
}

// Also check the manually inserted file
$result2 = DB::select("SELECT id, original_name, mime_type, size, data IS NULL as is_null, LENGTH(data) as data_length FROM stored_files WHERE id = '33bdbd49-c73b-4d12-9142-47351ba33d38'");
if ($result2) {
    $row = $result2[0];
    echo "\nDatabase check for manual file:\n";
    echo "  ID: " . $row->id . "\n";
    echo "  Name: " . $row->original_name . "\n";
    echo "  MIME: " . $row->mime_type . "\n";
    echo "  Size: " . $row->size . "\n";
    echo "  Is NULL: " . ($row->is_null ? 'YES' : 'NO') . "\n";
    echo "  Data length: " . $row->data_length . "\n";
} else {
    echo "No result found for manual file\n";
}
?>
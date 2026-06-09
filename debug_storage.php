<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\StoredFile;
use Illuminate\Support\Facades\Storage;

// Simulate the exact route logic
$path = '37892dd9-532d-4e5d-ad06-ba7e0b13735b.png';
echo "Testing path: $path\n";

$pathParts = explode('/', $path);
$lastPart = end($pathParts);
echo "Last part: $lastPart\n";

if (preg_match('/^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(png|jpg|jpeg|gif|webp|avif|svg)$/i', $lastPart, $matches)) {
    echo "Regex matched!\n";
    echo "UUID: " . $matches[1] . "\n";
    echo "Extension: " . $matches[2] . "\n";
    
    $id = $matches[1];
    
    // Try to find the file in the database by UUID
    $file = StoredFile::find($id);
    
    if ($file) {
        echo "File found in DB!\n";
        echo "Name: " . $file->original_name . "\n";
        echo "MIME: " . $file->mime_type . "\n";
        echo "Size: " . $file->size . "\n";
        
        // Try to serve the file
        $data = $file->data;
        if (is_resource($data)) {
            $data = stream_get_contents($data);
        }
        echo "Data length: " . strlen($data) . "\n";
        echo "Content-Type: " . $file->mime_type . "\n";
    } else {
        echo "File NOT found in DB for ID: $id\n";
    }
} else {
    echo "Regex did NOT match!\n";
}

// Fall back to filesystem storage
echo "\nChecking filesystem...\n";
$disk = Storage::disk('public');
if ($disk->exists($path)) {
    echo "File exists in filesystem\n";
} else {
    echo "File does NOT exist in filesystem\n";
}
?>
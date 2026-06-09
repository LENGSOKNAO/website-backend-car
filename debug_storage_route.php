<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\StoredFile;
use Illuminate\Support\Facades\Storage;

// Simulate the exact route logic
$path = 'avatars/37892dd9-532d-4e5d-ad06-ba7e0b13735b.png';
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
            echo "Data is a stream resource\n";
            $data = stream_get_contents($data);
            echo "Data length after stream_get_contents: " . strlen($data) . "\n";
        } else {
            echo "Data length: " . strlen($data) . "\n";
        }
        if (!empty($data)) {
            echo "Data (first 20 bytes): " . bin2hex(substr($data, 0, 20)) . "\n";
        } else {
            echo "Data is empty!\n";
        }
        
        // This is what the route would return
        // return response($data, 200)
        //     ->header('Content-Type', $file->mime_type)
        //     ->header('Content-Length', $file->size)
        //     ->header('Cache-Control', 'public, max-age=31536000, immutable');
        echo "Would return 200 with data length: " . strlen($data) . "\n";
    } else {
        echo "File NOT found in DB for ID: $id\n";
        // Let's check what's actually in the DB
        $allFiles = StoredFile::all();
        echo "Total files in DB: " . $allFiles->count() . "\n";
        foreach($allFiles as $f) {
            echo "  - ID: " . $f->id . ", Name: " . $f->original_name . "\n";
        }
        // Fall back to filesystem storage
        echo "\nChecking filesystem...\n";
        $disk = Storage::disk('public');
        if ($disk->exists($path)) {
            echo "File exists in filesystem\n";
        } else {
            echo "File does NOT exist in filesystem\n";
        }
    }
} else {
    echo "Regex did NOT match!\n";
    // Fall back to filesystem storage
    echo "\nChecking filesystem...\n";
    $disk = Storage::disk('public');
    if ($disk->exists($path)) {
        echo "File exists in filesystem\n";
    } else {
        echo "File does NOT exist in filesystem\n";
    }
}
?>
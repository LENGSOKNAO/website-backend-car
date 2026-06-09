<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

// Let's manually insert a test file to see what happens
$dummyContent = str_repeat("x", 100); // 100 bytes of data
$id = (string) Str::uuid();

echo "Inserting test data:\n";
echo "  UUID: $id\n";
echo "  Content length: " . strlen($dummyContent) . "\n";
echo "  Content (first 10 chars): " . substr($dummyContent, 0, 10) . "\n";

// Use DB::insert directly
DB::insert('insert into stored_files (id, original_name, mime_type, size, data) values (?, ?, ?, ?, ?)', [
    $id,
    'manual_test.jpg',
    'image/jpeg',
    strlen($dummyContent),
    $dummyContent
]);

// Now fetch it back
$stored = DB::table('stored_files')->where('id', $id)->first();
echo "\nFetched data:\n";
echo "  ID: " . $stored->id . "\n";
echo "  Name: " . $stored->original_name . "\n";
echo "  MIME: " . $stored->mime_type . "\n";
echo "  Size: " . $stored->size . "\n";

$data = $stored->data;
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

// Check what Eloquent sees
use App\Models\StoredFile;
$eloquentFile = StoredFile::find($id);
if ($eloquentFile) {
    echo "\nEloquent fetch:\n";
    echo "  ID: " . $eloquentFile->id . "\n";
    echo "  Name: " . $eloquentFile->original_name . "\n";
    echo "  MIME: " . $eloquentFile->mime_type . "\n";
    echo "  Size: " . $eloquentFile->size . "\n";
    $data = $eloquentFile->data;
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
}
?>
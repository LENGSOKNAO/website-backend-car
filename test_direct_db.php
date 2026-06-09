<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

// Test direct database insertion with hex encoding
echo "Testing direct DB insertion with hex encoding...\n";

$data = file_get_contents(__DIR__.'/public/favicon.ico');
echo "Original data length: " . strlen($data) . "\n";

$hexData = bin2hex($data);
echo "Hex data length: " . strlen($hexData) . "\n";

// Insert using our method
$id = Str::uuid();
DB::table('stored_files')->insert([
    'id' => $id,
    'original_name' => 'test.jpg',
    'mime_type' => 'image/jpeg',
    'size' => strlen($data),
    'data' => DB::raw("decode('$hexData', 'hex')"),
    'created_at' => now(),
    'updated_at' => now(),
]);

echo "Inserted with ID: $id\n";

// Retrieve and verify
$row = DB::table('stored_files')->where('id', $id)->first();
$retrievedData = (string)$row->data;
echo "Retrieved data length: " . strlen($retrievedData) . "\n";

if ($data === $retrievedData) {
    echo "SUCCESS: Data matches perfectly\n";
} else {
    echo "ERROR: Data mismatch\n";
    echo "Expected first 20 bytes: ";
    for ($i = 0; $i < min(20, strlen($data)); $i++) {
        printf("%02x ", ord($data[$i]));
    }
    echo "\n";
    echo "Got first 20 bytes: ";
    for ($i = 0; $i < min(20, strlen($retrievedData)); $i++) {
        printf("%02x ", ord($retrievedData[$i]));
    }
    echo "\n";
}

// Clean up
DB::table('stored_files')->where('id', $id)->delete();
echo "Cleaned up\n";

<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\StoredFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

echo "Testing StoredFile model operations...\n";

// Count existing files
$count = StoredFile::count();
echo "Current stored files count: {$count}\n";

// Test 1: Create a file using Eloquent
echo "\nTest 1: Creating file via Eloquent model\n";
try {
    $data = file_get_contents(__DIR__.'/public/favicon.ico');
    echo "Read test file of length: " . strlen($data) . " bytes\n";
    
    $file = new StoredFile();
    $file->id = Uuid::uuid4()->toString();
    $file->original_name = 'test_eloquent.jpg';
    $file->mime_type = 'image/jpeg';
    $file->size = strlen($data);
    $file->data = $data;
    $file->save();
    
    echo "Created file with ID: {$file->id}\n";
    
    // Retrieve it
    $retrieved = StoredFile::find($file->id);
    echo "Retrieved file: {$retrieved->original_name}, size: {$retrieved->size}\n";
    
    // Verify data integrity
    if ((string)$retrieved->data === $data) {
        echo "SUCCESS: Data integrity verified\n";
    } else {
        echo "ERROR: Data mismatch\n";
    }
    
    // Clean up
    $retrieved->delete();
    echo "Cleaned up test file\n";
} catch (\Exception $e) {
    echo "Error in Eloquent test: " . $e->getMessage() . "\n";
}

// Test 2: Create a file using query builder (like our fixed controller)
echo "\nTest 2: Creating file via query builder\n";
try {
    $data = file_get_contents(__DIR__.'/public/favicon.ico');
    $id = Uuid::uuid4()->toString();
    
    DB::table('stored_files')->insert([
        'id' => $id,
        'original_name' => 'test_qb.jpg',
        'mime_type' => 'image/jpeg',
        'size' => strlen($data),
        'data' => $data,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    
    echo "Created file with ID: {$id}\n";
    
    // Retrieve it
    $row = DB::table('stored_files')->where('id', $id)->first();
    echo "Retrieved file: {$row->original_name}, size: {$row->size}\n";
    
    // Verify data integrity
    $retrievedData = (string)$row->data;
    if ($retrievedData === $data) {
        echo "SUCCESS: Data integrity verified\n";
    } else {
        echo "ERROR: Data mismatch. Expected length: " . strlen($data) . ", Got: " . strlen($retrievedData) . "\n";
    }
    
    // Clean up
    DB::table('stored_files')->where('id', $id)->delete();
    echo "Cleaned up test file\n";
} catch (\Exception $e) {
    echo "Error in query builder test: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}

// Final count
$count = StoredFile::count();
echo "\nFinal stored files count: {$count}\n";

echo "All tests completed.\n";
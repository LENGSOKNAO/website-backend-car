<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

// Use the Neon database credentials from vercel.json
$db = DB::connection();

try {
    // Check if the table exists and get its structure
    $columns = $db->select("SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stored_files' ORDER BY ordinal_position");
    
    if (empty($columns)) {
        echo "Table stored_files does not exist in the Neon database.\n";
    } else {
        echo "Table stored_files structure:\n";
        foreach ($columns as $col) {
            echo " - {$col->column_name}: {$col->data_type} (nullable: {$col->is_nullable}, default: {$col->column_default})\n";
        }
    }
} catch (\Exception $e) {
    echo "Error checking table: " . $e->getMessage() . "\n";
}

// Now try to insert a small binary blob using the query builder (which should work)
echo "\nTesting insert via query builder...\n";
try {
    // Delete any test file
    $db->table('stored_files')->where('original_name', 'test.jpg')->delete();
    
    // Insert a test file
    $data = file_get_contents(__DIR__.'/public/favicon.ico'); // 16x16 ICO
    $id = Uuid::uuid4()->toString();
    
    $db->table('stored_files')->insert([
        'id' => $id,
        'original_name' => 'test.jpg',
        'mime_type' => 'image/jpeg',
        'size' => strlen($data),
        'data' => $data,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    
    echo "Insert successful with ID: {$id}\n";
    
    // Retrieve it
    $file = $db->table('stored_files')->where('id', $id)->first();
    echo "Retrieved file: ";
    var_dump($file);
    
    // Clean up
    $db->table('stored_files')->where('id', $id)->delete();
    echo "Cleaned up test file.\n";
} catch (\Exception $e) {
    echo "Error during insert/retrieve via query builder: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}

// Now try to insert via Eloquent model
echo "\nTesting insert via Eloquent model...\n";
try {
    // Delete any test file
    App\Models\StoredFile::where('original_name', 'test.jpg')->delete();
    
    // Insert a test file
    $data = file_get_contents(__DIR__.'/public/favicon.ico'); // 16x16 ICO
    $file = new App\Models\StoredFile();
    $file->id = Uuid::uuid4()->toString();
    $file->original_name = 'test.jpg';
    $file->mime_type = 'image/jpeg';
    $file->size = strlen($data);
    $file->data = $data;
    $file->save();
    
    echo "Insert successful with ID: {$file->id}\n";
    
    // Retrieve it
    $retrieved = App\Models\StoredFile::find($file->id);
    echo "Retrieved file: ";
    var_dump($retrieved->toArray());
    
    // Clean up
    $retrieved->delete();
    echo "Cleaned up test file.\n";
} catch (\Exception $e) {
    echo "Error during insert/retrieve via Eloquent: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
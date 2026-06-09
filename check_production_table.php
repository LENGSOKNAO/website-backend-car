<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

// Check the connection
try {
    DB::connection()->getPdo();
    echo "Database connection successful\n";
} catch (\Exception $e) {
    echo "Database connection failed: " . $e->getMessage() . "\n";
    exit(1);
}

// Check if the stored_files table exists and get its structure
try {
    $columns = DB::select("SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stored_files' ORDER BY ordinal_position");
    
    if (empty($columns)) {
        echo "Table stored_files does not exist in the database.\n";
    } else {
        echo "Table stored_files structure:\n";
        foreach ($columns as $col) {
            echo " - {$col->column_name}: {$col->data_type} (nullable: {$col->is_nullable}, default: {$col->column_default})\n";
        }
    }
} catch (\Exception $e) {
    echo "Error checking table structure: " . $e->getMessage() . "\n";
}

// If the table exists, check if we can insert a blob
if (!empty($columns)) {
    echo "\nTesting insert of binary data...\n";
    try {
        // Delete any test file
        DB::table('stored_files')->where('original_name', 'test.jpg')->delete();
        
        // Insert a test file
        $data = file_get_contents(__DIR__.'/public/favicon.ico');
        $id = DB::table('stored_files')->insertGetId([
            'id' => Str::uuid(),
            'original_name' => 'test.jpg',
            'mime_type' => 'image/jpeg',
            'size' => strlen($data),
            'data' => $data,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        echo "Insert successful with ID: {$id}\n";
        
        // Retrieve it
        $file = DB::table('stored_files')->where('id', $id)->first();
        echo "Retrieved file: ";
        var_dump($file);
        
        // Clean up
        DB::table('stored_files')->where('id', $id)->delete();
        echo "Cleaned up test file.\n";
    } catch (\Exception $e) {
        echo "Error during insert/retrieve: " . $e->getMessage() . "\n";
        echo "Trace: " . $e->getTraceAsString() . "\n";
    }
}
<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

/** @var Illuminate\Contracts\Console\Kernel $kernel */
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

try {
    $connection = DB::connection()->getPdo();
    echo "Database connection successful\n";
} catch (\Exception $e) {
    echo "Database connection failed: " . $e->getMessage() . "\n";
    exit(1);
}

// Check if stored_files table exists
$exists = DB::selectOne("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'stored_files') as exists");
echo "Table stored_files exists: " . ($exists->exists ? 'yes' : 'no') . "\n";

// If it exists, check its structure
if ($exists->exists) {
    $columns = DB::select("SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stored_files' ORDER BY ordinal_position");
    echo "Columns in stored_files:\n";
    foreach ($columns as $col) {
        echo " - {$col->column_name}: {$col->data_type} (nullable: {$col->is_nullable}, default: {$col->column_default})\n";
    }
} else {
    echo "Table does not exist. Creating it now...\n";
    DB::statement("CREATE TABLE stored_files (
        id UUID PRIMARY KEY,
        original_name VARCHAR(255) NOT NULL,
        mime_type VARCHAR(255) NOT NULL,
        size INTEGER NOT NULL,
        data BYTEA NOT NULL,
        created_at TIMESTAMP(0) WITHOUT TIME ZONE NULL,
        updated_at TIMESTAMP(0) WITHOUT TIME ZONE NULL
    )");
    echo "Table created.\n";
}

// Try to insert a test file
try {
    $file = new App\Models\StoredFile();
    $file->id = Ramsey\Uuid\Uuid::uuid4()->toString();
    $file->original_name = 'test.jpg';
    $file->mime_type = 'image/jpeg';
    $file->size = 100;
    $file->data = 'dummy';
    $file->save();
    echo "Inserted test file with ID: {$file->id}\n";

    // Try to retrieve it
    $retrieved = App\Models\StoredFile::find($file->id);
    echo "Retrieved file: {$retrieved->original_name}\n";

    // Clean up
    $retrieved->delete();
    echo "Cleaned up test file.\n";
} catch (\Exception $e) {
    echo "Error during file test: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
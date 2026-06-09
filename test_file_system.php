<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use App\Models\StoredFile;
use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

// Check database connection
try {
    DB::connection()->getPdo();
    echo "Database connection successful\n";
} catch (\Exception $e) {
    echo "Database connection failed: " . $e->getMessage() . "\n";
    exit(1);
}

// Check if stored_files table exists
$exists = DB::selectOne("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'stored_files') as exists");
echo "Table stored_files exists: " . ($exists->exists ? 'yes' : 'no') . "\n";

if (!$exists->exists) {
    echo "Creating stored_files table...\n";
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

// Create a test file
$file = new StoredFile();
$file->original_name = 'test.jpg';
$file->mime_type = 'image/jpeg';
$file->size = 100;
$file->data = file_get_contents(__DIR__.'/public/favicon.ico'); // 16x16 ICO
$file->save();

echo "Created stored file with ID: {$file->id}\n";

// Now test the FileController
$controller = new FileController();

try {
    $response = $controller->show($file->id);
    echo "Response status: " . $response->getStatusCode() . "\n";
    echo "Response content type: " . $response->headers->get('Content-Type') . "\n";
    echo "Response content length: " . strlen($response->getContent()) . "\n";
    
    // Save the response to a file to verify
    $outputFile = __DIR__.'/test_output.jpg';
    file_put_contents($outputFile, $response->getContent());
    echo "Saved response to {$outputFile}\n";
    
    // Compare with original
    $original = file_get_contents(__DIR__.'/public/favicon.ico');
    if ($original === $response->getContent()) {
        echo "Content matches original file.\n";
    } else {
        echo "Content does NOT match original file.\n";
    }
} catch (\Exception $e) {
    echo "Error in FileController: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}

// Clean up
$file->delete();
echo "Cleaned up test file.\n";
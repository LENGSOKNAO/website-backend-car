<?php

require __DIR__.'/vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

$capsule->addConnection([
    'driver' => 'pgsql',
    'host' => 'ep-hidden-resonance-ap5l7tt5.c-7.us-east-1.aws.neon.tech',
    'port' => '5432',
    'database' => 'neondb',
    'username' => 'neondb_owner',
    'password' => 'npg_K2dZURDFu7OY',
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix' => '',
    'schema' => 'public',
    'sslmode' => 'require',
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();

use App\Models\StoredFile;

// Count existing files
$count = StoredFile::count();
echo "Current stored files count: {$count}\n";

// Now, let's simulate an upload
use Illuminate\Http\UploadedFile;
use Illuminate\Http\Request;
use App\Http\Controllers\FileController;

// Create a test file with actual content
$tempFile = tempnam(sys_get_temp_dir(), 'test');
file_put_contents($tempFile, "This is a test file content for upload testing.");

// Create an UploadedFile instance
$uploadedFile = new UploadedFile(
    $tempFile,
    'test.txt',
    'text/plain',
    null,
    true // test mode
);

// Create a request that simulates the file upload
$request = Request::create('/api/files/upload', 'POST', [], [], [], ['file' => $uploadedFile]);

// Test the controller
$controller = new FileController();

try {
    $response = $controller->upload($request);
    echo "Upload response status: " . $response->getStatusCode() . "\n";
    echo "Upload response content: " . $response->getContent() . "\n";
    
    // Decode JSON response
    $data = json_decode($response->getContent(), true);
    if (isset($data['id'])) {
        echo "File ID: " . $data['id'] . "\n";
        
        // Now test retrieving the file
        $showResponse = $controller->show($data['id']);
        echo "Show response status: " . $showResponse->getStatusCode() . "\n";
        echo "Show response content type: " . $showResponse->headers->get('Content-Type') . "\n";
        echo "Show response content length: " . strlen($showResponse->getContent()) . "\n";
        
        // Clean up
        $file = StoredFile::find($data['id']);
        if ($file) {
            $file->delete();
            echo "Cleaned up stored file\n";
        }
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}

// Clean up the temporary file
if (file_exists($tempFile)) {
    unlink($tempFile);
}

// Final count
$count = StoredFile::count();
echo "Final stored files count: {$count}\n";
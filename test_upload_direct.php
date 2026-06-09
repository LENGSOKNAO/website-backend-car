<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Http\UploadedFile;
use Illuminate\Http\Request;
use App\Http\Controllers\FileController;

// Create a test file
$tempFile = tempnam(sys_get_temp_dir(), 'test');
file_put_contents($tempFile, "fake image content"); // Just some dummy data

// Create an UploadedFile instance (simulating what Laravel does)
$uploadedFile = new UploadedFile(
    $tempFile,
    'test.jpg',
    'image/jpeg',
    null,
    true // test mode
);

// Create a request that simulates the file upload
$request = Request::create('/api/files/upload', 'POST', [], [], [], ['file' => $uploadedFile]);

// Test the controller
$controller = new FileController();

try {
    $response = $controller->upload($request);
    echo "Response status: " . $response->getStatusCode() . "\n";
    echo "Response content: " . $response->getContent() . "\n";
    
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
        use App\Models\StoredFile;
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
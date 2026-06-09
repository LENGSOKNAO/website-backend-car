<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Http\UploadedFile;
use Illuminate\Http\Request;
use App\Http\Controllers\FileController;
use App\Models\StoredFile;

// Create a test file with actual content
$tempFile = tempnam(sys_get_temp_dir(), 'test');
file_put_contents($tempFile, "This is a test file content for upload testing.");

// Create an UploadedFile instance with correct size
$uploadedFile = new UploadedFile(
    $tempFile,
    'test.txt',
    'text/plain',
    filesize($tempFile),
    null,
    true // test mode
);

// Create a request that simulates the file upload
$request = Request::create('/api/files/upload', 'POST');
$request->files->add([$uploadedFile]); // This might not be the correct way

// Alternatively, we can use the merge method or just set the file in the request
// Let's try setting the file directly in the request's files property
$request->files->set('file', $uploadedFile);

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
        
        // Verify the content matches
        $originalContent = file_get_contents($tempFile);
        $retrievedContent = $showResponse->getContent();
        
        if ($originalContent === $retrievedContent) {
            echo "SUCCESS: Retrieved content matches original content\n";
        } else {
            echo "ERROR: Retrieved content does NOT match original content\n";
            echo "Original length: " . strlen($originalContent) . "\n";
            echo "Retrieved length: " . strlen($retrievedContent) . "\n";
        }
        
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
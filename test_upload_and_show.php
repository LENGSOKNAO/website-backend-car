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
$content = "This is a test file content for upload testing.";
file_put_contents($tempFile, $content);

// Create an UploadedFile instance with correct size
// The constructor is: __construct(string $path, string $originalName, ?string $mimeType = null, int $size = null, ?int $error = null, bool $test = false)
$uploadedFile = new UploadedFile(
    $tempFile,
    'test.txt',
    'text/plain',
    filesize($tempFile),
    null, // error
    true  // test mode
);

// Create a request that simulates the file upload
$request = Request::create('/api/files/upload', 'POST');
// We need to merge the file into the request
$request->files->add([$uploadedFile]);

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
        
        // Now test retrieving the file using the show method
        $showResponse = $controller->show($data['id']);
        echo "Show response status: " . $showResponse->getStatusCode() . "\n";
        echo "Show response content type: " . $showResponse->headers->get('Content-Type') . "\n";
        echo "Show response content length: " . strlen($showResponse->getContent()) . "\n";
        
        // Verify the content matches
        $retrievedContent = $showResponse->getContent();
        if ($content === $retrievedContent) {
            echo "SUCCESS: Retrieved content matches original content\n";
        } else {
            echo "ERROR: Retrieved content does NOT match original content\n";
            echo "Original length: " . strlen($content) . "\n";
            echo "Retrieved length: " . strlen($retrievedContent) . "\n";
        }
        
        // Clean up
        $file = StoredFile::find($data['id']);
        if ($file) {
            $file->delete();
            echo "Cleaned up stored file\n";
        }
    } else {
        echo "No ID in response\n";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}

// Clean up the temporary file
if (file_exists($tempFile)) {
    unlink($tempFile);
}
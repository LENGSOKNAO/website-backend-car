<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Http\Request;
use App\Http\Controllers\FileController;
use App\Models\StoredFile;

// Create a test file in the temporary directory
$tempFilePath = sys_get_temp_dir() . '/test_controller_insert.txt';
$content = "This is a test file content for upload testing.";
file_put_contents($tempFilePath, $content);

// Create an UploadedFile instance
$uploadedFile = new \Symfony\Component\HttpFoundation\File\UploadedFile(
    $tempFilePath,
    'test.txt',
    'text/plain',
    filesize($tempFilePath),
    0, // error = UPLOAD_ERR_OK
    true // test
);

// Create a request with the file
$request = Request::create('/api/files/upload', 'POST');
// Manually add the file to the request - correct way
$files = new \Symfony\Component\HttpFoundation\FileBag([
    'file' => $uploadedFile
]);
$request->files = $files;

// Debug: check what we got from the request
$fileInstance = $request->file('file');
echo "File instance from request: ";
if ($fileInstance) {
    echo "Real path: " . $fileInstance->getRealPath() . "\n";
    echo "Mime type: " . $fileInstance->getMimeType() . "\n";
    echo "Size: " . $fileInstance->getSize() . "\n";
    echo "Original name: " . $fileInstance->getClientOriginalName() . "\n";
} else {
    echo "NULL or FALSE\n";
    var_dump($fileInstance);
}
echo "\n";

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
            echo "First 10 bytes of original: ";
            for ($i = 0; $i < min(10, strlen($content)); $i++) {
                printf("%02x ", ord($content[$i]));
            }
            echo "\n";
            echo "First 10 bytes of retrieved: ";
            for ($i = 0; $i < min(10, strlen($retrievedContent)); $i++) {
                printf("%02x ", ord($retrievedContent[$i]));
            }
            echo "\n";
        }
        
        // Clean up
        $file = StoredFile::find($data['id']);
        if ($file) {
            $file->delete();
            echo "Cleaned up stored file\n";
        }
    } else {
        echo "No ID in response\n";
        // Try to decode as JSON anyway to see error message
        $errorData = json_decode($response->getContent(), true);
        if ($errorData) {
            echo "Error: " . $errorData['message'] ?? $errorData['error'] ?? 'Unknown error' . "\n";
        }
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}

// Clean up the temporary file
if (file_exists($tempFilePath)) {
    unlink($tempFilePath);
}
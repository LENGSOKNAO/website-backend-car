<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Http\Request;
use App\Http\Controllers\FileController;

// Create a request with a file - let's try a simpler approach
$request = Request::create('/api/files/upload', 'POST');

// Let's see what happens when we call upload with no file
$controller = new FileController();

try {
    $response = $controller->upload($request);
    echo "No file - Response status: " . $response->getStatusCode() . "\n";
    echo "No file - Response content: " . $response->getContent() . "\n\n";
} catch (\Exception $e) {
    echo "No file - Error: " . $e->getMessage() . "\n";
}

// Now let's try to add a file properly
$tempFilePath = sys_get_temp_dir() . '/debug_test.txt';
$content = "Test content";
file_put_contents($tempFilePath, $content);

try {
    // Create the uploaded file
    $uploadedFile = new \Symfony\Component\HttpFoundation\File\UploadedFile(
        $tempFilePath,
        'debug_test.txt',
        'text/plain',
        filesize($tempFilePath),
        0, // UPLOAD_ERR_OK
        true // test
    );
    
    // Create a file bag with our file
    $fileBag = new \Symfony\Component\HttpFoundation\FileBag([
        'file' => $uploadedFile
    ]);
    
    // Create request with the file bag
    $requestWithFile = Request::create('/api/files/upload', 'POST');
    $requestWithFile->files = $fileBag;
    
    echo "File bag created. Files count: " . count($requestWithFile->files->all()) . "\n";
    echo "File name: " . $requestWithFile->files->get('file')->getClientOriginalName() . "\n";
    echo "File size: " . $requestWithFile->files->get('file')->getSize() . "\n";
    echo "File mime type: " . $requestWithFile->files->get('file')->getMimeType() . "\n";
    echo "File error: " . $requestWithFile->files->get('file')->getError() . "\n";
    echo "File is test: " . ($requestWithFile->files->get('file')->isTest() ? 'yes' : 'no') . "\n";
    
    // Now test the controller
    $response = $controller->upload($requestWithFile);
    echo "With file - Response status: " . $response->getStatusCode() . "\n";
    echo "With file - Response content: " . $response->getContent() . "\n";
    
} catch (\Exception $e) {
    echo "With file - Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}

// Clean up
if (file_exists($tempFilePath)) {
    unlink($tempFilePath);
}
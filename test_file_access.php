<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

/** @var Illuminate\Contracts\Http\Kernel $kernel */
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$request = Illuminate\Http\Request::create('/api/files/test-id', 'GET');

// We need to set the route parameters for testing
// Instead, let's directly test the controller and model

use App\Models\StoredFile;
use App\Http\Controllers\FileController;

// Create a stored file manually
$file = new StoredFile();
$file->id = 'test-id';
$file->original_name = 'test.jpg';
$file->mime_type = 'image/jpeg';
$file->size = 100;
$file->data = file_get_contents(__DIR__.'/public/favicon.ico'); // 16x16 ICO file
$file->save();

echo "Created stored file with ID: {$file->id}" . PHP_EOL;

// Now test the controller
$controller = new FileController();

// We need to mock the request to have the correct ID
// But the show method just takes the ID as a parameter
try {
    $response = $controller->show('test-id');
    echo "Response status: ".$response->getStatusCode().PHP_EOL;
    echo "Response content type: ".$response->headers->get('Content-Type').PHP_EOL;
    echo "Response content length: ".strlen($response->getContent()).PHP_EOL;
    
    // Save the response to a file to verify
    file_put_contents(__DIR__.'/test_output.jpg', $response->getContent());
    echo "Saved response to test_output.jpg".PHP_EOL;
} catch (\Exception $e) {
    echo "Error: ".$e->getMessage().PHP_EOL;
    echo "Trace: ".$e->getTraceAsString().PHP_EOL;
}

// Clean up
$file->delete();
echo "Cleaned up test file".PHP_EOL;
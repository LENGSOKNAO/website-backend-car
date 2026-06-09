<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

use App\Http\Controllers\FileController;
use App\Models\StoredFile;
use Illuminate\Http\Request;

// Create a stored file
$file = new StoredFile();
$file->original_name = 'test.jpg';
$file->mime_type = 'image/jpeg';
$file->size = 100;
$file->data = file_get_contents(__DIR__.'/public/favicon.ico'); // Use an actual file
$file->save();

echo "Created stored file with ID: {$file->id}" . PHP_EOL;

// Now test the controller
$controller = new FileController();
$request = Request::create('/api/files/'.$file->id, 'GET');

// We need to set the route parameters
// Alternatively, we can call the show method directly
try {
    $response = $controller->show($file->id);
    echo "Response status: ".$response->getStatusCode().PHP_EOL;
    echo "Response headers: "; print_r($response->headers->all()); echo PHP_EOL;
    echo "Response content length: ".strlen($response->getContent()).PHP_EOL;
} catch (\Exception $e) {
    echo "Error: ".$e->getMessage().PHP_EOL;
}
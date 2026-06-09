<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Route;

// Test a simple API route
Route::get('/api/test', function () {
    return response()->json(['message' => 'API route working']);
});

$routes = Route::getRoutes();
foreach ($routes as $route) {
    if (strpos($route->uri(), 'api/test') !== false) {
        echo "Found API test route: " . $route->uri() . "\n";
        echo "Methods: " . implode(', ', $route->methods()) . "\n";
        break;
    }
}
?>
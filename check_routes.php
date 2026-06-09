<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Route;

// Get all routes
$routes = Route::getRoutes();

echo "All registered routes:\n";
echo "=" . str_repeat("=", 50) . "\n";

foreach ($routes as $route) {
    $uri = $route->uri();
    $methods = implode(', ', $route->methods());
    $action = $route->action['uses'];
    if (is_string($action)) {
        echo "[$methods] $uri -> $action\n";
    } else {
        echo "[$methods] $uri -> Closure/Callable\n";
    }
}
?>
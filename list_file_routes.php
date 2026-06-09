<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Route;

// Get all routes
$routes = Route::getRoutes();

echo "File-related routes:\n";
echo "=" . str_repeat("=", 40) . "\n";

foreach ($routes as $route) {
    $uri = $route->uri();
    if (strpos($uri, 'files') !== false) {
        echo "URI: $uri\n";
        echo "Methods: " . implode(', ', $route->methods()) . "\n";
        $action = $route->action['uses'];
        if (is_string($action)) {
            echo "Action: $action\n";
        } else {
            echo "Action: Closure/Callable\n";
        }
        echo "-" . str_repeat("-", 30) . "\n";
    }
}
?>
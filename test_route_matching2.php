<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Route;

// Get all routes
$routes = Route::getRoutes();

echo "Testing route matching for: storage/51ee8db8-f5f8-4c51-bc46-f9ddc3d5ec24\n";
echo "=" . str_repeat("=", 80) . "\n\n";

$testUri = 'storage/51ee8db8-f5f8-4c51-bc46-f9ddc3d5ec24';
$matched = false;

foreach ($routes as $route) {
    // Try to match the route
    if ($route->matches($request = Illuminate\Http\Request::create($testUri, 'GET'))) {
        $matched = true;
        echo "MATCHED ROUTE:\n";
        echo "  URI: " . $route->uri() . "\n";
        echo "  Methods: " . implode(', ', $route->methods()) . "\n";
        echo "  Action: " . (is_string($route->action['uses']) ? $route->action['uses'] : 'Closure/Callable') . "\n";
        echo "\n";
        
        // If it's our storage route, we're good
        if ($route->uri() === 'storage/{path}') {
            echo "✓ CORRECTLY MATCHED STORAGE ROUTE\n";
            break;
        }
        // If it's the direct UUID route, that's the problem
        if ($route->uri() === '{id}.{extension}') {
            echo "✗ INCORRECTLY MATCHED UUID ROUTE (this would be the bug)\n";
            break;
        }
    }
}

if (!$matched) {
    echo "NO ROUTE MATCHED\n";
}

echo "\n" . str_repeat("=", 80) . "\n";
echo "Testing route matching for: 51ee8db8-f5f8-4c51-bc46-f9ddc3d5ec24\n";
echo "-" . str_repeat("-", 80) . "\n\n";

$testUri2 = '51ee8db8-f5f8-4c51-bc46-f9ddc3d5ec24';
$matched2 = false;

foreach ($routes as $route) {
    // Try to match the route
    if ($route->matches($request = Illuminate\Http\Request::create($testUri2, 'GET'))) {
        $matched2 = true;
        echo "MATCHED ROUTE:\n";
        echo "  URI: " . $route->uri() . "\n";
        echo "  Methods: " . implode(', ', $route->methods()) . "\n";
        echo "  Action: " . (is_string($route->action['uses']) ? $route->action['uses'] : 'Closure/Callable') . "\n";
        echo "\n";
        
        // If it's our direct UUID route, that's correct for this case (without extension)
        if ($route->uri() === '{id}') {
            echo "✓ CORRECTLY MATCHED ID ROUTE (but we don't have this route)\n";
            break;
        }
        // If it's our storage route, let's see what happens
        if ($route->uri() === 'storage/{path}') {
            echo "? MATCHED STORAGE ROUTE (unexpected for this path)\n";
            break;
        }
        // If it's our direct UUID route WITH extension, that would be wrong for this case
        if ($route->uri() === '{id}.{extension}') {
            echo "✗ WOULD MATCH UUID ROUTE WITH EXTENSION (but we don't have extension)\n";
            break;
        }
    }
}

if (!$matched2) {
    echo "NO ROUTE MATCHED\n";
}
?>
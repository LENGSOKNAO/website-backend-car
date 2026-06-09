<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Ensure storage link exists (for local dev with php artisan serve)
$storageTarget = __DIR__.'/../storage/app/public';
$storageLink = __DIR__.'/storage';
if (is_dir($storageTarget) && !is_link($storageLink) && is_writable(dirname($storageLink))) {
    @symlink($storageTarget, $storageLink);
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());

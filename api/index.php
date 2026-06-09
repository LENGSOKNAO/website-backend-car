<?php

// Vercel PHP runtime sets PATH_INFO to the path after the script name.
// For request /api/v1/auth/login, PATH_INFO = /v1/auth/login (stripped of /api).
// Since routes are loaded without /api prefix, this is the correct URI.
$uri = $_SERVER['PATH_INFO'] ?? $_SERVER['REQUEST_URI'] ?? '/';

// Strip query string
$uri = strtok($uri, '?');

// Ensure it starts with /
if (!str_starts_with($uri, '/')) {
    $uri = '/' . $uri;
}

$_SERVER['REQUEST_URI'] = $uri;

require __DIR__.'/../public/index.php';

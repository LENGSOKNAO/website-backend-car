<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Login
$request = \Illuminate\Http\Request::create('/v1/auth/login', 'POST', [
    'email' => 'seller@example.com',
    'password' => 'password'
], [], [], ['CONTENT_TYPE' => 'application/json', 'HTTP_ACCEPT' => 'application/json']);
$response = $app->handle($request);
$loginData = json_decode($response->getContent(), true);
$token = $loginData['token'] ?? null;

echo "Login: " . ($token ? "OK" : "FAILED") . "\n";

if ($token) {
    // Test my-listings
    $request = \Illuminate\Http\Request::create('/v1/my-listings', 'GET', [], [], [], [
        'CONTENT_TYPE' => 'application/json',
        'HTTP_ACCEPT' => 'application/json',
        'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
    ]);
    $response = $app->handle($request);
    echo "My Listings Response:\n";
    echo $response->getContent() . "\n";
}

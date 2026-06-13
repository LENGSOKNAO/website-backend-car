<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$content = json_encode([
    'email' => 'seller@example.com',
    'password' => 'password'
]);

$request = \Illuminate\Http\Request::create('/v1/auth/login', 'POST', [], [], [], [
    'CONTENT_TYPE' => 'application/json',
    'HTTP_ACCEPT' => 'application/json',
    'CONTENT_LENGTH' => strlen($content),
]);
$request->setMethod('POST');
$request->server->set('REQUEST_METHOD', 'POST');
$request->server->set('CONTENT_TYPE', 'application/json');
$request->server->set('CONTENT_LENGTH', strlen($content));
$request->headers->set('CONTENT_TYPE', 'application/json');
$request->headers->set('CONTENT_LENGTH', strlen($content));
$request->headers->set('ACCEPT', 'application/json');

// Create request from globals and override
$request = \Illuminate\Http\Request::createFromGlobals();
$request->server->set('REQUEST_METHOD', 'POST');
$request->server->set('REQUEST_URI', '/v1/auth/login');
$request->server->set('CONTENT_TYPE', 'application/json');
$request->server->set('CONTENT_LENGTH', strlen($content));
$request->headers->set('CONTENT_TYPE', 'application/json');
$request->headers->set('CONTENT_LENGTH', strlen($content));
$request->headers->set('ACCEPT', 'application/json');
$request->headers->set('Authorization', '');

// Override the input
$request->replace(json_decode($content, true));

$response = $app->handle($request);
echo "Status: " . $response->getStatusCode() . "\n";
echo "Content: " . $response->getContent() . "\n";

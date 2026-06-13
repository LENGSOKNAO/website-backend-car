<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$content = json_encode([
    'email' => 'seller@example.com',
    'password' => 'password'
]);

$server = [
    'REQUEST_METHOD' => 'POST',
    'REQUEST_URI' => '/v1/auth/login',
    'CONTENT_TYPE' => 'application/json',
    'CONTENT_LENGTH' => strlen($content),
    'HTTP_ACCEPT' => 'application/json',
    'HTTP_AUTHORIZATION' => '',
];

$request = \Illuminate\Http\Request::create('/v1/auth/login', 'POST', [], [], [], $server);
$request->setMethod('POST');
$request->setContent($content);

$response = $app->handle($request);
echo "Status: " . $response->getStatusCode() . "\n";
echo "Content: " . $response->getContent() . "\n";

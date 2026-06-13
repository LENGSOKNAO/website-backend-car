<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Login
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
$request->server->set('CONTENT_TYPE', 'application/json');
$request->server->set('CONTENT_LENGTH', strlen($content));
$request->headers->set('CONTENT_TYPE', 'application/json');
$request->headers->set('CONTENT_LENGTH', strlen($content));
$request->headers->set('ACCEPT', 'application/json');
$request->initialize([], [], [], [], [], $server, $content);

$response = $app->handle($request);
$loginData = json_decode($response->getContent(), true);
$token = $loginData['token'] ?? null;

echo "Login: " . ($token ? "OK" : "FAILED") . "\n";

if ($token) {
    // Test cars index
    $server2 = [
        'REQUEST_METHOD' => 'GET',
        'REQUEST_URI' => '/v1/cars',
        'CONTENT_TYPE' => 'application/json',
        'CONTENT_LENGTH' => 0,
        'HTTP_ACCEPT' => 'application/json',
        'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
    ];

    $request2 = \Illuminate\Http\Request::create('/v1/cars', 'GET', [], [], [], $server2);
    $request2->setMethod('GET');
    $request2->server->set('CONTENT_TYPE', 'application/json');
    $request2->headers->set('CONTENT_TYPE', 'application/json');
    $request2->headers->set('ACCEPT', 'application/json');
    $request2->headers->set('Authorization', 'Bearer ' . $token);
    $request2->initialize([], [], [], [], [], $server2, '');

    $response2 = $app->handle($request2);
    echo "Status: " . $response2->getStatusCode() . "\n";
    echo "Cars Index Response:\n";
    echo $response2->getContent() . "\n";
}

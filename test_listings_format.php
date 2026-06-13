<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$request = \Illuminate\Http\Request::create('/v1/listings', 'GET', [], [], [], [
    'CONTENT_TYPE' => 'application/json',
    'HTTP_ACCEPT' => 'application/json',
]);
$request->setMethod('GET');
$request->initialize([], [], [], [], [], [
    'REQUEST_METHOD' => 'GET',
    'REQUEST_URI' => '/v1/listings',
    'CONTENT_TYPE' => 'application/json',
    'HTTP_ACCEPT' => 'application/json',
], '');

$response = $app->handle($request);
echo "Status: " . $response->getStatusCode() . "\n";
echo "Content: " . $response->getContent() . "\n";

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
$data = json_decode($response->getContent(), true);
echo "Count: " . count($data['data'] ?? []) . "\n";
echo "Sample: " . json_encode($data['data'][0] ?? [], JSON_PRETTY_PRINT) . "\n";

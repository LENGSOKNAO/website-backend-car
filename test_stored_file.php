<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\StoredFile;

$f = new StoredFile();
$f->original_name = 'test.jpg';
$f->mime_type = 'image/jpeg';
$f->size = 100;
$f->data = 'dummy';
$f->save();

echo "Created file with ID: " . $f->id . PHP_EOL;
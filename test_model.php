<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

/** @var Illuminate\Contracts\Console\Kernel $kernel */
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\StoredFile;

$file = new StoredFile();
$file->original_name = 'test.jpg';
$file->mime_type = 'image/jpeg';
$file->size = 100;
$file->data = 'dummy';
$file->save();

echo 'Created file with ID: ' . $file->id . PHP_EOL;

$found = StoredFile::find($file->id);
echo 'Found file: ' . ($found ? $found->original_name : 'not found') . PHP_EOL;

$file->delete();
echo 'Deleted file' . PHP_EOL;
<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\StoredFile;

$files = StoredFile::all();
echo 'Total files: ' . $files->count() . "\n";
foreach($files as $file) {
    echo 'ID: ' . $file->id . ', Name: ' . $file->original_name . ', MIME: ' . $file->mime_type . ', Size: ' . $file->size . "\n";
}
?>
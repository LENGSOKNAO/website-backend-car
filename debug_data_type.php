<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\StoredFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

// Test 1: Using Eloquent to insert and retrieve
echo "Test 1: Eloquent insert and retrieve\n";
try {
    $data = file_get_contents(__DIR__.'/public/favicon.ico');
    $file = new StoredFile();
    $file->id = Uuid::uuid4()->toString();
    $file->original_name = 'test_eloquent.jpg';
    $file->mime_type = 'image/jpeg';
    $file->size = strlen($data);
    $file->data = $data;
    $file->save();

    $retrieved = StoredFile::find($file->id);
    echo "Data type from model: " . gettype($retrieved->data) . "\n";
    if (is_resource($retrieved->data)) {
        echo "Data is a resource. Getting stream contents...\n";
        $dataFromResource = stream_get_contents($retrieved->data);
        echo "Length from resource: " . strlen($dataFromResource) . "\n";
        if ($dataFromResource === $data) {
            echo "SUCCESS: Data matches via resource\n";
        } else {
            echo "ERROR: Data mismatch via resource\n";
        }
    } else {
        echo "Data length: " . strlen($retrieved->data) . "\n";
        if ($retrieved->data === $data) {
            echo "SUCCESS: Data matches\n";
        } else {
            echo "ERROR: Data mismatch\n";
            echo "First 10 bytes of original: ";
            for ($i = 0; $i < min(10, strlen($data)); $i++) {
                printf("%02x ", ord($data[$i]));
            }
            echo "\n";
            echo "First 10 bytes of retrieved: ";
            for ($i = 0; $i < min(10, strlen($retrieved->data)); $i++) {
                printf("%02x ", ord($retrieved->data[$i]));
            }
            echo "\n";
        }
    }

    $retrieved->delete();
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

// Test 2: Using query builder to insert and retrieve
echo "\nTest 2: Query builder insert and retrieve\n";
try {
    $data = file_get_contents(__DIR__.'/public/favicon.ico');
    $id = Uuid::uuid4()->toString();
    DB::table('stored_files')->insert([
        'id' => $id,
        'original_name' => 'test_qb.jpg',
        'mime_type' => 'image/jpeg',
        'size' => strlen($data),
        'data' => $data,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $row = DB::table('stored_files')->where('id', $id)->first();
    echo "Data type from query builder: " . gettype($row->data) . "\n";
    if (is_resource($row->data)) {
        echo "Data is a resource. Getting stream contents...\n";
        $dataFromResource = stream_get_contents($row->data);
        echo "Length from resource: " . strlen($dataFromResource) . "\n";
        if ($dataFromResource === $data) {
            echo "SUCCESS: Data matches via resource\n";
        } else {
            echo "ERROR: Data mismatch via resource\n";
        }
    } else {
        echo "Data length: " . strlen($row->data) . "\n";
        if ($row->data === $data) {
            echo "SUCCESS: Data matches\n";
        } else {
            echo "ERROR: Data mismatch\n";
            echo "First 10 bytes of original: ";
            for ($i = 0; $i < min(10, strlen($data)); $i++) {
                printf("%02x ", ord($data[$i]));
            }
            echo "\n";
            echo "First 10 bytes of retrieved: ";
            for ($i = 0; $i < min(10, strlen($row->data)); $i++) {
                printf("%02x ", ord($row->data[$i]));
            }
            echo "\n";
        }
    }

    DB::table('stored_files')->where('id', $id)->delete();
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
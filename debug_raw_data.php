<?php
require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

// Get the raw binary data using PDO statement to avoid Laravel's stream handling
$pdo = DB::connection()->getPdo();
$stmt = $pdo->prepare("SELECT data FROM stored_files WHERE id = ?");
$stmt->execute(['37892dd9-532d-4e5d-ad06-ba7e0b13735b']);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result['data'] !== null) {
    $data = $result['data'];
    echo "Data type: " . gettype($data) . "\n";
    if (is_resource($data)) {
        echo "Data is a stream resource\n";
        // Try to get metadata about the stream
        $meta = stream_get_meta_data($data);
        echo "Stream metadata: ";
        print_r($meta);
        // Try to read from it
        $contents = stream_get_contents($data);
        echo "Contents length: " . strlen($contents) . "\n";
        echo "Contents (first 50 chars): '" . substr($contents, 0, 50) . "'\n";
    } else {
        echo "Data length: " . strlen($data) . "\n";
        echo "Data (first 50 bytes): " . bin2hex(substr($data, 0, 50)) . "\n";
        echo "Data as string (first 50 chars): '" . substr($data, 0, 50) . "'\n";
    }
} else {
    echo "No data found or data is NULL\n";
    if ($result) {
        echo "Data is NULL: " . ($result['data'] === null ? 'YES' : 'NO') . "\n";
    }
}
?>
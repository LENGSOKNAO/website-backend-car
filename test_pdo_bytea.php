<?php

// Test direct PDO insert of bytea data
$dsn = 'pgsql:host=ep-hidden-resonance-ap5l7tt5.c-7.us-east-1.aws.neon.tech;port=5432;dbname=neondb;sslmode=require';
$user = 'neondb_owner';
$pass = 'npg_K2dZURDFu7OY';

try {
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Test inserting binary data
    $data = file_get_contents(__DIR__.'/public/favicon.ico'); // 16x16 ICO file
    echo "Data length: " . strlen($data) . " bytes\n";
    echo "First 10 bytes: ";
    for ($i = 0; $i < min(10, strlen($data)); $i++) {
        printf("%02x ", ord($data[$i]));
    }
    echo "\n";
    
    $stmt = $pdo->prepare("INSERT INTO stored_files (id, original_name, mime_type, size, data) VALUES (gen_random_uuid(), ?, ?, ?, ?)");
    $stmt->execute([
        'test.jpg',
        'image/jpeg',
        strlen($data),
        $data
    ]);
    
    echo "Insert successful\n";
    
    // Retrieve it
    $stmt = $pdo->query("SELECT id, original_name, mime_type, size, length(data) as data_len FROM stored_files WHERE original_name = 'test.jpg'");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    print_r($row);
    
    // Clean up
    $stmt = $pdo->prepare("DELETE FROM stored_files WHERE original_name = 'test.jpg'");
    $stmt->execute();
    echo "Cleaned up\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
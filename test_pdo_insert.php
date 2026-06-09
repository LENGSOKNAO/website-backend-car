<?php

// Neon database credentials from vercel.json
$host = 'ep-hidden-resonance-ap5l7tt5.c-7.us-east-1.aws.neon.tech';
$port = 5432;
$dbname = 'neondb';
$user = 'neondb_owner';
$pass = 'npg_K2dZURDFu7OY';
$sslmode = 'require';

$dsn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=$sslmode";

try {
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Delete any existing test file
    $pdo->exec("DELETE FROM stored_files WHERE original_name = 'test.jpg'");
    
    // Read the favicon.ico file (which is actually an ICO, but we'll use it as a test)
    $data = file_get_contents(__DIR__.'/public/favicon.ico');
    echo "Read file of length: " . strlen($data) . " bytes\n";
    echo "First 16 bytes: ";
    for ($i = 0; $i < min(16, strlen($data)); $i++) {
        printf("%02x ", ord($data[$i]));
    }
    echo "\n";
    
    // Insert using a parameterized query
    $stmt = $pdo->prepare("INSERT INTO stored_files (id, original_name, mime_type, size, data) VALUES (gen_random_uuid(), ?, ?, ?, ?)");
    $result = $stmt->execute([
        'test.jpg',
        'image/jpeg', // Note: we're saying it's JPEG but it's actually ICO, but that's okay for the test
        strlen($data),
        $data
    ]);
    
    if ($result) {
        echo "Insert successful\n";
        
        // Retrieve the inserted row to verify
        $stmt = $pdo->query("SELECT id, original_name, mime_type, size, length(data) as data_len FROM stored_files WHERE original_name = 'test.jpg'");
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "Retrieved row:\n";
        print_r($row);
        
        // Clean up
        $pdo->exec("DELETE FROM stored_files WHERE original_name = 'test.jpg'");
        echo "Cleaned up\n";
    } else {
        echo "Insert failed\n";
    }
} catch (PDOException $e) {
    echo "PDO Error: " . $e->getMessage() . "\n";
    echo "SQL state: " . $e->getCode() . "\n";
}
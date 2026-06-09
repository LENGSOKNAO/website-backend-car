<?php

require __DIR__.'/vendor/autoload.php';

// Use the Neon database credentials from vercel.json
$db = new PDO(
    'pgsql:host=ep-hidden-resonance-ap5l7tt5.c-7.us-east-1.aws.neon.tech;port=5432;dbname=neondb;sslmode=require',
    'neondb_owner',
    'npg_K2dZURDFu7OY'
);

// Set error mode
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Try to insert a small binary blob
$stmt = $db->prepare("INSERT INTO stored_files (id, original_name, mime_type, size, data) VALUES (gen_random_uuid(), 'test.jpg', 'image/jpeg', 100, ?)");
$data = file_get_contents(__DIR__.'/public/favicon.ico'); // 16x16 ICO
$stmt->execute([$data]);

echo "Inserted successfully\n";

// Now try to retrieve it
$stmt = $db->query("SELECT id, original_name, mime_type, size, length(data) as data_length FROM stored_files WHERE original_name = 'test.jpg'");
$row = $stmt->fetch(PDO::FETCH_ASSOC);
echo "Retrieved: ";
print_r($row);

// Clean up
$stmt = $db->prepare("DELETE FROM stored_files WHERE original_name = 'test.jpg'");
$stmt->execute();
echo "Cleaned up\n";

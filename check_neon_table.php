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
    
    // Check if stored_files table exists
    $stmt = $pdo->query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'stored_files') as exists");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row['exists']) {
        echo "Table stored_files exists.\n";
        
        // Get column information
        $stmt = $pdo->query("SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'stored_files' ORDER BY ordinal_position");
        $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo "Columns:\n";
        foreach ($columns as $col) {
            echo " - {$col['column_name']}: {$col['data_type']} (nullable: {$col['is_nullable']}, default: {$col['column_default']})\n";
        }
    } else {
        echo "Table stored_files does not exist.\n";
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
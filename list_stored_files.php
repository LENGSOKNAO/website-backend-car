<?php
$pdo = new PDO(
    'pgsql:host=ep-hidden-resonance-ap5l7tt5.c-7.us-east-1.aws.neon.tech;port=5432;dbname=neondb;sslmode=require',
    'neondb_owner',
    'npg_K2dZURDFu7OY'
);

$stmt = $pdo->query("SELECT id, original_name, mime_type FROM stored_files");
echo "Total stored files: " . $stmt->rowCount() . "\n\n";

foreach ($stmt as $row) {
    echo "ID: " . $row['id'] . "\n";
    echo "Original name: " . $row['original_name'] . "\n";
    echo "MIME type: " . $row['mime_type'] . "\n";
    echo "-------------------------\n";
}
?>
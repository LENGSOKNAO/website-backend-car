<?php
$pdo = new PDO(
    'pgsql:host=ep-hidden-resonance-ap5l7tt5.c-7.us-east-1.aws.neon.tech;port=5432;dbname=neondb;sslmode=require',
    'neondb_owner',
    'npg_K2dZURDFu7OY'
);

// Check banners with the specific URLs mentioned in errors
$stmt = $pdo->prepare("SELECT id, image_url FROM banners WHERE image_url LIKE '%b06bb862-6abd-48cd-afb8-3a9a47f44187.png%' OR image_url LIKE '%0ce371e3-4fae-40cf-97a5-a7ceb1b455c0.png%' OR image_url LIKE '%452c7cd8-6301-491a-af03-244723cdffaf.png%' OR image_url LIKE '%15ac6198-689b-4500-8e31-a82ce8083010.png%' OR image_url LIKE '%c6260452-59e4-4a77-a3a1-5b4ff260abf0.png%'");
$banners = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo "Banners with problematic URLs:\n";
foreach ($banners as $banner) {
    echo "ID: " . $banner['id'] . ", URL: " . $banner['image_url'] . "\n";
}

// Check users with avatar issues
$stmt = $pdo->prepare("SELECT id, avatar_url FROM users WHERE avatar_url LIKE '%098e63b2-e31a-4e7a-8f1c-c5621777c5bf.png%'");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo "\nUsers with problematic avatar URLs:\n";
foreach ($users as $user) {
    echo "ID: " . $user['id'] . ", URL: " . $user['avatar_url'] . "\n";
}
?>
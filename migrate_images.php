<?php
$pdo = new PDO(
    'pgsql:host=ep-hidden-resonance-ap5l7tt5.c-7.us-east-1.aws.neon.tech;port=5432;dbname=neondb;sslmode=require',
    'neondb_owner',
    'npg_K2dZURDFu7OY'
);

echo "=== Users (avatar_url) ===\n";
$s = $pdo->query("SELECT id, avatar_url FROM users WHERE avatar_url IS NOT NULL AND avatar_url LIKE '%/storage/%'");
foreach ($s as $r) echo $r['id'] . ' | ' . $r['avatar_url'] . "\n";

echo "\n=== Listing Images (image_url) ===\n";
try {
    $s = $pdo->query("SELECT id, listing_id, image_url FROM listing_images WHERE image_url LIKE '%/storage/%'");
    foreach ($s as $r) echo $r['id'] . ' | listing=' . $r['listing_id'] . ' | ' . $r['image_url'] . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

echo "\n=== Banners (image_url) ===\n";
try {
    $s = $pdo->query("SELECT id, image_url FROM banners WHERE image_url IS NOT NULL AND image_url LIKE '%/storage/%'");
    foreach ($s as $r) echo $r['id'] . ' | ' . $r['image_url'] . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

echo "\n=== Heroes (image_url) ===\n";
try {
    $s = $pdo->query("SELECT id, image_url FROM heroes WHERE image_url IS NOT NULL AND image_url LIKE '%/storage/%'");
    foreach ($s as $r) echo $r['id'] . ' | ' . $r['image_url'] . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

echo "\n=== Seller verifications ===\n";
try {
    $s = $pdo->query("SELECT id, id_image_url, business_license_url FROM seller_verifications WHERE id_image_url LIKE '%/storage/%' OR business_license_url LIKE '%/storage/%'");
    foreach ($s as $r) echo $r['id'] . ' | id_image=' . $r['id_image_url'] . ' | license=' . $r['business_license_url'] . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}

echo "\n=== Car listings (checking all text columns) ===\n";
$cols = $pdo->query("SELECT column_name FROM information_schema.columns WHERE table_name='car_listings' AND data_type LIKE '%char%'");
foreach ($cols as $c) {
    $col = $c['column_name'];
    try {
        $q = $pdo->query("SELECT id, \"$col\" FROM car_listings WHERE \"$col\" LIKE '%/storage/%' LIMIT 5");
        foreach ($q as $r) echo 'car_listings.' . $col . ' | ' . $r['id'] . ' | ' . $r[$col] . "\n";
    } catch (Exception $e) {
        // Ignore missing columns
    }
}

<?php
$pdo = new PDO(
    'pgsql:host=ep-hidden-resonance-ap5l7tt5.c-7.us-east-1.aws.neon.tech;port=5432;dbname=neondb;sslmode=require',
    'neondb_owner',
    'npg_K2dZURDFu7OY'
);

$basePath = __DIR__.'/../storage/app/public';
$baseUrl = 'https://admin-car-2dr5.vercel.app/api/files';

echo "Migrating old storage images to database...\n\n";

// Function to store file in database and return new URL
function storeFileInDb($pdo, $filePath, $originalName) {
    $data = file_get_contents($filePath);
    $mime = mime_content_type($filePath);
    $size = strlen($data);
    
    $stmt = $pdo->prepare("
        INSERT INTO stored_files (id, original_name, mime_type, size, data)
        VALUES (?, ?, ?, ?, ?)
    ");
    $id = Str::uuid();
    $stmt->execute([$id, $originalName, $mime, $size, $data]);
    
    return $baseUrl.'/'.$id;
}

// Migrate user avatars
echo "=== Migrating user avatars ===\n";
$stmt = $pdo->query("SELECT id, avatar_url FROM users WHERE avatar_url IS NOT NULL AND avatar_url LIKE '%/storage/avatars/%'");
$avatars = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo "Found ".count($avatars)." avatars to migrate\n";

foreach ($avatars as $avatar) {
    // Extract filename from /storage/avatars/xxx.png
    if (preg_match('#/storage/avatars/([^/]+)$#', $avatar['avatar_url'], $matches)) {
        $filename = $matches[1];
        $localPath = $basePath.'/avatars/'.$filename;
        
        if (file_exists($localPath)) {
            // Check if already migrated
            $check = $pdo->prepare("SELECT id FROM stored_files WHERE original_name = ?");
            $check->execute([$filename]);
            $existing = $check->fetch();
            
            if ($existing) {
                $newUrl = $baseUrl.'/'.$existing['id'];
            } else {
                $newUrl = storeFileInDb($pdo, $localPath, $filename);
            }
            
            // Update database
            $update = $pdo->prepare("UPDATE users SET avatar_url = ? WHERE id = ?");
            $update->execute([$newUrl, $avatar['id']]);
            echo "Migrated avatar: {$filename}\n";
        }
    }
}

// Migrate banner images
echo "\n=== Migrating banner images ===\n";
$stmt = $pdo->query("SELECT id, image_url FROM banners WHERE image_url IS NOT NULL AND image_url LIKE '%/storage/seller-images/%'");
$banners = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo "Found ".count($banners)." banner images to migrate\n";

foreach ($banners as $banner) {
    if (preg_match('#/storage/seller-images/([^/]+)$#', $banner['image_url'], $matches)) {
        $filename = $matches[1];
        $localPath = $basePath.'/seller-images/'.$filename;
        
        if (file_exists($localPath)) {
            $check = $pdo->prepare("SELECT id FROM stored_files WHERE original_name = ?");
            $check->execute([$filename]);
            $existing = $check->fetch();
            
            if ($existing) {
                $newUrl = $baseUrl.'/'.$existing['id'];
            } else {
                $newUrl = storeFileInDb($pdo, $localPath, $filename);
            }
            
            $update = $pdo->prepare("UPDATE banners SET image_url = ? WHERE id = ?");
            $update->execute([$newUrl, $banner['id']]);
            echo "Migrated banner: {$filename}\n";
        }
    }
}

// Migrate listing images
echo "\n=== Migrating listing images ===\n";
$stmt = $pdo->query("SELECT id, listing_id, image_url FROM listing_images WHERE image_url LIKE '%/storage/listings/%'");
$listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo "Found ".count($listings)." listing images to migrate\n";

foreach ($listings as $listing) {
    // Extract listing_id and filename from /storage/listings/{listing_id}/{filename}
    if (preg_match('#/storage/listings/(\d+)/([^/]+)$#', $listing['image_url'], $matches)) {
        $listingId = $matches[1];
        $filename = $matches[2];
        $localPath = $basePath.'/listings/'.$listingId.'/'.$filename;
        
        if (file_exists($localPath)) {
            $check = $pdo->prepare("SELECT id FROM stored_files WHERE original_name = ?");
            $check->execute([$filename]);
            $existing = $check->fetch();
            
            if ($existing) {
                $newUrl = $baseUrl.'/'.$existing['id'];
            } else {
                $newUrl = storeFileInDb($pdo, $localPath, $filename);
            }
            
            $update = $pdo->prepare("UPDATE listing_images SET image_url = ? WHERE id = ?");
            $update->execute([$newUrl, $listing['id']]);
            echo "Migrated listing image: {$filename}\n";
        }
    }
}

// Migrate seller verifications
echo "\n=== Migrating seller verifications ===\n";
$stmt = $pdo->query("SELECT id, id_image_url, business_license_url FROM seller_verifications WHERE id_image_url LIKE '%/storage/verifications/%' OR business_license_url LIKE '%/storage/verifications/%'");
$verifications = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo "Found ".count($verifications)." verifications to migrate\n";

foreach ($verifications as $ver) {
    // Handle id_image_url
    if (!empty($ver['id_image_url']) && preg_match('#/storage/verifications/([^/]+)$#', $ver['id_image_url'], $matches)) {
        $filename = $matches[1];
        $localPath = $basePath.'/verifications/'.$filename;
        
        if (file_exists($localPath)) {
            $check = $pdo->prepare("SELECT id FROM stored_files WHERE original_name = ?");
            $check->execute([$filename]);
            $existing = $check->fetch();
            
            if ($existing) {
                $newUrl = $baseUrl.'/'.$existing['id'];
            } else {
                $newUrl = storeFileInDb($pdo, $localPath, $filename);
            }
            
            $update = $pdo->prepare("UPDATE seller_verifications SET id_image_url = ? WHERE id = ?");
            $update->execute([$newUrl, $ver['id']]);
            echo "Migrated verification ID image: {$filename}\n";
        }
    }
    
    // Handle business_license_url
    if (!empty($ver['business_license_url']) && preg_match('#/storage/verifications/([^/]+)$#', $ver['business_license_url'], $matches)) {
        $filename = $matches[1];
        $localPath = $basePath.'/verifications/'.$filename;
        
        if (file_exists($localPath)) {
            $check = $pdo->prepare("SELECT id FROM stored_files WHERE original_name = ?");
            $check->execute([$filename]);
            $existing = $check->fetch();
            
            if ($existing) {
                $newUrl = $baseUrl.'/'.$existing['id'];
            } else {
                $newUrl = storeFileInDb($pdo, $localPath, $filename);
            }
            
            $update = $pdo->prepare("UPDATE seller_verifications SET business_license_url = ? WHERE id = ?");
            $update->execute([$newUrl, $ver['id']]);
            echo "Migrated verification business license: {$filename}\n";
        }
    }
}

echo "\nMigration complete!\n";
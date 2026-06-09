<?php
$path = 'avatars/37892dd9-532d-4e5d-ad06-ba7e0b13735b.png';
echo "Testing path: $path\n";

$pathParts = explode('/', $path);
$lastPart = end($pathParts);
echo "Last part: $lastPart\n";

$pattern = '/^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(png|jpg|jpeg|gif|webp|avif|svg)$/i';
if (preg_match($pattern, $lastPart, $matches)) {
    echo "Regex MATCHED!\n";
    echo "UUID: " . $matches[1] . "\n";
    echo "Extension: " . $matches[2] . "\n";
} else {
    echo "Regex did NOT match!\n";
    echo "Pattern: $pattern\n";
}
?>
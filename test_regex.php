<?php
$path = '37892dd9-532d-4e5d-ad06-ba7e0b13735b.png';
echo "Testing path: $path\n";

$pathParts = explode('/', $path);
$lastPart = end($pathParts);
echo "Last part: $lastPart\n";

if (preg_match('/^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(png|jpg|jpeg|gif|webp|avif|svg)$/i', $lastPart, $matches)) {
    echo "Regex matched!\n";
    echo "UUID: " . $matches[1] . "\n";
    echo "Extension: " . $matches[2] . "\n";
} else {
    echo "Regex did NOT match!\n";
}
?>
<?php

$token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vc3RvcmUtY2FyLXNldmVuLnZlcmNlbC5hcHAvdjEvYXV0aC9sb2dpbiIsImlhdCI6MTc4MTM0MTM1MywiZXhwIjoxNzgxMzQ0OTUzLCJuYmYiOjE3ODEzNDEzNTMsImp0aSI6Im9WWnhVMG42U1FsNklVa3UiLCJzdWIiOiIwMTllOWQwOS1iY2FjLTczMmEtYjNlOC0xYTUwNDJiNGEwODciLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.B2LKe28jIuDcbVbTL3Lsy1RnprV1C90iBeGYCO3Bk4Q";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://store-car-seven.vercel.app/api/v1/cars');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    'Authorization: Bearer ' . $token
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_VERBOSE, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: $httpCode\n";
echo "Response: $response\n";

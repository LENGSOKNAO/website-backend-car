<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\DB;

$user = User::where('email', 'superadminD@example.com')->first();
if ($user) {
    $userId = $user->id;
    DB::table('conversations')->where('sender_id', $userId)->delete();
    DB::table('conversations')->where('receiver_id', $userId)->delete();
    $user->delete();
    echo "User deleted\n";
} else {
    echo "User not found\n";
}
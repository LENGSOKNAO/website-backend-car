<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$users = App\Models\User::where('type', 'seller')->get(['email']);
foreach ($users as $u) echo $u->email . PHP_EOL;

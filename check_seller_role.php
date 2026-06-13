<?php

require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$users = App\Models\User::role('seller')->get(['email', 'type']);
foreach ($users as $u) echo $u->email . ' - ' . $u->type . PHP_EOL;

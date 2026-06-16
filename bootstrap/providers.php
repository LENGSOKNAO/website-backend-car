<?php

use App\Providers\AppServiceProvider;
use App\Providers\FortifyServiceProvider;
use Illuminate\Auth\Passwords\PasswordResetServiceProvider;

return [
    AppServiceProvider::class,
    FortifyServiceProvider::class,
    PasswordResetServiceProvider::class,
];

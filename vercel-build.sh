#!/usr/bin/env sh
set -e
cp .env.example .env 2>/dev/null || true
curl -sS https://getcomposer.org/installer | php -- --install-dir=/tmp --filename=composer
/tmp/composer install --no-dev --optimize-autoloader
php artisan key:generate --force
mkdir -p storage/app/public storage/framework/{cache,sessions,views} storage/logs bootstrap/cache
php artisan migrate --force || true
npm install && npm run build
php artisan config:cache && php artisan route:cache && php artisan view:cache
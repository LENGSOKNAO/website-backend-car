#!/usr/bin/env bash
set -e

echo "🚀 Starting Vercel build process..."

# Create .env from .env.example if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
fi

# Install Composer
echo "📦 Installing Composer..."
curl -sS https://getcomposer.org/installer | php -- --install-dir=/tmp --filename=composer

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
/tmp/composer install --no-dev --optimize-autoloader

# Generate app key if not set
if ! grep -q "APP_KEY=base64:" .env; then
    echo "🔑 Generating APP_KEY..."
    php artisan key:generate --force
fi

# Create storage directories
echo "📁 Creating storage directories..."
mkdir -p storage/app/public storage/framework/{cache,sessions,views} storage/logs bootstrap/cache

# Run database migrations (with error handling)
echo "🗄️ Running database migrations..."
php artisan migrate --force || {
    echo "⚠️ Migration failed, but continuing build..."
}

# Install Node dependencies
echo "📦 Installing Node dependencies..."
npm install

# Build frontend assets
echo "🏗️ Building frontend assets..."
npm run build

# Clear and cache config (after build so Vite manifest is available)
echo "⚡ Optimizing Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Build completed successfully!"
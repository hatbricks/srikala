#!/usr/bin/env bash
set -e

echo "=========================================="
echo "🚀 Ravichandra Textiles — Auto Deployment"
echo "=========================================="

APP_DIR="/var/www/srikala"
cd "$APP_DIR"

echo "📥 1. Pulling latest changes from git..."
git checkout -- . 2>/dev/null || true
git fetch origin main
git reset --hard origin/main

echo "📦 2. Installing backend dependencies..."
cd "$APP_DIR/backend"
npm install --omit=dev

echo "🖼️ 2b. Migrating any base64 images to optimized disk WebP files..."
node src/scripts/migrate-images-to-disk.js 2>/dev/null || true

echo "🏗️ 3. Building frontend production bundle..."
cd "$APP_DIR/frontend"
npm install
npm run build

echo "🔄 4. Zero-downtime reload backend API..."
pm2 reload ravichandra-api --update-env || pm2 restart ravichandra-api --update-env

echo "🌐 5. Updating & reloading Nginx..."
sudo cp "$APP_DIR/nginx-ravichandra.conf" /etc/nginx/sites-available/ravichandra.conf 2>/dev/null || true
sudo nginx -t 2>/dev/null && sudo systemctl reload nginx 2>/dev/null || true

echo "=========================================="
echo "✅ Deployment completed successfully!"
echo "=========================================="

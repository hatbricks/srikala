#!/usr/bin/env bash
# ==============================================================================
# 🔄 Ravichandra Textiles — Database & Uploads Restore Script
# ==============================================================================
# Usage:
#   bash /var/www/srikala/scripts/restore.sh <path-to-db-backup.sql.gz> [<path-to-uploads.tar.gz>]
# ==============================================================================
set -e

BACKUP_FILE="$1"
MEDIA_FILE="$2"
DB_NAME="srikala"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <path-to-db-backup.sql.gz> [optional-path-to-uploads.tar.gz]"
  echo ""
  echo "Available backups in /var/backups/srikala:"
  ls -lh /var/backups/srikala/srikala_db_*.sql.gz 2>/dev/null || echo "No backups found."
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Error: Backup file '$BACKUP_FILE' not found!" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${SCRIPT_DIR}/../backend/.env"
if [ ! -f "$ENV_FILE" ]; then
  ENV_FILE="/var/www/srikala/backend/.env"
fi

DATABASE_URL=""
if [ -f "$ENV_FILE" ]; then
  DATABASE_URL=$(grep -E '^[[:space:]]*DATABASE_URL=' "$ENV_FILE" | head -n1 | cut -d'=' -f2- | tr -d '"' | tr -d "'" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
fi

echo "⚠️  WARNING: Restoring will overwrite existing data!"
read -p "Are you sure you want to proceed? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
  echo "Aborted."
  exit 0
fi

echo "🗄️  Restoring database from '${BACKUP_FILE}'..."
if [ -n "$DATABASE_URL" ]; then
  gunzip -c "$BACKUP_FILE" | psql "$DATABASE_URL"
else
  gunzip -c "$BACKUP_FILE" | sudo -u postgres psql -d "$DB_NAME"
fi
echo "✅ Database restored successfully!"

if [ -n "$MEDIA_FILE" ] && [ -f "$MEDIA_FILE" ]; then
  echo "🖼️  Restoring uploads from '${MEDIA_FILE}'..."
  tar -xzf "$MEDIA_FILE" -C /var/www/srikala/backend/
  echo "✅ Uploads restored successfully!"
fi

echo "🔄 Restarting API..."
pm2 reload ravichandra-api || true
echo "🎉 Restoration complete!"

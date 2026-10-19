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

echo "⚠️  WARNING: Restoring will overwrite existing data in database '${DB_NAME}'!"
read -p "Are you sure you want to proceed? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
  echo "Aborted."
  exit 0
fi

echo "🗄️  Restoring database from '${BACKUP_FILE}'..."
gunzip -c "$BACKUP_FILE" | sudo -u postgres psql -d "$DB_NAME"
echo "✅ Database restored successfully!"

if [ -n "$MEDIA_FILE" ] && [ -f "$MEDIA_FILE" ]; then
  echo "🖼️  Restoring uploads from '${MEDIA_FILE}'..."
  tar -xzf "$MEDIA_FILE" -C /var/www/srikala/backend/
  echo "✅ Uploads restored successfully!"
fi

echo "🔄 Restarting API..."
pm2 reload ravichandra-api || true
echo "🎉 Restoration complete!"

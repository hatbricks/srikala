#!/usr/bin/env bash
# ==============================================================================
# 🛡️ Ravichandra Textiles — Automated Database & Uploads Backup Script
# ==============================================================================
# Usage:
#   bash /var/www/srikala/scripts/backup.sh
# Automated Cron (Run daily at 2:00 AM):
#   0 2 * * * /bin/bash /var/www/srikala/scripts/backup.sh >> /var/log/srikala_backup.log 2>&1
# ==============================================================================
set -e

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/var/backups/srikala"
DB_NAME="srikala"
RETENTION_DAYS=14

mkdir -p "$BACKUP_DIR"

echo "========================================================"
echo "📦 Starting Sri Kala Backup: $(date)"
echo "========================================================"

# 1. Database Backup via pg_dump
DB_BACKUP_FILE="$BACKUP_DIR/srikala_db_${TIMESTAMP}.sql.gz"
echo "🗄️  Dumping PostgreSQL database '${DB_NAME}'..."
if sudo -u postgres pg_dump "$DB_NAME" | gzip -9 > "$DB_BACKUP_FILE"; then
  DB_SIZE=$(du -h "$DB_BACKUP_FILE" | cut -f1)
  echo "✅ Database backup successful: ${DB_BACKUP_FILE} (${DB_SIZE})"
else
  echo "❌ Database backup failed!" >&2
  exit 1
fi

# 2. Uploads & Photos Archive
UPLOADS_DIR="/var/www/srikala/backend/uploads"
if [ -d "$UPLOADS_DIR" ] && [ "$(ls -A "$UPLOADS_DIR" 2>/dev/null)" ]; then
  MEDIA_BACKUP_FILE="$BACKUP_DIR/srikala_uploads_${TIMESTAMP}.tar.gz"
  echo "🖼️  Archiving uploaded product & category media..."
  tar -czf "$MEDIA_BACKUP_FILE" -C /var/www/srikala/backend uploads 2>/dev/null || true
  MEDIA_SIZE=$(du -h "$MEDIA_BACKUP_FILE" 2>/dev/null | cut -f1 || echo "0B")
  echo "✅ Media backup successful: ${MEDIA_BACKUP_FILE} (${MEDIA_SIZE})"
fi

# 3. Clean up backups older than RETENTION_DAYS
echo "🧹 Cleaning up backups older than ${RETENTION_DAYS} days..."
DELETED_COUNT=$(find "$BACKUP_DIR" -type f \( -name "srikala_db_*.sql.gz" -o -name "srikala_uploads_*.tar.gz" \) -mtime +${RETENTION_DAYS} -print -delete | wc -l)
echo "   Removed ${DELETED_COUNT} outdated backup archive(s)."

# 4. Summary of current backups
TOTAL_BACKUPS=$(ls -1 "$BACKUP_DIR"/srikala_db_*.sql.gz 2>/dev/null | wc -l || echo "0")
TOTAL_USAGE=$(du -sh "$BACKUP_DIR" | cut -f1)

echo "========================================================"
echo "🎉 Backup Complete! Current total: ${TOTAL_BACKUPS} backup(s), Total size: ${TOTAL_USAGE}"
echo "   Directory: ${BACKUP_DIR}"
echo "========================================================"

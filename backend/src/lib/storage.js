import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directory for file uploads
export const UPLOAD_DIR = path.resolve(__dirname, '../../uploads');

export function ensureUploadDirs() {
  const dirs = [
    UPLOAD_DIR,
    path.join(UPLOAD_DIR, 'products'),
    path.join(UPLOAD_DIR, 'categories'),
    path.join(UPLOAD_DIR, 'misc'),
  ];
  for (const d of dirs) {
    if (!fs.existsSync(d)) {
      fs.mkdirSync(d, { recursive: true });
    }
  }
}

const DATA_URL_RE = /^data:image\/(png|jpe?g|jpg|webp|gif);base64,(.+)$/i;

/**
 * Saves a base64 image data URL to disk as an optimized WebP file.
 * Returns the public relative URL (e.g. '/uploads/products/abc123.webp').
 * If the input is already a static URL (starts with '/'), returns it as-is.
 */
export async function saveImageToDisk(dataUrl, subfolder = 'products', maxDimension = 1400, quality = 80) {
  if (!dataUrl || typeof dataUrl !== 'string') return dataUrl;

  // Already a static file path or external URL
  if (dataUrl.startsWith('/') || dataUrl.startsWith('http://') || dataUrl.startsWith('https://')) {
    return dataUrl;
  }

  const match = DATA_URL_RE.exec(dataUrl.trim());
  if (!match) return dataUrl;

  try {
    ensureUploadDirs();
    const targetDir = path.join(UPLOAD_DIR, subfolder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const buffer = Buffer.from(match[2], 'base64');
    const hash = crypto.createHash('md5').update(buffer).digest('hex').slice(0, 16);
    const filename = `${Date.now()}_${hash}.webp`;
    const filePath = path.join(targetDir, filename);

    await sharp(buffer)
      .resize({
        width: maxDimension,
        height: maxDimension,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality })
      .toFile(filePath);

    return `/uploads/${subfolder}/${filename}`;
  } catch (err) {
    console.error('[storage/saveImageToDisk] Failed to save image:', err.message);
    return dataUrl; // fallback to original dataUrl if sharp fails
  }
}

/**
 * Process an array of images (e.g. product gallery)
 */
export async function saveImagesArrayToDisk(images = [], subfolder = 'products') {
  if (!Array.isArray(images)) return [];
  const results = [];
  for (const img of images) {
    results.push(await saveImageToDisk(img, subfolder));
  }
  return results;
}

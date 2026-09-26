import fs from 'fs';
import path from 'path';
import { decodePng, encodePng } from './process-logo.js';

const inputPath = '/Users/jwiteshoruganti/.gemini/antigravity/brain/9e3aa067-9f65-4019-8d4b-248b758bae24/.user_uploaded/media_1790268688836.png';
const imgBuf = fs.readFileSync(inputPath);
const src = decodePng(imgBuf);

// Crop the logo with padding
const minX = 210, maxX = 830, minY = 336, maxY = 660;
const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

console.log(`Cropped size: ${cropW} x ${cropH}`);

// 1. Create transparent logo for light background:
// Black background (0,0,0) becomes transparent.
// Text & ornament pixels keep their natural colors, with alpha proportional to brightness/density.
function createTransparentLogo(mode = 'original') {
  const buf = Buffer.alloc(cropW * cropH * 4);

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const srcIdx = ((minY + y) * src.width + (minX + x)) * 4;
      const dstIdx = (y * cropW + x) * 4;

      const r = src.data[srcIdx];
      const g = src.data[srcIdx + 1];
      const b = src.data[srcIdx + 2];

      const maxVal = Math.max(r, g, b);
      if (maxVal <= 12) {
        // Transparent black
        buf[dstIdx] = 0;
        buf[dstIdx + 1] = 0;
        buf[dstIdx + 2] = 0;
        buf[dstIdx + 3] = 0;
        continue;
      }

      // Estimate alpha from the luminance
      // Smooth step around threshold 12 to 45
      let alpha = 1;
      if (maxVal < 45) {
        alpha = (maxVal - 12) / (45 - 12);
      }
      const aByte = Math.min(255, Math.max(0, Math.round(alpha * 255)));

      if (mode === 'light_bg') {
        // For light backgrounds (ivory / white):
        // If it's the maroon script (r high, g and b low), enhance the maroon contrast so it's bold and rich
        const isMaroon = r > g * 1.5 && y < (cropH * 0.58);
        if (isMaroon) {
          // Rich royal crimson silk maroon
          const norm = Math.min(1, r / 100);
          buf[dstIdx] = Math.round(92 * norm);      // #5c
          buf[dstIdx + 1] = Math.round(26 * norm);  // #1a
          buf[dstIdx + 2] = Math.round(20 * norm);  // #14
          buf[dstIdx + 3] = Math.min(255, Math.round(Math.max(aByte, norm * 255)));
        } else {
          // Antique temple gold for flourishes and SILK EMPORIUM
          // Keep the original gold/warm hues, slightly enhanced for light paper
          buf[dstIdx] = Math.min(255, Math.round(r * 1.15));
          buf[dstIdx + 1] = Math.min(255, Math.round(g * 1.15));
          buf[dstIdx + 2] = Math.min(255, Math.round(b * 1.15));
          buf[dstIdx + 3] = aByte;
        }
      } else if (mode === 'gold_white') {
        // For dark backgrounds (deep maroon navbar, dark footer, hero):
        // "Sri Kala" script becomes luminous antique gold / warm champagne,
        // and the ornament/subtitle is glowing zari gold
        const isMaroon = r > g * 1.5 && y < (cropH * 0.58);
        if (isMaroon) {
          // Luminous warm champagne gold script
          const intensity = Math.min(1, r / 85);
          buf[dstIdx] = Math.round(242 * intensity);     // #f2
          buf[dstIdx + 1] = Math.round(214 * intensity); // #d6
          buf[dstIdx + 2] = Math.round(162 * intensity); // #a2
          buf[dstIdx + 3] = Math.min(255, Math.round(Math.max(aByte, intensity * 255)));
        } else {
          // Flourish & SILK EMPORIUM: rich metallic temple gold
          const intensity = Math.min(1, maxVal / 140);
          buf[dstIdx] = Math.min(255, Math.round(r * 1.35));
          buf[dstIdx + 1] = Math.min(255, Math.round(g * 1.35));
          buf[dstIdx + 2] = Math.min(255, Math.round(b * 1.35));
          buf[dstIdx + 3] = aByte;
        }
      } else {
        // Original colors with black keyed out
        buf[dstIdx] = r;
        buf[dstIdx + 1] = g;
        buf[dstIdx + 2] = b;
        buf[dstIdx + 3] = aByte;
      }
    }
  }

  return encodePng(cropW, cropH, buf);
}

// 2. Monogram / Emblem:
// Crop center around lotus flourish + diamond accent or the stylized monogram
function createEmblem(size = 512, darkBg = true) {
  // Center is around x: 520, y: 505 (lotus and flourish)
  const buf = Buffer.alloc(size * size * 4);
  const radius = size * 0.44;
  const cx = size / 2;
  const cy = size / 2;

  // Background circle
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        if (darkBg) {
          // Deep royal maroon silk background #2A0C10 with gold border
          if (dist > radius - 6) {
            // Gold ring border
            buf[idx] = 212;   // #d4
            buf[idx + 1] = 175; // #af
            buf[idx + 2] = 55;  // #37
            buf[idx + 3] = 255;
          } else if (dist > radius - 9) {
            // Inner gold ring
            buf[idx] = 176;
            buf[idx + 1] = 115;
            buf[idx + 2] = 46;
            buf[idx + 3] = 255;
          } else {
            buf[idx] = 42;
            buf[idx + 1] = 12;
            buf[idx + 2] = 16;
            buf[idx + 3] = 255;
          }
        } else {
          // Light / ivory silk background #FFFDF9 with maroon & gold border
          if (dist > radius - 6) {
            buf[idx] = 176;
            buf[idx + 1] = 115;
            buf[idx + 2] = 46;
            buf[idx + 3] = 255;
          } else {
            buf[idx] = 255;
            buf[idx + 1] = 253;
            buf[idx + 2] = 249;
            buf[idx + 3] = 255;
          }
        }
      } else {
        // Transparent outside circle
        buf[idx + 3] = 0;
      }
    }
  }

  // Draw the central lotus & Sri Kala initials / ornament
  // Sample source emblem around lotus (y: 470 to 560, x: 420 to 620)
  const srcY1 = 460, srcY2 = 560;
  const srcX1 = 380, srcX2 = 660;
  const sw = srcX2 - srcX1;
  const sh = srcY2 - srcY1;

  const targetW = size * 0.72;
  const targetH = targetW * (sh / sw);
  const targetX = (size - targetW) / 2;
  const targetY = (size - targetH) / 2;

  for (let ty = 0; ty < targetH; ty++) {
    for (let tx = 0; tx < targetW; tx++) {
      const sx = Math.floor(srcX1 + (tx / targetW) * sw);
      const sy = Math.floor(srcY1 + (ty / targetH) * sh);
      const sIdx = (sy * src.width + sx) * 4;

      const r = src.data[sIdx];
      const g = src.data[sIdx + 1];
      const b = src.data[sIdx + 2];
      const maxVal = Math.max(r, g, b);

      if (maxVal > 20) {
        const dx = Math.round(targetX + tx);
        const dy = Math.round(targetY + ty);
        if (dx >= 0 && dx < size && dy >= 0 && dy < size) {
          const dIdx = (dy * size + dx) * 4;
          if (buf[dIdx + 3] > 0) { // inside circle
            const alpha = Math.min(1, (maxVal - 15) / 50);
            if (darkBg) {
              // Glowing gold
              const goldR = Math.min(255, Math.round(r * 1.35 + 40));
              const goldG = Math.min(255, Math.round(g * 1.35 + 30));
              const goldB = Math.min(255, Math.round(b * 1.35 + 10));
              buf[dIdx] = Math.round(buf[dIdx] * (1 - alpha) + goldR * alpha);
              buf[dIdx + 1] = Math.round(buf[dIdx + 1] * (1 - alpha) + goldG * alpha);
              buf[dIdx + 2] = Math.round(buf[dIdx + 2] * (1 - alpha) + goldB * alpha);
            } else {
              // Royal maroon & gold
              const mR = r > g * 1.4 ? 92 : Math.min(255, Math.round(r * 1.1));
              const mG = r > g * 1.4 ? 26 : Math.min(255, Math.round(g * 1.1));
              const mB = r > g * 1.4 ? 20 : Math.min(255, Math.round(b * 1.1));
              buf[dIdx] = Math.round(buf[dIdx] * (1 - alpha) + mR * alpha);
              buf[dIdx + 1] = Math.round(buf[dIdx + 1] * (1 - alpha) + mG * alpha);
              buf[dIdx + 2] = Math.round(buf[dIdx + 2] * (1 - alpha) + mB * alpha);
            }
          }
        }
      }
    }
  }

  return encodePng(size, size, buf);
}

// Generate all target files
console.log('Generating logo-white.png (Gold/Ivory on transparent for dark headers/footers)...');
const logoWhite = createTransparentLogo('gold_white');
fs.writeFileSync('public/images/logo-white.png', logoWhite);

console.log('Generating logo.png (Maroon/Gold on transparent for light backgrounds)...');
const logoLight = createTransparentLogo('light_bg');
fs.writeFileSync('public/images/logo.png', logoLight);

console.log('Generating monogram-white.png...');
const monoWhite = createEmblem(512, true);
fs.writeFileSync('public/images/monogram-white.png', monoWhite);

console.log('Generating monogram.png...');
const monoDark = createEmblem(512, false);
fs.writeFileSync('public/images/monogram.png', monoDark);

console.log('Generating favicon.png (64x64)...');
const favBuf = createEmblem(64, true);
fs.writeFileSync('public/favicon.png', favBuf);

console.log('Generating apple-touch-icon.png (180x180)...');
const appleTouch = createEmblem(180, true);
fs.writeFileSync('public/apple-touch-icon.png', appleTouch);

console.log('Generating server/assets/logo-invoice.png (400x400)...');
const invoiceLogo = createEmblem(400, false);
fs.writeFileSync('server/assets/logo-invoice.png', invoiceLogo);

// Also write SVG favicon
const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill="#2A0C10" stroke="#C58B38" stroke-width="3"/>
  <circle cx="50" cy="50" r="43" fill="none" stroke="#D4AF37" stroke-width="1" stroke-dasharray="2 2"/>
  <!-- Lotus & Floral Motif -->
  <path d="M50 24 C53 35 62 44 68 47 C60 50 54 48 50 56 C46 48 40 50 32 47 C38 44 47 35 50 24 Z" fill="#E5A93C"/>
  <path d="M50 32 C51 38 56 43 60 45 C55 47 52 46 50 50 C48 46 45 47 40 45 C44 43 49 38 50 32 Z" fill="#FBDFB2"/>
  <!-- Central Diamond -->
  <polygon points="50,18 53,22 50,26 47,22" fill="#FBDFB2"/>
  <!-- Sri Kala SK stylized mark -->
  <text x="50" y="72" font-family="'Marcellus', 'Cinzel', Georgia, serif" font-size="22" font-weight="bold" fill="#FDFBF7" text-anchor="middle" letter-spacing="2">SK</text>
  <text x="50" y="83" font-family="Helvetica, Arial, sans-serif" font-size="6.5" font-weight="600" fill="#D4AF37" text-anchor="middle" letter-spacing="2.5">SRI KALA</text>
  <path d="M28 87 L72 87" stroke="#C58B38" stroke-width="0.8"/>
  <circle cx="50" cy="87" r="1.5" fill="#FBDFB2"/>
</svg>`;
fs.writeFileSync('public/favicon.svg', svgFavicon);

console.log('All brand assets successfully generated!');

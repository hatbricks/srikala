import fs from 'fs';
import zlib from 'zlib';

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  buf.writeUInt32BE(crc32(typeAndData), 8 + len);
  return buf;
}

export function decodePng(buf) {
  let pos = 8;
  const idats = [];
  let width = 0, height = 0;
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.slice(pos + 4, pos + 8).toString('ascii');
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
    } else if (type === 'IDAT') {
      idats.push(buf.slice(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idats));
  const stride = 1 + width * 4;
  const raw = Buffer.alloc(width * height * 4);
  let prevRow = Buffer.alloc(width * 4);
  for (let y = 0; y < height; y++) {
    const filter = decompressed[y * stride];
    const srcRow = decompressed.slice(y * stride + 1, (y + 1) * stride);
    const dstRow = raw.slice(y * width * 4, (y + 1) * width * 4);
    for (let x = 0; x < width * 4; x++) {
      const a = x >= 4 ? dstRow[x - 4] : 0;
      const b = prevRow[x];
      const c = x >= 4 ? prevRow[x - 4] : 0;
      let val = srcRow[x];
      if (filter === 1) val = (val + a) & 0xff;
      else if (filter === 2) val = (val + b) & 0xff;
      else if (filter === 3) val = (val + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        val = (val + (pa <= pb && pa <= pc ? a : (pb <= pc ? b : c))) & 0xff;
      }
      dstRow[x] = val;
    }
    prevRow = dstRow;
  }
  return { width, height, data: raw };
}

export function encodePng(width, height, rgba) {
  const stride = 1 + width * 4;
  const filtered = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    filtered[y * stride] = 0; // Filter None
    rgba.copy(filtered, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }
  const compressed = zlib.deflateSync(filtered, { level: 9 });

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bit
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // Deflate
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // No interlace

  const header = Buffer.from('89504e470d0a1a0a', 'hex');
  const ihdr = makeChunk('IHDR', ihdrData);
  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdr, idat, iend]);
}

const inputPath = '/Users/jwiteshoruganti/.gemini/antigravity/brain/9e3aa067-9f65-4019-8d4b-248b758bae24/.user_uploaded/media_1790268688836.png';
const imgBuf = fs.readFileSync(inputPath);
const { width, height, data } = decodePng(imgBuf);

const samples = [[0,0], [1023,0], [0,1023], [1023,1023], [100, 100], [500, 100]];
for (const [x, y] of samples) {
  const idx = (y * width + x) * 4;
  console.log(`Pixel (${x},${y}): R=${data[idx]}, G=${data[idx+1]}, B=${data[idx+2]}, A=${data[idx+3]}`);
}

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const imgDir = path.join(root, 'frontend/public/images/transitions');
const outDir = path.join(root, 'frontend/public/videos');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Building cinematic hero video...');

// 1. Inputs
const img1 = path.join(imgDir, '1_beach.jpg');
const img2 = path.join(imgDir, '2_blue_saree.jpg');
const img3 = path.join(imgDir, '3_red_rose.jpg');
const img4 = path.join(imgDir, '4_red_saree.jpg');

const outputFile = path.join(outDir, 'hero-saree-transition.mp4');

// We will use 30 fps, 1920x1080 output for crisp quality and small web bundle size.
// Clip duration: 4.5 seconds per scene (135 frames).
// Transitions: 1.2 seconds (36 frames).
// Offset 1: 3.3s (Beach -> Blue Saree, dissolve/smooth)
// Offset 2: 6.6s (Blue Saree -> Red Rose, radial/circleopen)
// Offset 3: 9.9s (Red Rose -> Red Saree, dissolve)
// Offset 4: 13.2s (Red Saree -> Beach, fade)
// Total loop duration: ~14.4 seconds of seamless beauty!

const fps = 30;
const d = 4.5; // duration of each slide
const trans = 1.2; // transition duration

// Step 1: Render 4 motion clips with subtle Ken Burns pan/zoom
const clip1 = path.join(outDir, 'clip1.mp4');
const clip2 = path.join(outDir, 'clip2.mp4');
const clip3 = path.join(outDir, 'clip3.mp4');
const clip4 = path.join(outDir, 'clip4.mp4');

console.log('Rendering clip 1 (Beach waves zoom)...');
execSync(`ffmpeg -y -loop 1 -i "${img1}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0008,1.10)':d=${d * fps}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=${fps}" -t ${d} -c:v libx264 -pix_fmt yuv420p "${clip1}"`, { stdio: 'inherit' });

console.log('Rendering clip 2 (Blue saree slow pan)...');
execSync(`ffmpeg -y -loop 1 -i "${img2}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(max(zoom,1.08)-0.0006,1.08)':d=${d * fps}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=${fps}" -t ${d} -c:v libx264 -pix_fmt yuv420p "${clip2}"`, { stdio: 'inherit' });

console.log('Rendering clip 3 (Red rose macro bloom)...');
execSync(`ffmpeg -y -loop 1 -i "${img3}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0008,1.10)':d=${d * fps}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=${fps}" -t ${d} -c:v libx264 -pix_fmt yuv420p "${clip3}"`, { stdio: 'inherit' });

console.log('Rendering clip 4 (Red bridal pattu saree upward track)...');
execSync(`ffmpeg -y -loop 1 -i "${img4}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(max(zoom,1.08)-0.0006,1.08)':d=${d * fps}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=${fps}" -t ${d} -c:v libx264 -pix_fmt yuv420p "${clip4}"`, { stdio: 'inherit' });

console.log('Fusing clips with cinematic xfade transitions...');

// Filter chain combining the 4 clips:
// [0][1] xfade dissolve at offset 3.3s -> [v01]
// [v01][2] xfade circleopen at offset 6.6s -> [v02]
// [v02][3] xfade dissolve at offset 9.9s -> [v03]
// [v03][4] (loop back to clip1 head) xfade fade at offset 13.2s -> output
const offset1 = d - trans;
const offset2 = offset1 + (d - trans);
const offset3 = offset2 + (d - trans);
const offset4 = offset3 + (d - trans);

const filterComplex = `
[0:v][1:v]xfade=transition=dissolve:duration=${trans}:offset=${offset1}[v01];
[v01][2:v]xfade=transition=circleopen:duration=${trans}:offset=${offset2}[v02];
[v02][3:v]xfade=transition=dissolve:duration=${trans}:offset=${offset3}[v03];
[v03][4:v]xfade=transition=fade:duration=${trans}:offset=${offset4}[vfinal]
`.replace(/\n/g, '').trim();

execSync(`ffmpeg -y -i "${clip1}" -i "${clip2}" -i "${clip3}" -i "${clip4}" -i "${clip1}" -filter_complex "${filterComplex}" -map "[vfinal]" -t ${offset4 + trans} -c:v libx264 -preset slow -crf 20 -movflags +faststart -pix_fmt yuv420p "${outputFile}"`, { stdio: 'inherit' });

// Cleanup temp clips
fs.unlinkSync(clip1);
fs.unlinkSync(clip2);
fs.unlinkSync(clip3);
fs.unlinkSync(clip4);

console.log(`Successfully generated hero video: ${outputFile}`);

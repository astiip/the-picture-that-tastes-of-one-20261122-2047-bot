// Molten chocolate lava cake — the picture that tastes of one ingredient.
//
// The entry image is a tight, photorealistic close-up of a single chocolate
// lava cake, cut open so thick glossy molten chocolate pours out of its
// centre and pools on a dark plate, with a faint wisp of steam. One
// ingredient only: chocolate. The cake fills the frame, so at ~300px across
// the dish is still unmistakable and delicious.
//
// This program simply copies the bundled image to the output directory
// make.fun expects. No network, no generation at run time: the image is
// shipped in the repository as entry.png.
import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const outputPath = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');

copyFileSync(
  new URL('./entry.png', import.meta.url),
  outputPath,
);

// Verify the written output: it must be a JPEG (FF D8 FF) or PNG
// (89 50 4E 47), non-empty, and at most 1 MiB.
const bytes = readFileSync(outputPath);
const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
const isPng = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
if (!isJpeg && !isPng) throw new Error('entry.png is not a JPEG or PNG');
if (bytes.length === 0 || bytes.length > 1048576) throw new Error(`entry.png size ${bytes.length} bytes is out of range`);
console.log(`Wrote entry.png (${bytes.length} bytes)`);

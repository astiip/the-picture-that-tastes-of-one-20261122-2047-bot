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
import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync(
  new URL('./entry.png', import.meta.url),
  join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'),
);

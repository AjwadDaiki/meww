/**
 * Remove backgrounds from PNJ cat images using Replicate remove-bg.
 * Ensures perfect transparency.
 */

import Replicate from 'replicate';
import { writeFile, readFile, readdir } from 'fs/promises';
import path from 'path';

const PNJ_DIR = path.resolve(__dirname, '../apps/web/public/pnj');

async function main() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) { console.error('REPLICATE_API_TOKEN not set'); process.exit(1); }

  const replicate = new Replicate({ auth: token });
  const files = (await readdir(PNJ_DIR)).filter(f => f.endsWith('.png'));

  console.log(`Processing ${files.length} PNJ images for background removal...\n`);

  for (const file of files) {
    const filepath = path.join(PNJ_DIR, file);
    const imageBuffer = await readFile(filepath);
    const imageDataUri = `data:image/png;base64,${imageBuffer.toString('base64')}`;

    console.log(`Removing background: ${file}...`);
    try {
      const output = await replicate.run('cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003', {
        input: {
          image: imageDataUri,
        },
      });

      const resultUrl = output as string;
      if (!resultUrl) { console.log('  No output, skipping'); continue; }

      const res = await fetch(resultUrl);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(filepath, buf);
      console.log(`  Done: ${file} (${(buf.byteLength / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`  FAILED ${file}:`, err instanceof Error ? err.message : err);
    }
  }

  console.log('\nAll PNJ backgrounds removed.');
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });

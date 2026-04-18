/**
 * Generate 6 PNJ cat mascots via Replicate.
 * Style: Lisa Frank strict (DESIGN4.md 0.2)
 *
 * Usage: REPLICATE_API_TOKEN=... npx tsx scripts/generate-pnj.ts
 */

import Replicate from 'replicate';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../apps/web/public/pnj');

const STYLE_SUFFIX = `Lisa Frank mascot style, thick 5px black outline, huge round eyes covering 30 percent of face with 2 white sparkle highlights each, simplified 3-4 geometric shapes body, cel-shaded 2 tones max flat coloring, 3 colors max per character, sparkles integrated on collar or around character head, kawaii Tamagotchi 2001 advertising illustration, PNG transparent background, 1024x1024, vibrant saturated colors, no text, single character isolated, full body visible`;

const PNJ = [
  {
    name: 'catsome',
    prompt: `Kawaii cartoon illustration of a ginger orange striped cat character standing upright, wearing round glasses, big enthusiastic open-mouth expression, waving one paw excitedly in the air, ${STYLE_SUFFIX}`,
  },
  {
    name: 'djmiaou',
    prompt: `Kawaii cartoon illustration of a gray cat character standing upright, wearing oversized pink headphones, chill half-closed eyes expression making peace sign with one paw, ${STYLE_SUFFIX}`,
  },
  {
    name: 'purrpaparazzi',
    prompt: `Kawaii cartoon illustration of a black cat character standing upright, holding a vintage camera with both paws, flash going off with star burst, surprised wide eyes expression, ${STYLE_SUFFIX}`,
  },
  {
    name: 'chaupion',
    prompt: `Kawaii cartoon illustration of a white cat character standing upright, wearing a shiny gold medal around neck, triumphant pose with both arms raised high, proud confident expression, ${STYLE_SUFFIX}`,
  },
  {
    name: 'dramatabby',
    prompt: `Kawaii cartoon illustration of a gray tabby striped cat character standing upright, wearing a small black top hat, one paw dramatically on forehead in theatrical fainting pose, exaggerated drama expression, ${STYLE_SUFFIX}`,
  },
  {
    name: 'glameow',
    prompt: `Kawaii cartoon illustration of a Siamese cream and brown cat character standing upright, wearing sparkly diamond collar and small pink sunglasses, fashion model pose with one paw on hip, chic glamorous expression, ${STYLE_SUFFIX}`,
  },
];

async function main() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    console.error('Error: REPLICATE_API_TOKEN not set');
    process.exit(1);
  }

  const replicate = new Replicate({ auth: token });

  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  console.log('Generating 6 PNJ cats (default expression)...\n');

  for (const pnj of PNJ) {
    console.log(`Generating ${pnj.name}...`);
    try {
      const output = await replicate.run('black-forest-labs/flux-schnell', {
        input: {
          prompt: pnj.prompt,
          num_outputs: 1,
          aspect_ratio: '1:1',
          output_format: 'png',
          output_quality: 95,
        },
      });

      const urls = output as string[];
      const url = urls[0];
      if (!url) throw new Error('No output URL');

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

      const buffer = Buffer.from(await response.arrayBuffer());
      const filepath = path.join(OUTPUT_DIR, `${pnj.name}-default.png`);
      await writeFile(filepath, buffer);

      console.log(`  Saved: ${pnj.name}-default.png (${(buffer.byteLength / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`  Failed ${pnj.name}:`, err);
    }
  }

  console.log('\nDone! Review the 6 PNJ in apps/web/public/pnj/');
  console.log('Validate with Ajwad before generating excited + talking expressions.');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});

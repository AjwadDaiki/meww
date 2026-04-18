/**
 * Generate Y2K radial beam backgrounds via Replicate Flux Schnell.
 * 3 variants for Ajwad to pick from.
 *
 * Usage: REPLICATE_API_TOKEN=... npx tsx scripts/generate-backgrounds.ts
 */

import Replicate from 'replicate';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../apps/web/public/textures');

const PROMPT = `radial beam pattern from center point, 6 to 8 saturated color stripes as wedges (rose pink #FF5FA2, yellow #FFE14B, cyan #3EC4E6, green #7FD957, purple #B565E8, orange #FF8C42), each wedge taking 30-45 degrees of the frame, emanating from a slightly off-center point, sharp edges between beams with slight glow on edges, Tamagotchi original ad poster style 2001, vibrant saturated colors, no text, no characters, no people, high resolution, 2048x1536, digital painting quality, bright cheerful Y2K aesthetic`;

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

  console.log('Generating 3 radial beam background variants...\n');

  for (let i = 1; i <= 3; i++) {
    console.log(`Variant ${i}/3...`);
    try {
      const output = await replicate.run('black-forest-labs/flux-schnell', {
        input: {
          prompt: PROMPT,
          num_outputs: 1,
          aspect_ratio: '4:3',
          output_format: 'jpg',
          output_quality: 90,
        },
      });

      const urls = output as string[];
      const url = urls[0];
      if (!url) throw new Error('No output URL');

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

      const buffer = Buffer.from(await response.arrayBuffer());
      const filename = `bg-radial-beams-v${i}.jpg`;
      const filepath = path.join(OUTPUT_DIR, filename);
      await writeFile(filepath, buffer);

      console.log(`  Saved: ${filepath} (${(buffer.byteLength / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`  Failed variant ${i}:`, err);
    }
  }

  console.log('\nDone! Review the 3 variants in apps/web/public/textures/');
  console.log('Pick the best one and rename to bg-radial-beams.jpg');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});

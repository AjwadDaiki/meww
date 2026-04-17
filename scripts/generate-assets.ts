/**
 * Generate cartoon background textures via Replicate (Flux Schnell).
 * Run once at setup: pnpm generate:assets
 *
 * Requires REPLICATE_API_TOKEN in env.
 * Outputs to apps/web/public/textures/ in both JPG and WebP formats.
 */

import Replicate from 'replicate';
import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../apps/web/public/textures');

const ASSETS = [
  {
    name: 'desk-cartoon',
    prompt:
      'top down view of a cartoon illustrated wooden desk surface, warm amber tones, ' +
      "children's book illustration style, clean line art, no objects on it, " +
      'horizontal tiling texture, subtle wood grain, flat colors with gentle shadows, ' +
      'art style like Studio Ghibli meets Tintin, warm lighting',
    width: 2048,
    height: 1536,
  },
  {
    name: 'cork-cartoon',
    prompt:
      'top down view of a cartoon illustrated cork board wall, warm tan color, ' +
      "children's book illustration style, clean line art, subtle cork texture dots, " +
      'empty with no pins, flat colors with gentle shadows, ' +
      'art style like Studio Ghibli meets Tintin, warm muted tones',
    width: 2048,
    height: 1536,
  },
] as const;

async function generateAsset(
  replicate: Replicate,
  asset: (typeof ASSETS)[number],
  variantIndex: number
): Promise<string> {
  console.log(`  Generating ${asset.name} variant ${variantIndex + 1}...`);

  const output = await replicate.run('black-forest-labs/flux-schnell', {
    input: {
      prompt: asset.prompt,
      num_outputs: 1,
      aspect_ratio: '4:3',
      output_format: 'jpg',
      output_quality: 90,
    },
  });

  const urls = output as string[];
  const url = urls[0];
  if (!url) throw new Error(`No output URL for ${asset.name}`);

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  const filename = `${asset.name}-v${variantIndex + 1}`;
  const jpgPath = path.join(OUTPUT_DIR, `${filename}.jpg`);

  await writeFile(jpgPath, buffer);
  console.log(`  Saved: ${jpgPath} (${(buffer.byteLength / 1024).toFixed(0)} KB)`);

  return jpgPath;
}

async function optimizeAsset(jpgPath: string): Promise<void> {
  const baseName = path.basename(jpgPath, '.jpg');

  // Optimize JPG (quality 85)
  const optimizedJpg = path.join(OUTPUT_DIR, `${baseName}-opt.jpg`);
  await sharp(jpgPath)
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(optimizedJpg);

  const jpgInfo = await sharp(optimizedJpg).metadata();
  console.log(`  Optimized JPG: ${optimizedJpg} (${jpgInfo.size ? (jpgInfo.size / 1024).toFixed(0) : '?'} KB)`);

  // Generate WebP (quality 80)
  const webpPath = path.join(OUTPUT_DIR, `${baseName}.webp`);
  await sharp(jpgPath)
    .webp({ quality: 80 })
    .toFile(webpPath);

  const webpInfo = await sharp(webpPath).metadata();
  console.log(`  WebP: ${webpPath} (${webpInfo.size ? (webpInfo.size / 1024).toFixed(0) : '?'} KB)`);
}

async function main() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    console.error('Error: REPLICATE_API_TOKEN not set in environment.');
    console.error('Get your token at https://replicate.com/account/api-tokens');
    process.exit(1);
  }

  const replicate = new Replicate({ auth: token });

  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  const variantsPerAsset = 3;

  for (const asset of ASSETS) {
    console.log(`\nGenerating ${asset.name} (${variantsPerAsset} variants)...`);

    for (let i = 0; i < variantsPerAsset; i++) {
      try {
        const jpgPath = await generateAsset(replicate, asset, i);
        await optimizeAsset(jpgPath);
      } catch (err) {
        console.error(`  Failed variant ${i + 1}:`, err);
      }
    }
  }

  console.log('\nDone! Review the variants in apps/web/public/textures/');
  console.log('Pick the best one, rename to desk-cartoon.jpg / cork-cartoon.jpg');
  console.log('and delete the rest.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

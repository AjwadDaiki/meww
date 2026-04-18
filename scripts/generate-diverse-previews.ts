/**
 * Generate 5 catalog previews with DIFFERENT cat reference photos.
 * Uses the 5 stock cats from docs/moodboard/cat-culture/.
 */

import Replicate from 'replicate';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const PREVIEW_DIR = path.resolve(__dirname, '../apps/web/public/previews');
const CATS_DIR = path.resolve(__dirname, '../docs/moodboard/cat-culture');

const NEGATIVE = `no full human body visible, no human face visible, no text overlays, no watermark, no logos, no distorted anatomy, no extra limbs, no extra paws, no blurry motion, no cartoon style, no anime style, no 3D render look, no cinematic color grading, no studio lighting`;

const JOBS = [
  { cat: 'cat-noir-01.jpg', slug: 'disco-70s',
    prompt: `Animate the cat doing a disco dance in a 1970s nightclub, standing on hind legs wearing a small white suit, grooving with arms out, disco ball reflections on fur. Dance floor with colored tiles, disco ball overhead, flashing lights, blurred dancers in background. Camera handheld iPhone medium shot, slight shake, vertical 9:16. Natural club lighting, raw phone footage. 5 seconds.` },
  { cat: 'cat-tigre-01.jpg', slug: 'griddy-gym',
    prompt: `Animate the cat doing the Griddy dance in a basic commercial gym, standing upright on hind legs wearing a plain gray t-shirt, holding paws near eyes in binocular pose then swaying side to side rhythmically. Standard gym with fluorescent lighting, weight racks, rubber floor mats, human arm partially visible at frame edge. Camera handheld iPhone medium shot, slight shake, vertical 9:16. Raw smartphone footage, no filters. 5 seconds.` },
  { cat: 'cat-blanc-01.jpg', slug: 'cowboy-far-west',
    prompt: `Animate the cat standing in a dusty western saloon doorway wearing a tiny cowboy hat, slowly pushing through swinging doors with one paw, squinting dramatically. Western saloon interior with wooden bar, bottles, dim lantern light, wanted poster on wall. Camera handheld iPhone from inside saloon looking at door, slight sway, vertical 9:16. Warm dim ambient lighting, raw phone footage. 5 seconds.` },
  { cat: 'cat-siamois-01.jpg', slug: 'tiktok-dance-trend',
    prompt: `Animate the cat performing a viral TikTok dance in a trendy bedroom, standing on hind legs wearing an oversized hoodie, arms doing precise hand gestures in sync with implied beat, head bobbing, hip swaying. Aesthetic bedroom with fairy lights, pink LED strips, posters on walls, unmade bed blurred behind. Camera handheld iPhone vertical 9:16, phone-held at slight angle. Natural LED ambient lighting, raw phone footage. 5 seconds.` },
  { cat: 'cat-noir-01.jpg', slug: 'breakdance-carton',
    prompt: `Animate the cat doing a breakdance windmill on a cardboard mat on a city sidewalk, spinning on its back with legs in the air, then popping up to a freeze pose. Urban sidewalk with graffiti wall behind, boombox on ground, small crowd of human legs visible at edges. Camera handheld iPhone from bystander angle, excited shake, vertical 9:16. Natural daylight, raw phone footage. 5 seconds.` },
];

async function main() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) { console.error('REPLICATE_API_TOKEN not set'); process.exit(1); }

  const replicate = new Replicate({ auth: token });

  console.log(`Generating ${JOBS.length} diverse previews...\n`);

  for (const job of JOBS) {
    const catPath = path.join(CATS_DIR, job.cat);
    const imageBuffer = await readFile(catPath);
    const imageDataUri = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

    console.log(`${job.slug} (${job.cat})...`);
    try {
      const output = await replicate.run('bytedance/seedance-1-lite', {
        input: {
          image: imageDataUri,
          prompt: job.prompt,
          negative_prompt: NEGATIVE,
          duration: 5,
          aspect_ratio: '9:16',
          resolution: '480p',
        },
      });

      const videoUrl = (output as string) || (Array.isArray(output) ? (output as string[])[0] : null);
      if (!videoUrl) { console.log('  No output'); continue; }

      const res = await fetch(videoUrl);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(path.join(PREVIEW_DIR, `${job.slug}.mp4`), buf);
      console.log(`  Saved: ${job.slug}.mp4 (${(buf.byteLength / 1024).toFixed(0)} KB) — ${job.cat}`);
    } catch (err) {
      console.error(`  FAILED:`, err instanceof Error ? err.message : err);
    }
  }

  console.log('\nDone!');
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });

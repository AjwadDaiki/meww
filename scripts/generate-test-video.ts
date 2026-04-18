/**
 * Generate a single test video via Replicate Seedance 2 Lite.
 * Usage: REPLICATE_API_TOKEN=... npx tsx scripts/generate-test-video.ts
 */

import Replicate from 'replicate';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../docs/test-videos');
const CAT_IMAGE_PATH = path.resolve(__dirname, '../docs/moodboard/cat-culture/cat-roux-01.jpg');

const PROMPT = `Animate the cat from reference image 1 doing the Griddy dance in a basic commercial gym, standing upright on hind legs wearing a plain gray oversized t-shirt that covers its front paws, the cat holds its paws up near its eyes in the classic Griddy binocular pose then sways side to side rhythmically with a focused neutral expression.
Standard gym interior with harsh fluorescent overhead lighting, rubber floor mats, weight rack with mismatched plates visible behind, a human arm holding a phone partially visible on the right edge of the frame, water bottle on the floor nearby, other gym equipment slightly blurred in background.
Camera handheld iPhone medium shot at eye level, slight natural shake and sway as if a friend is filming while trying not to laugh, vertical 9:16 portrait orientation.
Raw smartphone footage look, no color grading, no filters, natural harsh gym fluorescent lighting with slight green tint, slight motion blur during fast dance moves, crisp autofocus on cat.
Preserve cat fur color and face markings from reference image.
5 seconds, single cat doing Griddy, human arm partially visible at frame edge, home video authenticity.`;

const NEGATIVE_PROMPT = `no full human body visible, no human face visible, no text overlays, no watermark, no logos, no distorted anatomy, no extra limbs, no extra paws, no blurry motion, no cartoon style, no anime style, no 3D render look, no uncanny valley, no floating objects, no glitches, no artifacts, no multiple cats, no disappearing cat, no cinematic color grading, no studio lighting`;

async function main() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    console.error('Error: REPLICATE_API_TOKEN not set');
    process.exit(1);
  }

  if (!existsSync(CAT_IMAGE_PATH)) {
    console.error('Error: Cat reference image not found at', CAT_IMAGE_PATH);
    process.exit(1);
  }

  const replicate = new Replicate({ auth: token });

  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  // Read cat image and convert to data URI
  const imageBuffer = await readFile(CAT_IMAGE_PATH);
  const imageBase64 = imageBuffer.toString('base64');
  const imageDataUri = `data:image/jpeg;base64,${imageBase64}`;

  console.log('Generating griddy-gym test video...');
  console.log('Model: bytedance/seedance-2.0');
  console.log('Duration: 5s, Aspect: 9:16, Resolution: 720p');
  console.log('Reference image: cat-roux-01.jpg');
  console.log('');

  try {
    const output = await replicate.run('bytedance/seedance-2.0', {
      input: {
        prompt: `[Image1] = reference photo of the cat (preserve fur color, eye color, breed)\n\n${PROMPT}`,
        images: [imageDataUri],
        duration: 5,
        aspect_ratio: '9:16',
      },
    });

    const videoUrl = (output as { video?: string; output?: string })?.video
      || (output as string)
      || (Array.isArray(output) ? (output as string[])[0] : null);
    if (!videoUrl) throw new Error('No output URL. Raw output: ' + JSON.stringify(output).slice(0, 200));
    if (!videoUrl) throw new Error('No output URL');

    console.log('Video generated! Downloading...');
    const response = await fetch(videoUrl);
    if (!response.ok) throw new Error(`Download failed: ${response.status}`);

    const buffer = Buffer.from(await response.arrayBuffer());
    const filepath = path.join(OUTPUT_DIR, 'griddy-gym-v1.mp4');
    await writeFile(filepath, buffer);

    console.log(`Saved: ${filepath} (${(buffer.byteLength / 1024).toFixed(0)} KB)`);
    console.log('\nDone! Review the video before proceeding.');
  } catch (err) {
    console.error('Generation failed:', err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});

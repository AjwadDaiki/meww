/**
 * Generate cat-6-7-bedroom signature video.
 * Usage: REPLICATE_API_TOKEN=... npx tsx scripts/generate-6-7.ts
 */

import Replicate from 'replicate';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../docs/test-videos');
const CAT_IMAGE = path.resolve(__dirname, '../docs/moodboard/cat-culture/cat-roux-01.jpg');

const PROMPT = `[Image1] = reference photo of the cat (preserve fur color, eye color, breed, face markings).

Animate the cat from reference image 1 standing upright on its hind legs, performing the viral 6-7 arm pump dance. Both front paws are raised in front of the body, elbows bent. Core movement: left front paw moves UP (paw open facing ceiling) while right front paw moves DOWN (paw open facing floor), then instantly alternating — right paw up while left paw down, then reversing again, repeating RAPIDLY at a constant beat.

The movement must be PERFECTLY ALTERNATING (never both paws up or both paws down simultaneously) and tempo must be FAST and CONSTANT: one alternation every 0.4 seconds, producing at least 10-12 complete alternations over the 5 second video.

Shoulders follow the paw motion subtly, body weight shifts slightly left-right in rhythm, head stays relatively stable but micro-bobs with the beat. Expression is NEUTRAL and FOCUSED, like a teenager doing the trend — not smiling, not grimacing, just concentrated and on rhythm. Ears slightly flicked back with energy.

Setting: teenage bedroom, LED strip lights on walls glowing pink and cyan, messy unmade bed visible in background, anime or gaming posters on walls, plants in corner, mirror reflecting the scene, generic teen room aesthetic.

Camera handheld iPhone vertical 9:16 medium shot, captured at chest level of the cat, slight natural phone sway, no stabilization, no dolly, no zoom.

Natural LED ambient lighting from the room (pink and cyan glow), no color grading, no filter, raw iPhone 15 Pro video quality, slight motion blur on the rapid paw movements showing the speed, realistic fur texture, authentic TikTok content creator aesthetic, not cinematic at all.

Preserve cat fur color, markings, eye color, breed from reference image 1. Single cat in frame, no humans visible, no text overlays, no watermark.

5 seconds duration, RAPID ALTERNATING ARM PUMP MOTION is the absolute main visual focus, must be clearly visible and repeated at consistent fast tempo throughout the full 5 seconds.`;

const NEGATIVE = `slow movement, gentle motion, both paws up simultaneously, both paws down simultaneously, single paw movement, waving, clapping, pushing, swimming motion, paddling, running, walking, jumping, static pose, normal dance, cinematic lighting, color grading, film grain, teal-orange grade, professional camera, dolly, stabilized, cartoon, anime, 3D render, morphing, extra limbs, two cats, melted face, distorted anatomy, stylized, broken rhythm, irregular tempo`;

async function main() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) { console.error('REPLICATE_API_TOKEN not set'); process.exit(1); }

  const replicate = new Replicate({ auth: token });
  if (!existsSync(OUTPUT_DIR)) await mkdir(OUTPUT_DIR, { recursive: true });

  const imageBuffer = await readFile(CAT_IMAGE);
  const imageDataUri = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  console.log('Generating cat-6-7-bedroom-v1...');
  console.log('Model: bytedance/seedance-2.0');
  console.log('Duration: 5s | Aspect: 9:16 | Reference: cat-roux-01.jpg');
  console.log('');

  try {
    const output = await replicate.run('bytedance/seedance-2.0', {
      input: {
        prompt: PROMPT,
        negative_prompt: NEGATIVE,
        images: [imageDataUri],
        duration: 5,
        aspect_ratio: '9:16',
      },
    });

    const videoUrl = (output as { video?: string })?.video
      || (output as string)
      || (Array.isArray(output) ? (output as string[])[0] : null);

    if (!videoUrl) throw new Error('No output URL. Raw: ' + JSON.stringify(output).slice(0, 300));

    console.log('Downloading...');
    const res = await fetch(videoUrl);
    const buf = Buffer.from(await res.arrayBuffer());
    const fp = path.join(OUTPUT_DIR, 'cat-6-7-bedroom-v1.mp4');
    await writeFile(fp, buf);
    console.log(`Saved: cat-6-7-bedroom-v1.mp4 (${(buf.byteLength / 1024).toFixed(0)} KB)`);
  } catch (err) {
    console.error('FAILED:', err);
    process.exit(1);
  }
}

main();

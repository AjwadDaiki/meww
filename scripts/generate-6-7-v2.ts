/**
 * Generate cat-6-7-bedroom v2 — palms UP + happy expression.
 */

import Replicate from 'replicate';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../docs/test-videos');
const CAT_IMAGE = path.resolve(__dirname, '../docs/moodboard/cat-culture/cat-roux-01.jpg');

const PROMPT = `[Image1] = reference photo of the cat (preserve fur color, eye color, breed, face markings).

Animate the cat from reference image 1 standing upright on its hind legs, performing the viral 6-7 arm pump dance. Both front paws are raised in front of the body, elbows bent.

CRITICAL PAW ORIENTATION: Both front paws must have palms facing UPWARD toward the ceiling at ALL TIMES during the movement. Paw pads visible facing the camera when paws are high. Think of the cat "offering to the sky" or "holding invisible small objects on both palms". The palms never rotate downward or inward — they stay consistently facing the ceiling throughout the entire alternation.

Core movement: left front paw moves UP (palm facing ceiling, paw pads visible) while right front paw moves DOWN (still palm facing ceiling even when lower, paw pads still facing upward), then instantly alternating — right paw up while left paw down, then reversing, repeating RAPIDLY at a constant beat.

The movement must be PERFECTLY ALTERNATING (never both paws up or both paws down simultaneously) and tempo must be FAST and CONSTANT: one alternation every 0.4 seconds, producing at least 10-12 complete alternations over the 5 second video.

Shoulders follow the paw motion subtly, body weight shifts slightly left-right in rhythm, head stays relatively stable but micro-bobs with the beat.

EXPRESSION CRITICAL: The cat looks HAPPY, JOYFUL, ENGAGED, having fun. Bright alert eyes (not vacant), slightly open mouth suggesting a smile or enjoyment, ears relaxed and forward, whiskers slightly up. The cat is CLEARLY enjoying the dance, playful energy, not zoned out, not neutral, not focused-elsewhere. Think "cat who is genuinely having a great time dancing", warm happy vibes, playful engagement.

Setting: teenage bedroom, LED strip lights on walls glowing pink and cyan, messy unmade bed visible in background, anime or gaming posters on walls, plants in corner, mirror reflecting the scene, generic teen room aesthetic.

Camera handheld iPhone vertical 9:16 medium shot, captured at chest level of the cat, slight natural phone sway, no stabilization, no dolly, no zoom.

Natural LED ambient lighting from the room (pink and cyan glow), no color grading, no filter, raw iPhone 15 Pro video quality, slight motion blur on the rapid paw movements showing the speed, realistic fur texture, authentic TikTok content creator aesthetic, not cinematic at all.

Preserve cat fur color, markings, eye color, breed from reference image 1. Single cat in frame, no humans visible, no text overlays, no watermark.

5 seconds duration, RAPID ALTERNATING ARM PUMP MOTION with PALMS FACING UP throughout is the absolute main visual focus. Cat expression must be VISIBLY HAPPY AND PLAYFUL throughout.`;

const NEGATIVE = `paws facing down, palms facing down, paws facing inward, paws rotating, closed paws, clenched paws, fists, neutral expression, vacant stare, absent look, focused away, distracted expression, sad expression, angry expression, slow movement, gentle motion, both paws up simultaneously, both paws down simultaneously, single paw movement, waving, clapping, pushing, swimming motion, paddling, running, walking, jumping, static pose, cinematic lighting, color grading, film grain, professional camera, dolly, stabilized, cartoon, anime, 3D render, morphing, extra limbs, two cats, melted face, distorted anatomy, stylized, broken rhythm`;

async function main() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) { console.error('REPLICATE_API_TOKEN not set'); process.exit(1); }

  const replicate = new Replicate({ auth: token });
  if (!existsSync(OUTPUT_DIR)) await mkdir(OUTPUT_DIR, { recursive: true });

  const imageBuffer = await readFile(CAT_IMAGE);
  const imageDataUri = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  console.log('Generating cat-6-7-bedroom-v2...');
  console.log('Changes from v1: palms UPWARD + HAPPY expression');
  console.log('');

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

  if (!videoUrl) throw new Error('No output URL');

  const res = await fetch(videoUrl);
  const buf = Buffer.from(await res.arrayBuffer());
  const fp = path.join(OUTPUT_DIR, 'cat-6-7-bedroom-v2.mp4');
  await writeFile(fp, buf);
  console.log(`Saved: cat-6-7-bedroom-v2.mp4 (${(buf.byteLength / 1024).toFixed(0)} KB)`);
  console.log('Prompt used: EXACT copy from Ajwad feedback (no modifications)');
}

main().catch((err) => { console.error('FAILED:', err); process.exit(1); });

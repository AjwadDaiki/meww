/**
 * Generate cat-6-7-bedroom v3
 * Fixes: "holding tennis balls" paw metaphor, stable body (no lateral sway),
 * subtle content expression (not exaggerated), forward lean 15deg.
 */

import Replicate from 'replicate';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../docs/test-videos');
const CAT_IMAGE = path.resolve(__dirname, '../docs/moodboard/cat-culture/cat-roux-01.jpg');

const PROMPT = `[Image1] = reference photo of the cat (preserve fur color, eye color, breed, face markings).

Animate the cat from reference image 1 standing upright on its hind legs, performing the viral 6-7 arm pump dance.

BODY POSTURE (critical):
The cat leans SLIGHTLY FORWARD from the hips, torso tilted forward about 15 degrees, shoulders over paws, hips slightly back for balance. Body stays LOCKED LATERALLY — absolutely no left-right swaying of the torso or head. All motion is vertical only. The cat is a stable vertical column that does arm pumps, not a dancing cat.

ARMS AND PAWS (critical):
Both front paws are held out FORWARD in front of the body (not above the head, not to the sides — forward, toward the camera). Elbows bent at 90 degrees. Forearms extend straight out from the body parallel to the ground at chest height.

The paws hold this metaphorical position: imagine the cat is holding two invisible tennis balls in its paws, one ball per paw. The paws curl slightly to hold the balls. The motion is the paws + forearms moving UP and DOWN alternately, with the balls staying in the paws throughout.

Core movement: left forearm+paw moves UP toward face level while right forearm+paw moves DOWN toward hip level, then instantly reversing — right up, left down, then reversing again, rapidly and constantly.

Tempo: FAST and CONSTANT, one full alternation every 0.4 seconds, producing at least 10-12 complete alternations over the 5 seconds.

NO body sway, NO hip wiggle, NO head bob side to side. Only VERTICAL alternation of the forearms. The rest of the body is a stable forward-leaning column.

EXPRESSION (subtle, not exaggerated):
The cat has a SUBTLE content expression — calm satisfaction, like a cat who is quietly enjoying the rhythm. Eyes softly open and alert but not wide, mouth closed or barely parted (no open-mouth smile, no cartoon happy face), ears relaxed forward. Think "cool teenager doing the trend with chill confidence", not "excited kitten having a party". Subtle calm enjoyment, not explosive joy.

Setting: teenage bedroom, LED strip lights on walls glowing pink and cyan, messy unmade bed visible in background, gaming or anime posters on walls, plants in corner, mirror reflecting the scene, generic teen room aesthetic.

Camera handheld iPhone vertical 9:16 medium shot, captured at chest level of the cat, slight natural phone sway, no stabilization, no dolly, no zoom.

Natural LED ambient lighting from the room (pink and cyan glow), no color grading, no filter, raw iPhone 15 Pro video quality, slight motion blur on the rapid paw movements showing the speed, realistic fur texture, authentic TikTok content creator aesthetic, not cinematic at all.

Preserve cat fur color, markings, eye color, breed from reference image 1. Single cat in frame, no humans visible, no text overlays, no watermark.

5 seconds duration. The RAPID ALTERNATING FOREARM PUMP with the body LEANING SLIGHTLY FORWARD and STABLE LATERALLY is the main visual focus. Cat expression is SUBTLY content throughout, not exaggerated.`;

const NEGATIVE = `lateral body sway, hip wiggle, head bobbing side to side, body rotation, dancing hips, shuffling feet, walking, running, jumping, arms above head, arms to the sides, palms facing any specific direction, clenched fists, open hands spread, exaggerated smile, cartoon happy face, wide open mouth, excited expression, goofy face, overly joyful, vacant stare, absent look, focused away, sad expression, angry expression, slow movement, gentle motion, both paws up simultaneously, both paws down simultaneously, cinematic lighting, color grading, film grain, teal-orange grade, professional camera, dolly, stabilized, cartoon style, anime, 3D render, morphing, extra limbs, two cats, melted face, distorted anatomy, broken rhythm, irregular tempo`;

async function main() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) { console.error('REPLICATE_API_TOKEN not set'); process.exit(1); }

  const replicate = new Replicate({ auth: token });
  if (!existsSync(OUTPUT_DIR)) await mkdir(OUTPUT_DIR, { recursive: true });

  const imageBuffer = await readFile(CAT_IMAGE);
  const imageDataUri = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  console.log('Generating cat-6-7-bedroom-v3...');
  console.log('Fixes: tennis ball paw metaphor, no lateral sway, subtle expression');
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
  const fp = path.join(OUTPUT_DIR, 'cat-6-7-bedroom-v3.mp4');
  await writeFile(fp, buf);
  console.log(`Saved: cat-6-7-bedroom-v3.mp4 (${(buf.byteLength / 1024).toFixed(0)} KB)`);
  console.log('Prompt: EXACT copy from Ajwad v3 feedback, zero modifications.');
}

main().catch((err) => { console.error('FAILED:', err); process.exit(1); });

/**
 * Generate cat-6-7-bedroom v4 — FINAL attempt on Seedance Pro.
 * Elbows OUT, forward lean, paw pads up, rich bedroom detail.
 * $0.70 budget for signature video.
 */

import Replicate from 'replicate';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../docs/test-videos');
const CAT_IMAGE = path.resolve(__dirname, '../docs/moodboard/cat-culture/cat-roux-01.jpg');

const PROMPT = `[Image1] = reference photo of the cat (preserve fur color, eye color, breed, face markings).

CULTURAL REFERENCE (most important):
Animate the cat from reference image 1 doing the viral "6-7" TikTok dance trend (the Skrilla "Doot Doot" song trend popularized by basketball player LaMelo Ball and teenagers in school hallways in 2024-2025). The cat does this trend exactly as a teenager would do it.

BODY POSTURE:
The cat stands on its hind legs but LEANS FORWARD from the hips at 20 degrees, like a basketball player in a ready stance. Hips slightly back, shoulders forward, chest angled toward camera. NOT standing straight up like a meerkat. The forward lean is VISIBLE and pronounced throughout the entire video.

ARMS POSITION (critical - ELBOWS OUT):
Both front legs are raised to shoulder height with the ELBOWS POINTING OUTWARD TO THE SIDES (not forward, not down). This is a wide open posture, like a person saying "I don't know" with arms wide, or a basketball player holding the ball defensively with elbows out.

The forearms angle inward from the elbows, with paws ending up roughly in front of the chest area. Think of the shape a basketball player makes when they "puff out" their chest while holding arms wide.

PAWS ORIENTATION:
Paws are held open and relaxed, palms and paw pads facing UPWARD toward the ceiling. Like offering something to the sky. The paws do NOT clench into fists. The paw pads must be CLEARLY VISIBLE facing the camera during the upward phase of the pump.

DANCE MOVEMENT (the actual 6-7):
The arm pump motion has TWO SIMULTANEOUS COMPONENTS:
- Vertical: one forearm moves up while the other moves down, alternating rapidly
- Diagonal: combined with a slight FORWARD PUSH on the up phase, as if the cat is pushing the invisible air forward and upward at the same time

So each alternation is: left arm UP + pushing slightly FORWARD while right arm DOWN + pulling slightly BACK, then reversing instantly. The motion has this diagonal forward-up / back-down quality, not a pure vertical pump.

Tempo: very fast and consistent, 10-12 complete alternations over 5 seconds, tempo locked to the beat.

The cat's BODY STAYS STABLE (no lateral swaying), only the arms move in this diagonal alternating pattern.

EXPRESSION (between neutral and subtle joy):
The cat has a confident, slightly playful expression. Eyes open and alert, looking at the camera or slightly above. Mouth naturally closed with a tiny hint of relaxation (not smiling, not frowning, not grimacing). Ears forward and engaged. Whiskers relaxed. The expression says "I'm cool and I know what I'm doing" — confident teenager energy, not cartoon joy, not vacant.

SETTING (rich detail, realistic):
A realistic teenager's bedroom, messy but lived-in. LED strip lights along the edge of the ceiling glowing warm pink and cool cyan. Behind the cat:
- A wooden desk with a gaming setup visible: a monitor with a game paused on screen, RGB keyboard, headphones on a stand
- A made-but-messy bed with white bedsheet, pillows, one fallen on the floor
- Clothes partially on the floor, a hoodie draped over the desk chair
- Posters on the wall: generic anime poster, basketball poster, abstract art print
- A small plant in a pot on the desk (pothos or snake plant)
- Books stacked unevenly on a shelf
- Small warm lamp in the corner creating contrast with the LED lights
- Photo frames, random knick-knacks on the desk
- Soft depth, background slightly out of focus but details visible

The room feels authentic, occupied, Gen Z teenager aesthetic, not a staged set.

CAMERA:
Handheld iPhone vertical 9:16 medium shot, captured slightly below the cat's eye level looking slightly up (teenager POV filming themselves style). Natural phone sway, no stabilization, no dolly, no zoom, no pan. The camera feels like a friend's phone.

LIGHTING AND STYLE:
Natural ambient LED lighting (pink/cyan cast on the scene) mixed with warm lamp light. The cat's fur catches both light sources creating realistic two-toned shadows. Raw iPhone 15 Pro vertical video quality. Subtle motion blur only on the rapid arm movements. Realistic fur texture with individual hairs visible, realistic skin tones of any visible paw pads (pink undertones).

NO cinematic color grading, NO teal-orange, NO filter, NO professional polish. Pure raw TikTok content creator iPhone vertical video, the kind that gets 10M views because it's authentic and weird.

Preserve cat fur color, markings, eye color, breed from reference image 1. Single cat in frame, no humans visible, no text overlays, no watermark.

5 seconds duration.

The THREE CRITICAL VISUAL POINTS that must be true:
1. Cat leaning forward at 20 degrees, not standing straight
2. Elbows pointing OUTWARD to the sides (wide open posture)
3. Paw pads facing upward to the ceiling, visible during up-pumps

If any of these three are wrong, the video fails.`;

const NEGATIVE = `elbows pointing forward, elbows straight down, arms close to body, arms crossed, narrow stance, standing straight up, meerkat posture, standing perfectly vertical, no forward lean, clenched fists, closed paws, paws facing down, paws facing inward, lateral body sway, hip wiggle, head bobbing, shuffling feet, walking, running, jumping, waving, clapping, swimming, cartoon expression, exaggerated smile, wide open mouth, vacant stare, sad expression, angry expression, slow movement, gentle motion, plain empty room, undetailed background, sparse setting, flat lighting, studio lighting, cinematic lighting, color grading, teal orange, film grain, professional camera, stabilized, dolly, cartoon, anime, 3D render, morphing, extra limbs, two cats, melted face, distorted anatomy, broken rhythm, irregular tempo`;

async function main() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) { console.error('REPLICATE_API_TOKEN not set'); process.exit(1); }

  const replicate = new Replicate({ auth: token });
  if (!existsSync(OUTPUT_DIR)) await mkdir(OUTPUT_DIR, { recursive: true });

  const imageBuffer = await readFile(CAT_IMAGE);
  const imageDataUri = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  console.log('=== FINAL ATTEMPT: cat-6-7-bedroom-v4 ===');
  console.log('Model: bytedance/seedance-2.0 (Pro tier)');
  console.log('Budget: ~$0.70');
  console.log('Fixes: elbows OUT, 20deg forward lean, paw pads UP, rich bedroom');
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
  const fp = path.join(OUTPUT_DIR, 'cat-6-7-bedroom-v4.mp4');
  await writeFile(fp, buf);
  console.log(`Saved: cat-6-7-bedroom-v4.mp4 (${(buf.byteLength / 1024).toFixed(0)} KB)`);
  console.log('Prompt: EXACT copy from Ajwad v4 spec, zero modifications.');
}

main().catch((err) => { console.error('FAILED:', err); process.exit(1); });

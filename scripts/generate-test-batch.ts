/**
 * Generate batch test videos via Seedance 2.0.
 * Usage: REPLICATE_API_TOKEN=... npx tsx scripts/generate-test-batch.ts
 */

import Replicate from 'replicate';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../docs/test-videos');
const CAT_IMAGE = path.resolve(__dirname, '../docs/moodboard/cat-culture/cat-roux-01.jpg');

const NEGATIVE = `no full human body visible, no human face visible, no text overlays, no watermark, no logos, no distorted anatomy, no extra limbs, no extra paws, no blurry motion, no cartoon style, no anime style, no 3D render look, no uncanny valley, no floating objects, no glitches, no artifacts, no multiple cats, no disappearing cat, no cinematic color grading, no studio lighting`;

const TESTS = [
  {
    name: 'griddy-gym-v2',
    duration: 6,
    prompt: `Animate the cat from reference image 1 doing the Griddy dance in a basic commercial gym, standing upright on hind legs wearing a plain gray oversized t-shirt that covers its front paws, the cat holds its paws up near its eyes in the classic Griddy binocular pose then sways VIGOROUSLY side to side with full body commitment, head bobbing visibly, ears flapping with motion, paws moving in sharp distinct beats, focused neutral expression.
Standard gym interior with harsh fluorescent overhead lighting, rubber floor mats, weight rack with mismatched plates visible behind, a human arm holding a phone partially visible on the right edge of the frame, water bottle on the floor nearby.
Camera handheld iPhone medium shot at eye level, slight natural shake and sway, vertical 9:16 portrait.
Raw smartphone footage, no color grading, no filters, natural harsh gym fluorescent lighting with slight green tint, slight motion blur during fast moves.
Exaggerated dance movement, clear choreography beats visible, high energy performance, multiple distinct dance poses within the 6 seconds.
Preserve cat fur color and face markings from reference image.
6 seconds, single cat doing Griddy, human arm partially visible, home video authenticity.`,
  },
  {
    name: 'griddy-kitchen-v1',
    duration: 6,
    prompt: `Animate the cat from reference image 1 doing the Griddy dance in a home kitchen, standing upright on hind legs wearing a plain white t-shirt that covers its front paws, the cat holds its paws up near its eyes in the classic Griddy binocular pose then sways VIGOROUSLY side to side with full body commitment, head bobbing visibly, focused neutral expression.
Family kitchen with standard white cabinets, fridge with magnets, dish soap by sink, cluttered countertop, a human hand holding a phone partially visible on the left edge of frame, cereal box on counter.
Camera handheld iPhone medium shot, slight natural shake, vertical 9:16.
Natural kitchen daylight from window, no filters, raw smartphone footage, slight overexposure from window.
Exaggerated dance movement, clear choreography beats visible, high energy performance, multiple distinct dance poses within the 6 seconds.
Preserve cat identity from reference. 6 seconds, human hand partially visible.`,
  },
  {
    name: 'football-goal-v1',
    duration: 5,
    prompt: `Animate the cat from reference image 1 sprinting toward the camera in a football stadium doing the Cristiano Ronaldo SIUUU celebration, the cat runs forward on hind legs wearing a plain football jersey, then jumps and spins in the air with arms spread wide landing in the iconic SIUUU pose, focused intense expression.
Football stadium with green pitch, goal net visible behind, crowd blurred in stands, floodlights overhead, a human referee legs partially visible at frame edge.
Camera handheld iPhone tracking shot from pitch level following the cat, slight shake, vertical 9:16.
Natural stadium floodlight harsh lighting, raw phone footage feel, no cinematic color grading, amateur fan filming from pitch side.
Preserve cat identity from reference. 5 seconds, human legs partially visible, stadium celebration.`,
  },
  {
    name: 'cat-cooking-v1',
    duration: 5,
    prompt: `Animate the cat from reference image 1 standing upright on hind legs at a regular home kitchen counter next to the sink, wearing a plain oversized t-shirt that covers its front paws, the cat stirs a pot on the stove with a wooden spoon held in one paw, focused neutral expression looking down at the pot.
Basic home kitchen with standard white cabinets, cluttered countertop with spice jars and a cutting board, dish soap by the sink, fridge with magnets partially visible on the left, a human arm reaching in from the right side of the frame as if handing the cat an ingredient.
Camera handheld iPhone medium shot from across the kitchen counter, slight shake and autofocus hunting, vertical 9:16 portrait.
Natural kitchen lighting from overhead fluorescent and window daylight, no color grading, no filters, raw smartphone footage, slight overexposure from window light, home video authenticity.
Preserve cat fur color and face markings from reference image.
5 seconds, single cat cooking, human arm partially visible, no chef hat, no professional kitchen.`,
  },
  {
    name: 'porch-musician-v1',
    duration: 5,
    prompt: `Animate the cat from reference image 1 sitting upright on a suburban porch at night, holding a tiny golden trumpet with its front paws, slowly bobbing its head side to side as if playing a melody, neutral focused expression.
Standard suburban porch with warm amber porch light overhead, concrete steps, a doormat, suburban houses visible across the street in darkness, one window flickering blue from a TV, a human in pajama pants partially visible standing on the right side of the frame watching the cat.
Camera static fisheye wide angle from doorbell camera height about 4 feet up, strong fisheye lens distortion at edges making the cat's face slightly enlarged at center.
Doorbell security camera aesthetic, timestamp "03:47 TUE" visible in bottom right corner, grainy low resolution night footage, slight green infrared tint on shadows, warm amber porch light contrast, chromatic aberration around cat fur edges, motion activated recording feel.
Preserve cat fur color and face markings from reference image.
5 seconds, doorbell camera perspective, human legs partially visible.`,
  },
];

async function main() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) { console.error('Error: REPLICATE_API_TOKEN not set'); process.exit(1); }
  if (!existsSync(CAT_IMAGE)) { console.error('Error: Cat image not found'); process.exit(1); }

  const replicate = new Replicate({ auth: token });
  if (!existsSync(OUTPUT_DIR)) await mkdir(OUTPUT_DIR, { recursive: true });

  const imageBuffer = await readFile(CAT_IMAGE);
  const imageDataUri = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  console.log(`Generating ${TESTS.length} test videos...\n`);

  for (const test of TESTS) {
    console.log(`${test.name} (${test.duration}s)...`);
    try {
      const output = await replicate.run('bytedance/seedance-2.0', {
        input: {
          prompt: `[Image1] = reference photo of the cat\n\n${test.prompt}`,
          images: [imageDataUri],
          duration: test.duration,
          aspect_ratio: '9:16',
        },
      });

      const videoUrl = (output as { video?: string })?.video || (output as string) || (Array.isArray(output) ? (output as string[])[0] : null);
      if (!videoUrl) throw new Error('No output URL');

      const res = await fetch(videoUrl);
      const buf = Buffer.from(await res.arrayBuffer());
      const fp = path.join(OUTPUT_DIR, `${test.name}.mp4`);
      await writeFile(fp, buf);
      console.log(`  Saved: ${test.name}.mp4 (${(buf.byteLength / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`  FAILED ${test.name}:`, err instanceof Error ? err.message : err);
    }
  }

  console.log('\nAll done! Review videos in docs/test-videos/');
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });

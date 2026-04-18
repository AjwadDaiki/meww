/**
 * Generate catalog preview videos.
 * First: 1 Wan 2.2 fallback test (griddy-gym)
 * Then: 12 catalog previews on Seedance 1 Lite 480p
 *
 * Usage: REPLICATE_API_TOKEN=... npx tsx scripts/generate-catalog-previews.ts
 */

import Replicate from 'replicate';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve(__dirname, '../docs/test-videos');
const PREVIEW_DIR = path.resolve(__dirname, '../apps/web/public/previews');
const CAT_IMAGE = path.resolve(__dirname, '../docs/moodboard/cat-culture/cat-roux-01.jpg');

const NEGATIVE = `no full human body visible, no human face visible, no text overlays, no watermark, no logos, no distorted anatomy, no extra limbs, no extra paws, no blurry motion, no cartoon style, no anime style, no 3D render look, no uncanny valley, no floating objects, no glitches, no artifacts, no multiple cats, no disappearing cat, no cinematic color grading, no studio lighting`;

const CATALOG = [
  { slug: 'midnight-porch-musician', prompt: `Animate the cat from reference image 1 sitting upright on a suburban porch at night, holding a tiny golden trumpet with its front paws, slowly bobbing its head side to side as if playing a melody. Standard suburban porch with warm amber porch light overhead, concrete steps, doormat, suburban houses across the street in darkness. Camera static fisheye wide angle from doorbell camera height, strong fisheye lens distortion. Doorbell security camera aesthetic, grainy low resolution night footage, slight green infrared tint, warm amber porch light contrast. Preserve cat identity. 5 seconds, human in pajamas partially visible at frame edge.` },
  { slug: 'football-goal-celebration', prompt: `Animate the cat from reference image 1 sprinting toward camera in a football stadium doing the SIUUU celebration, running forward on hind legs wearing a plain football jersey, arms spread wide in iconic pose. Football stadium with green pitch, goal net behind, crowd blurred in stands, floodlights overhead. Camera handheld iPhone tracking shot from pitch level, slight shake, vertical 9:16. Natural stadium floodlight lighting, raw phone footage feel. Preserve cat identity. 5 seconds, amateur fan filming.` },
  { slug: 'basketball-dunk', prompt: `Animate the cat from reference image 1 performing a slam dunk on a basketball court, leaping toward the hoop on hind legs wearing a basketball jersey, ball in paw, slamming it through the net. Indoor basketball court with hardwood floor, NBA-style lighting, scoreboard blurred. Camera handheld iPhone from courtside, slight shake, vertical 9:16. Raw phone footage, harsh arena lighting. Preserve cat identity. 5 seconds.` },
  { slug: 'cat-cooking-realistic', prompt: `Animate the cat from reference image 1 standing upright at a home kitchen counter next to the sink, wearing a plain oversized t-shirt covering its front paws, stirring a pot on the stove with a wooden spoon, focused neutral expression. Basic home kitchen with white cabinets, cluttered countertop, dish soap by sink, fridge with magnets visible, human arm reaching in from right side of frame. Camera handheld iPhone medium shot, slight shake, vertical 9:16. Natural kitchen lighting, raw smartphone footage. Preserve cat identity. 5 seconds, human arm partially visible.` },
  { slug: 'jazz-trumpet', prompt: `Animate the cat from reference image 1 playing a tiny golden trumpet in a dim jazz club, sitting upright on a small stage, slowly swaying to the rhythm, eyes half closed. Small jazz club with warm amber spotlight, wooden chairs, bar blurred in background, smoky haze. Camera handheld iPhone medium shot from audience, slight sway, vertical 9:16. Warm dim ambient lighting, raw phone footage. Preserve cat identity. 5 seconds.` },
  { slug: 'ninja-night-tokyo', prompt: `Animate the cat from reference image 1 crouching on a Tokyo rooftop at night wearing a black outfit, then standing up and striking a ninja pose with one paw raised. Tokyo cityscape with neon lights below, wet rooftop surface reflecting lights, AC units on rooftop. Camera handheld iPhone from behind, slight shake, vertical 9:16. Night city ambient lighting, neon glow, raw phone footage. Preserve cat identity. 5 seconds.` },
  { slug: 'boxing-ring-knockout', prompt: `Animate the cat from reference image 1 celebrating a boxing victory in a ring, standing on hind legs with paws raised triumphantly wearing small boxing gloves, crowd cheering. Boxing ring with ropes, corner post, crowd in darkness, overhead ring lights. Camera handheld iPhone from ringside, excited shake, vertical 9:16. Harsh overhead ring lighting, raw phone footage. Preserve cat identity. 5 seconds.` },
  { slug: 'rock-guitarist', prompt: `Animate the cat from reference image 1 shredding an electric guitar on a concert stage, standing on hind legs wearing a band t-shirt, headbanging while playing power chords. Concert stage with spotlights, amplifiers behind, crowd silhouettes, stage fog. Camera handheld iPhone from front row, shaky excited, vertical 9:16. Stage lighting with colored spots, raw phone footage. Preserve cat identity. 5 seconds.` },
  { slug: 'classical-pianist', prompt: `Animate the cat from reference image 1 playing a grand piano on a concert stage, sitting upright on the piano bench, paws moving across the keys with focused expression. Concert hall with grand piano, warm spotlight, empty seats blurred behind. Camera handheld iPhone from side of stage, slight sway, vertical 9:16. Warm spotlight, raw phone footage. Preserve cat identity. 5 seconds.` },
  { slug: 'surfer-wave', prompt: `Animate the cat from reference image 1 surfing on a surfboard riding a wave, standing on hind legs with arms out for balance, focused expression. Ocean with turquoise wave curling, spray, sunny sky, beach visible in distance. Camera handheld from water level, bobbing with waves, vertical 9:16. Bright natural sunlight, raw GoPro-style footage. Preserve cat identity. 5 seconds.` },
  { slug: 'f1-podium-champagne', prompt: `Animate the cat from reference image 1 standing on an F1 podium spraying champagne, wearing a racing suit, celebrating with bottle in paw. F1 podium with position numbers, team logos blurred, confetti falling, crowd behind barriers. Camera handheld iPhone from pit lane, excited shake, vertical 9:16. Outdoor race circuit lighting, raw phone footage. Preserve cat identity. 5 seconds.` },
  { slug: 'samurai-edo-period', prompt: `Animate the cat from reference image 1 drawing a katana in a traditional Japanese garden, standing on hind legs wearing samurai armor, slow deliberate sword draw with focused expression. Traditional Japanese garden with cherry blossoms, stone lantern, wooden bridge, koi pond. Camera handheld iPhone medium shot, slight sway, vertical 9:16. Soft natural daylight through trees, raw phone footage. Preserve cat identity. 5 seconds.` },
];

async function main() {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) { console.error('REPLICATE_API_TOKEN not set'); process.exit(1); }

  const replicate = new Replicate({ auth: token });
  for (const dir of [OUTPUT_DIR, PREVIEW_DIR]) {
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  }

  const imageBuffer = await readFile(CAT_IMAGE);
  const imageDataUri = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

  // Step 1: Wan 2.2 fallback test
  console.log('=== FALLBACK TEST: Wan 2.2 griddy-gym ===');
  try {
    const wanOutput = await replicate.run('wan-video/wan-2.2-i2v-fast', {
      input: {
        image: imageDataUri,
        prompt: `Animate the cat doing the Griddy dance in a basic commercial gym, standing upright on hind legs wearing a plain gray t-shirt, holding paws near eyes in binocular pose then swaying side to side rhythmically. Standard gym with fluorescent lighting, weight racks, rubber floor mats. Camera handheld iPhone medium shot, slight shake, vertical portrait. Raw smartphone footage, no filters. 5 seconds.`,
        max_area: '512x896',
        num_frames: 81,
      },
    });

    const wanUrl = (wanOutput as { output?: string })?.output || (wanOutput as string) || (Array.isArray(wanOutput) ? (wanOutput as string[])[0] : null);
    if (wanUrl) {
      const res = await fetch(wanUrl);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(path.join(OUTPUT_DIR, 'wan-fallback-test-v1.mp4'), buf);
      console.log(`  Saved: wan-fallback-test-v1.mp4 (${(buf.byteLength / 1024).toFixed(0)} KB)\n`);
    } else {
      console.log('  WARNING: No output URL from Wan 2.2. Raw:', JSON.stringify(wanOutput).slice(0, 200));
    }
  } catch (err) {
    console.error('  Wan fallback test failed:', err instanceof Error ? err.message : err);
  }

  // Step 2: 12 catalog previews on Seedance 1 Lite
  console.log(`\n=== CATALOG PREVIEWS: ${CATALOG.length} videos on Seedance 1 Lite 480p ===\n`);

  for (let i = 0; i < CATALOG.length; i++) {
    const cat = CATALOG[i];
    console.log(`[${i + 1}/${CATALOG.length}] ${cat.slug}...`);
    try {
      const output = await replicate.run('bytedance/seedance-1-lite', {
        input: {
          image: imageDataUri,
          prompt: cat.prompt,
          negative_prompt: NEGATIVE,
          duration: 5,
          aspect_ratio: '9:16',
          resolution: '480p',
        },
      });

      const videoUrl = (output as string) || (Array.isArray(output) ? (output as string[])[0] : null);
      if (!videoUrl) { console.log('  No output URL, skipping'); continue; }

      const res = await fetch(videoUrl);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(path.join(PREVIEW_DIR, `${cat.slug}.mp4`), buf);
      console.log(`  Saved: ${cat.slug}.mp4 (${(buf.byteLength / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`  FAILED ${cat.slug}:`, err instanceof Error ? err.message : err);
    }
  }

  console.log('\nAll done! Review videos in public/previews/ and docs/test-videos/');
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });

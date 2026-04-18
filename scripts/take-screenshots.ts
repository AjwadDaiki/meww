/**
 * Take validation screenshots via Playwright.
 * Usage: npx tsx scripts/take-screenshots.ts
 * Requires: pnpm add -D playwright (will install browser on first run)
 */

import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.resolve(__dirname, '../docs/screenshots/phase-1');

const SCREENSHOTS = [
  { name: '01-preview-desktop', url: '/fr/dev-preview/preview', width: 1440, height: 900 },
  { name: '02-preview-mobile', url: '/fr/dev-preview/preview', width: 375, height: 812 },
  { name: '03-landing-desktop', url: '/fr', width: 1440, height: 900 },
  { name: '04-landing-mobile', url: '/fr', width: 375, height: 812 },
];

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const shot of SCREENSHOTS) {
    console.log(`Taking ${shot.name} (${shot.width}x${shot.height})...`);
    const context = await browser.newContext({
      viewport: { width: shot.width, height: shot.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    await page.goto(`${BASE_URL}${shot.url}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${shot.name}.png`),
      fullPage: true,
    });

    await context.close();
    console.log(`  Saved: ${shot.name}.png`);
  }

  await browser.close();
  console.log(`\nAll screenshots saved to ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error('Screenshot failed:', err);
  process.exit(1);
});

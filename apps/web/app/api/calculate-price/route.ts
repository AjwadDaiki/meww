import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const InputSchema = z.object({
  decorType: z.enum(['auto', 'preset', 'user-upload']).default('auto'),
  duration: z.enum(['5', '10', '15']).default('5'),
  sound: z.boolean().default(false),
});

/**
 * Pricing (April 2026 locked):
 * - Base 0.99EUR: action + any preset decor + 5s + no sound
 * - Custom decor (user upload): +0.99EUR
 * - Duration 10s: +1.00EUR, 15s: +2.00EUR
 * - Sound (Wan 2.5): +0.99EUR
 *
 * Preset decors are FREE (included in base).
 * Max: 4.97EUR (custom decor + 15s + sound)
 */
function calculatePriceCents(decorType: string, duration: string, sound: boolean): number {
  let cents = 99; // base

  if (decorType === 'user-upload') cents += 99;
  // 'auto' and 'preset' are free

  if (duration === '10') cents += 100;
  if (duration === '15') cents += 200;

  if (sound) cents += 99;

  return cents;
}

export async function POST(req: NextRequest) {
  const parsed = InputSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  const { decorType, duration, sound } = parsed.data;
  const totalCents = calculatePriceCents(decorType, duration, sound);

  return NextResponse.json({
    totalCents,
    breakdown: {
      base: 99,
      decor: decorType === 'user-upload' ? 99 : 0,
      duration: duration === '10' ? 100 : duration === '15' ? 200 : 0,
      sound: sound ? 99 : 0,
    },
    formatted: `${(totalCents / 100).toFixed(2).replace('.', ',')}EUR`,
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const InputSchema = z.object({
  decorType: z.enum(['auto', 'preset', 'user-upload']).default('auto'),
  duration: z.enum(['5', '10', '15']).default('5'),
});

const PRICING = {
  base: 99, // cents
  decor: {
    auto: 0,
    preset: 100,
    'user-upload': 200,
  },
  duration: {
    '5': 0,
    '10': 100,
    '15': 200,
  },
} as const;

export async function POST(req: NextRequest) {
  const parsed = InputSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
  }

  const { decorType, duration } = parsed.data;

  const totalCents =
    PRICING.base +
    PRICING.decor[decorType] +
    PRICING.duration[duration];

  return NextResponse.json({
    totalCents,
    breakdown: {
      base: PRICING.base,
      decor: PRICING.decor[decorType],
      duration: PRICING.duration[duration],
    },
    formatted: `${(totalCents / 100).toFixed(2)}EUR`,
  });
}

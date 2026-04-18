import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDb } from '@/lib/db';
import { Order } from '@/lib/db/models/order';
import { storage } from '@/lib/storage';
import { customAlphabet } from 'nanoid';

const genShortId = customAlphabet('ABCDEFGHJKMNPQRSTUVWXYZ23456789', 6);

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

export async function POST(req: NextRequest) {
  await connectDb();

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const locale = (formData.get('locale') as string) || 'fr';

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type', allowed: ALLOWED_TYPES }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large', maxBytes: MAX_SIZE }, { status: 400 });
  }

  try {
    const shortId = `MR-${genShortId()}`;
    const now = new Date();
    const datePath = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
    const ext = file.name.split('.').pop() || 'jpg';
    const key = `uploads/${datePath}/${shortId}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await storage.put(key, buffer, file.type);

    const order = await Order.create({
      shortId,
      status: 'draft',
      locale,
      photo: {
        originalUrl: result.signedUrl,
        filename: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        uploadedAt: now,
      },
      scene: {
        categoryId: 'pending',
        categorySlug: 'pending',
      },
      amountCents: 99,
      generation: {
        provider: 'replicate',
        retries: 0,
      },
    });

    return NextResponse.json({
      orderId: order._id.toString(),
      shortId,
      photoUrl: result.signedUrl,
    });
  } catch (err) {
    console.error('[API] /api/upload failed:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

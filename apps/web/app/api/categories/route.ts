import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { Category } from '@/lib/db/models/category';

export async function GET() {
  await connectDb();

  const categories = await Category.find({ active: true })
    .sort({ section: 1, order: 1 })
    .lean();

  return NextResponse.json(categories);
}

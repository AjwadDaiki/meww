import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/meowreel';

let cached = (global as Record<string, unknown>).__mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} | undefined;

if (!cached) {
  cached = { conn: null, promise: null };
  (global as Record<string, unknown>).__mongoose = cached;
}

export async function connectDb(): Promise<typeof mongoose> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

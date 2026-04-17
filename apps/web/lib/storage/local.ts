import { createHmac } from 'crypto';
import { writeFile, readFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import type { StorageBackend, StorageResult } from './types';

const DATA_DIR = process.env.STORAGE_DATA_DIR || './data';
const SIGNING_SECRET = process.env.STORAGE_SIGNING_SECRET || process.env.ORDER_URL_SIGNING_SECRET || 'dev-secret';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const DEFAULT_TTL = 48 * 60 * 60; // 48 hours

function signUrl(key: string, ttlSeconds: number): string {
  const expires = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = `${key}:${expires}`;
  const signature = createHmac('sha256', SIGNING_SECRET)
    .update(payload)
    .digest('hex')
    .slice(0, 16);
  const token = Buffer.from(`${payload}:${signature}`).toString('base64url');
  return `${BASE_URL}/v/${key}?t=${token}`;
}

export function verifySignedToken(token: string): { key: string; valid: boolean } {
  try {
    const decoded = Buffer.from(token, 'base64url').toString();
    const parts = decoded.split(':');
    if (parts.length < 3) return { key: '', valid: false };

    const key = parts.slice(0, -2).join(':');
    const expires = parseInt(parts[parts.length - 2]);
    const signature = parts[parts.length - 1];

    if (Date.now() / 1000 > expires) return { key, valid: false };

    const expected = createHmac('sha256', SIGNING_SECRET)
      .update(`${key}:${expires}`)
      .digest('hex')
      .slice(0, 16);

    return { key, valid: expected === signature };
  } catch {
    return { key: '', valid: false };
  }
}

export class LocalStorage implements StorageBackend {
  private dataDir: string;

  constructor(dataDir?: string) {
    this.dataDir = dataDir || DATA_DIR;
  }

  async put(key: string, data: ArrayBuffer | Buffer, _contentType: string): Promise<StorageResult> {
    const filePath = path.join(this.dataDir, key);
    const dir = path.dirname(filePath);

    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
    await writeFile(filePath, buffer);

    return {
      key,
      sizeBytes: buffer.byteLength,
      signedUrl: signUrl(key, DEFAULT_TTL),
    };
  }

  async get(key: string): Promise<Buffer | null> {
    const filePath = path.join(this.dataDir, key);
    try {
      return await readFile(filePath);
    } catch {
      return null;
    }
  }

  async delete(key: string): Promise<void> {
    const filePath = path.join(this.dataDir, key);
    try {
      await unlink(filePath);
    } catch {
      // File may not exist, that's fine
    }
  }

  getSignedUrl(key: string, ttlSeconds: number = DEFAULT_TTL): string {
    return signUrl(key, ttlSeconds);
  }
}

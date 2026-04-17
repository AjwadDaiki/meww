import type { StorageBackend, StorageResult } from './types';

/**
 * Cloudflare R2 storage backend — stub for future migration.
 * Not used in V1. Implements the same interface as LocalStorage
 * so we can swap backends without changing any calling code.
 */
export class R2Storage implements StorageBackend {
  async put(_key: string, _data: ArrayBuffer | Buffer, _contentType: string): Promise<StorageResult> {
    throw new Error('R2Storage not implemented. Use LocalStorage for V1.');
  }

  async get(_key: string): Promise<Buffer | null> {
    throw new Error('R2Storage not implemented. Use LocalStorage for V1.');
  }

  async delete(_key: string): Promise<void> {
    throw new Error('R2Storage not implemented. Use LocalStorage for V1.');
  }

  getSignedUrl(_key: string, _ttlSeconds?: number): string {
    throw new Error('R2Storage not implemented. Use LocalStorage for V1.');
  }
}

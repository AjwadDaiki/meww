import { LocalStorage } from './local';
import type { StorageBackend } from './types';

export type { StorageBackend, StorageResult } from './types';
export { verifySignedToken } from './local';

// V1: VPS local disk. Swap to R2Storage when needed.
export const storage: StorageBackend = new LocalStorage();

export type StorageResult = {
  key: string;
  sizeBytes: number;
  signedUrl: string;
};

export interface StorageBackend {
  put(key: string, data: ArrayBuffer | Buffer, contentType: string): Promise<StorageResult>;
  get(key: string): Promise<Buffer | null>;
  delete(key: string): Promise<void>;
  getSignedUrl(key: string, ttlSeconds?: number): string;
}

import mongoose, { Schema, type Model } from 'mongoose';

const ORDER_STATUSES = [
  'draft',
  'awaiting_payment',
  'paid',
  'processing',
  'done',
  'delivered',
  'failed',
] as const;

type OrderStatus = (typeof ORDER_STATUSES)[number];

const BUNDLES = ['single', 'trio', 'ten'] as const;
type Bundle = (typeof BUNDLES)[number];

const LOCALES = ['fr', 'en', 'es', 'de', 'it', 'pt'] as const;
type OrderLocale = (typeof LOCALES)[number];

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  shortId: string;
  status: OrderStatus;
  locale: OrderLocale;

  photo: {
    originalUrl: string;
    filename: string;
    mimeType: string;
    sizeBytes: number;
    uploadedAt: Date;
  };

  scene: {
    categoryId: string;
    categorySlug: string;
    variationId?: string;
    promptUsed?: string;
  };

  customization: {
    action: string;
    decor: {
      type: 'auto' | 'preset' | 'user-upload';
      presetId?: string;
      userPhotoUrl?: string;
    };
    duration: 5 | 10 | 15;
    style: 'amateur' | 'doorbell' | 'broadcast' | 'cinematic';
  };

  bundle: Bundle;
  unitCount: number;
  amountCents: number;
  currency: string;

  stripe?: {
    sessionId: string;
    paymentIntentId?: string;
    customerEmail: string;
    paidAt?: Date;
  };

  generation: {
    provider: string;
    model: string;
    jobId?: string;
    startedAt?: Date;
    completedAt?: Date;
    retries: number;
    errorMessage?: string;
  };

  output?: {
    videoUrl: string;
    videoFilename: string;
    thumbnailUrl?: string;
    durationSeconds: number;
    resolution: string;
    sizeBytes: number;
  };

  delivery?: {
    emailSentAt?: Date;
    downloadToken: string;
    tokenExpiresAt: Date;
    downloadedAt?: Date;
    downloadCount: number;
  };

  upsellParentOrderId?: mongoose.Types.ObjectId;
  ipAddress?: string;
  userAgent?: string;

  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    shortId: { type: String, unique: true, required: true, index: true },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: 'draft',
      index: true,
    },
    locale: { type: String, enum: LOCALES, default: 'fr' },

    photo: {
      originalUrl: { type: String, required: true },
      filename: String,
      mimeType: String,
      sizeBytes: Number,
      uploadedAt: { type: Date, default: Date.now },
    },

    scene: {
      categoryId: { type: String, required: true, index: true },
      categorySlug: { type: String, required: true },
      variationId: String,
      promptUsed: String,
    },

    customization: {
      action: { type: String, default: 'six-seven-bedroom' },
      decor: {
        type: { type: String, enum: ['auto', 'preset', 'user-upload'], default: 'auto' },
        presetId: String,
        userPhotoUrl: String,
      },
      duration: { type: Number, enum: [5, 10, 15], default: 5 },
      style: { type: String, enum: ['amateur', 'doorbell', 'broadcast', 'cinematic'], default: 'amateur' },
    },

    bundle: { type: String, enum: BUNDLES, default: 'single' },
    unitCount: { type: Number, default: 1 },
    amountCents: { type: Number, required: true },
    currency: { type: String, default: 'EUR' },

    stripe: {
      sessionId: { type: String, index: true },
      paymentIntentId: String,
      customerEmail: { type: String, index: true },
      paidAt: Date,
    },

    generation: {
      provider: { type: String, default: 'replicate' },
      model: String,
      jobId: { type: String, index: true },
      startedAt: Date,
      completedAt: Date,
      retries: { type: Number, default: 0 },
      errorMessage: String,
    },

    output: {
      videoUrl: String,
      videoFilename: String,
      thumbnailUrl: String,
      durationSeconds: Number,
      resolution: String,
      sizeBytes: Number,
    },

    delivery: {
      emailSentAt: Date,
      downloadToken: String,
      tokenExpiresAt: Date,
      downloadedAt: Date,
      downloadCount: { type: Number, default: 0 },
    },

    upsellParentOrderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

OrderSchema.index({ 'stripe.customerEmail': 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ createdAt: -1 });

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

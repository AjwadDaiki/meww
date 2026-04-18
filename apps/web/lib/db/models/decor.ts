import mongoose, { Schema, type Model } from 'mongoose';

export interface IDecor {
  _id: mongoose.Types.ObjectId;
  slug: string;
  name: { fr: string; en: string; es: string };
  promptFragment: string;
  previewImageUrl?: string;
  priceCents: number;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const DecorSchema = new Schema<IDecor>(
  {
    slug: { type: String, unique: true, required: true, index: true },
    name: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
      es: { type: String, required: true },
    },
    promptFragment: { type: String, required: true },
    previewImageUrl: String,
    priceCents: { type: Number, default: 100 },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Decor: Model<IDecor> =
  mongoose.models.Decor || mongoose.model<IDecor>('Decor', DecorSchema);

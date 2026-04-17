import mongoose, { Schema, type Model, type Document } from 'mongoose';

const SECTIONS = ['trending', 'music', 'dance', 'cinematic', 'moments'] as const;
type Section = (typeof SECTIONS)[number];

const MODELS = ['seedance-2.0-fast', 'seedance-2.0-pro', 'wan-2.2-i2v-fast'] as const;
type GenerationModel = (typeof MODELS)[number];

export interface ICategory extends Document {
  slug: string;
  section: Section;
  order: number;
  active: boolean;

  name: {
    fr: string;
    en: string;
    es: string;
  };

  tagline: {
    fr: string;
    en: string;
    es: string;
  };

  previewVideoUrl: string;
  previewPosterUrl: string;

  basePrompt: string;
  negativePrompt: string;
  model: GenerationModel;
  durationSeconds: number;
  resolution: string;
  audioPrompt?: string;

  variations?: Array<{
    id: string;
    name: { fr: string; en: string; es: string };
    promptModifier: string;
  }>;

  tags: string[];
  seoKeyword: string;

  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    slug: { type: String, unique: true, required: true, index: true },
    section: { type: String, enum: SECTIONS, required: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },

    name: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
      es: { type: String, required: true },
    },

    tagline: {
      fr: { type: String, required: true },
      en: { type: String, required: true },
      es: { type: String, required: true },
    },

    previewVideoUrl: String,
    previewPosterUrl: String,

    basePrompt: { type: String, required: true },
    negativePrompt: { type: String, default: 'no text, no watermark, no blur' },
    model: { type: String, enum: MODELS, default: 'seedance-2.0-fast' },
    durationSeconds: { type: Number, default: 5 },
    resolution: { type: String, default: '720p' },
    audioPrompt: String,

    variations: [
      {
        id: String,
        name: {
          fr: String,
          en: String,
          es: String,
        },
        promptModifier: String,
      },
    ],

    tags: [String],
    seoKeyword: String,
  },
  { timestamps: true }
);

CategorySchema.index({ section: 1, order: 1, active: 1 });

export const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

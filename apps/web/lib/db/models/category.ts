import mongoose, { Schema, type Model } from 'mongoose';

const SECTIONS = ['trending', 'music', 'dance', 'cinematic', 'moments'] as const;
type Section = (typeof SECTIONS)[number];

const GENERATION_MODELS = ['seedance-2-lite', 'seedance-2.0', 'wan-2.2-i2v-fast'] as const;
type GenerationModel = (typeof GENERATION_MODELS)[number];

export interface ICategory {
  _id: mongoose.Types.ObjectId;
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
  generationModel: GenerationModel;
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
    family: { type: String, index: true },

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
    generationModel: { type: String, enum: GENERATION_MODELS, default: 'seedance-2-lite' },
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

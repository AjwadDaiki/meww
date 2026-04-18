/**
 * Seed 20 preset decors into MongoDB.
 * Usage: pnpm seed:decors
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/meowreel';

const DecorSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true },
    name: { fr: String, en: String, es: String },
    promptFragment: { type: String, required: true },
    previewImageUrl: String,
    priceCents: { type: Number, default: 100 },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Decor = mongoose.models.Decor || mongoose.model('Decor', DecorSchema);

const DECORS = [
  { slug: 'beach', order: 1,
    name: { fr: 'Plage', en: 'Beach', es: 'Playa' },
    promptFragment: 'On a sunny beach, golden sand, ocean waves in background, bright daylight, beach umbrellas and towels visible, seagull in sky.' },
  { slug: 'paris-metro', order: 2,
    name: { fr: 'Metro parisien', en: 'Paris Metro', es: 'Metro Paris' },
    promptFragment: 'In a Paris metro station, white tiled walls, curved ceiling, metro map poster visible, harsh fluorescent lighting, empty platform.' },
  { slug: 'cozy-living', order: 3,
    name: { fr: 'Salon cosy', en: 'Cozy Living Room', es: 'Salon acogedor' },
    promptFragment: 'In a cozy living room, soft couch with throw blankets, warm lamp light, bookshelf in background, rug on hardwood floor, plants in corners.' },
  { slug: 'kitchen', order: 4,
    name: { fr: 'Cuisine', en: 'Kitchen', es: 'Cocina' },
    promptFragment: 'In a family kitchen, marble countertop, cabinets visible, fruit bowl, morning natural light from window, casual home setting.' },
  { slug: 'garden', order: 5,
    name: { fr: 'Jardin', en: 'Garden', es: 'Jardin' },
    promptFragment: 'In a suburban backyard garden, green grass, flower beds, wooden fence, garden shed visible, natural afternoon sunlight, trees overhead.' },
  { slug: 'office', order: 6,
    name: { fr: 'Bureau', en: 'Office', es: 'Oficina' },
    promptFragment: 'In a modern open office, standing desks, computer monitors, office plants, large windows with city view, natural daylight, office chairs.' },
  { slug: 'gym', order: 7,
    name: { fr: 'Gym', en: 'Gym', es: 'Gimnasio' },
    promptFragment: 'In a modern gym, mirrors along one wall, weight racks blurred in background, rubber floor mats, bright overhead fluorescent lighting, dumbbell visible on floor.' },
  { slug: 'rooftop-tokyo', order: 8,
    name: { fr: 'Rooftop Tokyo', en: 'Tokyo Rooftop', es: 'Azotea Tokio' },
    promptFragment: 'On a Tokyo rooftop at night, neon city lights below, Tokyo Tower visible in distance, concrete railing, humid night atmosphere, city glow.' },
  { slug: 'stadium', order: 9,
    name: { fr: 'Stade', en: 'Stadium', es: 'Estadio' },
    promptFragment: 'In a football stadium, green pitch visible, crowd in stands blurred, floodlights overhead, white lines on grass, goal net visible.' },
  { slug: 'concert-stage', order: 10,
    name: { fr: 'Scene de concert', en: 'Concert Stage', es: 'Escenario' },
    promptFragment: 'On a concert stage, spotlight from above, amplifiers and speakers behind, drum kit visible, crowd silhouettes in darkness, stage fog.' },
  { slug: 'photo-studio', order: 11,
    name: { fr: 'Studio photo', en: 'Photo Studio', es: 'Estudio foto' },
    promptFragment: 'In a professional photo studio, white seamless backdrop, softbox lights on stands, camera on tripod visible, clean bright lighting.' },
  { slug: 'forest', order: 12,
    name: { fr: 'Foret', en: 'Forest', es: 'Bosque' },
    promptFragment: 'In a dense forest, tall trees, dappled sunlight through leaves, moss on ground, fern plants, peaceful natural setting, slight fog.' },
  { slug: 'teen-bedroom', order: 13,
    name: { fr: 'Chambre ado LED', en: 'Teen Bedroom', es: 'Dormitorio adolescente' },
    promptFragment: 'In a teenage bedroom, LED strip lights on walls glowing pink and blue, messy unmade bed visible, posters on walls, plants in corner, mirror reflecting the scene.' },
  { slug: 'classroom', order: 14,
    name: { fr: 'Salle de classe', en: 'Classroom', es: 'Aula' },
    promptFragment: 'In a school classroom, wooden desk chairs behind, blackboard in back with half-erased writing, posters on wall, fluorescent school lighting.' },
  { slug: 'restaurant', order: 15,
    name: { fr: 'Restaurant', en: 'Restaurant', es: 'Restaurante' },
    promptFragment: 'In a casual restaurant, tables with white tablecloths, wine glasses, dim warm lighting, menu board on wall, other diners blurred in background.' },
  { slug: 'castle', order: 16,
    name: { fr: 'Chateau', en: 'Castle', es: 'Castillo' },
    promptFragment: 'In a medieval castle interior, stone walls, torch sconces, arched doorways, red carpet, suits of armor in background, dramatic natural light from tall windows.' },
  { slug: 'space', order: 17,
    name: { fr: 'Espace', en: 'Space', es: 'Espacio' },
    promptFragment: 'Floating in space aboard the ISS, Earth visible through window, zero gravity, control panels with blinking lights, astronaut equipment floating.' },
  { slug: 'underwater', order: 18,
    name: { fr: 'Sous l\'eau', en: 'Underwater', es: 'Bajo el agua' },
    promptFragment: 'Underwater scene, blue water, coral reef in background, fish swimming past, sunlight rays filtering through water surface, bubbles rising.' },
  { slug: 'desert', order: 19,
    name: { fr: 'Desert', en: 'Desert', es: 'Desierto' },
    promptFragment: 'In a vast desert, sand dunes stretching to horizon, golden hour sunlight, clear sky, single cactus visible, heat shimmer in distance.' },
  { slug: 'pool', order: 20,
    name: { fr: 'Piscine', en: 'Pool', es: 'Piscina' },
    promptFragment: 'At a swimming pool, turquoise water, pool edge tiles, lounge chairs with towels, palm trees, bright summer daylight, pool noodle floating.' },
];

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  let count = 0;
  for (const decor of DECORS) {
    await Decor.updateOne({ slug: decor.slug }, { $set: decor }, { upsert: true });
    count++;
    process.stdout.write(`\rSeeded ${count}/${DECORS.length}`);
  }

  console.log(`\nDone! ${count} decors seeded.`);
  await mongoose.disconnect();
}

main().catch((err) => { console.error('Seed failed:', err); process.exit(1); });

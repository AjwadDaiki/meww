/**
 * Seed all 41 V1 categories into MongoDB.
 * Prompts reference PROMPTS-SEEDANCE.md (not duplicated here, loaded at runtime).
 *
 * Usage: pnpm seed:categories
 * Requires: MongoDB running on localhost:27017
 */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/meowreel';

const CategorySchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true, index: true },
    section: { type: String, required: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    name: { fr: String, en: String, es: String },
    tagline: { fr: String, en: String, es: String },
    previewVideoUrl: String,
    previewPosterUrl: String,
    basePrompt: { type: String, default: '' },
    negativePrompt: { type: String, default: 'no full human body visible, no human face visible, no text overlays, no watermark, no logos, no distorted anatomy, no extra limbs, no cartoon style, no anime style, no cinematic color grading, no studio lighting' },
    generationModel: { type: String, default: 'seedance-1-lite' },
    durationSeconds: { type: Number, default: 5 },
    family: { type: String, index: true },
    resolution: { type: String, default: '720p' },
    audioPrompt: String,
    tags: [String],
    seoKeyword: String,
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const CATEGORIES = [
  // TRENDING (6)
  { slug: 'midnight-porch-musician', section: 'trending', order: 1,
    name: { fr: 'Musicien du Perron', en: 'Midnight Porch Musician', es: 'Musico del Porche' },
    tagline: { fr: 'Le trend viral Sora 2', en: 'The viral Sora 2 trend', es: 'La tendencia viral Sora 2' },
    tags: ['trending', 'porch', 'musician', 'trumpet', 'viral'] },
  { slug: 'ring-doorbell-chaos', section: 'trending', order: 2,
    name: { fr: 'Chaos Sonnette', en: 'Ring Doorbell Chaos', es: 'Caos del Timbre' },
    tagline: { fr: 'Camera de porte 3AM', en: 'Doorbell cam 3AM', es: 'Camara de puerta 3AM' },
    tags: ['trending', 'doorbell', 'night', 'chaos'] },
  { slug: 'drive-through-worker', section: 'trending', order: 3,
    name: { fr: 'Employe Drive', en: 'Drive-Through Worker', es: 'Empleado Drive' },
    tagline: { fr: 'Fast-food vibes', en: 'Fast-food vibes', es: 'Vibes fast-food' },
    tags: ['trending', 'fast-food', 'worker', 'funny'] },
  { slug: 'news-anchor-3am', section: 'trending', order: 4,
    name: { fr: 'Presentateur JT', en: 'News Anchor 3AM', es: 'Presentador Noticias' },
    tagline: { fr: 'Le JT de la nuit', en: 'Late night news', es: 'Noticias nocturnas' },
    tags: ['trending', 'news', 'anchor', 'night'] },
  { slug: 'restaurant-waiter', section: 'trending', order: 5,
    name: { fr: 'Serveur Restaurant', en: 'Restaurant Waiter', es: 'Camarero' },
    tagline: { fr: 'L\'addition svp', en: 'Check please', es: 'La cuenta por favor' },
    tags: ['trending', 'restaurant', 'waiter', 'funny'] },
  { slug: 'security-cam-confused', section: 'trending', order: 6,
    name: { fr: 'Camera de Securite', en: 'Security Cam Confused', es: 'Camara de Seguridad' },
    tagline: { fr: 'Suspect detecte', en: 'Suspect detected', es: 'Sospechoso detectado' },
    tags: ['trending', 'security', 'camera', 'night'] },

  // MUSIC (8)
  { slug: 'jazz-trumpet', section: 'music', order: 1, family: 'jazz',
    name: { fr: 'Jazz Trompette', en: 'Jazz Trumpet', es: 'Jazz Trompeta' },
    tagline: { fr: 'Club enfume', en: 'Smoky jazz club', es: 'Club de jazz' },
    tags: ['music', 'jazz', 'trumpet'] },
  { slug: 'rock-guitarist', section: 'music', order: 2, family: 'rock',
    name: { fr: 'Rock Guitariste', en: 'Rock Guitarist', es: 'Guitarrista Rock' },
    tagline: { fr: 'Concert electrique', en: 'Electric concert', es: 'Concierto electrico' },
    tags: ['music', 'rock', 'guitar', 'concert'] },
  { slug: 'club-dj', section: 'music', order: 3,
    name: { fr: 'DJ Club', en: 'DJ Club Set', es: 'DJ Club' },
    tagline: { fr: 'Aux platines', en: 'On the decks', es: 'En las tornamesas' },
    tags: ['music', 'dj', 'club', 'electronic'] },
  { slug: 'classical-pianist', section: 'music', order: 4,
    name: { fr: 'Pianiste Classique', en: 'Classical Pianist', es: 'Pianista Clasico' },
    tagline: { fr: 'Concert Steinway', en: 'Steinway concert', es: 'Concierto Steinway' },
    tags: ['music', 'piano', 'classical'] },
  { slug: 'rap-booth', section: 'music', order: 5, family: 'rap',
    name: { fr: 'Studio Rap', en: 'Rap Booth', es: 'Estudio Rap' },
    tagline: { fr: 'Au micro', en: 'On the mic', es: 'En el micro' },
    tags: ['music', 'rap', 'studio', 'mic'] },
  { slug: 'k-pop-idol', section: 'music', order: 6,
    name: { fr: 'Idol K-pop', en: 'K-pop Idol', es: 'Idol K-pop' },
    tagline: { fr: 'Neons et choreo', en: 'Neons and choreo', es: 'Neones y coreo' },
    tags: ['music', 'kpop', 'dance', 'idol'] },
  { slug: 'accordion-paris', section: 'music', order: 7,
    name: { fr: 'Accordeon Paris', en: 'Accordion Paris', es: 'Acordeon Paris' },
    tagline: { fr: 'Rue parisienne', en: 'Parisian street', es: 'Calle parisina' },
    tags: ['music', 'accordion', 'paris', 'france'] },
  { slug: 'orchestra-conductor', section: 'music', order: 8,
    name: { fr: 'Chef d\'Orchestre', en: 'Orchestra Conductor', es: 'Director de Orquesta' },
    tagline: { fr: 'Baguette en main', en: 'Baton in hand', es: 'Batuta en mano' },
    tags: ['music', 'orchestra', 'conductor', 'classical'] },

  // SPORTS (8)
  { slug: 'football-goal-celebration', section: 'sports', order: 1, family: 'football',
    name: { fr: 'Celebration But', en: 'Football Goal SIUUU', es: 'Celebracion Gol' },
    tagline: { fr: 'SIUUUU au stade', en: 'SIUUUU at the stadium', es: 'SIUUUU en el estadio' },
    tags: ['sports', 'football', 'goal', 'celebration'] },
  { slug: 'basketball-dunk', section: 'sports', order: 2, family: 'basketball',
    name: { fr: 'Dunk Basketball', en: 'Basketball Dunk', es: 'Clavada Basketball' },
    tagline: { fr: 'Slam dunk NBA', en: 'NBA slam dunk', es: 'Clavada NBA' },
    tags: ['sports', 'basketball', 'dunk', 'nba'] },
  { slug: 'boxing-ring-knockout', section: 'sports', order: 3, family: 'boxing',
    name: { fr: 'Boxe KO', en: 'Boxing Ring KO', es: 'Boxeo KO' },
    tagline: { fr: 'Champion du ring', en: 'Ring champion', es: 'Campeon del ring' },
    tags: ['sports', 'boxing', 'knockout', 'champion'] },
  { slug: 'surfer-wave', section: 'sports', order: 4,
    name: { fr: 'Surfeur Vague', en: 'Surfer Wave', es: 'Surfista Ola' },
    tagline: { fr: 'Vague geante', en: 'Giant wave', es: 'Ola gigante' },
    tags: ['sports', 'surf', 'wave', 'ocean'] },
  { slug: 'tennis-roland-garros', section: 'sports', order: 5,
    name: { fr: 'Tennis Champion', en: 'Tennis Champion', es: 'Campeon Tenis' },
    tagline: { fr: 'Trophee Roland Garros', en: 'Roland Garros trophy', es: 'Trofeo Roland Garros' },
    tags: ['sports', 'tennis', 'champion', 'roland-garros'] },
  { slug: 'f1-podium-champagne', section: 'sports', order: 6,
    name: { fr: 'Pilote F1', en: 'F1 Driver', es: 'Piloto F1' },
    tagline: { fr: 'Podium champagne', en: 'Podium champagne', es: 'Podio champagne' },
    tags: ['sports', 'f1', 'racing', 'champagne'] },
  { slug: 'skater-street-trick', section: 'sports', order: 7,
    name: { fr: 'Skateur Street', en: 'Skater Street Trick', es: 'Skater Calle' },
    tagline: { fr: 'Trick de rue', en: 'Street trick', es: 'Truco callejero' },
    tags: ['sports', 'skate', 'street', 'trick'] },
  { slug: 'gymnast-olympics-gold', section: 'sports', order: 8,
    name: { fr: 'Gymnaste Olympique', en: 'Gymnast Gold', es: 'Gimnasta Oro' },
    tagline: { fr: 'Medaille d\'or', en: 'Gold medal', es: 'Medalla de oro' },
    tags: ['sports', 'gymnastics', 'olympics', 'gold'] },

  // DANCE (6)
  { slug: 'griddy-gym', section: 'dance', order: 1, family: 'griddy', durationSeconds: 6,
    name: { fr: 'Griddy Gym', en: 'Griddy Gym', es: 'Griddy Gym' },
    tagline: { fr: 'La choree virale', en: 'The viral dance', es: 'El baile viral' },
    tags: ['dance', 'griddy', 'viral', 'gym'] },
  { slug: 'tiktok-dance-trend', section: 'dance', order: 2,
    name: { fr: 'Danse TikTok', en: 'TikTok Dance', es: 'Baile TikTok' },
    tagline: { fr: 'Trend du moment', en: 'Trending now', es: 'Tendencia ahora' },
    tags: ['dance', 'tiktok', 'trend', 'viral'] },
  { slug: 'ballet-classical', section: 'dance', order: 3,
    name: { fr: 'Ballet Classique', en: 'Classical Ballet', es: 'Ballet Clasico' },
    tagline: { fr: 'Scene Opera', en: 'Opera stage', es: 'Escenario Opera' },
    tags: ['dance', 'ballet', 'classical', 'elegant'] },
  { slug: 'disco-70s', section: 'dance', order: 4,
    name: { fr: 'Disco 70s', en: 'Disco 70s', es: 'Disco 70s' },
    tagline: { fr: 'Boule a facettes', en: 'Disco ball', es: 'Bola disco' },
    tags: ['dance', 'disco', '70s', 'retro'] },
  { slug: 'breakdance-carton', section: 'dance', order: 5,
    name: { fr: 'Breakdance', en: 'Breakdance', es: 'Breakdance' },
    tagline: { fr: 'Carton au sol', en: 'Cardboard floor', es: 'Carton en el suelo' },
    tags: ['dance', 'breakdance', 'street', 'hiphop'] },
  { slug: 'salsa-couple-cuba', section: 'dance', order: 6,
    name: { fr: 'Salsa Couple', en: 'Salsa Couple', es: 'Pareja Salsa' },
    tagline: { fr: 'Cuba libre', en: 'Cuba libre', es: 'Cuba libre' },
    tags: ['dance', 'salsa', 'couple', 'cuba'] },

  // CINEMATIC (9)
  { slug: 'ninja-night-tokyo', section: 'cinematic', order: 1,
    name: { fr: 'Ninja Nocturne', en: 'Ninja Night', es: 'Ninja Nocturno' },
    tagline: { fr: 'Rooftop Tokyo', en: 'Tokyo rooftop', es: 'Azotea Tokio' },
    tags: ['cinematic', 'ninja', 'tokyo', 'night'] },
  { slug: 'samurai-edo-period', section: 'cinematic', order: 2,
    name: { fr: 'Samourai Edo', en: 'Samurai Edo', es: 'Samurai Edo' },
    tagline: { fr: 'Katana au clair', en: 'Katana drawn', es: 'Katana desenvainada' },
    tags: ['cinematic', 'samurai', 'edo', 'japan'] },
  { slug: 'cowboy-far-west', section: 'cinematic', order: 3,
    name: { fr: 'Cowboy Far West', en: 'Cowboy Far West', es: 'Vaquero Far West' },
    tagline: { fr: 'Duel au saloon', en: 'Saloon duel', es: 'Duelo en el salon' },
    tags: ['cinematic', 'cowboy', 'western', 'saloon'] },
  { slug: 'astronaut-space', section: 'cinematic', order: 4,
    name: { fr: 'Astronaute', en: 'Astronaut', es: 'Astronauta' },
    tagline: { fr: 'ISS en orbite', en: 'ISS orbit', es: 'ISS en orbita' },
    tags: ['cinematic', 'astronaut', 'space', 'nasa'] },
  { slug: 'gladiator-colosseum', section: 'cinematic', order: 5,
    name: { fr: 'Gladiateur Rome', en: 'Gladiator Rome', es: 'Gladiador Roma' },
    tagline: { fr: 'Ave Caesar', en: 'Ave Caesar', es: 'Ave Cesar' },
    tags: ['cinematic', 'gladiator', 'rome', 'colosseum'] },
  { slug: 'viking-warrior-ship', section: 'cinematic', order: 6,
    name: { fr: 'Viking Guerrier', en: 'Viking Warrior', es: 'Guerrero Vikingo' },
    tagline: { fr: 'Longship', en: 'Longship', es: 'Longship' },
    tags: ['cinematic', 'viking', 'warrior', 'ship'] },
  { slug: 'pirate-caribbean-ship', section: 'cinematic', order: 7,
    name: { fr: 'Pirate Caraibes', en: 'Pirate Caribbean', es: 'Pirata Caribe' },
    tagline: { fr: 'A l\'abordage', en: 'All aboard', es: 'Al abordaje' },
    tags: ['cinematic', 'pirate', 'caribbean', 'ship'] },
  { slug: 'anime-hero-ghibli', section: 'cinematic', order: 8,
    name: { fr: 'Hero Anime', en: 'Anime Hero', es: 'Heroe Anime' },
    tagline: { fr: 'Style Ghibli', en: 'Ghibli style', es: 'Estilo Ghibli' },
    tags: ['cinematic', 'anime', 'ghibli', 'hero'] },
  { slug: 'cat-cooking-michelin', section: 'cinematic', order: 9,
    name: { fr: 'Chef Etoile', en: 'Michelin Chef', es: 'Chef Estrella' },
    tagline: { fr: 'Cuisine gastronomique', en: 'Fine dining', es: 'Alta cocina' },
    tags: ['cinematic', 'cooking', 'chef', 'michelin'] },

  // MOMENTS (5)
  { slug: 'birthday-party', section: 'moments', order: 1,
    name: { fr: 'Anniversaire', en: 'Birthday Party', es: 'Fiesta Cumple' },
    tagline: { fr: 'Gateau et bougies', en: 'Cake and candles', es: 'Pastel y velas' },
    tags: ['moments', 'birthday', 'party', 'celebration'] },
  { slug: 'wedding-day', section: 'moments', order: 2,
    name: { fr: 'Mariage', en: 'Wedding Day', es: 'Dia de Boda' },
    tagline: { fr: 'Oui je le veux', en: 'I do', es: 'Si acepto' },
    tags: ['moments', 'wedding', 'love', 'celebration'] },
  { slug: 'christmas-eve-santa', section: 'moments', order: 3,
    name: { fr: 'Noel', en: 'Christmas Eve', es: 'Nochebuena' },
    tagline: { fr: 'Pere Noel chat', en: 'Santa cat', es: 'Gato Santa' },
    tags: ['moments', 'christmas', 'santa', 'holiday'] },
  { slug: 'halloween-pumpkin', section: 'moments', order: 4,
    name: { fr: 'Halloween', en: 'Halloween', es: 'Halloween' },
    tagline: { fr: 'Citrouilles', en: 'Pumpkins', es: 'Calabazas' },
    tags: ['moments', 'halloween', 'pumpkin', 'spooky'] },
  { slug: 'graduation-day', section: 'moments', order: 5,
    name: { fr: 'Remise de Diplome', en: 'Graduation Day', es: 'Graduacion' },
    tagline: { fr: 'Toque et diplome', en: 'Cap and diploma', es: 'Birrete y diploma' },
    tags: ['moments', 'graduation', 'diploma', 'celebration'] },

  // ========== SIGNATURE 6-7 (hero default, family: six-seven) ==========

  { slug: 'six-seven-bedroom', section: 'dance', order: 0, family: 'six-seven', durationSeconds: 5, isSignature: true,
    name: { fr: '6-7 Chambre', en: '6-7 Bedroom', es: '6-7 Dormitorio' },
    tagline: { fr: 'Le trend du moment', en: 'The trend right now', es: 'La tendencia ahora' },
    tags: ['signature', '6-7', 'dance', 'bedroom', 'viral', 'trending'] },
  { slug: 'six-seven-gym', section: 'dance', order: 0, family: 'six-seven', durationSeconds: 5,
    name: { fr: '6-7 Gym', en: '6-7 Gym', es: '6-7 Gym' },
    tagline: { fr: '6-7 a la salle', en: '6-7 at the gym', es: '6-7 en el gym' },
    tags: ['signature', '6-7', 'dance', 'gym'] },
  { slug: 'six-seven-kitchen', section: 'dance', order: 0, family: 'six-seven', durationSeconds: 5,
    name: { fr: '6-7 Cuisine', en: '6-7 Kitchen', es: '6-7 Cocina' },
    tagline: { fr: '6-7 en cuisine', en: '6-7 in the kitchen', es: '6-7 en la cocina' },
    tags: ['signature', '6-7', 'dance', 'kitchen'] },
  { slug: 'six-seven-classroom', section: 'dance', order: 0, family: 'six-seven', durationSeconds: 5,
    name: { fr: '6-7 Classe', en: '6-7 Classroom', es: '6-7 Aula' },
    tagline: { fr: '6-7 en cours', en: '6-7 in class', es: '6-7 en clase' },
    tags: ['signature', '6-7', 'dance', 'classroom'] },
  { slug: 'six-seven-car', section: 'dance', order: 0, family: 'six-seven', durationSeconds: 5,
    name: { fr: '6-7 Voiture', en: '6-7 Car', es: '6-7 Coche' },
    tagline: { fr: '6-7 en voiture', en: '6-7 in the car', es: '6-7 en el coche' },
    tags: ['signature', '6-7', 'dance', 'car'] },
  { slug: 'six-seven-locker-room', section: 'dance', order: 0, family: 'six-seven', durationSeconds: 5,
    name: { fr: '6-7 Vestiaire', en: '6-7 Locker Room', es: '6-7 Vestuario' },
    tagline: { fr: '6-7 au vestiaire', en: '6-7 locker room', es: '6-7 vestuario' },
    tags: ['signature', '6-7', 'dance', 'locker-room'] },

  // ========== VARIATIONS (new setups, same actions) ==========

  // DANCE variations (6s duration)
  { slug: 'griddy-kitchen', section: 'dance', order: 7, family: 'griddy', durationSeconds: 6,
    name: { fr: 'Griddy Cuisine', en: 'Griddy Kitchen', es: 'Griddy Cocina' },
    tagline: { fr: 'Dance dans la cuisine', en: 'Kitchen dance', es: 'Baile en la cocina' },
    tags: ['dance', 'griddy', 'kitchen', 'viral'] },
  { slug: 'griddy-bedroom', section: 'dance', order: 8, family: 'griddy', durationSeconds: 6,
    name: { fr: 'Griddy Chambre', en: 'Griddy Bedroom', es: 'Griddy Dormitorio' },
    tagline: { fr: 'LED et danse', en: 'LEDs and dance', es: 'LEDs y baile' },
    tags: ['dance', 'griddy', 'bedroom', 'viral'] },
  { slug: 'griddy-livingroom', section: 'dance', order: 9, family: 'griddy', durationSeconds: 6,
    name: { fr: 'Griddy Salon', en: 'Griddy Living Room', es: 'Griddy Sala' },
    tagline: { fr: 'Devant la TV', en: 'In front of TV', es: 'Frente a la TV' },
    tags: ['dance', 'griddy', 'livingroom', 'viral'] },
  { slug: 'tiktok-dance-bathroom', section: 'dance', order: 10, family: 'tiktok-dance', durationSeconds: 6,
    name: { fr: 'TikTok Salle de Bain', en: 'TikTok Bathroom Dance', es: 'TikTok Bano' },
    tagline: { fr: 'Miroir selfie', en: 'Mirror selfie', es: 'Espejo selfie' },
    tags: ['dance', 'tiktok', 'bathroom', 'mirror'] },

  // SPORTS variations
  { slug: 'football-park', section: 'sports', order: 9, family: 'football',
    name: { fr: 'Football Parc', en: 'Football Park', es: 'Futbol Parque' },
    tagline: { fr: 'Shoot amateur', en: 'Amateur kick', es: 'Tiro amateur' },
    tags: ['sports', 'football', 'park', 'amateur'] },
  { slug: 'football-livingroom', section: 'sports', order: 10, family: 'football',
    name: { fr: 'Football Salon TV', en: 'Football TV Reaction', es: 'Futbol Reaccion TV' },
    tagline: { fr: 'SIUUU devant la TV', en: 'SIUUU TV reaction', es: 'SIUUU reaccion TV' },
    tags: ['sports', 'football', 'livingroom', 'celebration'] },
  { slug: 'boxing-gym-training', section: 'sports', order: 11, family: 'boxing',
    name: { fr: 'Boxe Entrainement', en: 'Boxing Gym Training', es: 'Boxeo Entrenamiento' },
    tagline: { fr: 'Au sac de frappe', en: 'On the heavy bag', es: 'En el saco' },
    tags: ['sports', 'boxing', 'gym', 'training'] },
  { slug: 'basketball-street', section: 'sports', order: 12, family: 'basketball',
    name: { fr: 'Basketball Street', en: 'Basketball Street', es: 'Basketball Calle' },
    tagline: { fr: 'Playground urbain', en: 'Urban playground', es: 'Cancha urbana' },
    tags: ['sports', 'basketball', 'street', 'urban'] },

  // MUSIC variations
  { slug: 'jazz-trumpet-street', section: 'music', order: 9, family: 'jazz',
    name: { fr: 'Jazz Trompette Rue', en: 'Jazz Street Busker', es: 'Jazz Callejero' },
    tagline: { fr: 'Busker de rue', en: 'Street busker', es: 'Musico callejero' },
    tags: ['music', 'jazz', 'trumpet', 'street'] },
  { slug: 'rock-guitar-bedroom', section: 'music', order: 10, family: 'rock',
    name: { fr: 'Rock Chambre', en: 'Rock Bedroom Jam', es: 'Rock Dormitorio' },
    tagline: { fr: 'Jam en chambre', en: 'Bedroom jam', es: 'Jam en cuarto' },
    tags: ['music', 'rock', 'guitar', 'bedroom'] },
  { slug: 'rap-freestyle-street', section: 'music', order: 11, family: 'rap',
    name: { fr: 'Rap Freestyle Rue', en: 'Rap Street Cypher', es: 'Rap Freestyle Calle' },
    tagline: { fr: 'Cypher urbain', en: 'Street cypher', es: 'Cypher callejero' },
    tags: ['music', 'rap', 'freestyle', 'street'] },
];

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  let upserted = 0;
  for (const cat of CATEGORIES) {
    await Category.updateOne(
      { slug: cat.slug },
      { $set: cat },
      { upsert: true }
    );
    upserted++;
    process.stdout.write(`\rSeeded ${upserted}/${CATEGORIES.length}`);
  }

  console.log(`\nDone! ${upserted} categories seeded.`);

  const count = await Category.countDocuments();
  console.log(`Total categories in DB: ${count}`);

  const sample = await Category.find().limit(3).lean();
  console.log('\nSample docs:');
  sample.forEach((doc: Record<string, unknown>) => {
    console.log(`  ${doc.slug} (${doc.section}) — ${(doc.name as Record<string, string>).en}`);
  });

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

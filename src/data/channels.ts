import { Channel } from '../types';
import { VOD_COUNT } from './stats';

/**
 * Channel logos are matched on id: drop a file at
 * src/assets/logos/<channel id>.png (or .jpg/.svg/.webp) and it is picked up
 * automatically — no code change needed. Channels without a file fall back to
 * the designed wordmark tile. Same convention as the posters in media.ts.
 */
const LOGOS = import.meta.glob('../assets/logos/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const LOGO_BY_ID: Record<string, string> = Object.fromEntries(
  Object.entries(LOGOS).map(([path, url]) => [
    path.split('/').pop()!.replace(/\.[^.]+$/, ''),
    url
  ])
);

const withLogos = (channels: Channel[]): Channel[] =>
  channels.map((channel) => ({ ...channel, logoSrc: LOGO_BY_ID[channel.id] }));

/**
 * Showcase sample of the line-up. This is a representative slice used by the
 * auto-scrolling wall and the category filters — not the full catalogue.
 */
export const CHANNELS_DATA: Channel[] = withLogos([
  // ---------------- Sport ----------------
  {
    id: 'ziggo-select',
    name: 'Ziggo Sport Select 4K',
    category: 'sport',
    quality: '4K Ultra HD',
    logo: '⚽',
    currentProgram: 'Live: Formule 1 Grand Prix Kwalificatie',
    popular: true
  },
  {
    id: 'viaplay-f1',
    name: 'Viaplay Sport 1 4K 60fps',
    category: 'sport',
    quality: '60 FPS',
    logo: '🏎️',
    currentProgram: 'Live: F1 Max Verstappen On-Board Cam',
    popular: true
  },
  {
    id: 'espn-1',
    name: 'ESPN 1 Eredivisie HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🇳🇱',
    currentProgram: 'Live: Feyenoord vs Ajax (De Klassieker)',
    popular: true
  },
  {
    id: 'espn-2',
    name: 'ESPN 2 UHD',
    category: 'sport',
    quality: '4K Ultra HD',
    logo: '⚽',
    currentProgram: 'Live: Keuken Kampioen Divisie',
    popular: false
  },
  {
    id: 'espn-3',
    name: 'ESPN 3 HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🥊',
    currentProgram: 'Boksgala & UFC Herhalingen',
    popular: false
  },
  {
    id: 'espn-4',
    name: 'ESPN 4 HD',
    category: 'sport',
    quality: 'Full HD',
    logo: '🤾',
    currentProgram: 'Handbal & Volleybal Eredivisie',
    popular: false
  },
  {
    id: 'sky-sports-main',
    name: 'Sky Sports Main Event 4K',
    category: 'sport',
    quality: '4K Ultra HD',
    logo: '🇬🇧',
    currentProgram: 'Live: Premier League Super Sunday',
    popular: true
  },

  // ---------------- Nederlandse Zenders ----------------
  {
    id: 'npo-1',
    name: 'NPO 1 4K UHD',
    category: 'nl',
    quality: '4K Ultra HD',
    logo: '📺',
    currentProgram: 'NOS Journaal & Studio Sport',
    popular: true
  },
  {
    id: 'rtl-4',
    name: 'RTL 4 UHD',
    category: 'nl',
    quality: 'Full HD',
    logo: '🔴',
    currentProgram: 'B&B Vol Liefde / RTL Nieuws',
    popular: true
  },
  {
    id: 'sbs-6',
    name: 'SBS 6 HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '6️⃣',
    currentProgram: 'Vandaag Inside Live',
    popular: true
  },
  {
    id: 'rtl-7',
    name: 'RTL 7 HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '🎯',
    currentProgram: 'Darts World Championship',
    popular: false
  },
  {
    id: 'rtl-5',
    name: 'RTL 5 HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '📺',
    currentProgram: 'Expeditie Robinson',
    popular: false
  },
  {
    id: 'rtl-8',
    name: 'RTL 8 HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '8️⃣',
    currentProgram: 'Films & Lifestyle',
    popular: false
  },
  {
    id: 'veronica',
    name: 'Veronica HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '🎬',
    currentProgram: 'Actiefilms & Comedyseries',
    popular: false
  },
  {
    id: 'rtl-z',
    name: 'RTL Z HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '📈',
    currentProgram: 'Beurs & Zakennieuws',
    popular: false
  },
  {
    id: 'npo-nieuws',
    name: 'NPO Nieuws HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '📰',
    currentProgram: 'Doorlopend Nieuwsoverzicht',
    popular: false
  },
  {
    id: 'rtv-noord',
    name: 'RTV Noord HD',
    category: 'nl',
    quality: 'Full HD',
    logo: '📡',
    currentProgram: 'Regionaal Nieuws Groningen',
    popular: false
  },

  // ---------------- VOD Film & Series ----------------
  {
    id: 'vod-netflix',
    name: 'Netflix Originals (VOD)',
    category: 'vod',
    quality: '4K Ultra HD',
    logo: '🔴',
    currentProgram: 'Complete Originals Bibliotheek',
    popular: true
  },

  // ---------------- Internationaal ----------------
  {
    id: 'bbc-one',
    name: 'BBC One 4K UK',
    category: 'intl',
    quality: '4K Ultra HD',
    logo: '🇬🇧',
    currentProgram: 'BBC Premier Shows & News',
    popular: false
  },
  {
    id: 'bbc-two',
    name: 'BBC Two HD UK',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇬🇧',
    currentProgram: 'Documentaires & Comedy',
    popular: false
  },
  {
    id: 'cnn-intl',
    name: 'CNN International HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🌐',
    currentProgram: 'Breaking News Wereldwijd',
    popular: false
  },
  {
    id: 'france-24',
    name: 'France 24 HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇫🇷',
    currentProgram: 'Frans & Engels Nieuws',
    popular: false
  },
  {
    id: 'zdf-de',
    name: 'ZDF HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇩🇪',
    currentProgram: 'Heute Journal & Krimi',
    popular: false
  },
  {
    id: 'rtl-de',
    name: 'RTL Television HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇩🇪',
    currentProgram: 'Duitse Shows & Series',
    popular: false
  },
  {
    id: 'tf1-fr',
    name: 'TF1 HD',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇫🇷',
    currentProgram: 'Franse Series & Films',
    popular: false
  },
  {
    id: 'een-be',
    name: 'Één HD België',
    category: 'intl',
    quality: 'Full HD',
    logo: '🇧🇪',
    currentProgram: 'VRT Journaal & Thuis',
    popular: true
  },

  // ---------------- Kinderen ----------------
  {
    id: 'disney-channel',
    name: 'Disney Channel NL',
    category: 'kids',
    quality: 'Full HD',
    logo: '🏰',
    currentProgram: 'Animatieseries (Nederlands gesproken)',
    popular: false
  },
  {
    id: 'nickelodeon',
    name: 'Nickelodeon NL HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🟧',
    currentProgram: 'SpongeBob & Paw Patrol NL',
    popular: false
  },
  {
    id: 'cartoon-network',
    name: 'Cartoon Network NL HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🎨',
    currentProgram: 'Tekenfilms Nederlands Gesproken',
    popular: false
  },
  {
    id: 'disney-junior',
    name: 'Disney Junior HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🧸',
    currentProgram: 'Series voor de Allerkleinsten',
    popular: false
  },
  {
    id: 'nick-jr',
    name: 'Nick Jr. HD',
    category: 'kids',
    quality: 'Full HD',
    logo: '🐾',
    currentProgram: 'Peuter- & Kleuterseries',
    popular: false
  }
]);

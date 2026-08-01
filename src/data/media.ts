import { MediaItem, MediaRow } from '../types';

/**
 * Titles, years, ratings, genres and poster art sourced from IMDb (juli 2026):
 * - Series:        IMDb TVMeter "Most Popular TV Shows" (top 15)
 * - Films:         IMDb list ls541624030 "THE BEST FILMS OF 2020-2026" (eerste 15)
 * - Kids & Familie: IMDb list ls068619562 "Family & Kids" (eerste 15)
 *
 * Posters live in ../assets/posters/<item id>.jpg and are matched on id, so a
 * new title only needs its artwork dropped in under the matching filename.
 */
const POSTERS = import.meta.glob('../assets/posters/*.jpg', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

type RawMediaItem = Omit<MediaItem, 'poster'>;
type RawMediaRow = Omit<MediaRow, 'items'> & { items: RawMediaItem[] };

const withPosters = (rows: RawMediaRow[]): MediaRow[] =>
  rows.map((row) => ({
    ...row,
    items: row.items.map((item) => ({
      ...item,
      poster: POSTERS[`../assets/posters/${item.id}.jpg`]
    }))
  }));

export const MEDIA_ROWS: MediaRow[] = withPosters([
  {
    id: 'series',
    title: 'Populairste Series Van Dit Moment',
    subtitle: 'De IMDb TVMeter top 15 — compleet met alle seizoenen',
    items: [
      {
        id: 'sr-house-of-the-dragon',
        title: 'House of the Dragon',
        type: 'serie',
        year: 2022,
        rating: 8.3,
        genre: 'Actie / Avontuur',
        quality: '4K Ultra HD',
        accent: 'from-red-700 to-slate-900',
        badge: '#1 Trending'
      },
      {
        id: 'sr-the-hawk',
        title: 'The Hawk',
        type: 'serie',
        year: 2026,
        rating: 6.4,
        genre: 'Komedie / Sport',
        quality: '4K Ultra HD',
        accent: 'from-amber-600 to-orange-900',
        badge: 'Nieuw'
      },
      {
        id: 'sr-ride-or-die',
        title: 'Ride or Die',
        type: 'serie',
        year: 2026,
        rating: 7.6,
        genre: 'Actie / Avontuur',
        quality: '4K Ultra HD',
        accent: 'from-orange-600 to-red-900',
        badge: 'Nieuw'
      },
      {
        id: 'sr-silo',
        title: 'Silo',
        type: 'serie',
        year: 2023,
        rating: 8.1,
        genre: 'Sci-Fi / Mystery',
        quality: '4K Ultra HD',
        accent: 'from-slate-600 to-slate-950'
      },
      {
        id: 'sr-i-will-find-you',
        title: 'I Will Find You',
        type: 'serie',
        year: 2026,
        rating: 7.1,
        genre: 'Misdaad / Mystery',
        quality: '4K Ultra HD',
        accent: 'from-cyan-700 to-slate-900',
        badge: 'Nieuw'
      },
      {
        id: 'sr-ransom-canyon',
        title: 'Ransom Canyon',
        type: 'serie',
        year: 2025,
        rating: 6.8,
        genre: 'Drama / Western',
        quality: '4K Ultra HD',
        accent: 'from-amber-700 to-stone-900'
      },
      {
        id: 'sr-lanterns',
        title: 'Lanterns',
        type: 'serie',
        year: 2026,
        genre: 'Actie / Misdaad',
        quality: '4K Ultra HD',
        accent: 'from-emerald-600 to-green-950',
        badge: 'Binnenkort'
      },
      {
        id: 'sr-stuart-fails',
        title: 'Stuart Fails to Save the Universe',
        type: 'serie',
        year: 2026,
        rating: 7.1,
        genre: 'Komedie / Sci-Fi',
        quality: '4K Ultra HD',
        accent: 'from-violet-600 to-indigo-950',
        badge: 'Nieuw'
      },
      {
        id: 'sr-lucky',
        title: 'Lucky',
        type: 'serie',
        year: 2026,
        rating: 6.6,
        genre: 'Misdaad / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-green-600 to-emerald-950',
        badge: 'Nieuw'
      },
      {
        id: 'sr-neuromancer',
        title: 'Neuromancer',
        type: 'serie',
        year: 2027,
        genre: 'Sci-Fi / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-fuchsia-600 to-indigo-950',
        badge: 'Binnenkort'
      },
      {
        id: 'sr-cape-fear',
        title: 'Cape Fear',
        type: 'serie',
        year: 2026,
        rating: 6.8,
        genre: 'Misdaad / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-sky-700 to-slate-950',
        badge: 'Nieuw'
      },
      {
        id: 'sr-widows-bay',
        title: "Widow's Bay",
        type: 'serie',
        year: 2026,
        rating: 8.1,
        genre: 'Komedie / Horror',
        quality: '4K Ultra HD',
        accent: 'from-purple-700 to-slate-950',
        badge: 'Nieuw'
      },
      {
        id: 'sr-game-of-thrones',
        title: 'Game of Thrones',
        type: 'serie',
        year: 2011,
        rating: 9.2,
        genre: 'Drama / Fantasy',
        quality: '4K Ultra HD',
        accent: 'from-slate-700 to-neutral-950'
      },
      {
        id: 'sr-little-house',
        title: 'Little House on the Prairie',
        type: 'serie',
        year: 2026,
        rating: 7.3,
        genre: 'Drama / Familie',
        quality: '4K Ultra HD',
        accent: 'from-lime-600 to-emerald-900',
        badge: 'Nieuw'
      },
      {
        id: 'sr-gign',
        title: 'GIGN',
        type: 'serie',
        year: 2026,
        rating: 6.3,
        genre: 'Actie',
        quality: '4K Ultra HD',
        accent: 'from-blue-700 to-slate-950',
        badge: 'Nieuw'
      }
    ]
  },
  {
    id: 'films',
    title: 'De Beste Films 2020–2026',
    subtitle: 'Van bekroonde arthouse tot onontdekte parels',
    items: [
      {
        id: 'fl-another-round',
        title: 'Another Round',
        type: 'film',
        year: 2020,
        rating: 7.7,
        genre: 'Komedie / Drama',
        quality: '4K Ultra HD',
        accent: 'from-amber-500 to-orange-800',
        badge: 'Oscar'
      },
      {
        id: 'fl-after-love',
        title: 'After Love',
        type: 'film',
        year: 2020,
        rating: 7.3,
        genre: 'Drama',
        quality: 'Full HD',
        accent: 'from-rose-600 to-slate-900'
      },
      {
        id: 'fl-da-5-bloods',
        title: 'Da 5 Bloods',
        type: 'film',
        year: 2020,
        rating: 6.5,
        genre: 'Avontuur / Oorlog',
        quality: '4K Ultra HD',
        accent: 'from-yellow-700 to-green-950'
      },
      {
        id: 'fl-dear-comrades',
        title: 'Dear Comrades!',
        type: 'film',
        year: 2020,
        rating: 7.4,
        genre: 'Drama / Historisch',
        quality: 'Full HD',
        accent: 'from-red-700 to-neutral-900'
      },
      {
        id: 'fl-devil-all-the-time',
        title: 'The Devil All the Time',
        type: 'film',
        year: 2020,
        rating: 7.1,
        genre: 'Misdaad / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-stone-600 to-stone-950'
      },
      {
        id: 'fl-dinner-in-america',
        title: 'Dinner in America',
        type: 'film',
        year: 2020,
        rating: 7.5,
        genre: 'Komedie / Muziek',
        quality: 'Full HD',
        accent: 'from-pink-600 to-purple-900'
      },
      {
        id: 'fl-the-disciple',
        title: 'The Disciple',
        type: 'film',
        year: 2020,
        rating: 7.1,
        genre: 'Drama / Muziek',
        quality: 'Full HD',
        accent: 'from-indigo-600 to-slate-900'
      },
      {
        id: 'fl-farewell-amor',
        title: 'Farewell Amor',
        type: 'film',
        year: 2020,
        rating: 6.9,
        genre: 'Drama / Romantiek',
        quality: 'Full HD',
        accent: 'from-fuchsia-600 to-rose-900'
      },
      {
        id: 'fl-father-otac',
        title: 'Father',
        type: 'film',
        year: 2020,
        rating: 7.6,
        genre: 'Drama',
        quality: 'Full HD',
        accent: 'from-slate-500 to-slate-900'
      },
      {
        id: 'fl-the-father',
        title: 'The Father',
        type: 'film',
        year: 2020,
        rating: 8.2,
        genre: 'Drama / Mystery',
        quality: '4K Ultra HD',
        accent: 'from-blue-600 to-indigo-950',
        badge: 'Oscar'
      },
      {
        id: 'fl-fear-strah',
        title: 'Fear',
        type: 'film',
        year: 2020,
        rating: 7.2,
        genre: 'Komedie / Romantiek',
        quality: 'Full HD',
        accent: 'from-teal-600 to-slate-900'
      },
      {
        id: 'fl-forty-year-old-version',
        title: 'The Forty-Year-Old Version',
        type: 'film',
        year: 2020,
        rating: 7.2,
        genre: 'Komedie / Drama',
        quality: 'Full HD',
        accent: 'from-neutral-500 to-neutral-900'
      },
      {
        id: 'fl-hamilton',
        title: 'Hamilton',
        type: 'film',
        year: 2020,
        rating: 8.3,
        genre: 'Biografie / Historisch',
        quality: '4K Ultra HD',
        accent: 'from-amber-600 to-yellow-900',
        badge: 'Top 10'
      },
      {
        id: 'fl-ending-things',
        title: "I'm Thinking of Ending Things",
        type: 'film',
        year: 2020,
        rating: 6.5,
        genre: 'Drama / Thriller',
        quality: '4K Ultra HD',
        accent: 'from-sky-700 to-slate-950'
      },
      {
        id: 'fl-identifying-features',
        title: 'Identifying Features',
        type: 'film',
        year: 2020,
        rating: 7.3,
        genre: 'Drama',
        quality: 'Full HD',
        accent: 'from-orange-700 to-amber-950'
      }
    ]
  },
  {
    id: 'familie',
    title: 'Kids & Familie',
    subtitle: 'Tijdloze klassiekers voor het hele gezin',
    items: [
      {
        id: 'kf-sinbad',
        title: 'The 7th Voyage of Sinbad',
        type: 'film',
        year: 1958,
        rating: 7.0,
        genre: 'Avontuur / Familie',
        quality: 'Full HD',
        accent: 'from-teal-500 to-blue-900'
      },
      {
        id: 'kf-gulliver',
        title: 'The 3 Worlds of Gulliver',
        type: 'film',
        year: 1960,
        rating: 6.4,
        genre: 'Avontuur / Fantasy',
        quality: 'Full HD',
        accent: 'from-amber-500 to-orange-800'
      },
      {
        id: 'kf-jason-argonauts',
        title: 'Jason and the Argonauts',
        type: 'film',
        year: 1963,
        rating: 7.3,
        genre: 'Avontuur / Familie',
        quality: 'Full HD',
        accent: 'from-cyan-600 to-blue-900'
      },
      {
        id: 'kf-lotr-1978',
        title: 'The Lord of the Rings',
        type: 'film',
        year: 1978,
        rating: 6.2,
        genre: 'Animatie / Fantasy',
        quality: 'Full HD',
        accent: 'from-yellow-600 to-stone-900'
      },
      {
        id: 'kf-water-babies',
        title: 'The Water Babies',
        type: 'film',
        year: 1978,
        rating: 6.1,
        genre: 'Animatie / Familie',
        quality: 'Full HD',
        accent: 'from-sky-400 to-cyan-800'
      },
      {
        id: 'kf-watership-down',
        title: 'Watership Down',
        type: 'film',
        year: 1978,
        rating: 7.5,
        genre: 'Animatie / Avontuur',
        quality: 'Full HD',
        accent: 'from-lime-600 to-green-900'
      },
      {
        id: 'kf-lion-witch-wardrobe',
        title: 'The Lion, the Witch & the Wardrobe',
        type: 'film',
        year: 1979,
        rating: 7.0,
        genre: 'Animatie / Avontuur',
        quality: 'Full HD',
        accent: 'from-amber-600 to-red-900'
      },
      {
        id: 'kf-clash-of-titans',
        title: 'Clash of the Titans',
        type: 'film',
        year: 1981,
        rating: 6.9,
        genre: 'Avontuur / Fantasy',
        quality: 'Full HD',
        accent: 'from-yellow-500 to-slate-900'
      },
      {
        id: 'kf-et',
        title: 'E.T. the Extra-Terrestrial',
        type: 'film',
        year: 1982,
        rating: 7.9,
        genre: 'Familie / Sci-Fi',
        quality: '4K Ultra HD',
        accent: 'from-indigo-500 to-purple-900',
        badge: 'Klassieker'
      },
      {
        id: 'kf-last-unicorn',
        title: 'The Last Unicorn',
        type: 'film',
        year: 1982,
        rating: 7.3,
        genre: 'Animatie / Avontuur',
        quality: 'Full HD',
        accent: 'from-pink-400 to-violet-800'
      },
      {
        id: 'kf-dark-crystal',
        title: 'The Dark Crystal',
        type: 'film',
        year: 1982,
        rating: 7.1,
        genre: 'Avontuur / Fantasy',
        quality: 'Full HD',
        accent: 'from-violet-600 to-indigo-950'
      },
      {
        id: 'kf-wind-in-the-willows',
        title: 'The Wind in the Willows',
        type: 'film',
        year: 1983,
        rating: 7.5,
        genre: 'Animatie / Familie',
        quality: 'Full HD',
        accent: 'from-green-500 to-emerald-900'
      },
      {
        id: 'kf-ghostbusters',
        title: 'Ghostbusters',
        type: 'film',
        year: 1984,
        rating: 7.8,
        genre: 'Komedie / Fantasy',
        quality: '4K Ultra HD',
        accent: 'from-slate-500 to-red-900',
        badge: 'Klassieker'
      },
      {
        id: 'kf-karate-kid',
        title: 'The Karate Kid',
        type: 'film',
        year: 1984,
        rating: 7.3,
        genre: 'Actie / Familie',
        quality: '4K Ultra HD',
        accent: 'from-red-600 to-neutral-900'
      },
      {
        id: 'kf-neverending-story',
        title: 'The NeverEnding Story',
        type: 'film',
        year: 1984,
        rating: 7.3,
        genre: 'Avontuur / Familie',
        quality: 'Full HD',
        accent: 'from-amber-500 to-purple-900'
      }
    ]
  }
]);

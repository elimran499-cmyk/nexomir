import React, { useEffect, useRef, useState } from 'react';
import { MEDIA_ROWS } from '../data/media';
import { MediaItem, MediaRow } from '../types';
import { Film, Play, Star, Sparkles, Subtitles, Download } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { VOD_COUNT } from '../data/stats';

interface FilmsSeriesProps {
  onOpenCheckoutModal: () => void;
}

type MediaFilter = 'all' | 'film' | 'serie';

const MediaCard: React.FC<{ item: MediaItem }> = ({ item }) => (
  <article className="group w-36 sm:w-44 shrink-0 cursor-pointer">
    <div
      className={`relative aspect-[2/3] rounded-2xl bg-gradient-to-br ${item.accent} overflow-hidden ring-1 ring-white/10 shadow-lg group-hover:ring-emerald-400/60 group-hover:-translate-y-1 transition-all duration-200`}
    >
      {/* Poster artwork */}
      <img
        src={item.poster}
        alt={`Poster van ${item.title}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      {item.badge && (
        <span className="absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-sm">
          {item.badge}
        </span>
      )}

      <span className="absolute top-2 right-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-sm">
        {item.quality === '4K Ultra HD' ? '4K' : 'HD'}
      </span>

      {/* Hover play affordance */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
        <span className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl">
          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
        </span>
      </div>

      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        {item.rating !== undefined ? (
          <span className="flex items-center gap-1 text-[10px] font-extrabold text-white">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            {item.rating.toFixed(1)}
          </span>
        ) : (
          <span className="text-[10px] font-extrabold text-white/70">Nog geen score</span>
        )}
        <span className="text-[10px] font-bold text-white/80">
          {item.type === 'serie' ? 'Serie' : 'Film'}
        </span>
      </div>
    </div>

    <h4 className="mt-2.5 text-sm font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
      {item.title}
    </h4>
    <p className="text-[11px] font-semibold text-slate-400 truncate">
      {item.year} • {item.genre}
    </p>
  </article>
);

const GAP_PX = 16; // matches gap-4 between the two duplicated tracks

interface MediaCarouselProps {
  row: MediaRow;
  /** Auto-scroll speed in pixels per second. */
  speed?: number;
  /** 1 scrolls the posters leftwards, -1 rightwards. */
  direction?: 1 | -1;
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ row, speed = 28, direction = 1 }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Endless auto-scroll: the track is rendered twice, so wrapping the scroll
  // position by exactly one track width makes the loop seamless. It never
  // pauses — not on hover, touch or filtering.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    const loopWidth = () => track.offsetWidth + GAP_PX;

    scroller.scrollLeft = direction === -1 ? loopWidth() : 0;

    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const elapsed = now - previous;
      previous = now;

      const loop = loopWidth();
      if (loop > 0) {
        let next = scroller.scrollLeft + (direction * speed * elapsed) / 1000;
        if (next >= loop) next -= loop;
        if (next < 0) next += loop;
        scroller.scrollLeft = next;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [speed, direction, row.items.length]);

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            {row.title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-slate-400">{row.subtitle}</p>
        </div>
      </div>

      <div className="relative">
        <div ref={scrollerRef} className="flex gap-4 overflow-hidden py-3">
          {/* Original track — measured to determine the loop distance */}
          <div ref={trackRef} className="flex gap-4 shrink-0">
            {row.items.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
          {/* Duplicate track so the carousel never reaches an end */}
          <div className="flex gap-4 shrink-0" aria-hidden="true">
            {row.items.map((item) => (
              <MediaCard key={`${item.id}-loop`} item={item} />
            ))}
          </div>
        </div>
        {/* Fade masks so posters dissolve into the section on both sides */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-slate-950 to-transparent" />
      </div>
    </div>
  );
};

export const FilmsSeries: React.FC<FilmsSeriesProps> = ({ onOpenCheckoutModal }) => {
  const [filter, setFilter] = useState<MediaFilter>('all');

  const visibleRows = MEDIA_ROWS
    .map((row) => ({
      ...row,
      items: filter === 'all' ? row.items : row.items.filter((item) => item.type === filter)
    }))
    .filter((row) => row.items.length > 0);

  const filters: { id: MediaFilter; label: string }[] = [
    { id: 'all', label: 'Alles' },
    { id: 'film', label: 'Films' },
    { id: 'serie', label: 'Series' }
  ];

  return (
    <section id="films" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Ambient cinema glow */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Heading */}
        <SectionHeading
          label="Films & Series"
          tone="dark"
          title={<>Jouw eigen <span className="hl-pill">bioscoop</span>, altijd open</>}
          intro="De populairste series van dit moment, de best beoordeelde films en tijdloze familieklassiekers. Kijk wanneer je wilt, pauzeer wanneer je wilt — allemaal met NL ondertiteling."
        />

        {/* Type Filter */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {filters.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filter === option.id
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Endlessly auto-scrolling carousels — alternating direction per row */}
        <div className="mt-10 space-y-8">
          {visibleRows.map((row, index) => (
            <MediaCarousel
              key={row.id}
              row={row}
              speed={index === 1 ? 22 : 28}
              direction={index % 2 === 1 ? -1 : 1}
            />
          ))}
        </div>


        {/* Value props */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-3">
            <Subtitles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm">NL Ondertiteling & Audio</h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Nederlandse subs op vrijwel elke titel, veel kinderfilms ook NL gesproken.
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-3">
            <Download className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm">Direct Afspelen</h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Geen wachttijd of buffering — start binnen 2 seconden op elk apparaat.
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm">Wekelijks Aangevuld</h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Nieuwe bioscooptitels en verse seizoenen worden automatisch toegevoegd.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 max-w-4xl mx-auto bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black">
              Blader zelf door de volledige filmbibliotheek
            </h3>
            <p className="text-emerald-100 text-sm sm:text-base font-medium">
              Kies een pakket en ontdek alle {VOD_COUNT} films en series op jouw eigen TV.
            </p>
          </div>
          <button
            onClick={onOpenCheckoutModal}
            className="px-6 py-3.5 bg-white hover:bg-emerald-50 text-emerald-800 font-extrabold text-sm rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Bekijk Pakketten</span>
          </button>
        </div>

      </div>
    </section>
  );
};

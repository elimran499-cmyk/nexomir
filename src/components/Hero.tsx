import React from 'react';
import { Play, MessageCircle, ChevronRight } from 'lucide-react';
import { MEDIA_ROWS } from '../data/media';
import { CONTACT_LINK } from '../data/contact';
import { CHANNEL_COUNT } from '../data/stats';
import { DoodleTv, DoodleRemote, DoodleSignal, DoodleCluster } from './HeroDoodles';

interface HeroProps {
  onOpenCheckoutModal: () => void;
}

/** Flattened poster pool for the side strip, de-duplicated by id. */
const POSTER_POOL = Array.from(
  new Map(
    MEDIA_ROWS.flatMap((row) => row.items)
      .filter((item) => Boolean(item.poster))
      .map((item) => [item.id, item])
  ).values()
);

const COLUMN_A = POSTER_POOL.filter((_, i) => i % 3 === 0).slice(0, 8);
const COLUMN_B = POSTER_POOL.filter((_, i) => i % 3 === 1).slice(0, 8);
const COLUMN_C = POSTER_POOL.filter((_, i) => i % 3 === 2).slice(0, 8);

interface PosterColumnProps {
  items: typeof POSTER_POOL;
  direction: 'up' | 'down';
  className?: string;
}

/** A seamlessly looping vertical column of posters (track duplicated once). */
const PosterColumn: React.FC<PosterColumnProps> = ({ items, direction, className = '' }) => (
  <div className={`overflow-hidden ${className}`} aria-hidden="true">
    <div
      className={`flex flex-col gap-2.5 sm:gap-3 ${
        direction === 'up' ? 'hero-track-up' : 'hero-track-down'
      }`}
    >
      {[0, 1].map((pass) => (
        <React.Fragment key={pass}>
          {items.map((item) => (
            <div
              key={`${pass}-${item.id}`}
              className="relative aspect-2/3 w-full shrink-0 overflow-hidden rounded-lg sm:rounded-xl bg-ink/10 shadow-lg shadow-ink/20"
            >
              {/* Eager: the strip is above the fold, so lazy loading would leave
                  most of the column blank on first paint. */}
              <img
                src={item.poster}
                alt=""
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
);

export const Hero: React.FC<HeroProps> = ({ onOpenCheckoutModal }) => {
  return (
    <section className="relative bg-canvas overflow-hidden pt-24 pb-64 sm:pb-72 lg:pt-28 lg:pb-0 lg:min-h-[94vh] flex items-center">

      {/* ---------- Right side panel (lg+): ring, amber slab and the film strip ---------- */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[46%] hidden lg:block">
        {/* Thin outlined ring straddling the wordmark and the strip */}
        <div className="doodle-ring absolute top-[10%] left-[6%] w-[26rem] h-[26rem]" />

        {/* Amber slab anchored to the right edge, bleeding off right and bottom */}
        <div className="absolute right-0 bottom-0 w-[78%] h-[58%] bg-brand rounded-tl-[2.5rem]" />
      </div>

      {/* Film poster strip (lg+) — in front of the slab, bleeding off the bottom.
          pr-12 leaves a clear gutter for the vertical spine label. */}
      <div className="absolute right-0 bottom-0 top-20 w-[42%] hidden lg:flex gap-3 justify-end pr-12 z-[1] [mask-image:linear-gradient(to_bottom,transparent,#000_9%,#000_88%,transparent)]">
        <PosterColumn items={COLUMN_A} direction="up" className="w-[9.5rem] xl:w-[11rem]" />
        <PosterColumn items={COLUMN_B} direction="down" className="w-[9.5rem] xl:w-[11rem] mt-10" />
      </div>

      {/* ---------- Below lg: the same slab + poster motif as a bottom band ---------- */}
      <div className="lg:hidden absolute inset-x-0 bottom-0 h-56 sm:h-64 z-[1] pointer-events-none">
        {/* Ring, echoing the desktop panel */}
        <div className="doodle-ring absolute -top-12 right-[26%] w-44 h-44 sm:w-56 sm:h-56" />

        {/* Amber slab bleeding off the right and bottom edges. Kept narrow enough
            that the poster columns cover it rather than leaving bare amber. */}
        <div className="absolute right-0 bottom-0 w-[62%] sm:w-[52%] h-[86%] bg-brand rounded-tl-[2rem]" />

        {/* Poster columns standing in front of the slab. Flush to the right edge
            with a hairline gap, so the amber never shows as stripes between them. */}
        <div className="absolute inset-y-0 right-0 flex gap-1 justify-end [mask-image:linear-gradient(to_bottom,transparent,#000_16%,#000_92%,transparent)]">
          <PosterColumn items={COLUMN_C} direction="down" className="hidden sm:block w-32 mt-3" />
          <PosterColumn items={COLUMN_A} direction="up" className="w-28 sm:w-32" />
          <PosterColumn items={COLUMN_B} direction="down" className="w-28 sm:w-32 mt-6" />
        </div>

        {/* Italic caption, tucked left of the columns */}
        <p className="absolute bottom-6 right-[58%] text-right font-display italic text-[11px] sm:text-xs font-bold text-ink leading-snug">
          Meest bekeken
          <br />
          films &amp; series
        </p>
      </div>

      {/* Italic caption for the lg+ panel */}
      <p className="hidden lg:block absolute bottom-12 right-[31%] z-[2] text-right font-display italic text-sm font-bold text-ink leading-snug">
        Meest bekeken films &amp; series
        <br />
        {CHANNEL_COUNT} zenders · 4K Ultra HD
      </p>


      {/* Vertical spine label on the right edge */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute top-28 right-4 z-[3] text-[11px] font-bold tracking-[0.3em] text-ink/45 [writing-mode:vertical-rl]"
      >
        NEXOMIR · 2025
      </span>

      {/* ---------- Left side: wordmark block ---------- */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:max-w-[58%]">

          {/* inline-block keeps the box hugging the type so the doodles sit
              against the letters rather than drifting into the column's slack. */}
          <div className="relative inline-block">

            {/* Angled tag: in flow above the wordmark until lg, where the type is
                finally large enough that the tag fits the margin between the two
                lines without covering letters — as in the reference. Deliberately
                not z-raised: the wordmark paints over the tag's trailing edge. */}
            <span className="mb-3 lg:mb-0 inline-block lg:absolute lg:left-0 lg:top-[28%] bg-brand text-ink font-display text-sm sm:text-base font-extrabold italic px-3.5 sm:px-4 py-1 rounded-lg -rotate-2 shadow-sm whitespace-nowrap">
              Premium 4K IPTV
            </span>

            {/* Wordmark with its own positioning context, so the quote and doodles
                anchor to the type rather than to the tag above it. */}
            <div className="relative">

              {/* Doodles scattered around the wordmark */}
              {/* Hidden until lg, where the in-flow tag stops occupying this band */}
              <DoodleTv className="hidden lg:block absolute -top-12 left-[22%] w-11 h-11 text-ink/70 -rotate-6" />
              <DoodleCluster className="absolute -top-9 sm:-top-14 -right-3 sm:-right-6 w-14 h-9 sm:w-24 sm:h-16 text-ink/70 rotate-3" />
              <DoodleSignal className="hidden sm:block absolute top-[46%] -right-10 w-10 h-10 text-ink/70 rotate-12" />
              <DoodleRemote className="absolute -bottom-5 sm:-bottom-7 left-[30%] w-8 h-8 sm:w-12 sm:h-12 text-ink/70 -rotate-12" />

              {/* Oversized opening quote, in the margin left of the first line */}
              <span
                aria-hidden="true"
                className="font-display absolute -top-2 sm:-top-3 left-0 text-4xl sm:text-6xl lg:text-7xl font-extrabold text-ink select-none leading-none"
              >
                &rdquo;
              </span>

              <h1 className="font-display font-extrabold text-ink uppercase leading-[0.82] text-[3.25rem] sm:text-7xl lg:text-[6.5rem] tracking-[-0.03em]">
                {/* Line 1 — indented so the quote and tag have a margin to sit in,
                    with the amber lozenge riding behind its upper band */}
                <span className="relative inline-block ml-[0.6em] sm:ml-[1.15em] lg:ml-[1.6em]">
                  <span
                    aria-hidden="true"
                    className="absolute bg-brand rounded-full -left-[0.2em] -right-[0.3em] top-[0.02em] h-[0.52em]"
                  />
                  <span className="relative">Nexo</span>
                </span>
                <br />
                {/* Line 2 — flush left, closing on the amber full stop */}
                <span className="relative">
                  mir<span className="text-brand">.</span>
                </span>
              </h1>
            </div>
          </div>

          <p className="mt-8 sm:mt-10 text-base sm:text-lg text-ink-soft leading-relaxed max-w-lg font-medium">
            Alle Nederlandse zenders, complete sportpakketten en de nieuwste films en series op elk
            apparaat — zonder schotel, zonder kabel en zonder buffering.
          </p>

          {/* CTAs sit where the reference places its name row */}
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              onClick={onOpenCheckoutModal}
              className="px-8 py-4 bg-ink hover:bg-ink/90 text-white font-display font-extrabold text-base rounded-full shadow-lg shadow-ink/20 hover:shadow-xl transition-all active:scale-98 flex items-center justify-center gap-2.5 group"
              id="hero-btn-pakketten"
            >
              <span>Bekijk Pakketten</span>
              <Play className="w-4 h-4 fill-white group-hover:translate-x-0.5 transition-transform" />
            </button>

            <a
              href={CONTACT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-brand hover:bg-brand-deep text-ink font-display font-extrabold text-base rounded-full transition-all flex items-center justify-center gap-2.5"
              id="hero-btn-contact"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Neem Contact Op</span>
            </a>
          </div>

          {/* Arrow-circle byline, as in the reference's lower-left corner */}
          <div className="mt-8 sm:mt-10 lg:mb-14 flex items-center gap-3">
            <span className="doodle-ring w-9 h-9 flex items-center justify-center text-ink shrink-0">
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </span>
            <span className="font-display font-extrabold text-ink text-sm sm:text-base">
              Nexomir · 4.9/5 uit 1.400+ reviews
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

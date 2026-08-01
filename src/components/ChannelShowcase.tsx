import React from 'react';
import { CHANNELS_DATA } from '../data/channels';
import { Channel } from '../types';
import { RefreshCw, Sparkles } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { ChannelLogo } from './ChannelLogo';
import { CHANNEL_COUNT } from '../data/stats';
import { DURATION_SUMMARY } from '../data/pricing';

interface ChannelShowcaseProps {
  onOpenCheckoutModal: () => void;
}

/** Rows on the logo wall. Each scrolls opposite to the row above it. */
const ROW_COUNT = 3;

/** Seconds a single tile takes to cross the row — sets the scroll speed. */
const SECONDS_PER_TILE = 3.2;

/** A row shorter than this would leave visible gaps, so its items repeat. */
const MIN_ROW_ITEMS = 8;

const fillRow = (items: Channel[]): Channel[] => {
  if (items.length === 0) return [];
  const filled = [...items];
  while (filled.length < MIN_ROW_ITEMS) filled.push(...items);
  return filled;
};

/** Deals the filtered channels round-robin across the rows. */
const splitIntoRows = (channels: Channel[]): Channel[][] => {
  const rows: Channel[][] = Array.from({ length: ROW_COUNT }, () => []);
  channels.forEach((channel, index) => rows[index % ROW_COUNT].push(channel));
  return rows.map(fillRow).filter((row) => row.length > 0);
};

interface MarqueeRowProps {
  channels: Channel[];
  direction: 'left' | 'right';
}

/**
 * One endlessly scrolling row of logos.
 *
 * The track holds two identical passes and animates by -50%. Each pass carries
 * a trailing gap equal to its internal gap, so a pass is exactly half the track
 * width and the wrap lands on an identical frame — no seam, whatever the count.
 */
const MarqueeRow: React.FC<MarqueeRowProps> = ({ channels, direction }) => (
  <div className="overflow-hidden">
    <div
      className={`flex w-max hover:[animation-play-state:paused] ${
        direction === 'left' ? 'marquee-left' : 'marquee-right'
      }`}
      style={
        { '--marquee-duration': `${Math.max(18, channels.length * SECONDS_PER_TILE)}s` } as React.CSSProperties
      }
    >
      {[0, 1].map((pass) => (
        <div
          key={pass}
          className="flex gap-3 sm:gap-4 pr-3 sm:pr-4"
          aria-hidden={pass === 1 ? true : undefined}
        >
          {channels.map((channel, index) => (
            <ChannelLogo key={`${pass}-${channel.id}-${index}`} channel={channel} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const ChannelShowcase: React.FC<ChannelShowcaseProps> = ({ onOpenCheckoutModal }) => {
  const rows = splitIntoRows(CHANNELS_DATA);

  return (
    <section id="kanalen" className="py-20 bg-canvas-alt relative border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          label="Zenders"
          title={<>Ontdek het <span className="hl-pill">volledige</span> zenderaanbod</>}
          intro="Van de Eredivisie en Formule 1 tot NPO, RTL, SBS en de nieuwste bioscoopfilms. Alle zenders in haarscherpe 4K Ultra HD."
        />

        {/* Result counter + scroll hint */}
        <div className="mt-8 max-w-5xl mx-auto flex items-center justify-between gap-4 px-1">
          <p className="text-xs sm:text-sm font-bold text-ink-soft">
            {CHANNELS_DATA.length} zenders in beeld
            <span className="text-ink-soft/70 font-semibold"> van {CHANNEL_COUNT}</span>
          </p>
          {rows.length > 0 && (
            <p className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-ink-soft/70">
              <RefreshCw className="w-3.5 h-3.5" />
              Loopt automatisch door
            </p>
          )}
        </div>

        {/* Endlessly scrolling logo wall — rows alternate left / right */}
        <div className="mt-4 relative">
          <div className="space-y-3 sm:space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
            {rows.map((row, index) => (
              <MarqueeRow
                key={index}
                channels={row}
                direction={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>

        {/* Channel Banner Callout */}
        <div className="mt-10 max-w-4xl mx-auto bg-ink text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-ink/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display text-xl sm:text-2xl font-extrabold">
              Al jouw favoriete zenders in één abonnement
            </h3>
            <p className="text-white/70 text-sm sm:text-base font-medium">
              Kies een looptijd van {DURATION_SUMMARY} en kijk binnen 5 minuten op je eigen TV of telefoon.
            </p>
          </div>
          <button
            onClick={onOpenCheckoutModal}
            className="px-6 py-3.5 bg-brand hover:bg-brand-deep text-ink font-display font-extrabold text-sm rounded-full shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Bekijk Pakketten</span>
          </button>
        </div>

      </div>
    </section>
  );
};

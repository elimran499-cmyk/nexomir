import React from 'react';
import { Channel } from '../types';

/**
 * Channel tiles on the scrolling wall.
 *
 * Logos live in src/assets/logos/<channel id>.* and are matched on id — see
 * that folder's README. The channel list is curated to artwork that reads on
 * the light tile; a channel without a file falls back to a wordmark tile.
 *
 * Broadcaster logos are trademarks of their owners; they are shown here to
 * identify the channels carried.
 */

/** "Ziggo Sport Select 4K" -> "Ziggo Sport Select" */
const wordmark = (name: string): string =>
  name
    .replace(/\s*\(VOD[^)]*\)/gi, '')
    .replace(/\s*\b(4K Ultra HD|4K UHD|4K|UHD|Full HD|HD|60\s?fps|60\s?FPS)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

/**
 * Splits a wordmark into a lead token and the rest, so "NPO 1" sets the number
 * apart from the name the way a channel ident does.
 */
const splitMark = (text: string): { lead: string; tail: string } => {
  const match = text.match(/^(.*?)\s+([0-9]+|[IVX]+|Z|Jr\.?)$/i);
  if (match) return { lead: match[1], tail: match[2] };
  return { lead: text, tail: '' };
};

/** Stable per-channel variant so the wall has rhythm but never reshuffles. */
const hash = (value: string): number => {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
};

type Variant = 'paper' | 'ink' | 'brand';

const VARIANTS: Record<Variant, { tile: string; text: string; chip: string; rule: string }> = {
  paper: {
    tile: 'bg-white border-slate-200/90',
    text: 'text-ink',
    chip: 'bg-slate-100 text-ink-soft',
    rule: 'bg-brand'
  },
  ink: {
    tile: 'bg-ink border-ink',
    text: 'text-white',
    chip: 'bg-white/15 text-white',
    rule: 'bg-brand'
  },
  brand: {
    tile: 'bg-brand border-brand',
    text: 'text-ink',
    chip: 'bg-ink/15 text-ink',
    rule: 'bg-ink'
  }
};

/**
 * Every logo tile uses the same paper background for a uniform wall. Channels
 * are curated so their artwork reads on it. Wordmark tiles (no logo file) keep
 * the sprinkled variants.
 */
const pickVariant = (id: string, hasLogo: boolean): Variant => {
  if (hasLogo) return 'paper';
  const n = hash(id) % 7;
  if (n === 5) return 'ink';
  if (n === 6) return 'brand';
  return 'paper';
};

/** Longer names step down a size so every wordmark fits on two lines. */
const markSize = (text: string): string => {
  if (text.length <= 7) return 'text-2xl sm:text-[1.7rem]';
  if (text.length <= 12) return 'text-lg sm:text-xl';
  if (text.length <= 18) return 'text-sm sm:text-base';
  return 'text-xs sm:text-sm';
};

interface ChannelLogoProps {
  channel: Channel;
}

export const ChannelLogo: React.FC<ChannelLogoProps> = ({ channel }) => {
  const mark = wordmark(channel.name);
  const { lead, tail } = splitMark(mark);
  const variant = VARIANTS[pickVariant(channel.id, Boolean(channel.logoSrc))];
  const is4K = channel.quality === '4K Ultra HD';
  const qualityLabel = is4K ? '4K' : channel.quality === '60 FPS' ? '60' : 'HD';

  return (
    <div
      className={`group relative shrink-0 w-40 sm:w-44 h-24 sm:h-28 rounded-2xl border shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden flex items-center justify-center px-3 ${variant.tile}`}
      aria-label={
        channel.currentProgram ? `${channel.name} — ${channel.currentProgram}` : channel.name
      }
    >
      {/* Quality chip */}
      <span
        className={`absolute top-2 right-2 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full ${variant.chip}`}
      >
        {qualityLabel}
      </span>

      {/* Eager loading: most tiles sit outside the viewport on a wide marquee,
          so lazy would leave them blank and pop in mid-scroll. The whole set is
          ~750KB of small PNGs. */}
      {channel.logoSrc ? (
        <img
          src={channel.logoSrc}
          alt={channel.name}
          loading="eager"
          decoding="async"
          className="max-h-14 max-w-[86%] object-contain group-hover:scale-105 transition-transform"
        />
      ) : (
        <div className="flex items-baseline gap-1.5 text-center">
          <span
            className={`font-display font-extrabold leading-[0.95] tracking-[-0.02em] ${markSize(lead)} ${variant.text}`}
          >
            {lead}
          </span>
          {tail && (
            <span
              className={`font-display font-extrabold leading-none ${
                lead.length <= 7 ? 'text-2xl sm:text-[1.7rem]' : 'text-lg'
              } ${variant.text} opacity-70`}
            >
              {tail}
            </span>
          )}
        </div>
      )}

      {/* Accent rule, revealed on hover */}
      <span
        className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${variant.rule}`}
      />
    </div>
  );
};

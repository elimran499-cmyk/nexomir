import React from 'react';

/**
 * Nexomir brand mark.
 *
 * An amber hexagon frame around a geometric "N", with a double fast-forward
 * chevron set into the letter's counter — the streaming cue. The hexagon and
 * chevrons stay amber on any background; the letterform flips to white on dark.
 */

interface MarkProps {
  /** White letterform, for dark backgrounds like the footer. */
  inverted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const LogoMark: React.FC<MarkProps> = ({ inverted = false, className = '', style }) => (
  <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
    {/* Hexagon frame */}
    <path
      d="M32 5.5 55 18.75v26.5L32 58.5 9 45.25v-26.5L32 5.5Z"
      fill="none"
      stroke="#f2b33d"
      strokeWidth="3.4"
      strokeLinejoin="round"
    />
    {/* Solid N letterform */}
    <path
      d="M19 46.5V17.5h7.6l11.8 18.4V17.5H46v29h-7.6L26.6 28.1v18.4H19Z"
      className={inverted ? 'fill-white' : 'fill-ink'}
    />
    {/* Fast-forward chevrons set into the middle of the letter */}
    <g fill="#f2b33d">
      <path d="M25.9 27.6 31 32l-5.1 4.4V27.6Z" />
      <path d="M32 27.6 37.1 32 32 36.4V27.6Z" />
    </g>
  </svg>
);

interface LogoProps {
  /** Renders the wordmark in white, for dark backgrounds like the footer. */
  inverted?: boolean;
  className?: string;
}

/** Mark plus wordmark, used in the header and footer. */
export const Logo: React.FC<LogoProps> = ({ inverted = false, className = '' }) => (
  <span className={`flex items-center gap-2.5 ${className}`}>
    <LogoMark inverted={inverted} className="w-10 h-10 shrink-0" />
    <span className="leading-none">
      <span
        className={`block font-display font-extrabold text-xl tracking-tight ${
          inverted ? 'text-white' : 'text-ink'
        }`}
      >
        Nexomir<span className="text-brand">.</span>
      </span>
      <span
        className={`block font-display text-[11px] font-extrabold tracking-[0.2em] uppercase mt-1 ${
          inverted ? 'text-white/60' : 'text-ink-soft'
        }`}
      >
        Premium 4K IPTV
      </span>
    </span>
  </span>
);

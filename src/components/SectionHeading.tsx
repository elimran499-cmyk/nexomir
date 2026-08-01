import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SectionHeadingProps {
  /** Small label on the left, e.g. "Zenders" */
  label: string;
  /** Display-face title, rendered under the rule */
  title?: React.ReactNode;
  /** Supporting copy under the title */
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  /** 'dark' inverts the type for sections sitting on the charcoal background */
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * The label — rule — arrow-circle header used at the top of every body section.
 * Mirrors the "About ————— (>)" treatment from the reference layout.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  intro,
  align = 'left',
  tone = 'light',
  className = ''
}) => {
  const isDark = tone === 'dark';

  return (
    <div className={`relative ${className}`}>

      <div className="relative">
        {/* Label + rule + arrow */}
        <div className="flex items-center gap-4">
          <span
            className={`font-display text-lg sm:text-xl font-extrabold shrink-0 ${
              isDark ? 'text-white' : 'text-ink'
            }`}
          >
            {label}
          </span>
          <span className={`h-px flex-1 ${isDark ? 'bg-white/25' : 'bg-ink/25'}`} />
          <span
            className={`doodle-ring shrink-0 w-8 h-8 flex items-center justify-center ${
              isDark ? 'text-white border-white/30' : 'text-ink'
            }`}
          >
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </span>
        </div>

        {(title || intro) && (
          <div className={`mt-7 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'}`}>
            {title && (
              <h2
                className={`font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.08] ${
                  isDark ? 'text-white' : 'text-ink'
                }`}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p
                className={`mt-4 text-base sm:text-lg leading-relaxed font-medium ${
                  isDark ? 'text-white/70' : 'text-ink-soft'
                }`}
              >
                {intro}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

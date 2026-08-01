import React from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-canvas-alt relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          label="Reviews"
          title={<>Wat zeggen onze <span className="hl-pill">kijkers</span> in Nederland?</>}
          intro="Ontdek waarom duizenden sportliefhebbers en gezinnen elke dag kiezen voor Nexomir."
        />

        {/* Testimonials Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-brand hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand text-brand" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-brand/20 text-ink rounded-full border border-brand/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Geverifieerde Klant
                  </span>
                </div>

                <p className="text-ink text-sm leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <div>
                  <div className="font-display font-extrabold text-ink text-sm">{t.name}</div>
                  <div className="text-ink-soft font-medium">{t.location} • {t.deviceUsed}</div>
                </div>
                <span className="text-ink-soft/70 font-medium">{t.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

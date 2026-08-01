import React from 'react';
import { SETUP_STEPS } from '../data/setupSteps';
import { ShoppingBag, Zap, Tv, CheckCircle, ArrowRight } from 'lucide-react';
import { CONTACT_LINK } from '../data/contact';
import { SectionHeading } from './SectionHeading';

interface SetupStepsProps {
  onOpenCheckoutModal: () => void;
}

export const SetupSteps: React.FC<SetupStepsProps> = ({ onOpenCheckoutModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag':
        return ShoppingBag;
      case 'Zap':
        return Zap;
      case 'Tv':
      default:
        return Tv;
    }
  };

  return (
    <section className="py-20 bg-canvas relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          label="Installatie"
          title={<>Eenvoudig geïnstalleerd in <span className="hl-pill">3 stappen</span></>}
          intro="Geen monteur nodig. Binnen enkele minuten kijk je al naar jouw favoriete live tv-zenders."
        />

        {/* 3 Steps Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
          {SETUP_STEPS.map((step) => {
            const IconComponent = getIcon(step.iconName);

            return (
              <div
                key={step.number}
                className="bg-white p-8 rounded-3xl border border-slate-200/90 relative shadow-xs hover:shadow-lg hover:border-brand hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Large Number Badge */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-brand/20 text-ink font-display font-extrabold text-xl flex items-center justify-center group-hover:bg-brand transition-colors duration-300">
                  0{step.number}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-ink text-white flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-xl font-extrabold text-ink pr-12">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-ink-soft text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 text-xs font-bold text-brand-deep flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-deep" />
                  <span>{step.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenCheckoutModal}
            className="px-8 py-4 bg-ink hover:bg-ink/90 text-white font-display font-extrabold text-sm rounded-full shadow-lg shadow-ink/20 transition-all inline-flex items-center gap-2"
          >
            <span>Kies Direct Je Pakket</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={CONTACT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-brand hover:bg-brand-deep text-ink font-display font-extrabold text-sm rounded-full transition-all inline-flex items-center gap-2"
          >
            <span>Hulp Nodig? Neem Contact Op</span>
          </a>
        </div>

      </div>
    </section>
  );
};

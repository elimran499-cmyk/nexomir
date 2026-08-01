import React from 'react';
import { Tv, Zap, Trophy, Smartphone, Film, Headphones, CheckCircle } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { VOD_COUNT } from '../data/stats';

export const Features: React.FC = () => {
  const featuresList = [
    {
      icon: Tv,
      title: '4K & Ultra HD Kwaliteit',
      description: 'Haarscherp beeld op al je schermen met vlijmscherpe 60 FPS ondersteuning voor live sportevenementen.',
      badge: '4K 60FPS'
    },
    {
      icon: Zap,
      title: 'Anti-Freeze™ Techniek v9.0',
      description: 'Onze Europese dedicated serverclusters zorgen voor 99.9% uptime. Nooit meer irritante buffering tijdens belangrijke wedstrijden.',
      badge: '99.9% Uptime'
    },
    {
      icon: Trophy,
      title: 'Alle Live Sporten Inbegrepen',
      description: 'Mis geen seconde van Formule 1 met Max Verstappen, UEFA Champions League, Premier League, Viaplay, Ziggo Sport & ESPN.',
      badge: 'Viaplay & Ziggo'
    },
    {
      icon: Smartphone,
      title: 'Eenvoudige & Snelle Setup',
      description: 'Werkt naadloos op Smart TV (Samsung, LG), Amazon Firestick, Android TV, Apple TV, iOS, Windows, Mac & Enigma2.',
      badge: 'Binnen 5 min'
    },
    {
      icon: Film,
      title: `${VOD_COUNT} VOD Films & Series`,
      description: 'Dagelijkse updates met de allernieuwste bioscoopfilms en trending series op Netflix & HBO Max, volledig voorzien van NL ondertitels.',
      badge: 'NL Subs'
    },
    {
      icon: Headphones,
      title: '24/7 Nederlandstalige Support',
      description: 'Onze technische klantenservice staat dag en nacht voor je klaar via WhatsApp en e-mail om al je vragen direct te beantwoorden.',
      badge: 'WhatsApp 24/7'
    }
  ];

  return (
    <section id="kenmerken" className="py-20 bg-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          label="Waarom Nexomir"
          title={<>Gebouwd voor de <span className="hl-pill">beste</span> kijkervaring in Nederland</>}
          intro="Wij combineren de nieuwste Ultra-HD streamingtechnologie met superieure Europese servers voor gegarandeerd storingsvrij kijken."
        />

        {/* Features Light Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 hover:border-brand shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand/20 text-ink flex items-center justify-center group-hover:bg-brand transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-brand/20 text-ink border border-brand/30">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-extrabold text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-ink-soft text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center text-xs font-bold text-brand-deep gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-deep" />
                  <span>Gegarandeerd inbegrepen</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

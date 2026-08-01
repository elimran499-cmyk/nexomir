import React, { useState } from 'react';
import {
  DEVICE_OPTIONS,
  PLAN_DURATIONS,
  PLAN_TIERS,
  formatEuro,
  getMonthlyPrice,
  getPlanPrice
} from '../data/pricing';
import { PlanTierId } from '../types';
import { Check, Sparkles, ShieldCheck, Lock, CreditCard, Monitor, MessageCircle, Star } from 'lucide-react';
import { CONTACT_LINK, orderLink } from '../data/contact';
import { SectionHeading } from './SectionHeading';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PricingProps {
  onOpenCheckoutModal: (planId?: string) => void;
}

const TIER_ORDER: PlanTierId[] = ['basis', 'premium'];

export const Pricing: React.FC<PricingProps> = ({ onOpenCheckoutModal }) => {
  const [tierId, setTierId] = useState<PlanTierId>('basis');
  const [devices, setDevices] = useState<number>(1);

  const tier = PLAN_TIERS[tierId];
  const isVip = tierId === 'premium';
  const deviceLabel = `${devices} ${devices === 1 ? 'apparaat' : 'apparaten'}`;

  return (
    <section id="prijzen" className="py-20 bg-canvas-alt relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <SectionHeading
          label="Prijzen"
          title={<>Kies het pakket dat bij <span className="hl-pill">jou</span> past</>}
          intro="Eén vaste betaling per looptijd. Geen abonnement, geen stilzwijgende verlenging — en je bepaalt zelf op hoeveel schermen je tegelijk kijkt."
        />

        {/* ---------- Tier switch ---------- */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            {TIER_ORDER.map((id) => {
              const isActive = id === tierId;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTierId(id)}
                  aria-pressed={isActive}
                  className={`px-5 sm:px-7 py-2.5 rounded-xl font-display font-extrabold text-sm sm:text-base transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-ink text-white shadow-md'
                      : 'text-ink-soft hover:text-ink hover:bg-slate-50'
                  }`}
                >
                  {id === 'premium' && (
                    <Star className={`w-4 h-4 ${isActive ? 'fill-brand text-brand' : ''}`} />
                  )}
                  <span>{id === 'premium' ? 'Premium VIP' : 'Basis'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------- Device switch ---------- */}
        <div className="mt-4 flex justify-center">
          {/* 2x2 on phones — a wrapping flex row leaves an orphaned fourth chip */}
          <div className="grid grid-cols-2 sm:inline-flex sm:items-center gap-1 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            {DEVICE_OPTIONS.map((count) => {
              const isActive = count === devices;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => setDevices(count)}
                  aria-pressed={isActive}
                  className={`px-3.5 sm:px-5 py-2.5 rounded-xl font-display font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
                    isActive
                      ? 'bg-brand text-ink shadow-md'
                      : 'text-ink-soft hover:text-ink hover:bg-slate-50'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>
                    {count} {count === 1 ? 'Apparaat' : 'Apparaten'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------- One card per looptijd ---------- */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {PLAN_DURATIONS.map((duration) => {
            const price = getPlanPrice(tierId, duration.id, devices);
            const perMonth = getMonthlyPrice(tierId, duration.id, devices);
            const isDeal = Boolean(duration.note);

            return (
              <div
                key={duration.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col transition-all duration-300 ${
                  isDeal
                    ? 'bg-white border-2 border-brand shadow-2xl shadow-brand/20'
                    : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
                }`}
              >
                {/* Deal badge */}
                {isDeal && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-ink text-[11px] font-display font-extrabold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider whitespace-nowrap">
                    {duration.note} · {duration.badge}
                  </div>
                )}

                {/* Looptijd */}
                <p className="text-center text-xs sm:text-[13px] font-display font-extrabold uppercase tracking-[0.16em] text-brand-deep mt-1">
                  {duration.label}
                </p>

                {/* Price */}
                <p className="mt-3 text-center font-display text-4xl sm:text-[2.75rem] font-extrabold text-ink leading-none">
                  {formatEuro(price)}
                </p>

                <p className="mt-2 text-center text-[11px] sm:text-xs font-semibold text-ink-soft">
                  ≈ {formatEuro(perMonth)} per maand
                </p>

                <p className="mt-2.5 text-center text-[11px] sm:text-xs font-semibold text-ink-soft flex items-center justify-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5" />
                  {deviceLabel} inbegrepen
                </p>

                {/* Order — opens WhatsApp with the chosen options prefilled */}
                <a
                  href={orderLink({
                    packageName: tier.name,
                    duration: duration.label,
                    devices,
                    price: formatEuro(price)
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 w-full py-3.5 rounded-full font-display font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
                    isDeal
                      ? 'bg-brand hover:bg-brand-deep text-ink shadow-lg'
                      : 'bg-ink hover:bg-ink/90 text-white'
                  }`}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{isVip ? 'Word VIP Nu' : 'Bestel Nu'}</span>
                </a>

                <div className="mt-6 pt-5 border-t border-slate-200/80">
                  {/* Tier chip + heading */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full shrink-0 ${
                        isVip ? 'bg-brand text-ink' : 'bg-slate-100 text-ink-soft'
                      }`}
                    >
                      {tier.label}
                    </span>
                    <h3 className="font-display text-[13px] sm:text-sm font-extrabold text-ink">
                      Wat zit er in het {tier.name}?
                    </h3>
                  </div>

                  {/* Features */}
                  <ul className="mt-3.5 space-y-2 text-ink text-xs sm:text-[13px] font-medium">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <span
                          className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isVip ? 'bg-brand text-ink' : 'bg-slate-100 text-ink-soft'
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 text-center text-[11px] font-semibold text-ink-soft flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Niet goed? Geld terug binnen 7 dagen</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Method Badges */}
        <div className="mt-14 max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-soft">
            Veilig & Snel Betalen Via Je Eigen Vertrouwde Betaalmethode
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <div className="px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2 font-black text-ink text-xs sm:text-sm">
              <span className="w-3 h-3 rounded-full bg-pink-500" />
              <span>iDEAL</span>
            </div>
            <div className="px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2 font-bold text-ink text-xs sm:text-sm">
              <CreditCard className="w-4 h-4" />
              <span>Creditcard / Visa / Mastercard</span>
            </div>
            <div className="px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2 font-bold text-ink text-xs sm:text-sm">
              <span className="text-brand-deep font-extrabold">₿</span>
              <span>Crypto (Bitcoin / USDT)</span>
            </div>
            <div className="px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2 font-bold text-ink text-xs sm:text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Bancontact</span>
            </div>
            <div className="px-4 py-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2 font-bold text-ink text-xs sm:text-sm">
              <span>Apple Pay</span>
            </div>
          </div>
        </div>

        {/* Advies Callout Box */}
        <div className="mt-12 max-w-2xl mx-auto text-center bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
          <p className="text-sm font-semibold text-ink">
            Twijfel je nog welk pakket je wilt kiezen?
          </p>
          <a
            href={CONTACT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-brand-deep underline underline-offset-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Vraag vrijblijvend persoonlijk advies via WhatsApp &rarr;</span>
          </a>
          <p className="mt-4 text-[11px] font-semibold text-ink-soft flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            Veilige betaling · Directe activering binnen 5 minuten
          </p>
        </div>

      </div>
    </section>
  );
};

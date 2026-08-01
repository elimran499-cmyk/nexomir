import { PlanDuration, PlanDurationId, PlanTier, PlanTierId, PricingPlan } from '../types';
import { TIER_STATS } from './stats';

/**
 * Pricing is a three-axis grid: tier × looptijd × aantal apparaten.
 * Every combination is a fixed one-off amount, so prices are stored as a
 * lookup table rather than derived from a monthly rate.
 */

export const PLAN_DURATIONS: PlanDuration[] = [
  { id: '3m', label: '3 Maanden', months: 3 },
  { id: '6m', label: '6 Maanden', months: 6 },
  { id: '15m', label: '12 + 3 Maanden', months: 15, badge: '-50%', note: 'BESTE DEAL' }
];

/** Number of screens that can stream at the same time. */
export const DEVICE_OPTIONS = [1, 2, 3, 4] as const;

export const PLAN_TIERS: Record<PlanTierId, PlanTier> = {
  basis: {
    id: 'basis',
    name: 'Basis Pakket',
    label: 'BASIS',
    features: [
      'SD, HD en Full HD kwaliteit',
      `${TIER_STATS.basis.channels} live zenders`,
      'RTL, NPO, Ziggo, SBS, ESPN en Viaplay',
      `${TIER_STATS.basis.vod} films & series on demand`,
      'Wekelijkse contentupdates',
      'Anti-Freeze technologie',
      'Werkt op al je apparaten',
      'Exclusieve NL & BE content',
      'Netflix, Amazon, HBO, Apple TV & Hulu',
      '100% anoniem kijken',
      '24/7 support in NL & BE'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Premium VIP Pakket',
    label: 'PREMIUM VIP',
    features: [
      'SD tot 4K, 8K, HDR en VR kwaliteit',
      `${TIER_STATS.premium.channels} live zenders`,
      'RTL, NPO, Ziggo, SBS, ESPN, Viaplay en VTM',
      `${TIER_STATS.premium.vod} films & series on demand`,
      'Dagelijkse contentupdates',
      'Alle sport-PPV evenementen inbegrepen',
      'Enterprise Anti-Freeze PRO',
      'Werkt op al je apparaten',
      'VPN inbegrepen',
      'Exclusieve VIP content',
      'Videoland, Netflix, Amazon, HBO, Apple TV & Hulu',
      'Persoonlijke VIP accountmanager',
      'VIP support, 24/7 bereikbaar'
    ]
  }
};

/** Prices in euro, indexed by tier → looptijd → (aantal apparaten - 1). */
const PRICE_TABLE: Record<PlanTierId, Record<PlanDurationId, number[]>> = {
  basis: {
    '3m': [24.99, 39.99, 49.99, 57.99],
    '6m': [34.99, 49.99, 69.99, 89.99],
    '15m': [49.0, 79.0, 109.0, 129.0]
  },
  premium: {
    '3m': [34.99, 49.99, 69.99, 89.99],
    '6m': [44.99, 79.99, 99.99, 139.99],
    '15m': [78.0, 124.99, 179.99, 199.99]
  }
};

/** One-off price for a tier / looptijd / device-count combination. */
export const getPlanPrice = (
  tier: PlanTierId,
  duration: PlanDurationId,
  devices: number
): number => PRICE_TABLE[tier][duration][devices - 1];

/** Effective cost per month, used for the "vanaf … p/m" line. */
export const getMonthlyPrice = (
  tier: PlanTierId,
  duration: PlanDurationId,
  devices: number
): number => {
  const plan = PLAN_DURATIONS.find((d) => d.id === duration);
  return getPlanPrice(tier, duration, devices) / (plan ? plan.months : 1);
};

export const formatEuro = (value: number): string => `€${value.toFixed(2).replace('.', ',')}`;

/** Shortest term on sale — the entry point, currently 3 months. */
export const SHORTEST_TERM_MONTHS = PLAN_DURATIONS[0].months;

/**
 * Human list of the available terms, e.g. "3, 6 of 12 + 3 maanden".
 * Copy that enumerates looptijden reads this so it tracks PLAN_DURATIONS.
 */
export const DURATION_SUMMARY = (() => {
  const terms = PLAN_DURATIONS.map((d) => d.label.replace(/\s*maanden?/i, '').trim());
  return `${terms.slice(0, -1).join(', ')} of ${terms[terms.length - 1]} maanden`;
})();

/**
 * Flat list kept for the checkout modal, which orders a single named package.
 * One entry per tier × looptijd at the single-device price.
 */
export const PRICING_PLANS: PricingPlan[] = (
  Object.keys(PLAN_TIERS) as PlanTierId[]
).flatMap((tierId) =>
  PLAN_DURATIONS.map((duration) => {
    const price = getPlanPrice(tierId, duration.id, 1);
    const tier = PLAN_TIERS[tierId];
    // The 15-month bundle carries a -50% badge, so its list price is twice the offer.
    const originalPrice = duration.badge ? price * 2 : price;

    return {
      id: `${tierId}-${duration.id}`,
      durationMonths: duration.months,
      name: `${tier.label} · ${duration.label}`,
      price,
      originalPrice,
      savePercentage: duration.badge ? 50 : 0,
      periodLabel: `${formatEuro(price / duration.months)} per maand · 1 apparaat`,
      isPopular: tierId === 'premium' && duration.id === '15m',
      features: tier.features
    };
  })
);

/** Default selection: the promoted Premium 12+3 bundle. */
export const DEFAULT_PLAN_ID = 'premium-15m';

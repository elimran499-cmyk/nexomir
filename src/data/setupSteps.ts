import { SetupStep } from '../types';
import { CHANNEL_COUNT } from './stats';
import { DURATION_SUMMARY } from './pricing';

export const SETUP_STEPS: SetupStep[] = [
  {
    number: 1,
    title: 'Kies Je Pakket',
    description: `Selecteer de gewenste looptijd (${DURATION_SUMMARY}) en reken veilig af met iDEAL, creditcard, Apple Pay of crypto.`,
    iconName: 'ShoppingBag',
    detail: 'Geen contract — je verlengt alleen als je dat zelf wilt'
  },
  {
    number: 2,
    title: 'Direct Geactiveerd per Mail & WhatsApp',
    description: 'Na je aanvraag ontvang je binnen 2 tot 5 minuten automatisch je M3U-link & Xtream Codes inloggegevens.',
    iconName: 'Zap',
    detail: 'Super snelle 24/7 geautomatiseerde oplevering'
  },
  {
    number: 3,
    title: 'Installeer & Begin met Kijken',
    description: `Vul je inloggegevens in op onze aanbevolen app (IPTV Smarters, IBO Player, TiviMate) en geniet direct van ${CHANNEL_COUNT} zenders!`,
    iconName: 'Tv',
    detail: 'Eenvoudige stapsgewijze handleiding inbegrepen'
  }
];

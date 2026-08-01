import { FAQItem } from '../types';
import { SHORTEST_TERM_MONTHS } from './pricing';

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'activation-speed',
    question: 'Hoe snel wordt mijn Nexomir account geactiveerd?',
    answer: 'Vrijwel direct! Na het voltooien van je bestelling ontvang je binnen 2 tot 10 minuten je persoonlijke inloggegevens en een overzichtelijke installatiehandleiding via e-mail en WhatsApp.'
  },
  {
    id: 'satellite-req',
    question: 'Heb ik een schotelantenne of speciale decoder nodig?',
    answer: 'Nee, absoluut niet! Nexomir werkt 100% via internet. Je hebt alleen een internetverbinding nodig en een apparaat zoals een Smart TV, Amazon Firestick, Android box, Apple TV, tablet, smartphone of computer.'
  },
  {
    id: 'internet-speed',
    question: 'Welke internetsnelheid heb ik minimaal nodig voor 4K streaming?',
    answer: 'Voor een vloeiende Full HD en 4K Ultra HD ervaring raden we een stabiele internetsnelheid van minimaal 15 tot 25 Mbps aan. Dankzij onze unieke Anti-Freeze™ v9.0 technologie buffert het beeld niet, zelfs niet tijdens drukbezochte sportwedstrijden.'
  },
  {
    id: 'device-compatibility',
    question: 'Op welke apparaten en apps kan ik Nexomir gebruiken?',
    answer: 'Nexomir is compatibel met vrijwel elk modern scherm: Samsung & LG Smart TV (via IBO Player, Nanomid of Smart One), Android TV, Amazon Fire Stick (via IPTV Smarters Pro of XCIPTV), Apple TV (via GSE of TiviMate), iOS, Android telefoons en Windows/Mac.'
  },
  {
    id: 'sports-channels',
    question: 'Zitten Formule 1 (Viaplay), Viaplay, Ziggo Sport en ESPN inbegrepen?',
    answer: 'Ja! Alle Nederlandse top-sportkanalen, inclusief alle Viaplay streams, Ziggo Sport Totaal, ESPN 1-4 en internationale sportzenders zijn standaard inbegrepen in 4K Ultra HD kwaliteit met 60 FPS zonder extra maandelijkse kosten.'
  },
  {
    id: 'first-package',
    question: 'Kan ik eerst een korte periode uitproberen?',
    answer: `We werken niet met gratis proefaccounts, maar je kunt zonder enige verplichting starten met het pakket van ${SHORTEST_TERM_MONTHS} maanden — dat is onze kortste looptijd. Er is geen contract en geen automatische verlenging: je bepaalt zelf of je daarna verlengt. Twijfel je welk pakket past? Stel je vraag via WhatsApp, dan denken we vrijblijvend met je mee.`
  }
];

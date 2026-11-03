/**
 * Centrale contactgegevens. Bestellingen lopen via WhatsApp: de knoppen openen
 * een chat met het onderstaande nummer en een voorgevuld bericht.
 * Nummer in internationaal formaat zonder + of spaties.
 */
export const WHATSAPP_NUMBER = '447832486269';

/** Weergavevorm van het nummer, bijvoorbeeld voor de footer. */
export const WHATSAPP_DISPLAY = '+44 7832 486269';

export const whatsappLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Standaardbericht voor de algemene "Neem contact op"-knoppen. */
export const CONTACT_MESSAGE =
  'Hallo Nexomir, ik heb een vraag over jullie IPTV-pakketten.';

export const CONTACT_LINK = whatsappLink(CONTACT_MESSAGE);

export interface OrderDetails {
  /** e.g. "Premium VIP Pakket" */
  packageName: string;
  /** e.g. "12 + 3 Maanden" */
  duration: string;
  /** Number of simultaneous screens */
  devices: number;
  /** Formatted price, e.g. "€78,00" */
  price: string;
}

/**
 * Bestel-link met alle gekozen opties in het bericht, zodat support direct
 * weet welk pakket, welke looptijd en hoeveel schermen het betreft.
 */
export const orderLink = ({ packageName, duration, devices, price }: OrderDetails): string =>
  whatsappLink(
    [
      `Hallo Nexomir, ik wil het ${packageName} bestellen.`,
      '',
      `Looptijd: ${duration}`,
      `Schermen: ${devices} ${devices === 1 ? 'apparaat' : 'apparaten'}`,
      `Prijs: ${price}`
    ].join('\n')
  );

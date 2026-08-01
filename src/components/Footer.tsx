import { Logo } from './Logo';
import React from 'react';
import { Tv, ShieldCheck, Heart, Lock, CreditCard } from 'lucide-react';
import { CONTACT_LINK } from '../data/contact';
import { CHANNEL_COUNT, VOD_COUNT } from '../data/stats';

interface FooterProps {
  onOpenCheckoutModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCheckoutModal }) => {
  // Extra bottom padding on phones so the floating nav never covers content.
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-28 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <Logo inverted />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              De nummer #1 premium 4K IPTV aanbieder van Nederland. Geniet van meer dan {CHANNEL_COUNT} live tv-zenders, alle Nederlandse topsporten en {VOD_COUNT} VOD films &amp; series op al je apparaten.
            </p>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-slate-800/80 px-3 py-1.5 rounded-lg w-fit border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>99.9% Uptime Dedicated Europese Servers</span>
            </div>
          </div>

          {/* Nav Links Col 1 */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">
              Snelle Navigatie
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#kanalen" className="hover:text-emerald-400 transition-colors">
                  Zenderaanbod & Sport
                </a>
              </li>
              <li>
                <a href="#prijzen" className="hover:text-emerald-400 transition-colors">
                  Pakketten & Tarieven
                </a>
              </li>
              <li>
                <a href="#kenmerken" className="hover:text-emerald-400 transition-colors">
                  Waarom Nexomir
                </a>
              </li>
              <li>
                <a href="#handleiding" className="hover:text-emerald-400 transition-colors">
                  Installatie Handleiding
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Veelgestelde Vragen
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Actions & Legal Col */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">
              Service & Contact
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vragen over een pakket, een zender of de installatie op jouw TV? Onze Nederlandse support helpt je via WhatsApp, doorgaans binnen 2 minuten.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenCheckoutModal}
                className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors text-center"
              >
                Pakketten Bekijken
              </button>
              <a
                href={CONTACT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors text-center"
              >
                Neem Contact Op via WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="bg-slate-950/70 p-6 rounded-2xl border border-slate-800/80 text-xs text-slate-400 space-y-2 text-left">
          <div className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Disclaimer & Juridische Informatie:</span>
          </div>
          <p className="leading-relaxed">
            Nexomir treedt op als technologie- en netwerkserviceprovider. Alle merknamen, logo's en zendernamen (zoals Ziggo, Viaplay, ESPN, NPO, RTL) zijn het eigendom van hun respectievelijke rechthebbenden. Onze diensten zijn uitsluitend bedoeld voor educatieve en persoonlijke netwerkdoeleinden in overeenstemming met de geldende regelgeving.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-800/60 pt-6">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Nexomir. Alle rechten voorbehouden.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-medium">Veilig betalen met:</span>
            <div className="flex items-center gap-2 font-bold text-slate-300">
              <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px]">iDEAL</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px]">Creditcard</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px]">Crypto</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px]">Apple Pay</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

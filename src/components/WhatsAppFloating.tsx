import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { whatsappLink } from '../data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

export const WhatsAppFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = customMsg || 'Hallo Nexomir support, ik heb een vraag over IPTV.';
    window.open(whatsappLink(text), '_blank', 'noopener');
    setIsOpen(false);
  };

  // Lifted on phones so it clears the floating bottom navigation.
  return (
    <div className="fixed bottom-24 lg:bottom-5 right-5 z-40 flex flex-col items-end space-y-2">
      {/* Expanded WhatsApp Widget Box */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 w-80 sm:w-88 animate-fade-in text-left relative space-y-3 mb-2">
          
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Sluiten"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">
                S
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse"></span>
            </div>
            <div>
              <div className="font-black text-slate-900 text-sm">Nexomir Support</div>
              <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Online • Reageert binnen 2 min
              </div>
            </div>
          </div>

          {/* Simulated Chat Message */}
          <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-100 text-xs text-slate-800 space-y-1">
            <p className="font-semibold">👋 Hallo! Welkom bij Nexomir.</p>
            <p className="text-slate-600">
              Heb je een vraag over een kanaal, de pakketten, of hulp bij installatie op je TV?
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSendWhatsApp} className="space-y-2.5">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Typ hier je bericht..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </form>

        </div>
      )}

      {/* Floating Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-xl shadow-emerald-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
        aria-label="WhatsApp Support Chat"
        id="btn-whatsapp-floating"
      >
        <WhatsAppIcon className="w-7 h-7" />
        
        {/* Unread notification ping dot */}
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 ring-2 ring-white flex items-center justify-center text-[9px] font-black text-amber-950">
          1
        </span>
      </button>
    </div>
  );
};

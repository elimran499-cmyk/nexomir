import React, { useState } from 'react';
import { FAQS_DATA } from '../data/faqs';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('activation-speed');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="py-20 bg-canvas relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          label="FAQ"
          title={<>Heb je nog <span className="hl-pill">vragen</span>?</>}
          intro="Hier vind je antwoorden op de meest gestelde vragen over onze IPTV diensten."
        />

        {/* FAQ Accordion */}
        <div className="mt-12 space-y-3">
          {FAQS_DATA.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-slate-50/80 rounded-2xl border border-slate-200/90 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left font-bold text-slate-900 text-base sm:text-lg flex items-center justify-between gap-4 hover:text-emerald-700 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-emerald-50 border-emerald-300 text-emerald-600' : 'text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-200/50 pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Support Box */}
        <div className="mt-10 bg-slate-50 border border-slate-200/90 rounded-2xl p-6 text-center space-y-3">
          <p className="text-sm font-semibold text-slate-700">
            Staat jouw specifieke vraag er niet tussen?
          </p>
          <a
            href="https://wa.me/?text=Hallo%20Nexomir,%20ik%20heb%20een%20vraag"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Stel Je Vraag Direct op WhatsApp (24/7)</span>
          </a>
        </div>

      </div>
    </section>
  );
};

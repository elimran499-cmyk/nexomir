import { Logo } from './Logo';
import React, { useState, useEffect } from 'react';
import { Tv, ArrowRight, PhoneCall } from 'lucide-react';
import { CONTACT_LINK } from '../data/contact';

interface NavbarProps {
  onOpenCheckoutModal: (planId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCheckoutModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group text-decoration-none"
            id="nav-logo"
          >
            <Logo className="group-hover:scale-[1.02] transition-transform" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => scrollToSection('kenmerken')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
              id="nav-link-kenmerken"
            >
              Kenmerken
            </button>
            <button
              onClick={() => scrollToSection('kanalen')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
              id="nav-link-kanalen"
            >
              Kanalen
            </button>
            <button
              onClick={() => scrollToSection('films')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
              id="nav-link-films"
            >
              Films & Series
            </button>
            <button
              onClick={() => scrollToSection('prijzen')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
              id="nav-link-prijzen"
            >
              Prijzen
            </button>
            <button
              onClick={() => scrollToSection('handleiding')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
              id="nav-link-handleiding"
            >
              Handleiding
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
              id="nav-link-faq"
            >
              FAQ
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={CONTACT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 flex items-center gap-2"
              id="nav-btn-contact"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Contact</span>
            </a>
            <button
              onClick={() => onOpenCheckoutModal()}
              className="relative group px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2 overflow-hidden"
              id="nav-btn-pakketten"
            >
              <span>Bekijk Pakketten</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenCheckoutModal()}
              className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Bestellen
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

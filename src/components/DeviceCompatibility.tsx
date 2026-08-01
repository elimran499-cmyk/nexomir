import React, { useState } from 'react';
import { Tv, Smartphone, Monitor, Shield, Download, ChevronRight, Check } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { whatsappLink } from '../data/contact';

export const DeviceCompatibility: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<string>('smarttv');

  const devices = [
    {
      id: 'smarttv',
      name: 'Smart TV (Samsung / LG)',
      apps: ['IBO Player', 'Smart One IPTV', 'Nanomid', 'SS IPTV'],
      description: 'Download simpelweg de gratis IBO Player of Smart One app uit de Samsung Tizen Store of LG Content Store, vul je inloggegevens in en klaar!',
      icon: Tv
    },
    {
      id: 'firestick',
      name: 'Amazon Firestick & Fire TV',
      apps: ['IPTV Smarters Pro', 'XCIPTV Player', 'TiviMate'],
      description: 'De absolute aanrader voor de snelste zap-ervaring! Werkt fantastisch met TiviMate of IPTV Smarters Pro via de Downloader app.',
      icon: Monitor
    },
    {
      id: 'android',
      name: 'Android TV / Google TV',
      apps: ['TiviMate 4K', 'IPTV Smarters', 'GSE Smart IPTV'],
      description: 'Installeer direct vanuit de Google Play Store op Sony Bravia, Philips Ambilight, Xiaomi Mi Box of Nvidia Shield.',
      icon: Tv
    },
    {
      id: 'apple',
      name: 'Apple TV, iPhone & iPad',
      apps: ['IPTV Smarters Lite', 'GSE Smart IPTV', 'Snappier Player'],
      description: 'Download onze partner-app in de App Store, voer je Xtream Codes gegevens in en geniet in 4K op al je Apple schermen.',
      icon: Smartphone
    }
  ];

  const activeDeviceObj = devices.find((d) => d.id === selectedDevice) || devices[0];

  return (
    <section id="handleiding" className="py-20 bg-canvas-alt border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          label="Apparaten"
          title={<>Kijk op je <span className="hl-pill">favoriete</span> apparaat</>}
          intro="Geen ingewikkelde installatie. Binnen 3 minuten geïnstalleerd op je Smart TV, streamingstick, smartphone of tablet."
        />

        {/* Device Switcher */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {devices.map((device) => {
            const Icon = device.icon;
            const isActive = device.id === selectedDevice;
            return (
              <button
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  isActive ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${isActive ? 'text-emerald-800' : 'text-slate-800'}`}>
                    {device.name}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Device Details Card */}
        <div className="mt-6 max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Stap-voor-stap ondersteund</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              {activeDeviceObj.name} Handleiding
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {activeDeviceObj.description}
            </p>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Aanbevolen Apps:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {activeDeviceObj.apps.map((app, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-200"
                  >
                    ✓ {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 bg-emerald-50/80 p-6 rounded-2xl border border-emerald-200/80 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Hulp nodig bij installatie?</div>
              <p className="text-xs text-slate-600 mt-1">Onze support helpt je live via WhatsApp!</p>
            </div>
            <a
              href={whatsappLink('Hallo Nexomir, ik heb hulp nodig bij de installatie.')}
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Start WhatsApp Installatiehulp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

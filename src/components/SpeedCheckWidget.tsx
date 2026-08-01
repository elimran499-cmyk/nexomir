import React, { useState } from 'react';
import { Gauge, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface SpeedCheckWidgetProps {
  onOpenCheckoutModal: () => void;
}

export const SpeedCheckWidget: React.FC<SpeedCheckWidgetProps> = ({ onOpenCheckoutModal }) => {
  const [deviceType, setDeviceType] = useState<string>('smarttv');
  const [internetType, setInternetType] = useState<string>('fiber');
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleRunCheck = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setIsChecked(true);
    }, 1200);
  };

  return (
    <section className="py-16 bg-canvas relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              <span>GRATIS GESCHIKTHEIDSCHECK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Is jouw thuisnetwerk geschikt voor 4K IPTV?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Selecteer je apparatuur en doe in 5 seconden de check voor haarscherp beeld zonder buffering.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
            {/* Device Select */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold uppercase text-slate-300">Jouw Scherm / Apparaat:</label>
              <select
                value={deviceType}
                onChange={(e) => {
                  setDeviceType(e.target.value);
                  setIsChecked(false);
                }}
                className="w-full bg-slate-800/90 text-white border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="smarttv">Samsung / LG / Philips Smart TV</option>
                <option value="firestick">Amazon Firestick 4K / Android TV</option>
                <option value="appletv">Apple TV / iPhone / iPad</option>
                <option value="formuler">Formuler / MAG Box / Enigma2</option>
              </select>
            </div>

            {/* Internet Select */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold uppercase text-slate-300">Internetaansluiting:</label>
              <select
                value={internetType}
                onChange={(e) => {
                  setInternetType(e.target.value);
                  setIsChecked(false);
                }}
                className="w-full bg-slate-800/90 text-white border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="fiber">Glasvezel / KPN / Ziggo (&gt; 50 Mbps)</option>
                <option value="cable">Kabelinternet (20-50 Mbps)</option>
                <option value="wifi">4G / 5G / Wi-Fi Thuis</option>
              </select>
            </div>
          </div>

          <div className="mt-6 text-center">
            {!isChecked ? (
              <button
                onClick={handleRunCheck}
                disabled={isChecking}
                className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
              >
                {isChecking ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Thuisnetwerk analyseren...</span>
                  </>
                ) : (
                  <>
                    <Gauge className="w-4 h-4" />
                    <span>Start 5-Seconden Check</span>
                  </>
                )}
              </button>
            ) : (
              <div className="bg-emerald-950/80 border border-emerald-500/50 p-5 rounded-2xl max-w-md mx-auto space-y-3 animate-fade-in">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-extrabold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>100% GESCHIKT VOOR NEXOMIR 4K!</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Gefeliciteerd! Jouw combinatie van apparatuur en verbinding kan moeiteloos 4K Ultra HD en 60FPS sportstreams verwerken via onze Europese dedicated servers.
                </p>
                <button
                  onClick={onOpenCheckoutModal}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Bekijk De Pakketten</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

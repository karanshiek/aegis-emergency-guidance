import React from 'react';
import { PhoneCall, AlertOctagon, X, ShieldAlert, HeartPulse, Flame, Compass } from 'lucide-react';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerAIChatWithEmergency: (query: string) => void;
}

export const SOSModal: React.FC<SOSModalProps> = ({
  isOpen,
  onClose,
  onTriggerAIChatWithEmergency,
}) => {
  if (!isOpen) return null;

  const quickEmergencies = [
    { label: 'House / Kitchen Fire', prompt: 'There is an active fire at my location. What should I do right now?' },
    { label: 'Severe Bleeding', prompt: 'Someone is bleeding severely from an open wound. Immediate first aid steps?' },
    { label: 'Person Not Breathing / CPR', prompt: 'A person is unconscious and not breathing. Guide me through CPR immediately.' },
    { label: 'Earthquake Shaking', prompt: 'An earthquake is happening right now. What should I do?' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-red-600/80 rounded-2xl shadow-2xl shadow-red-600/30 overflow-hidden">
        {/* Urgent Header Banner */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-black/20 rounded-lg animate-bounce">
              <AlertOctagon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-wide">EMERGENCY SOS</h2>
              <p className="text-xs text-red-100 font-medium">Life Safety Protocol - Call 112 Immediately</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Primary 112 Call Banner */}
          <div className="text-center bg-red-950/40 border border-red-800/60 rounded-xl p-5 shadow-inner">
            <p className="text-xs font-semibold uppercase text-red-400 tracking-wider mb-2">
              National Emergency Response Centre (India)
            </p>
            <a
              href="tel:112"
              className="inline-flex items-center justify-center space-x-3 w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xl shadow-lg shadow-red-600/50 hover:shadow-red-600/70 transition-all transform active:scale-95"
            >
              <PhoneCall className="w-6 h-6 animate-pulse" />
              <span>TAP TO CALL 112</span>
            </a>
            <p className="text-[12px] text-slate-400 mt-2">
              Single emergency number for Police, Fire, Ambulance & Disaster
            </p>
          </div>

          {/* Quick Direct Helplines Grid */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <a
              href="tel:101"
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex flex-col items-center space-y-1 transition-colors"
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="font-bold text-sm text-white">101</span>
              <span className="text-[10px] text-slate-400">Fire Brigade</span>
            </a>
            <a
              href="tel:108"
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex flex-col items-center space-y-1 transition-colors"
            >
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span className="font-bold text-sm text-white">108 / 102</span>
              <span className="text-[10px] text-slate-400">Ambulance</span>
            </a>
            <a
              href="tel:1078"
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex flex-col items-center space-y-1 transition-colors"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span className="font-bold text-sm text-white">1078</span>
              <span className="text-[10px] text-slate-400">NDMA Helpline</span>
            </a>
          </div>

          {/* Immediate Action Checklist */}
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2 font-bold text-slate-200 uppercase text-[11px] tracking-wide">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Immediate Life Safety Rules</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed">
              <li><strong>Prioritize Life:</strong> Get yourself and others out of immediate hazard.</li>
              <li><strong>State Location Clearly:</strong> Give address, prominent landmark, or highway marker.</li>
              <li><strong>Stay On The Line:</strong> Follow the emergency dispatcher&apos;s verbal instructions.</li>
            </ol>
          </div>

          {/* Instant AI Chat Guidance Prompts */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Instant AI Guidance Prompts:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickEmergencies.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onClose();
                    onTriggerAIChatWithEmergency(item.prompt);
                  }}
                  className="p-2.5 text-left rounded-lg bg-slate-800/80 hover:bg-slate-750 hover:border-red-500/50 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white transition-all duration-150"
                >
                  ⚡ {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

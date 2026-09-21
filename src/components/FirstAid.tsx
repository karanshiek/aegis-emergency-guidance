import React, { useState } from 'react';
import { 
  HeartPulse, 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  ArrowRight
} from 'lucide-react';
import { firstAidGuides } from '../data/firstAidData';
import { FirstAidGuide } from '../types';

interface FirstAidProps {
  onTriggerAIChat: (prompt: string) => void;
}

export const FirstAid: React.FC<FirstAidProps> = ({ onTriggerAIChat }) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>('cpr');

  const currentGuide: FirstAidGuide =
    firstAidGuides.find((g) => g.id === selectedGuideId) || firstAidGuides[0];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Educational Disclaimer Banner */}
      <div className="bg-amber-950/40 border border-amber-800/80 rounded-2xl p-4 sm:p-5 flex items-start space-x-3 text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm space-y-1">
          <span className="font-bold text-amber-300 uppercase tracking-wide">
            Medical Emergency Disclaimer
          </span>
          <p className="text-slate-300 leading-relaxed">
            This module provides basic, standard educational first-aid instructions. It does NOT replace professional medical diagnosis, emergency medical technicians (EMTs), or trauma doctors. If the patient is unresponsive, bleeding severely, or struggling for air, call <strong>112</strong> immediately.
          </p>
        </div>
      </div>

      {/* Guide Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <HeartPulse className="w-4 h-4" />
            <span>Emergency Life Support</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">First Aid Procedures</h1>
          <p className="text-sm text-slate-400 mt-1">
            Standard educational protocols to stabilize injuries until professional medical teams arrive.
          </p>
        </div>

        <a
          href="tel:112"
          className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/30 shrink-0"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call Ambulance (112 / 108)</span>
        </a>
      </div>

      {/* Procedure Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {firstAidGuides.map((guide) => {
          const isSelected = guide.id === selectedGuideId;
          return (
            <button
              key={guide.id}
              onClick={() => setSelectedGuideId(guide.id)}
              className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 ${
                isSelected
                  ? 'bg-rose-950/40 border-rose-500/80 shadow-lg shadow-rose-950/50'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{guide.icon}</span>
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </div>
              <div className="mt-3">
                <h4 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-rose-300' : 'text-slate-200'}`}>
                  {guide.title}
                </h4>
                <span className={`text-[10px] uppercase font-semibold ${
                  guide.urgency === 'critical' ? 'text-red-400' : 'text-amber-400'
                }`}>
                  {guide.urgency}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected First Aid Protocol View */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* Title & Quick AI Trigger */}
        <div className="bg-slate-950/80 border-b border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-3xl shrink-0">
              {currentGuide.icon}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">{currentGuide.title}</h2>
                <span className={`text-xs uppercase px-2 py-0.5 rounded font-bold border ${
                  currentGuide.urgency === 'critical'
                    ? 'bg-red-950 text-red-400 border-red-800'
                    : 'bg-amber-950 text-amber-400 border-amber-800'
                }`}>
                  {currentGuide.urgency} Urgency
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Standard field protocol to stabilize victim before EMS handover.
              </p>
            </div>
          </div>

          <button
            onClick={() => onTriggerAIChat(`Provide immediate first aid instructions for ${currentGuide.title}.`)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/30 shrink-0 self-start sm:self-auto"
          >
            <span>Ask Aegis for Live Help</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Immediate Actions */}
          <div className="bg-red-950/30 border border-red-800/60 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Step 1: Immediate First Assessment</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200 pl-1">
              {currentGuide.immediateActions.map((action, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-red-400 font-bold shrink-0">⚡</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sequential Step-by-Step Instructions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sequential Procedure Steps:
            </h3>
            <div className="space-y-2.5">
              {currentGuide.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start space-x-3 text-xs sm:text-sm text-slate-200"
                >
                  <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-700 text-white shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DO NOT Warnings & Critical When to Seek Help */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DO NOT */}
            <div className="bg-red-950/30 border border-red-800/70 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center space-x-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                <span>What NOT to Do (Dangerous Mistakes)</span>
              </div>
              <ul className="space-y-2 text-xs text-red-200">
                {currentGuide.doNot.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* When to Seek Help */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>When to Call 112 Immediately</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentGuide.seekHelpWhen.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

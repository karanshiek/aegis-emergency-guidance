import React, { useState } from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Flame, 
  ArrowRight,
  Search
} from 'lucide-react';
import { disasterGuides } from '../data/disasterGuides';
import { DisasterGuide } from '../types';

interface DisasterGuidesProps {
  onTriggerAIChat: (prompt: string) => void;
}

export const DisasterGuides: React.FC<DisasterGuidesProps> = ({ onTriggerAIChat }) => {
  const [selectedDisasterId, setSelectedDisasterId] = useState<string>('fire');
  const [activeStage, setActiveStage] = useState<'during' | 'before' | 'after'>('during');
  const [searchQuery, setSearchQuery] = useState('');

  const currentGuide: DisasterGuide =
    disasterGuides.find((g) => g.id === selectedDisasterId) || disasterGuides[0];

  const filteredGuides = disasterGuides.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div>
          <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Preparedness & Action Protocols</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Disaster Action Guides</h1>
          <p className="text-sm text-slate-400 mt-1">
            Step-by-step life preservation protocols for the 6 primary catastrophe scenarios.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Disaster Selection Tabs / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {filteredGuides.map((guide) => {
          const isSelected = guide.id === selectedDisasterId;
          return (
            <button
              key={guide.id}
              onClick={() => setSelectedDisasterId(guide.id)}
              className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-150 ${
                isSelected
                  ? 'bg-red-950/40 border-red-500/80 shadow-lg shadow-red-950/50'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{guide.icon}</span>
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                )}
              </div>
              <div className="mt-3">
                <h4 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-red-300' : 'text-slate-200'}`}>
                  {guide.title}
                </h4>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  {guide.severity}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Guide View */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* Guide Title Banner */}
        <div className="bg-slate-950/80 border-b border-slate-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-3xl shrink-0">
              {currentGuide.icon}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">{currentGuide.title}</h2>
                <span className="text-xs uppercase px-2 py-0.5 rounded font-bold bg-red-950 text-red-400 border border-red-800">
                  {currentGuide.severity} Threat
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">{currentGuide.summary}</p>
            </div>
          </div>

          <button
            onClick={() => onTriggerAIChat(`Give me step-by-step guidance for a ${currentGuide.title} emergency right now.`)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/30 shrink-0 self-start sm:self-auto"
          >
            <span>Ask Aegis About This</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Phase Toggle: During (Immediate Action) vs Before (Preparedness) vs After (Recovery) */}
        <div className="border-b border-slate-800 px-6 pt-4 flex space-x-2 bg-slate-900/50">
          <button
            onClick={() => setActiveStage('during')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition-all ${
              activeStage === 'during'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>DURING (IMMEDIATE ACTION)</span>
          </button>
          <button
            onClick={() => setActiveStage('before')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition-all ${
              activeStage === 'before'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>BEFORE (PREPAREDNESS)</span>
          </button>
          <button
            onClick={() => setActiveStage('after')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center space-x-2 border-b-2 transition-all ${
              activeStage === 'after'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>AFTER (RECOVERY & SAFETY)</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Active Steps List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {activeStage === 'during' && '🔴 Urgent Action Steps to Take Immediately:'}
              {activeStage === 'before' && '🟡 Prevention & Readiness Steps:'}
              {activeStage === 'after' && '🔵 Safe Recovery & Assessment Steps:'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentGuide[activeStage].map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start space-x-3.5 text-xs sm:text-sm text-slate-200"
                >
                  <span className={`font-black text-sm px-2 py-0.5 rounded shrink-0 ${
                    activeStage === 'during' ? 'bg-red-950 text-red-400 border border-red-800' :
                    activeStage === 'before' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-sky-950 text-sky-400 border border-sky-800'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Warnings / DO NOTs Box */}
          <div className="bg-red-950/40 border border-red-800/80 rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>CRITICAL SAFETY WARNINGS &quot;DO NOT&quot;</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-red-200 pl-1">
              {currentGuide.warnings.map((w, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Helplines for this scenario */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs">
              <span className="font-semibold text-slate-300">Dedicated Emergency Hotlines:</span>
              <p className="text-slate-400 text-[11px]">Direct dial for immediate response teams</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentGuide.emergencyContacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={`tel:${contact.number}`}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                  <span>{contact.label}: <strong className="text-white">{contact.number}</strong></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

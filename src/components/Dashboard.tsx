import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  PhoneCall, 
  CheckCircle2, 
  Circle, 
  Users, 
  PackageCheck, 
  ArrowRight,
  Info
} from 'lucide-react';
import { initialKitItems } from '../data/emergencyContacts';
import { KitItem, FamilySafetyPlan } from '../types';

interface DashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenSOS: () => void;
  onTriggerAIChat: (prompt: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigateTab,
  onOpenSOS,
  onTriggerAIChat,
}) => {
  // Real Emergency Kit status in local storage
  const [kitItems, setKitItems] = useState<KitItem[]>(() => {
    const saved = localStorage.getItem('aegis_emergency_kit');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return initialKitItems;
  });

  // Real Family Safety Plan status in local storage
  const [familyPlan, setFamilyPlan] = useState<FamilySafetyPlan | null>(() => {
    const saved = localStorage.getItem('aegis_family_safety_plan');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return null;
  });

  // Refresh plan status when tab changes or loads
  useEffect(() => {
    const saved = localStorage.getItem('aegis_family_safety_plan');
    if (saved) {
      try {
        setFamilyPlan(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleToggleKitItem = (id: string) => {
    const updated = kitItems.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setKitItems(updated);
    localStorage.setItem('aegis_emergency_kit', JSON.stringify(updated));
  };

  // Calculate REAL calculated score from real data
  const checkedKitCount = kitItems.filter((i) => i.checked).length;
  const kitPercentage = Math.round((checkedKitCount / kitItems.length) * 100);

  // Plan completion calculation
  let planPoints = 0;
  if (familyPlan) {
    if (familyPlan.members && familyPlan.members.length > 0) planPoints += 25;
    if (familyPlan.primaryMeetingPoint && familyPlan.primaryMeetingPoint.trim().length > 3) planPoints += 25;
    if (familyPlan.secondaryMeetingPoint && familyPlan.secondaryMeetingPoint.trim().length > 3) planPoints += 25;
    if (familyPlan.outOfTownContact && familyPlan.outOfTownContact.phone) planPoints += 25;
  }

  // Combined Readiness Score (50% kit + 50% plan)
  const overallReadinessScore = Math.round((kitPercentage * 0.5) + (planPoints * 0.5));

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 40) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-red-400 border-red-500/30 bg-red-500/10';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Welcome & Quick SOS Alert Banner */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-900 border border-red-900/60 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white animate-pulse">
              Emergency Ready
            </span>
            <span className="text-xs text-slate-400">National Emergency Response (India 112)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Disaster Emergency Guidance & Support
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Live AI-assisted emergency protocols, interactive safety checklists, and verified survival guides.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={onOpenSOS}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/40 active:scale-95 transition-all"
          >
            <AlertTriangle className="w-5 h-5 text-amber-300" />
            <span>OPEN SOS DIALER</span>
          </button>
          <button
            onClick={() => onNavigateTab('chat')}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 active:scale-95 transition-all"
          >
            <span>Ask Aegis AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Readiness & Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Real Calculated Readiness Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Preparedness Score
              </span>
              <ShieldCheck className="w-5 h-5 text-red-400" />
            </div>

            <div className="flex items-baseline space-x-3">
              <span className={`text-4xl sm:text-5xl font-extrabold ${getScoreColor(overallReadinessScore).split(' ')[0]}`}>
                {overallReadinessScore}%
              </span>
              <span className="text-xs text-slate-400">
                Calculated from your kit & plan
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full mt-4 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  overallReadinessScore >= 80 ? 'bg-emerald-500' : overallReadinessScore >= 40 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${overallReadinessScore}%` }}
              />
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Emergency Kit Progress:</span>
              <span className="font-semibold text-slate-200">{checkedKitCount}/{kitItems.length} items ({kitPercentage}%)</span>
            </div>
            <div className="flex justify-between">
              <span>Family Safety Plan:</span>
              <span className="font-semibold text-slate-200">{planPoints}% complete</span>
            </div>
          </div>
        </div>

        {/* Family Safety Plan Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Family Safety Plan
              </span>
              <Users className="w-5 h-5 text-sky-400" />
            </div>

            <h3 className="text-lg font-bold text-white">
              {familyPlan?.familyName ? `${familyPlan.familyName} Household` : 'No Plan Configured Yet'}
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {familyPlan?.members && familyPlan.members.length > 0
                ? `${familyPlan.members.length} member(s) listed with meeting locations.`
                : 'Define primary meeting points, emergency contacts, and evacuation routes.'}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400">Stored privately in browser</span>
            <button
              onClick={() => onNavigateTab('familyplan')}
              className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center space-x-1"
            >
              <span>{familyPlan ? 'View / Edit Plan' : 'Setup Safety Plan'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Verified Emergency Contacts Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Helplines
              </span>
              <PhoneCall className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <a
                href="tel:112"
                className="flex items-center justify-between p-2 rounded-lg bg-red-950/30 border border-red-800/50 hover:bg-red-900/30 transition-colors"
              >
                <span className="text-xs font-medium text-slate-200">National Emergency</span>
                <span className="text-sm font-black text-red-400">112</span>
              </a>
              <a
                href="tel:1078"
                className="flex items-center justify-between p-2 rounded-lg bg-slate-800 hover:bg-slate-750 transition-colors"
              >
                <span className="text-xs font-medium text-slate-200">NDMA Disaster Helpline</span>
                <span className="text-sm font-bold text-sky-400">1078</span>
              </a>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400">Verified official services</span>
            <button
              onClick={() => onNavigateTab('contacts')}
              className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center space-x-1"
            >
              <span>All Contacts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Emergency Triage Prompts */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold text-white">Instant Emergency Situations</h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:block">
            Launches real-time Gemini AI guidance
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => onTriggerAIChat('There is a fire in my house. What should I do right now?')}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-red-950/40 border border-slate-700 hover:border-red-600/50 text-left transition-all group"
          >
            <div className="text-2xl mb-2">🔥</div>
            <h4 className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">
              House Fire
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Immediate evacuation, smoke crawl, and fire safety steps.
            </p>
          </button>

          <button
            onClick={() => onTriggerAIChat('An earthquake is shaking my building right now. What are immediate steps?')}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-amber-950/40 border border-slate-700 hover:border-amber-600/50 text-left transition-all group"
          >
            <div className="text-2xl mb-2">🌎</div>
            <h4 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
              Earthquake Active
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Drop, cover, hold on, gas shutoff, and aftershock safety.
            </p>
          </button>

          <button
            onClick={() => onTriggerAIChat('Someone is unconscious and not breathing. Guide me through CPR immediately.')}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-600/50 text-left transition-all group"
          >
            <div className="text-2xl mb-2">🫀</div>
            <h4 className="font-bold text-white text-sm group-hover:text-rose-400 transition-colors">
              CPR Guidance
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Adult chest compressions rhythm, depth, and AED instructions.
            </p>
          </button>

          <button
            onClick={() => onTriggerAIChat('There is severe bleeding from a deep wound. How do I stop it?')}
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-red-950/40 border border-slate-700 hover:border-red-600/50 text-left transition-all group"
          >
            <div className="text-2xl mb-2">🩸</div>
            <h4 className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">
              Severe Bleeding
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Continuous direct pressure, wound packing, and tourniquets.
            </p>
          </button>
        </div>
      </div>

      {/* Interactive Emergency Kit Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <PackageCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Emergency Go-Bag & Survival Kit</h2>
          </div>
          <span className="text-xs text-slate-400">
            Check items as you pack them; updates your readiness score automatically.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {kitItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleKitItem(item.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-150 flex items-start space-x-3 select-none ${
                item.checked
                  ? 'bg-slate-800/40 border-emerald-500/40 text-slate-300'
                  : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 text-slate-200'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 shrink-0 focus:outline-none"
                aria-label={`Toggle ${item.name}`}
              >
                {item.checked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500" />
                )}
              </button>
              <div className="text-xs space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-100">{item.name}</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">{item.recommended}</p>
                <span className="inline-block text-[10px] text-amber-400 font-medium bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-900/60 mt-1">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory & Official Protocol Notice */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-start space-x-3 text-xs text-slate-400">
        <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-slate-300">National Disaster Management Framework</span>
          <p>
            Emergency guidance adheres to NDMA (National Disaster Management Authority) and international standard life-safety protocols. In catastrophic situations, prioritize verbal instructions from authorized first responders over online guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

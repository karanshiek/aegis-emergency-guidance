import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  FileText, 
  Plus, 
  Trash2, 
  Printer, 
  Save, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { FamilyMember, FamilySafetyPlan as FamilySafetyPlanType } from '../types';

export const FamilySafetyPlan: React.FC = () => {
  const [plan, setPlan] = useState<FamilySafetyPlanType>(() => {
    const saved = localStorage.getItem('aegis_family_safety_plan');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return {
      familyName: '',
      primaryMeetingPoint: '',
      secondaryMeetingPoint: '',
      evacuationDestination: '',
      outOfTownContact: {
        name: '',
        phone: '',
      },
      members: [],
      specialNotes: '',
      lastUpdated: new Date().toLocaleDateString(),
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // New member form inputs
  const [memberName, setMemberName] = useState('');
  const [memberRelation, setMemberRelation] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [memberBlood, setMemberBlood] = useState('');
  const [memberNotes, setMemberNotes] = useState('');

  const handleSavePlan = () => {
    const updated = {
      ...plan,
      lastUpdated: new Date().toLocaleDateString(),
    };
    setPlan(updated);
    localStorage.setItem('aegis_family_safety_plan', JSON.stringify(updated));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    const newMember: FamilyMember = {
      id: `member-${Date.now()}`,
      name: memberName.trim(),
      relationship: memberRelation.trim() || 'Family',
      phone: memberPhone.trim(),
      bloodGroup: memberBlood.trim(),
      medicalNotes: memberNotes.trim(),
    };

    const updatedMembers = [...plan.members, newMember];
    const updatedPlan = { ...plan, members: updatedMembers };
    setPlan(updatedPlan);
    localStorage.setItem('aegis_family_safety_plan', JSON.stringify(updatedPlan));

    setMemberName('');
    setMemberRelation('');
    setMemberPhone('');
    setMemberBlood('');
    setMemberNotes('');
  };

  const handleRemoveMember = (id: string) => {
    const updatedMembers = plan.members.filter((m) => m.id !== id);
    const updatedPlan = { ...plan, members: updatedMembers };
    setPlan(updatedPlan);
    localStorage.setItem('aegis_family_safety_plan', JSON.stringify(updatedPlan));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Privacy Notice Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Client-Side Confidentiality</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Family Disaster Safety Plan</h1>
          <p className="text-sm text-slate-400 mt-1">
            This plan is stored strictly on your local browser. It is NEVER transmitted to external AI servers.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Physical Copy</span>
          </button>
          <button
            onClick={handleSavePlan}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all active:scale-95"
          >
            {savedSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? 'Saved Locally!' : 'Save Plan'}</span>
          </button>
        </div>
      </div>

      {/* Printable Area Wrapper */}
      <div className="space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Household Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-2 print:text-black print:border-gray-300">
            <Users className="w-5 h-5 text-red-500" />
            <span>1. Household Identity</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 print:text-gray-700">
                Family / Household Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sharma Household"
                value={plan.familyName}
                onChange={(e) => setPlan({ ...plan, familyName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 print:bg-gray-100 print:text-black print:border-gray-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 print:text-gray-700">
                Out-of-Area Emergency Contact Person & Phone
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={plan.outOfTownContact.name}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      outOfTownContact: { ...plan.outOfTownContact, name: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 print:bg-gray-100 print:text-black"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={plan.outOfTownContact.phone}
                  onChange={(e) =>
                    setPlan({
                      ...plan,
                      outOfTownContact: { ...plan.outOfTownContact, phone: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 print:bg-gray-100 print:text-black"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Meeting Points & Evacuation Locations */}
        <div className="space-y-4 pt-2">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-2 print:text-black print:border-gray-300">
            <MapPin className="w-5 h-5 text-amber-500" />
            <span>2. Predetermined Emergency Meeting Locations</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 print:text-gray-700">
                Primary Meeting Point (Near Home)
              </label>
              <p className="text-[11px] text-slate-400 mb-1.5 print:text-gray-600">
                e.g. Neighboring park bench, big banyan tree outside gate
              </p>
              <input
                type="text"
                placeholder="Outside location right by residence"
                value={plan.primaryMeetingPoint}
                onChange={(e) => setPlan({ ...plan, primaryMeetingPoint: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 print:bg-gray-100 print:text-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 print:text-gray-700">
                Secondary Meeting Point (Out of Neighborhood)
              </label>
              <p className="text-[11px] text-slate-400 mb-1.5 print:text-gray-600">
                e.g. Community hall, school ground if area is blocked
              </p>
              <input
                type="text"
                placeholder="Designated place outside immediate area"
                value={plan.secondaryMeetingPoint}
                onChange={(e) => setPlan({ ...plan, secondaryMeetingPoint: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 print:bg-gray-100 print:text-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 print:text-gray-700">
                Evacuation Destination & Shelter
              </label>
              <p className="text-[11px] text-slate-400 mb-1.5 print:text-gray-600">
                e.g. Relative&apos;s home in neighboring town or district shelter
              </p>
              <input
                type="text"
                placeholder="Address / Town of safe refuge"
                value={plan.evacuationDestination}
                onChange={(e) => setPlan({ ...plan, evacuationDestination: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 print:bg-gray-100 print:text-black"
              />
            </div>
          </div>
        </div>

        {/* Family Members Roster */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 print:border-gray-300">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2 print:text-black">
              <Users className="w-5 h-5 text-sky-400" />
              <span>3. Family Members & Medical Needs</span>
            </h2>
            <span className="text-xs text-slate-400 print:text-gray-600">
              {plan.members.length} member(s) registered
            </span>
          </div>

          {/* Members Table / List */}
          {plan.members.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-200 print:text-black">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider print:bg-gray-200 print:text-black">
                  <tr>
                    <th className="p-2.5">Name</th>
                    <th className="p-2.5">Relationship</th>
                    <th className="p-2.5">Phone</th>
                    <th className="p-2.5">Blood Group</th>
                    <th className="p-2.5">Medical / Prescriptions</th>
                    <th className="p-2.5 print:hidden">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-gray-300">
                  {plan.members.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-800/40">
                      <td className="p-2.5 font-bold text-white print:text-black">{member.name}</td>
                      <td className="p-2.5 text-slate-300 print:text-black">{member.relationship}</td>
                      <td className="p-2.5 text-slate-300 print:text-black">{member.phone || 'N/A'}</td>
                      <td className="p-2.5 font-semibold text-red-400 print:text-black">{member.bloodGroup || 'N/A'}</td>
                      <td className="p-2.5 text-slate-400 print:text-gray-700">{member.medicalNotes || 'None'}</td>
                      <td className="p-2.5 print:hidden">
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                          title="Remove member"
                          aria-label="Remove member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              No family members added yet. Add household members below.
            </p>
          )}

          {/* Add Member Inline Form */}
          <form
            onSubmit={handleAddMember}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 print:hidden"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Add Household Member:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Relationship (e.g. Mother, Son)"
                value={memberRelation}
                onChange={(e) => setMemberRelation(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={memberPhone}
                onChange={(e) => setMemberPhone(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Blood Group (e.g. O+)"
                value={memberBlood}
                onChange={(e) => setMemberBlood(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Allergies / Meds"
                value={memberNotes}
                onChange={(e) => setMemberNotes(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Member to Plan</span>
            </button>
          </form>
        </div>

        {/* Special Notes & Utilities */}
        <div className="space-y-4 pt-2">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-2 print:text-black print:border-gray-300">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>4. Special Instructions (Pets, Gas & Power Shutoffs)</span>
          </h2>
          <textarea
            rows={3}
            placeholder="Document where main gas valve is located, electric breaker panel location, pet carrier instructions, or neighbor keyholder details..."
            value={plan.specialNotes}
            onChange={(e) => setPlan({ ...plan, specialNotes: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 print:bg-gray-100 print:text-black"
          />
        </div>
      </div>
    </div>
  );
};

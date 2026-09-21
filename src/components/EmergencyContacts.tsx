import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  ShieldAlert, 
  Plus, 
  Trash2, 
  User, 
  Search
} from 'lucide-react';
import { officialEmergencyContacts } from '../data/emergencyContacts';
import { EmergencyContact } from '../types';

export const EmergencyContacts: React.FC = () => {
  const [personalContacts, setPersonalContacts] = useState<EmergencyContact[]>(() => {
    const saved = localStorage.getItem('aegis_personal_contacts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('aegis_personal_contacts', JSON.stringify(personalContacts));
  }, [personalContacts]);

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newNumber.trim()) return;

    const newContact: EmergencyContact = {
      id: `personal-${Date.now()}`,
      name: newName.trim(),
      number: newNumber.trim(),
      description: newDescription.trim() || 'Personal Emergency Contact',
      category: 'personal',
      badge: 'Personal',
    };

    setPersonalContacts([...personalContacts, newContact]);
    setNewName('');
    setNewNumber('');
    setNewDescription('');
    setShowAddModal(false);
  };

  const handleDeleteContact = (id: string) => {
    setPersonalContacts(personalContacts.filter((c) => c.id !== id));
  };

  const allContacts = [...officialEmergencyContacts, ...personalContacts];

  const filtered = allContacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.number.includes(searchQuery) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner with 112 Prominence */}
      <div className="bg-gradient-to-r from-red-900 via-slate-900 to-slate-900 border-2 border-red-600/70 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black tracking-wider uppercase animate-pulse">
            <ShieldAlert className="w-4 h-4" />
            <span>National Emergency Number (India)</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">112</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Single nationwide toll-free emergency response system integrating Police (100), Fire (101), Ambulance (102/108), and Disaster teams.
          </p>
        </div>

        <a
          href="tel:112"
          className="flex items-center space-x-3 px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xl shadow-xl shadow-red-600/50 active:scale-95 transition-all shrink-0"
        >
          <PhoneCall className="w-6 h-6 animate-bounce" />
          <span>DIAL 112 NOW</span>
        </a>
      </div>

      {/* Control Bar: Search & Add Personal Contact */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search emergency services or numbers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Add Personal Emergency Contact</span>
        </button>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((contact) => {
          const isPersonal = contact.category === 'personal';
          return (
            <div
              key={contact.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between shadow-lg transition-all ${
                isPersonal
                  ? 'bg-slate-900/90 border-emerald-500/40'
                  : contact.number === '112'
                  ? 'bg-red-950/40 border-red-600/80'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${
                    contact.category === 'national' ? 'bg-red-950 text-red-300 border-red-800' :
                    contact.category === 'medical' ? 'bg-rose-950 text-rose-300 border-rose-800' :
                    contact.category === 'disaster' ? 'bg-sky-950 text-sky-300 border-sky-800' :
                    contact.category === 'safety' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                    'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}>
                    {contact.badge || contact.category}
                  </span>

                  {isPersonal && (
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      title="Remove contact"
                      aria-label="Remove contact"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <h3 className="text-base font-bold text-white mb-1">{contact.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{contact.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xl font-extrabold text-white tracking-wide">{contact.number}</span>
                <a
                  href={`tel:${contact.number}`}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all active:scale-95"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Personal Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <User className="w-5 h-5 text-emerald-400" />
              <span>Add Personal Emergency Contact</span>
            </h3>
            <p className="text-xs text-slate-400">
              Stored locally on this device. Quick access during crisis.
            </p>

            <form onSubmit={handleAddContact} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ramesh / Brother Aarav"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Relationship / Role</label>
                <input
                  type="text"
                  placeholder="e.g. Primary Physician / Next Door Neighbor"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

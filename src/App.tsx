import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { AIChat } from './components/AIChat';
import { DisasterGuides } from './components/DisasterGuides';
import { FirstAid } from './components/FirstAid';
import { EmergencyContacts } from './components/EmergencyContacts';
import { FamilySafetyPlan } from './components/FamilySafetyPlan';
import { SOSModal } from './components/SOSModal';
import { ShieldAlert, PhoneCall } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [initialChatPrompt, setInitialChatPrompt] = useState<string>('');

  const handleTriggerAIChat = (prompt: string) => {
    setInitialChatPrompt(prompt);
    setActiveTab('chat');
  };

  const handleClearInitialPrompt = () => {
    setInitialChatPrompt('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-red-500 selection:text-white">
      {/* Sticky Top Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSOS={() => setIsSOSOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            onNavigateTab={setActiveTab}
            onOpenSOS={() => setIsSOSOpen(true)}
            onTriggerAIChat={handleTriggerAIChat}
          />
        )}

        {activeTab === 'chat' && (
          <AIChat
            initialPrompt={initialChatPrompt}
            onClearInitialPrompt={handleClearInitialPrompt}
            onOpenSOS={() => setIsSOSOpen(true)}
          />
        )}

        {activeTab === 'guides' && (
          <DisasterGuides onTriggerAIChat={handleTriggerAIChat} />
        )}

        {activeTab === 'firstaid' && (
          <FirstAid onTriggerAIChat={handleTriggerAIChat} />
        )}

        {activeTab === 'contacts' && <EmergencyContacts />}

        {activeTab === 'familyplan' && <FamilySafetyPlan />}
      </main>

      {/* Emergency Quick Action SOS Modal */}
      <SOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        onTriggerAIChatWithEmergency={handleTriggerAIChat}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-auto py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className="font-semibold text-slate-200">Aegis Disaster Emergency Support AI</span>
            <span>• Powered by Google Gemini</span>
          </div>

          <div className="flex items-center space-x-4">
            <a href="tel:112" className="text-red-400 font-bold hover:underline flex items-center space-x-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>National Helpline: 112</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Life-Safety First</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

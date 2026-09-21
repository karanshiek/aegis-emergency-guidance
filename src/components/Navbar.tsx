import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MessageSquare, 
  LayoutDashboard, 
  BookOpen, 
  HeartPulse, 
  PhoneCall, 
  Users, 
  Menu, 
  X, 
  AlertTriangle 
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSOS: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSOS }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'AI Emergency Chat', icon: MessageSquare, badge: 'Live AI' },
    { id: 'guides', label: 'Disaster Guides', icon: BookOpen },
    { id: 'firstaid', label: 'First Aid', icon: HeartPulse },
    { id: 'contacts', label: 'Emergency Contacts', icon: PhoneCall },
    { id: 'familyplan', label: 'Family Safety Plan', icon: Users },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group"
            onClick={() => handleNavClick('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform duration-200">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors">
                  AEGIS
                </span>
                <span className="text-xs uppercase px-2 py-0.5 font-semibold bg-red-950/80 text-red-300 border border-red-800/60 rounded-full tracking-wider">
                  Emergency AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Disaster Guidance & Rapid Response
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-inner border border-slate-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: SOS Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            {/* National Emergency SOS Button */}
            <button
              onClick={onOpenSOS}
              aria-label="Trigger Emergency SOS"
              className="relative group flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/40 hover:shadow-red-600/60 transition-all duration-200 animate-pulse active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 text-amber-200" />
              <span>SOS (112)</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900/98 px-4 pt-3 pb-5 space-y-1 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-red-600/20 text-red-300 border border-red-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-slate-800">
            <a
              href="tel:112"
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-red-600 text-white font-bold text-center"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 112 (National Emergency)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

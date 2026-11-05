import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Car, 
  User, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown, 
  ShieldCheck, 
  CreditCard,
  PlusCircle,
  Menu,
  X,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    activePage, 
    setActivePage, 
    logout, 
    loginAs,
    openRoleModal,
    setSelectedVehicleForBooking,
    theme,
    toggleTheme
  } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const navLinks = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About Us' },
    { id: 'payments', label: 'Payments' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleDashboardClick = () => {
    if (!currentUser) {
      openRoleModal();
      return;
    }
    if (currentUser.role === 'advertiser') setActivePage('advertiser-dashboard');
    else if (currentUser.role === 'owner') setActivePage('owner-dashboard');
    else if (currentUser.role === 'admin') setActivePage('admin-dashboard');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Demo Banner with Role Selection Prompt Trigger */}
      <div className="bg-slate-950 text-white text-xs py-1.5 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-orange-400 hidden sm:inline">VISITING ROLE:</span>
            <button
              onClick={openRoleModal}
              className="inline-flex items-center gap-1.5 font-medium bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-0.5 rounded border border-slate-700 transition-colors cursor-pointer group"
              title="Click to change your visiting role"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : 'Select Role'}</span>
              <span className="text-[10px] text-orange-400 group-hover:underline ml-1">Change</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openRoleModal}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-orange-500 hover:bg-orange-600 text-white transition-colors cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3 h-3" />
              <span>Choose Role</span>
            </button>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px] hidden md:inline">Quick Switch:</span>
              <button
                onClick={() => loginAs('advertiser')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  currentUser?.role === 'advertiser' 
                    ? 'bg-orange-500 text-white shadow-xs' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Advertiser
              </button>
              <button
                onClick={() => loginAs('owner')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  currentUser?.role === 'owner' 
                    ? 'bg-orange-500 text-white shadow-xs' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Vehicle Owner
              </button>
              <button
                onClick={() => loginAs('admin')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  currentUser?.role === 'admin' 
                    ? 'bg-orange-500 text-white shadow-xs' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Admin
              </button>
            </div>

            <div className="h-3.5 w-px bg-slate-700 hidden sm:block"></div>

            {/* Quick theme toggle in top bar */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Toggle Day/Dark Theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline text-amber-300">Day Drive</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline text-sky-300">Midnight Fleet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand wordmark: ChhotaBheem - AdOnWheel */}
          <div 
            onClick={() => { setActivePage('home'); setSelectedVehicleForBooking(null); }}
            className="flex items-center gap-2.5 cursor-pointer select-none whitespace-nowrap shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:bg-orange-600 transition-colors">
              <Car className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  ChhotaBheem
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-600 dark:bg-orange-950/80 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                  AdOnWheel
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Transit Advertising Platform</span>
            </div>
          </div>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => { setActivePage(link.id); setSelectedVehicleForBooking(null); }}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
                  activePage === link.id ? 'text-orange-500 font-semibold' : ''
                }`}
              >
                {link.label}
              </button>
            ))}

            {currentUser && (
              <button
                onClick={handleDashboardClick}
                className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  activePage.includes('dashboard') ? 'text-orange-500 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>My Dashboard</span>
              </button>
            )}
          </nav>

          {/* Zone 3: 1 primary action & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Day Light Theme' : 'Switch to Midnight Dark Theme'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-orange-500 text-white flex items-center justify-center text-xs font-semibold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="max-w-[120px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showRoleDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                      <p className="text-[10px] uppercase font-bold text-orange-500 mt-1">
                        Role: {currentUser.role}
                      </p>
                    </div>

                    <button
                      onClick={() => { handleDashboardClick(); setShowRoleDropdown(false); }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                      Dashboard
                    </button>

                    {currentUser.role === 'owner' && (
                      <button
                        onClick={() => { setActivePage('add-vehicle'); setShowRoleDropdown(false); }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-slate-400" />
                        List New Vehicle
                      </button>
                    )}

                    {currentUser.role === 'advertiser' && (
                      <button
                        onClick={() => { setActivePage('create-ad'); setShowRoleDropdown(false); }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                        Launch Campaign
                      </button>
                    )}

                    <button
                      onClick={() => { setActivePage('payments'); setShowRoleDropdown(false); }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      Payments & Escrow
                    </button>

                    <button
                      onClick={() => { openRoleModal(); setShowRoleDropdown(false); }}
                      className="w-full text-left px-3 py-2 text-xs text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 flex items-center gap-2 cursor-pointer font-semibold"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Switch Visiting Role
                    </button>

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>

                    <button
                      onClick={() => { logout(); setShowRoleDropdown(false); }}
                      className="w-full text-left px-3 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={openRoleModal}
                  className="px-3 py-2 text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100 rounded-lg border border-orange-200 dark:border-orange-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Select Role</span>
                </button>
                <button
                  onClick={() => setActivePage('login')}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActivePage('register')}
                  className="px-4 py-2 text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
                >
                  Join ChhotaBheem
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Navigation"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => { setActivePage(link.id); setIsMenuOpen(false); }}
              className="w-full text-left py-2 px-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md"
            >
              {link.label}
            </button>
          ))}
          {currentUser && (
            <button
              onClick={() => { handleDashboardClick(); setIsMenuOpen(false); }}
              className="w-full text-left py-2 px-3 text-sm font-medium text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-md flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              My Dashboard ({currentUser.role})
            </button>
          )}
          {!currentUser ? (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button
                onClick={() => { setActivePage('login'); setIsMenuOpen(false); }}
                className="flex-1 py-2 text-center text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => { setActivePage('register'); setIsMenuOpen(false); }}
                className="flex-1 py-2 text-center text-xs font-medium text-white bg-orange-500 rounded-lg"
              >
                Register
              </button>
            </div>
          ) : (
            <button
              onClick={() => { logout(); setIsMenuOpen(false); }}
              className="w-full text-left py-2 px-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Megaphone, 
  Car, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Sparkles,
  Wallet,
  TrendingUp,
  FileCheck,
  ChevronRight
} from 'lucide-react';

interface RoleSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSelectModal: React.FC<RoleSelectModalProps> = ({ isOpen, onClose }) => {
  const { selectVisitingRole, setActivePage } = useApp();
  const [rememberChoice, setRememberChoice] = useState(true);

  if (!isOpen) return null;

  const handleRolePick = (role: UserRole, targetDashboard: boolean = false) => {
    selectVisitingRole(role, targetDashboard, rememberChoice);
    onClose();
  };

  const handleGoToAuth = (role: UserRole, mode: 'login' | 'register') => {
    selectVisitingRole(role, false, rememberChoice);
    setActivePage(mode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 bg-linear-to-r from-orange-500/10 via-transparent to-slate-500/5 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/80 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to ChhotaBheem - AdOnWheel</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Which role are you visiting as today?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 max-w-2xl">
            Select how you would like to explore India’s premier vehicle-based transit advertising platform. We will instantly tailor your marketplace, campaign tools, and dashboard.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Advertiser */}
          <div className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 bg-slate-50/70 dark:bg-slate-950/60 hover:bg-white dark:hover:bg-slate-900 transition-all duration-200 shadow-xs hover:shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                  <Megaphone className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400">
                  Brand Advertiser
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                  I Want to Advertise
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Promote your brand on moving cars, autos, buses & vans. Get hyper-local city reach with high-recall transit wraps.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Browse 150+ verified vehicles</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>3D wrap preview & ROI calculator</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>100% Escrow protected payments</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 space-y-2 border-t border-slate-200/60 dark:border-slate-800">
              <button
                onClick={() => handleRolePick('advertiser', true)}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Enter as Advertiser</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 px-1">
                <button
                  onClick={() => handleRolePick('advertiser', false)}
                  className="hover:text-orange-500 underline underline-offset-2 cursor-pointer"
                >
                  Explore as Guest
                </button>
                <button
                  onClick={() => handleGoToAuth('advertiser', 'login')}
                  className="hover:text-orange-500 font-semibold cursor-pointer"
                >
                  Sign In →
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Vehicle Owner */}
          <div className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 bg-slate-50/70 dark:bg-slate-950/60 hover:bg-white dark:hover:bg-slate-900 transition-all duration-200 shadow-xs hover:shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Car className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400">
                  Vehicle Owner
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  I Want to Earn Money
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Turn your car, bike, auto, van or bus into a monthly income stream of ₹4,500 – ₹38,000 without altering your routine.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Zero paint damage 3M vinyl</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Accept or decline campaigns easily</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Guaranteed monthly UPI payouts</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 space-y-2 border-t border-slate-200/60 dark:border-slate-800">
              <button
                onClick={() => handleRolePick('owner', true)}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Enter as Vehicle Owner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 px-1">
                <button
                  onClick={() => handleRolePick('owner', false)}
                  className="hover:text-amber-500 underline underline-offset-2 cursor-pointer"
                >
                  Explore as Guest
                </button>
                <button
                  onClick={() => handleGoToAuth('owner', 'login')}
                  className="hover:text-amber-500 font-semibold cursor-pointer"
                >
                  Sign In →
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Admin */}
          <div className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50/70 dark:bg-slate-950/60 hover:bg-white dark:hover:bg-slate-900 transition-all duration-200 shadow-xs hover:shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                  Super Admin
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  Platform Admin
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Audit vehicle RTO compliance, inspect vinyl artwork standards, clear escrow payouts, and manage disputes.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Verify vehicle RC & insurance</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Approve transit campaign artwork</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Escrow clearing & audit logs</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 space-y-2 border-t border-slate-200/60 dark:border-slate-800">
              <button
                onClick={() => handleRolePick('admin', true)}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Enter as Super Admin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 px-1">
                <button
                  onClick={() => handleRolePick('admin', false)}
                  className="hover:text-emerald-500 underline underline-offset-2 cursor-pointer"
                >
                  Explore as Guest
                </button>
                <button
                  onClick={() => handleGoToAuth('admin', 'login')}
                  className="hover:text-emerald-500 font-semibold cursor-pointer"
                >
                  Sign In →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 sm:p-5 bg-slate-100/70 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberChoice}
              onChange={(e) => setRememberChoice(e.target.checked)}
              className="rounded text-orange-500 focus:ring-orange-500"
            />
            <span>Remember my visiting role on this device</span>
          </label>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors font-medium cursor-pointer"
            >
              Browse General Site First
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

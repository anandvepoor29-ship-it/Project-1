import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserCheck, 
  Search, 
  Car, 
  Upload, 
  Calendar, 
  Send, 
  ThumbsUp, 
  ShieldAlert, 
  Zap, 
  Flag, 
  Wallet,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { setActivePage } = useApp();
  const [activeStep, setActiveStep] = useState(0);

  const workflowSteps = [
    {
      num: '01',
      title: 'Advertiser Registration',
      actor: 'Advertiser',
      actorColor: 'bg-orange-100 text-orange-800',
      icon: UserCheck,
      shortDesc: 'Sign up and configure your brand profile',
      fullDesc: 'Businesses register on ChhotaBheem - AdOnWheel, verify their business profile or company credentials, and access the real-time vehicle transit inventory.'
    },
    {
      num: '02',
      title: 'Browse Vehicles',
      actor: 'Advertiser',
      actorColor: 'bg-orange-100 text-orange-800',
      icon: Search,
      shortDesc: 'Filter by city, vehicle category & daily routes',
      fullDesc: 'Search across Sedans, Auto-Rickshaws, Delivery Bikes, Commercial Vans, and Buses. Review verified daily commute corridors and impression heatmaps.'
    },
    {
      num: '03',
      title: 'Select Vehicle',
      actor: 'Advertiser',
      actorColor: 'bg-orange-100 text-orange-800',
      icon: Car,
      shortDesc: 'Inspect specifications, rating, and daily rates',
      fullDesc: 'Evaluate vehicle manufacturing year, driver rating, past completed campaigns, and RTO document compliance.'
    },
    {
      num: '04',
      title: 'Upload Advertisement',
      actor: 'Advertiser',
      actorColor: 'bg-orange-100 text-orange-800',
      icon: Upload,
      shortDesc: 'Upload artwork & preview realistic vehicle mockup',
      fullDesc: 'Choose advertising format: Full Wrap, Side Door Panels, Rear Window Perforated, or Rooftop Box. Upload 300 DPI print-ready graphic artwork.'
    },
    {
      num: '05',
      title: 'Choose Campaign Duration',
      actor: 'Advertiser',
      actorColor: 'bg-orange-100 text-orange-800',
      icon: Calendar,
      shortDesc: 'Select 15, 30, 60 or 90 days runtime',
      fullDesc: 'Configure campaign start dates and duration. The platform dynamically computes estimated street impressions, daily distance goals, and pricing.'
    },
    {
      num: '06',
      title: 'Submit Booking',
      actor: 'Advertiser',
      actorColor: 'bg-orange-100 text-orange-800',
      icon: Send,
      shortDesc: 'Hold total campaign fee safely in platform Escrow',
      fullDesc: 'The booking enters PENDING status. The advertiser’s media fee is held safely in escrow—funds are never released prematurely to drivers.'
    },
    {
      num: '07',
      title: 'Vehicle Owner Approval',
      actor: 'Vehicle Owner',
      actorColor: 'bg-emerald-100 text-emerald-800',
      icon: ThumbsUp,
      shortDesc: 'Owner inspects schedule and accepts or declines',
      fullDesc: 'The vehicle partner receives an instant notification with the creative artwork, campaign duration, and guaranteed earnings. They accept or decline the run.'
    },
    {
      num: '08',
      title: 'Admin Verification',
      actor: 'Platform Admin',
      actorColor: 'bg-purple-100 text-purple-800',
      icon: ShieldAlert,
      shortDesc: 'Compliance audit & 3M vinyl application slotting',
      fullDesc: 'ChhotaBheem - AdOnWheel administrators audit the brand design for advertising standards and verify the vehicle’s active insurance and fitness permits.'
    },
    {
      num: '09',
      title: 'Campaign Activation',
      actor: 'System / RTO',
      actorColor: 'bg-sky-100 text-sky-800',
      icon: Zap,
      shortDesc: '3M Vinyl wrapped & GPS live tracking starts',
      fullDesc: 'The vehicle is professionally wrapped at an authorized 3M certified applicators hub. Status shifts to ACTIVE, and GPS verified telemetry begins.'
    },
    {
      num: '10',
      title: 'Campaign Completion',
      actor: 'System / Admin',
      actorColor: 'bg-slate-100 text-slate-800',
      icon: Flag,
      shortDesc: 'Duration finishes and audited km verified',
      fullDesc: 'Upon reaching the campaign end date and validating target mileage logs, the wrap is cleanly removed without paint damage. Status marked COMPLETED.'
    },
    {
      num: '11',
      title: 'Earnings Update',
      actor: 'Finance / Escrow',
      actorColor: 'bg-emerald-100 text-emerald-800',
      icon: Wallet,
      shortDesc: 'Escrow released directly to Owner bank/UPI',
      fullDesc: 'Platform escrow automatically disburses partner earnings to the vehicle owner’s linked UPI ID or bank account. A transparent invoice is archived.'
    }
  ];

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500">End-to-End Campaign Lifecycle</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">How ChhotaBheem - AdOnWheel Operates</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            From initial registration to verified GPS payouts: explore our transparent, escrow-backed transit advertising workflow designed for maximum brand recall and reliable driver income.
          </p>
        </div>

        {/* Status Indicators Banner */}
        <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 text-center sm:text-left">
            Campaign State Progression Stages
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-300">
              <span className="text-xs font-bold block">1. Pending</span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400">Awaiting Owner & Admin review</span>
            </div>
            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 text-sky-900 dark:text-sky-300">
              <span className="text-xs font-bold block">2. Approved</span>
              <span className="text-[10px] text-sky-700 dark:text-sky-400">Artwork & fleet verified</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-300">
              <span className="text-xs font-bold block">3. Active</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">Live on street with GPS</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white">
              <span className="text-xs font-bold block">4. Completed</span>
              <span className="text-[10px] text-slate-600 dark:text-slate-400">Distance achieved & audited</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-300">
              <span className="text-xs font-bold block">5. Rejected</span>
              <span className="text-[10px] text-rose-700 dark:text-rose-400">Full refund to advertiser</span>
            </div>
          </div>
        </div>

        {/* 11-Step Interactive Visual Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Stepper Navigation */}
          <div className="lg:col-span-5 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Workflow Steps (Click to Inspect)
            </h3>
            <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-2">
              {workflowSteps.map((step, idx) => {
                const IconComponent = step.icon;
                const isCurrent = activeStep === idx;
                return (
                  <button
                    key={step.num}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isCurrent
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                        : 'bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        isCurrent ? 'bg-white text-orange-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {step.num}
                      </span>
                      <div>
                        <p className={`text-xs font-bold ${isCurrent ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                          {step.title}
                        </p>
                        <p className={`text-[11px] truncate max-w-[200px] ${isCurrent ? 'text-orange-100' : 'text-slate-500 dark:text-slate-400'}`}>
                          {step.shortDesc}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      isCurrent ? 'bg-orange-600 text-white' : step.actorColor
                    }`}>
                      {step.actor}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep-Dive Card for Current Step */}
          <div className="lg:col-span-7 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  {workflowSteps[activeStep].num}
                </div>
                <div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${workflowSteps[activeStep].actorColor}`}>
                    Actor: {workflowSteps[activeStep].actor}
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {workflowSteps[activeStep].title}
                  </h2>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {workflowSteps[activeStep].fullDesc}
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-100 dark:border-slate-700/60 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                System Safeguards & Verification
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Real-time state synced to persistent cloud database and local state</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Dual validation gate ensures advertiser brand safety and vehicle owner consent</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>All financial movements governed by escrow smart clearing</span>
                </li>
              </ul>
            </div>

            {/* Stepper Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
              >
                Previous Step
              </button>

              <span className="text-xs text-slate-400 dark:text-slate-500">
                Step {activeStep + 1} of {workflowSteps.length}
              </span>

              {activeStep < workflowSteps.length - 1 ? (
                <button
                  onClick={() => setActiveStep(prev => Math.min(workflowSteps.length - 1, prev + 1))}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={() => setActivePage('marketplace')}
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Explore Marketplace Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

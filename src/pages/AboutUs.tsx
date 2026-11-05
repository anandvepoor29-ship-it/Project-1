import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, TrendingUp, Users, Car, CheckCircle2, Award, Zap, ArrowRight } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500">About ChhotaBheem - AdOnWheel</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Transforming Everyday Traffic Into High-Impact Street Media
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            ChhotaBheem - AdOnWheel is India’s first decentralized vehicle advertising network, bridging brands that want unstoppable physical street-level visibility with commuters who turn their daily mileage into guaranteed monthly revenue.
          </p>
        </div>

        {/* Core Pillars Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">4x Recall vs Static Hoardings</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Moving objects capture human peripheral attention 300% faster than stationary billboards. A vehicle navigating through peak-hour Bengaluru or Mumbai traffic exposes your brand directly at eye-level to drivers and pedestrians.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">100% Paint Protection Vinyl</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              We exclusively use certified 3M automotive-grade cast vinyl and perforated window films. Our certified applicators install and safely peel graphics without leaving sticky residue or damaging original OEM clear coats.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">RTO & Police Compliance</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              All commercial vehicles and personal fleets are verified against state transport rules, vehicle fitness requirements, and municipal advertising guidelines, safeguarding both advertisers and vehicle owners.
            </p>
          </div>
        </div>

        {/* Comparison: Traditional vs ChhotaBheem - AdOnWheel */}
        <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why Vehicle-Based Transit Ads Win</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Comparing traditional OOH hoardings with ChhotaBheem - AdOnWheel's moving fleet model</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">Feature Metric</th>
                  <th className="py-3 px-4 text-slate-400 dark:text-slate-500">Traditional Static Billboards</th>
                  <th className="py-3 px-4 text-orange-500 font-bold bg-orange-50/50 dark:bg-orange-950/20">ChhotaBheem Fleet Network</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Mobility & Route Coverage</td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400">Fixed to one single highway location</td>
                  <td className="py-3 px-4 font-bold text-orange-500 bg-orange-50/30 dark:bg-orange-950/10">Travels across 60–150 km of city daily</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Average Monthly Cost (CPM)</td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400">₹80,000 – ₹2,50,000 / month</td>
                  <td className="py-3 px-4 font-bold text-orange-500 bg-orange-50/30 dark:bg-orange-950/10">₹9,000 – ₹25,000 / vehicle (70% savings)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Audit & Verification</td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400">Unverified estimates, prone to view obstruction</td>
                  <td className="py-3 px-4 font-bold text-orange-500 bg-orange-50/30 dark:bg-orange-950/10">Real GPS logged km & physical photo audits</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">Community Impact</td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400">Profits stay with hoarding monopolies</td>
                  <td className="py-3 px-4 font-bold text-orange-500 bg-orange-50/30 dark:bg-orange-950/10">Direct passive income for everyday vehicle owners</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 dark:bg-slate-900/90 text-white rounded-2xl p-8 sm:p-12 text-center space-y-4 border border-slate-800 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Join the Movement?</h2>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Whether you want to broadcast your brand to millions of commuters or make steady income with your vehicle, ChhotaBheem - AdOnWheel makes it seamless.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActivePage('marketplace')}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Browse Moving Vehicles
            </button>
            <button
              onClick={() => setActivePage('add-vehicle')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 cursor-pointer"
            >
              Partner With Your Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { Car, Mail, Phone, MapPin, Shield, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => setActivePage('home')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20">
                <Car className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-white">
                    ChhotaBheem
                  </span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    AdOnWheel
                  </span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              ChhotaBheem - AdOnWheel is India’s premier vehicle-based outdoor advertising platform. We bridge high-growth brands with moving commercial & personal vehicles, converting everyday traffic journeys into hyper-targeted, high-recall moving billboards.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <Shield className="w-3.5 h-3.5" /> 100% Escrow Protected
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-sky-400">
                <CheckCircle className="w-3.5 h-3.5" /> Verified Vehicle RC
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('marketplace')} className="hover:text-white transition-colors cursor-pointer">
                  Vehicle Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Our Vision
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('payments')} className="hover:text-white transition-colors cursor-pointer">
                  Pricing & Escrow
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Help & Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">Vehicle Formats</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Car & Sedan Advertising</li>
              <li>Auto Rickshaw Branding</li>
              <li>Hyperlocal Bike Delivery Boxes</li>
              <li>Transit Cargo Vans</li>
              <li>City & Intercity AC Buses</li>
              <li>Full Vehicle Body Wrapping</li>
              <li>Side-Panel & Rear-Window Decals</li>
            </ul>
          </div>

          {/* Contact / Academic Info */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">Reach Our Fleet Team</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>MG Road, Central Bengaluru, Karnataka</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>+91 (080) 4120-WHEEL</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>partner@chhotabheem-adonwheel.com</span>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                CSE Final Semester Project Demonstration Edition
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} ChhotaBheem - AdOnWheel Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setActivePage('about')} className="hover:text-white">Privacy Policy</button>
            <span>·</span>
            <button onClick={() => setActivePage('about')} className="hover:text-white">Terms of Advertising</button>
            <span>·</span>
            <button onClick={() => setActivePage('contact')} className="hover:text-white">Escrow Safeguards</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

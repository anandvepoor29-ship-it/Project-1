import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Car, Lock, Mail, User, Phone, Building, MapPin, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { loginWithCredentials, registerUser, loginAs, setActivePage } = useApp();

  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [role, setRole] = useState<UserRole>('advertiser');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+91 98');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('Bangalore');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      loginWithCredentials(email || 'advertiser@adonwheel.com', role);
    } else {
      registerUser({
        name: name || 'Demo Partner',
        email: email || `user_${Date.now()}@adonwheel.com`,
        role,
        phone,
        company: role === 'advertiser' ? company : undefined,
        city
      });
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Lockup */}
        <div className="text-center">
          <div 
            onClick={() => setActivePage('home')}
            className="inline-flex items-center gap-2 cursor-pointer mb-2"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Car className="w-5 h-5" />
            </div>
            <div className="leading-tight text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  ChhotaBheem
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-600 dark:bg-orange-950/80 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                  AdOnWheel
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block">Vehicle Transit Advertising Platform</span>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
            {isLogin ? 'Sign In to ChhotaBheem - AdOnWheel' : 'Create Your Partner Account'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isLogin 
              ? 'Choose which role you are visiting or logging in as.' 
              : 'Register as an advertiser booking vehicle space or an owner earning monthly income.'}
          </p>
        </div>

        {/* Prominent Question: Which role are you visiting as? */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border-2 border-orange-500/40 dark:border-orange-500/30 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
              Step 1: Choose Your Role
            </span>
            <span className="text-[11px] text-slate-400">Select one to proceed</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Advertiser Role Option */}
            <button
              type="button"
              onClick={() => {
                setRole('advertiser');
                if (isLogin) setEmail('advertiser@adonwheel.com');
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                role === 'advertiser'
                  ? 'border-orange-500 bg-orange-50/80 dark:bg-orange-950/40 text-slate-900 dark:text-white shadow-xs ring-1 ring-orange-500'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {role === 'advertiser' && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}
              <div className="font-bold text-xs text-slate-900 dark:text-white">Brand Advertiser</div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                Book vehicle space & track ad reach
              </p>
              <div className="mt-2 text-[10px] font-semibold text-orange-600 dark:text-orange-400">
                Rohit S. (Demo)
              </div>
            </button>

            {/* Vehicle Owner Role Option */}
            <button
              type="button"
              onClick={() => {
                setRole('owner');
                if (isLogin) setEmail('owner@adonwheel.com');
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                role === 'owner'
                  ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 text-slate-900 dark:text-white shadow-xs ring-1 ring-amber-500'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {role === 'owner' && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}
              <div className="font-bold text-xs text-slate-900 dark:text-white">Vehicle Owner</div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                Earn ₹4.5k–₹38k/mo displaying ads
              </p>
              <div className="mt-2 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                Suresh K. (Demo)
              </div>
            </button>

            {/* Admin Role Option */}
            <button
              type="button"
              onClick={() => {
                setRole('admin');
                if (isLogin) setEmail('admin@adonwheel.com');
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                role === 'admin'
                  ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-slate-900 dark:text-white shadow-xs ring-1 ring-emerald-500'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {role === 'admin' && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}
              <div className="font-bold text-xs text-slate-900 dark:text-white">Super Admin</div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                Audit RTO docs & escrow release
              </p>
              <div className="mt-2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Priya N. (Demo)
              </div>
            </button>
          </div>

          {/* Quick 1-click enter button */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">Instant evaluation access:</span>
            <button
              type="button"
              onClick={() => loginAs(role)}
              className="py-1.5 px-3 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-orange-500 hover:text-white text-orange-400 font-semibold transition-colors cursor-pointer text-[11px] flex items-center gap-1"
            >
              <span>Instant Enter as {role === 'advertiser' ? 'Advertiser' : role === 'owner' ? 'Owner' : 'Admin'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {isLogin ? `Step 2: Sign In as ${role.toUpperCase()}` : `Step 2: Register as ${role.toUpperCase()}`}
            </span>
            <span className="text-[11px] text-slate-400">Credentials Mode</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {!isLogin && (
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="E.g. Vikramaditya Rao"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={
                    role === 'advertiser' ? 'advertiser@adonwheel.com' :
                    role === 'owner' ? 'owner@adonwheel.com' : 'admin@adonwheel.com'
                  }
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {!isLogin && role === 'advertiser' && (
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Brand or Company Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="E.g. TechNovate Brands"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Mobile Contact</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Base City</label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full py-2 px-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Kolkata">Kolkata</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{isLogin ? `Sign In as ${role.toUpperCase()}` : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle between login and registration */}
          <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            {isLogin ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-orange-500 font-bold hover:underline cursor-pointer"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-orange-500 font-bold hover:underline cursor-pointer"
                >
                  Sign In here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

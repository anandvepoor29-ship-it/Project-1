import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleType } from '../types';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Search, 
  TrendingUp, 
  ShieldCheck, 
  Wallet, 
  Eye, 
  ArrowRight, 
  CheckCircle2, 
  Users,
  Compass,
  Zap,
  Building,
  Star
} from 'lucide-react';

export const Home: React.FC = () => {
  const { setActivePage, vehicles, setSelectedVehicleForBooking } = useApp();

  // Search section state
  const [searchLocation, setSearchLocation] = useState('All');
  const [searchType, setSearchType] = useState<string>('All');
  const [searchDuration, setSearchDuration] = useState('30');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePage('marketplace');
  };

  const featuredVehicles = vehicles.slice(0, 4);

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-16 lg:py-24 border-b border-slate-800/60">
        {/* Subtle grid backdrop pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Proposition and Headline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5 text-orange-400" />
                <span>Next-Gen Transit & Moving Billboard Media</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Your Vehicle. <br />
                Your Space. <br />
                <span className="text-orange-500">Your Earnings.</span>
              </h1>

              <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                Connect brands with moving vehicles and turn everyday journeys into advertising opportunities. Target high-density urban corridors with authentic, high-impact street-level visibility.
              </p>

              {/* Two Prominent Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setActivePage('marketplace')}
                  className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Advertise Your Brand</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setActivePage('add-vehicle')}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wallet className="w-4 h-4 text-orange-400" />
                  <span>Become a Vehicle Partner</span>
                </button>
              </div>

              {/* Trust Metrics */}
              <div className="pt-6 border-t border-slate-800 flex items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>RTO & Police Compliant</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                  <span>Live GPS Km Auditing</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-sky-400" />
                  <span>Instant Weekly Payouts</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
                <img
                  src="/src/assets/images/hero_adonwheel_fleet_1793896530511.jpg"
                  alt="Modern branded commercial vehicles driving in metropolitan city"
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Average Reach per Vehicle</p>
                    <p className="text-sm font-bold text-white tabular-nums">320,000+ Monthly Eyeballs</p>
                  </div>
                  <button 
                    onClick={() => setActivePage('marketplace')}
                    className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                  >
                    Explore Fleet <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="-mt-8 relative z-20 max-w-6xl mx-auto px-4 w-full">
        <form 
          onSubmit={handleSearchSubmit}
          className="bg-white dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              Target Location / City
            </label>
            <select
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="All">All Cities (Bangalore, Mumbai, NCR...)</option>
              <option value="Bangalore">Bangalore (Tech Corridors)</option>
              <option value="Mumbai">Mumbai (Western & Eastern Suburbs)</option>
              <option value="Delhi NCR">Delhi NCR & Gurgaon</option>
              <option value="Hyderabad">Hyderabad (HITEC City)</option>
              <option value="Kolkata">Kolkata</option>
            </select>
          </div>

          {/* Vehicle Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-orange-500" />
              Vehicle Format
            </label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="All">All Formats (Car, Auto, Bike, Van, Bus)</option>
              <option value="Car">Sedan & Hatchback (Personal & Cabs)</option>
              <option value="Auto">Auto Rickshaw (High-Density CBD)</option>
              <option value="Bike">Hyperlocal Delivery Bike</option>
              <option value="Van">Commercial Delivery Van</option>
              <option value="Bus">Transit & AC Route Bus</option>
            </select>
          </div>

          {/* Campaign Duration */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              Campaign Duration
            </label>
            <select
              value={searchDuration}
              onChange={(e) => setSearchDuration(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="15">15 Days (Quick Launch Blitz)</option>
              <option value="30">30 Days (Standard Monthly)</option>
              <option value="60">60 Days (High Impact Qtr)</option>
              <option value="90">90 Days (Omnichannel Brand Lift)</option>
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Available Fleets</span>
            </button>
          </div>
        </form>
      </section>

      {/* Platform Statistics Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <p className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">1,480+</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Verified Moving Vehicles</p>
          </div>
          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <p className="text-3xl font-bold text-orange-500 tabular-nums">42.8M+</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Monthly Street Impressions</p>
          </div>
          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <p className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">₹2.4 Cr+</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Earnings Paid to Vehicle Owners</p>
          </div>
          <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <p className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">18+</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Metro Cities & High-Density Hubs</p>
          </div>
        </div>
      </section>

      {/* How It Works Section (3-4 steps) */}
      <section className="py-16 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500">Simple 4-Step Process</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">How ChhotaBheem - AdOnWheel Operates</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
              A transparent, end-to-end marketplace connecting brands seeking hyper-local brand exposure with vehicle owners turning their regular commutes into passive income.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold text-lg flex items-center justify-center mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Browse & Select Fleet</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Advertisers explore verified cars, autos, bikes, vans, and buses filtered by city, daily route, and expected monthly impressions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                Cars, Autos, Bikes, Vans & Buses
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold text-lg flex items-center justify-center mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Upload Ad & Submit Booking</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Choose format (Full Wrap, Side Panel, or Rear Window), upload design artwork, configure duration, and hold payment in secure platform escrow.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                100% Escrow Protection
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold text-lg flex items-center justify-center mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Owner & Admin Approval</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Vehicle owner accepts campaign schedule; ChhotaBheem - AdOnWheel admins verify artwork compliance, vehicle documents, and coordinate 3M vinyl application.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                Dual Verification Standard
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-bold text-lg flex items-center justify-center mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Live GPS Drive & Payouts</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Vehicle drives regular routes with verified GPS telemetry. Upon campaign completion, earnings disburse directly to owner UPI / bank account.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                Direct UPI / Bank Transfer
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setActivePage('how-it-works')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors"
            >
              <span>View full 11-step end-to-end workflow guide</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500">Verified Fleet</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Featured Transit Vehicles Ready For Booking</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Top-rated commuters and commercial delivery fleets with verified RC and GPS tracking.
            </p>
          </div>
          <button
            onClick={() => setActivePage('marketplace')}
            className="text-sm font-semibold text-orange-500 hover:text-orange-400 flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>View All {vehicles.length} Vehicles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map(vehicle => (
            <div 
              key={vehicle.id} 
              className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {vehicle.vehicleType}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{vehicle.rating}</span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{vehicle.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{vehicle.makeModel} · {vehicle.city}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Daily Travel:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{vehicle.dailyAverageKm} km/day</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Est. Impressions:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{(vehicle.monthlyImpressions / 1000).toFixed(0)}k/mo</span>
                    </div>
                  </div>

                  {/* Primary route badge */}
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-100 dark:border-slate-700/60">
                    <span className="font-medium text-slate-700 dark:text-slate-200">Top Corridors: </span>
                    <span className="truncate">{vehicle.primaryRoutes.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-3">
                <div>
                  <span className="text-xs text-slate-400">Rate</span>
                  <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                    ₹{vehicle.dailyRate}<span className="text-xs font-normal text-slate-500 dark:text-slate-400">/day</span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedVehicleForBooking(vehicle);
                    setActivePage('campaign-booking');
                  }}
                  className="px-3.5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Book Ad Space
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dual Benefits Section: Advertisers vs Vehicle Owners */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold tracking-tight">Mutual Value Across the Ecosystem</h2>
            <p className="text-sm text-slate-400 mt-2">
              Empowering local brands with dynamic street-level media while helping drivers earn up to ₹25,000/month passively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Advertisers */}
            <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold mb-5">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">For Brands & Advertisers</h3>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                Cost-effective out-of-home advertising with 4x higher recall than static roadside billboards.
              </p>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span><strong>Hyper-targeted Geographies:</strong> Pick vehicles based on exact daily commute routes through tech parks, residential clusters, or CBD avenues.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span><strong>Unblockable Street Presence:</strong> Reach pedestrians, motorists, and commuters where digital ad blockers cannot intrude.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span><strong>GPS-Audited Mileage:</strong> Verify real kilometers driven and daily activity reports before escrow funds get disbursed.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span><strong>Flexible Formats:</strong> From cost-efficient rear-window decals to full high-impact vehicle body wraps.</span>
                </li>
              </ul>

              <div className="mt-8">
                <button
                  onClick={() => setActivePage('marketplace')}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Explore Advertising Rates
                </button>
              </div>
            </div>

            {/* For Vehicle Owners */}
            <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-5">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">For Vehicle Owners & Fleets</h3>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                Turn your daily commute into steady passive earnings without changing your driving habits.
              </p>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Predictable Monthly Income:</strong> Earn ₹6,000 to ₹35,000 every month depending on your vehicle category and daily mileage.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Safe, Paint-Friendly Vinyl:</strong> Free professional installation and clean removal using certified 3M automotive-grade wraps that protect vehicle paint.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Full Autonomy & Control:</strong> You have 100% authority to accept or reject any brand campaign before it goes live.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Instant Payouts:</strong> Weekly or campaign-end direct transfers to your UPI or linked bank account.</span>
                </li>
              </ul>

              <div className="mt-8">
                <button
                  onClick={() => setActivePage('add-vehicle')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  List Your Vehicle Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white/40 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500">Authentic Experiences</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Trusted by Brands & Drivers Alike</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "We wrapped 15 delivery vans and 30 auto-rickshaws across Bengaluru's tech corridors for our fintech app launch. The offline brand recall generated over 38,000 app installs within 45 days at a fraction of hoarding costs."
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-orange-500 text-white font-bold text-xs flex items-center justify-center">
                  R
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Rohit Sharma</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">VP Marketing, TechNovate Brands</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "I drive daily between Electronic City and Koramangala. Having a brand ad on my car pays for my monthly fuel and car EMI! ChhotaBheem - AdOnWheel handled the vinyl wrapping and payment was credited straight to my UPI account on time."
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold text-xs flex items-center justify-center">
                  S
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Suresh Kumar</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Fleet Partner & Sedan Owner, Bengaluru</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/90 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "We operate 8 commercial delivery vans across Mumbai. ChhotaBheem - AdOnWheel turned idle vehicle surfaces into an extra ₹1.2 Lakh monthly profit center without disturbing our daily logistics deliveries at all."
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-700 text-white font-bold text-xs flex items-center justify-center">
                  M
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Manish Verma</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Logistics Director, CitySpeed Logistics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-14 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-5">
          <h2 className="text-3xl font-extrabold">Ready to Turn Vehicles Into Brand Ambassadors?</h2>
          <p className="text-sm text-orange-100 max-w-xl mx-auto">
            Join hundreds of forward-thinking brands and vehicle partners scaling transit visibility across India's fastest-growing cities.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActivePage('marketplace')}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-lg transition-colors"
            >
              Start Advertising Campaign
            </button>
            <button
              onClick={() => setActivePage('add-vehicle')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-orange-600 text-xs font-bold shadow-lg transition-colors"
            >
              Register Your Vehicle Fleet
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Vehicle, VehicleType, AdSpace } from '../types';
import { 
  Car, 
  MapPin, 
  Star, 
  Search, 
  Filter, 
  Eye, 
  ShieldCheck, 
  X, 
  ArrowRight,
  Info,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

export const Marketplace: React.FC = () => {
  const { vehicles, setSelectedVehicleForBooking, setActivePage } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedAdSpace, setSelectedAdSpace] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [viewingVehicle, setViewingVehicle] = useState<Vehicle | null>(null);

  // Filter logic
  const filteredVehicles = vehicles.filter(v => {
    if (selectedType !== 'All' && v.vehicleType !== selectedType) return false;
    if (selectedCity !== 'All' && v.city !== selectedCity) return false;
    if (selectedAdSpace !== 'All' && !v.allowedAdSpaces.includes(selectedAdSpace as AdSpace)) return false;
    if (v.dailyRate > maxPrice) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = v.title.toLowerCase().includes(q);
      const matchModel = v.makeModel.toLowerCase().includes(q);
      const matchCity = v.city.toLowerCase().includes(q);
      const matchRoute = v.primaryRoutes.some(r => r.toLowerCase().includes(q));
      if (!matchTitle && !matchModel && !matchCity && !matchRoute) return false;
    }
    return true;
  });

  const handleBookNow = (vehicle: Vehicle) => {
    setSelectedVehicleForBooking(vehicle);
    setActivePage('campaign-booking');
  };

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-orange-500">Live Vehicle Inventory</p>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Vehicle Advertising Marketplace</h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                Browse our verified network of moving vehicles. Select by vehicle category, target commuter routes, and placement dimensions to reach your target demographics.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Showing</span>
              <span className="px-2.5 py-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white shadow-2xs">
                {filteredVehicles.length} vehicles available
              </span>
            </div>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Search Fleet or Corridors</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="E.g. Hyundai Creta, Electronic City, BKC Expressway, Volvo..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* City Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Target City</label>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="All">All Metro Cities</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            {/* Ad Space Placement */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Ad Placement Space</label>
              <select
                value={selectedAdSpace}
                onChange={e => setSelectedAdSpace(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="All">All Ad Spaces</option>
                <option value="Full vehicle wrapping">Full vehicle wrapping</option>
                <option value="Side-panel advertising">Side-panel advertising</option>
                <option value="Rear-window advertising">Rear-window advertising</option>
                <option value="Rooftop advertising">Rooftop advertising</option>
              </select>
            </div>
          </div>

          {/* Vehicle Type Tabs and Max Price Slider */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Segmented controls for vehicle categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-medium text-slate-400 mr-2 shrink-0">Category:</span>
              {['All', 'Car', 'Auto', 'Bike', 'Van', 'Bus'].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    selectedType === type
                      ? 'bg-orange-500 text-white shadow-xs font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {type === 'All' ? 'All Vehicles' : `${type}s`}
                </button>
              ))}
            </div>

            {/* Max Price Slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 shrink-0">Max Rate:</span>
              <input
                type="range"
                min="200"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-28 sm:w-36 accent-orange-500"
              />
              <span className="text-xs font-bold text-slate-800 tabular-nums min-w-[70px]">
                ₹{maxPrice}/day
              </span>
            </div>
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No vehicles match your filter criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the filters or increasing the maximum price range.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setSelectedCity('All');
                setSelectedAdSpace('All');
                setMaxPrice(2000);
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map(vehicle => (
              <div
                key={vehicle.id}
                className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-52 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        {vehicle.vehicleType}
                      </span>
                      {vehicle.verificationStatus === 'verified' && (
                        <span className="bg-emerald-600/90 text-white text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> RC Verified
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{vehicle.rating}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded">
                      Reg: <span className="font-mono text-orange-400">{vehicle.regNumber}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{vehicle.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{vehicle.city}, {vehicle.state}</span>
                        <span>·</span>
                        <span>{vehicle.makeModel}</span>
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Daily Commute</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{vehicle.dailyAverageKm} km/day</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Monthly Eyes</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{(vehicle.monthlyImpressions / 1000).toFixed(0)}k reach</span>
                      </div>
                    </div>

                    {/* Primary Routes */}
                    <div>
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Key Daily Corridors:</span>
                      <div className="flex flex-wrap gap-1 text-[11px] text-slate-600">
                        {vehicle.primaryRoutes.map((route, i) => (
                          <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                            {route}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Allowed Placements */}
                    <div>
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Available Ad Formats:</span>
                      <div className="flex flex-wrap gap-1 text-[11px]">
                        {vehicle.allowedAdSpaces.map((space, i) => (
                          <span key={i} className="text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded bg-white dark:bg-slate-800">
                            {space}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Campaign Cost</span>
                    <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                      ₹{vehicle.dailyRate}
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400"> /day</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewingVehicle(vehicle)}
                      className="px-3 py-2 border border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleBookNow(vehicle)}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Book Space</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vehicle Inspection Detail Modal */}
      {viewingVehicle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-500">{viewingVehicle.vehicleType} Specifications</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{viewingVehicle.title}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{viewingVehicle.makeModel} · Reg #{viewingVehicle.regNumber}</p>
              </div>
              <button 
                onClick={() => setViewingVehicle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-5">
              <div className="rounded-xl overflow-hidden h-60 bg-slate-100 dark:bg-slate-800">
                <img
                  src={viewingVehicle.image}
                  alt={viewingVehicle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-center">
                <div>
                  <span className="text-slate-400 block text-[11px]">Daily Rate</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm tabular-nums">₹{viewingVehicle.dailyRate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Daily Distance</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm tabular-nums">{viewingVehicle.dailyAverageKm} km</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Impressions</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm tabular-nums">{(viewingVehicle.monthlyImpressions / 1000).toFixed(0)}k /mo</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Past Campaigns</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm tabular-nums">{viewingVehicle.completedCampaignsCount}</span>
                </div>
              </div>

              {/* Owner and Verification */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Owner & Compliance Status</h4>
                <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                  <span>Registered Partner:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{viewingVehicle.ownerName}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                  <span>Compliance Check:</span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified RC & Commercial Insurance
                  </span>
                </div>
              </div>

              {/* Routes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">Transit Coverage Corridors</h4>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {viewingVehicle.primaryRoutes.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setViewingVehicle(null)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = viewingVehicle;
                  setViewingVehicle(null);
                  handleBookNow(target);
                }}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
              >
                Proceed to Book Ad Space
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

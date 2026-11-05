import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleType, AdSpace } from '../types';
import { Car, Upload, MapPin, ShieldCheck, ArrowLeft, CheckCircle2, DollarSign } from 'lucide-react';

export const AddVehicle: React.FC = () => {
  const { addVehicle, setActivePage, currentUser, loginAs } = useApp();

  const [title, setTitle] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>('Car');
  const [makeModel, setMakeModel] = useState('');
  const [year, setYear] = useState<number>(2023);
  const [regNumber, setRegNumber] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [state, setState] = useState('Karnataka');
  const [dailyKm, setDailyKm] = useState<number>(65);
  const [dailyRate, setDailyRate] = useState<number>(450);
  const [routesInput, setRoutesInput] = useState('Koramangala to Electronic City, Outer Ring Road');
  const [selectedSpaces, setSelectedSpaces] = useState<AdSpace[]>([
    'Side-panel advertising',
    'Rear-window advertising'
  ]);
  const [imagePreview, setImagePreview] = useState<string>('/src/assets/images/vehicle_car_wrap_1793896530738.jpg');
  const [rcFileName, setRcFileName] = useState('RC_Book_Scan.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set default photo based on type
  const handleTypeChange = (type: VehicleType) => {
    setVehicleType(type);
    if (type === 'Car') {
      setImagePreview('/src/assets/images/vehicle_car_wrap_1793896530738.jpg');
      setDailyRate(450);
    } else if (type === 'Auto') {
      setImagePreview('/src/assets/images/vehicle_bike_auto_1793896530491.jpg');
      setDailyRate(320);
    } else if (type === 'Bike') {
      setImagePreview('/src/assets/images/vehicle_bike_auto_1793896530491.jpg');
      setDailyRate(240);
    } else if (type === 'Van') {
      setImagePreview('/src/assets/images/vehicle_bus_van_1793896531082.jpg');
      setDailyRate(680);
    } else if (type === 'Bus') {
      setImagePreview('/src/assets/images/vehicle_bus_van_1793896531082.jpg');
      setDailyRate(1450);
    }
  };

  const handleToggleSpace = (space: AdSpace) => {
    if (selectedSpaces.includes(space)) {
      if (selectedSpaces.length > 1) {
        setSelectedSpaces(selectedSpaces.filter(s => s !== space));
      }
    } else {
      setSelectedSpaces([...selectedSpaces, space]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser || currentUser.role !== 'owner') {
      loginAs('owner');
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const routes = routesInput.split(',').map(r => r.trim()).filter(Boolean);
      const estImpressions = dailyKm * 30 * 140;

      addVehicle({
        title: title || `${makeModel} - Daily Route Partner`,
        vehicleType,
        makeModel,
        year,
        regNumber: regNumber.toUpperCase(),
        city,
        state,
        dailyAverageKm: dailyKm,
        monthlyImpressions: estImpressions,
        primaryRoutes: routes.length > 0 ? routes : ['Central Business District', 'Outer Ring Road'],
        allowedAdSpaces: selectedSpaces,
        dailyRate,
        image: imagePreview
      });

      setIsSubmitting(false);
      setActivePage('owner-dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setActivePage('owner-dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Owner Dashboard</span>
        </button>

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-500">Fleet Partner Registration</p>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Register Your Vehicle for Advertisements</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Earn ₹6,000 to ₹35,000 every month by displaying certified 3M brand graphics during your regular journeys.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-8">
          {/* Section 1: Basic Specifications */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <Car className="w-4 h-4 text-orange-500" />
              <span>1. Vehicle Identity & Registration</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Vehicle Category</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {(['Car', 'Auto', 'Bike', 'Van', 'Bus'] as VehicleType[]).map(type => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => handleTypeChange(type)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all text-center cursor-pointer ${
                        vehicleType === type
                          ? 'bg-orange-500 text-white border-orange-500 shadow-2xs'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">RTO Registration Number</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. KA-01-MJ-8821, DL-02-CB-1234"
                  value={regNumber}
                  onChange={e => setRegNumber(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm uppercase font-mono font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Make & Model</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Hyundai Creta SX, Bajaj RE Compact, Tata Winger..."
                  value={makeModel}
                  onChange={e => setMakeModel(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Manufacturing Year</label>
                <input
                  type="number"
                  required
                  min="2012"
                  max="2026"
                  value={year}
                  onChange={e => setYear(Number(e.target.value))}
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Commute Routes & Rates */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>2. Operational City & Daily Routes</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Primary Operating City</label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                >
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Pune">Pune</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Daily Average Travel (km)</label>
                <input
                  type="number"
                  required
                  min="20"
                  max="500"
                  value={dailyKm}
                  onChange={e => setDailyKm(Number(e.target.value))}
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold tabular-nums text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Desired Daily Rate (₹/day)</label>
                <input
                  type="number"
                  required
                  min="150"
                  max="3000"
                  value={dailyRate}
                  onChange={e => setDailyRate(Number(e.target.value))}
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold text-emerald-500 tabular-nums"
                />
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Monthly Est: ₹{(dailyRate * 30).toLocaleString()}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Primary Daily Corridors (comma separated)</label>
              <input
                type="text"
                value={routesInput}
                onChange={e => setRoutesInput(e.target.value)}
                placeholder="E.g. Koramangala, Indiranagar, MG Road, Electronic City"
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Section 3: Allowed Ad Spaces */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              3. Permitted Advertisement Formats
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'Full vehicle wrapping', label: 'Full Vehicle Wrapping', desc: 'Doors, hood and body panels' },
                { id: 'Side-panel advertising', label: 'Side-Panel Decals', desc: 'Driver and passenger side door decals' },
                { id: 'Rear-window advertising', label: 'Rear-Window Perforated', desc: 'One-way vision glass film' },
                { id: 'Rooftop advertising', label: 'Rooftop Billboard Box', desc: 'Top rack ad box (Auto/Bike)' }
              ].map(format => (
                <label
                  key={format.id}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${
                    selectedSpaces.includes(format.id as AdSpace)
                      ? 'border-orange-500 bg-orange-50/40 dark:bg-orange-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedSpaces.includes(format.id as AdSpace)}
                    onChange={() => handleToggleSpace(format.id as AdSpace)}
                    className="mt-1 accent-orange-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">{format.label}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{format.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Section 4: Photo and RC Upload */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <Upload className="w-4 h-4 text-orange-500" />
              <span>4. Vehicle Photos & RTO RC Document</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Exterior Vehicle Photo</span>
                <div className="relative rounded-xl overflow-hidden h-40 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={imagePreview}
                    alt="Vehicle preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="inline-block px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Registration Certificate (RC Book)</span>
                <div className="p-5 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-center bg-slate-50 dark:bg-slate-800/50">
                  <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{rcFileName}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Uploaded & Ready for Admin Audit</p>
                  <label className="mt-3 inline-block px-3 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-[11px] font-semibold text-slate-700 dark:text-slate-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
                    Replace Document
                    <input type="file" onChange={e => e.target.files?.[0] && setRcFileName(e.target.files[0].name)} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActivePage('owner-dashboard')}
              className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              {isSubmitting ? 'Registering Fleet...' : 'Register Vehicle on Marketplace'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

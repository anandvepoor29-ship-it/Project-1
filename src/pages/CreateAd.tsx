import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleType, AdSpace } from '../types';
import { 
  Sparkles, 
  Upload, 
  Car, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';

export const CreateAd: React.FC = () => {
  const { vehicles, createBooking, setActivePage, currentUser, loginAs } = useApp();

  const [campaignTitle, setCampaignTitle] = useState('Metro Brand Explosion');
  const [brandName, setBrandName] = useState(currentUser?.company || 'Acme Digital');
  const [targetType, setTargetType] = useState<VehicleType>('Car');
  const [targetCity, setTargetCity] = useState('Bangalore');
  const [targetAudience, setTargetAudience] = useState('Urban consumers, tech park workers, and transit commuters');
  const [adSpace, setAdSpace] = useState<AdSpace>('Side-panel advertising');
  const [durationDays, setDurationDays] = useState(30);
  const [adCreativePreview, setAdCreativePreview] = useState('/src/assets/images/vehicle_car_wrap_1793896530738.jpg');
  const [adCreativeName, setAdCreativeName] = useState('brand_artwork_v1.png');

  // Match best vehicle from fleet
  const matchingVehicle = vehicles.find(v => v.vehicleType === targetType && v.city === targetCity) || vehicles.find(v => v.vehicleType === targetType) || vehicles[0];

  const dailyRate = matchingVehicle?.dailyRate || 400;
  const subtotal = dailyRate * durationDays;
  const platformFee = Math.round(subtotal * 0.1);
  const totalCost = subtotal + platformFee;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAdCreativeName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAdCreativePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || currentUser.role !== 'advertiser') {
      loginAs('advertiser');
    }

    createBooking({
      title: campaignTitle,
      brandName,
      vehicleId: matchingVehicle.id,
      vehicleTitle: matchingVehicle.title,
      vehicleType: targetType,
      ownerId: matchingVehicle.ownerId,
      ownerName: matchingVehicle.ownerName,
      ownerPhone: matchingVehicle.ownerPhone,
      adSpace,
      adCreativeUrl: adCreativePreview,
      adCreativeName,
      durationDays,
      dailyRate,
      targetCity,
      targetAudience
    });

    setActivePage('advertiser-dashboard');
  };

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setActivePage('advertiser-dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Advertiser Dashboard</span>
        </button>

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-500">Brand Campaign Studio</p>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Design & Launch Transit Campaign</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Specify target audience parameters, upload high-fidelity creative files, and generate instant fleet matching.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-8">
          {/* Section 1: Campaign Metadata */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>1. Campaign Essentials</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={e => setBrandName(e.target.value)}
                  placeholder="E.g. Zomato, Puma, Uber..."
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Campaign Headline Title</label>
                <input
                  type="text"
                  required
                  value={campaignTitle}
                  onChange={e => setCampaignTitle(e.target.value)}
                  placeholder="E.g. Festive Discount Transit Drive"
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Target Operating City</label>
                <select
                  value={targetCity}
                  onChange={e => setTargetCity(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                >
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Kolkata">Kolkata</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Desired Fleet Type</label>
                <div className="grid grid-cols-5 gap-1">
                  {(['Car', 'Auto', 'Bike', 'Van', 'Bus'] as VehicleType[]).map(type => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setTargetType(type)}
                      className={`py-1.5 text-xs font-bold rounded-lg border text-center cursor-pointer ${
                        targetType === type
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Target Audience Demographics</label>
              <input
                type="text"
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value)}
                placeholder="E.g. Daily metro riders, mall shoppers, college students..."
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Section 2: Ad Placement Space & Duration */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-500" />
              <span>2. Placement Format & Duration</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'Full vehicle wrapping', name: 'Full Vehicle Wrap', desc: 'Maximum 360° visibility' },
                { id: 'Side-panel advertising', name: 'Side-Panel Decals', desc: 'Door panels on both sides' },
                { id: 'Rear-window advertising', name: 'Rear-Window Perforated', desc: 'Following traffic visibility' },
                { id: 'Rooftop advertising', name: 'Rooftop Box', desc: 'Backlit top module' }
              ].map(item => (
                <label
                  key={item.id}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    adSpace === item.id ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 ring-1 ring-orange-500' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">{item.name}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</span>
                  </div>
                  <input
                    type="radio"
                    name="space"
                    checked={adSpace === item.id}
                    onChange={() => setAdSpace(item.id as AdSpace)}
                    className="accent-orange-500"
                  />
                </label>
              ))}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Campaign Duration</label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 30, 60, 90].map(days => (
                  <button
                    type="button"
                    key={days}
                    onClick={() => setDurationDays(days)}
                    className={`py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                      durationDays === days
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Artwork Upload */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
              <Upload className="w-4 h-4 text-orange-500" />
              <span>3. Artwork Creative File</span>
            </h2>

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-5 text-center bg-slate-50 dark:bg-slate-800/50">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Upload print-ready graphic banner</p>
              <label className="mt-3 inline-block px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700">
                Select File
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {adCreativePreview && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                <img
                  src={adCreativePreview}
                  alt="Preview"
                  className="w-16 h-14 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                />
                <div className="text-xs">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{adCreativeName}</p>
                  <p className="text-[11px] text-emerald-500">Attached for Admin Inspection</p>
                </div>
              </div>
            )}
          </div>

          {/* Pricing Escrow Bar */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800 shadow-lg">
            <div>
              <span className="text-xs text-slate-400">Total Campaign Investment (Escrow):</span>
              <p className="text-2xl font-bold text-orange-400 tabular-nums">₹{totalCost.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400">Includes {durationDays} days display + 10% 3M application warranty</p>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Submit Campaign Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Vehicle, AdSpace } from '../types';
import { 
  Car, 
  Upload, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft,
  DollarSign,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export const CampaignBooking: React.FC = () => {
  const { 
    vehicles, 
    selectedVehicleForBooking, 
    setSelectedVehicleForBooking, 
    createBooking, 
    setActivePage,
    currentUser,
    loginAs
  } = useApp();

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    selectedVehicleForBooking?.id || (vehicles[0]?.id || '')
  );

  const currentVehicle: Vehicle | undefined = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

  const [brandName, setBrandName] = useState(currentUser?.company || 'Zomato Fresh Launch');
  const [campaignTitle, setCampaignTitle] = useState('Urban Metro Brand Awareness Q4');
  const [adSpace, setAdSpace] = useState<AdSpace>('Side-panel advertising');
  const [durationDays, setDurationDays] = useState<number>(30);
  const [targetCity, setTargetCity] = useState(currentVehicle?.city || 'Bangalore');
  const [targetAudience, setTargetAudience] = useState('Working professionals, tech founders, and college students');
  const [adCreativePreview, setAdCreativePreview] = useState<string>('/src/assets/images/vehicle_car_wrap_1793896530738.jpg');
  const [adCreativeName, setAdCreativeName] = useState('brand_banner_hires_v1.png');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);

  // Sync city when vehicle changes
  useEffect(() => {
    if (currentVehicle) {
      setTargetCity(currentVehicle.city);
      if (currentVehicle.allowedAdSpaces && !currentVehicle.allowedAdSpaces.includes(adSpace)) {
        setAdSpace(currentVehicle.allowedAdSpaces[0] || 'Side-panel advertising');
      }
    }
  }, [currentVehicle]);

  // Pricing calculations
  const dailyRate = currentVehicle ? currentVehicle.dailyRate : 400;
  // Multiplier for space
  const spaceMultiplier = 
    adSpace === 'Full vehicle wrapping' ? 1.5 :
    adSpace === 'Side-panel advertising' ? 1.0 :
    adSpace === 'Rooftop advertising' ? 0.9 : 0.8;

  const adjustedDailyRate = Math.round(dailyRate * spaceMultiplier);
  const subtotal = adjustedDailyRate * durationDays;
  const platformFee = Math.round(subtotal * 0.1); // 10% platform facilitation fee
  const totalCost = subtotal + platformFee;
  const estimatedImpressions = Math.round(((currentVehicle?.monthlyImpressions || 300000) / 30) * durationDays);

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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      loginAs('advertiser');
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newCampaign = createBooking({
        title: campaignTitle,
        brandName: brandName,
        vehicleId: currentVehicle.id,
        vehicleTitle: currentVehicle.title,
        vehicleType: currentVehicle.vehicleType,
        ownerId: currentVehicle.ownerId,
        ownerName: currentVehicle.ownerName,
        ownerPhone: currentVehicle.ownerPhone,
        adSpace: adSpace,
        adCreativeUrl: adCreativePreview,
        adCreativeName: adCreativeName,
        durationDays: durationDays,
        dailyRate: adjustedDailyRate,
        targetCity: targetCity,
        targetAudience: targetAudience
      });

      setIsSubmitting(false);
      setBookingSuccessId(newCampaign.id);
    }, 800);
  };

  if (bookingSuccessId) {
    return (
      <div className="min-h-screen bg-transparent py-16 px-4">
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Campaign Booking Submitted!</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Booking Reference ID: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{bookingSuccessId}</span></p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-4 border border-slate-100 dark:border-slate-700 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Selected Vehicle:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{currentVehicle?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Format:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{adSpace}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Duration:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{durationDays} Days</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-bold text-sm">
              <span className="text-slate-800 dark:text-slate-200">Escrow Total:</span>
              <span className="text-orange-500">₹{totalCost.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            The booking request has been routed to vehicle owner <strong>{currentVehicle?.ownerName}</strong>. Once approved, ChhotaBheem - AdOnWheel Admin will verify your creative specifications.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('advertiser-dashboard')}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Go to Advertiser Dashboard
            </button>
            <button
              onClick={() => setActivePage('marketplace')}
              className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              Browse More Fleets
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setActivePage('marketplace')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-500">Campaign Configurator</p>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Book Vehicle Advertising Campaign</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Configure your brand placement, upload artwork graphics, calculate estimated reach, and reserve moving billboard inventory.
          </p>
        </div>

        <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select or Confirm Vehicle */}
            <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Car className="w-4 h-4 text-orange-500" />
                <span>1. Target Transit Vehicle</span>
              </h2>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Choose from Available Fleets</label>
                <select
                  value={selectedVehicleId}
                  onChange={e => setSelectedVehicleId(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 font-medium focus:ring-2 focus:ring-orange-500"
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.title} ({v.vehicleType} · {v.city} · ₹{v.dailyRate}/day)
                    </option>
                  ))}
                </select>
              </div>

              {currentVehicle && (
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4">
                  <img
                    src={currentVehicle.image}
                    alt={currentVehicle.title}
                    className="w-20 h-16 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                  <div className="space-y-0.5 text-xs">
                    <p className="font-bold text-slate-900 dark:text-white">{currentVehicle.title}</p>
                    <p className="text-slate-500 dark:text-slate-400">{currentVehicle.makeModel} · Reg #{currentVehicle.regNumber}</p>
                    <p className="text-slate-600 dark:text-slate-300 font-medium text-[11px]">
                      Routes: {currentVehicle.primaryRoutes.join(', ')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Campaign Branding & Ad Space */}
            <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-orange-500" />
                <span>2. Brand Details & Placement Space</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Brand / Product Name</label>
                  <input
                    type="text"
                    required
                    value={brandName}
                    onChange={e => setBrandName(e.target.value)}
                    placeholder="E.g. Zomato, Swiggy, Nike..."
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
                    placeholder="E.g. Tech Corridor Launch Blast"
                    className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Placement selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">Select Advertising Format</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'Full vehicle wrapping', name: 'Full Vehicle Wrap', desc: 'Maximum 360° visibility on doors, bonnet, and rear', mult: '1.5x' },
                    { id: 'Side-panel advertising', name: 'Side-Panel Decals', desc: 'High-impact passenger & driver door panels', mult: '1.0x' },
                    { id: 'Rear-window advertising', name: 'Rear-Window Perforated', desc: 'One-way see-through vinyl for following drivers', mult: '0.8x' },
                    { id: 'Rooftop advertising', name: 'Rooftop Carrier Box', desc: 'Backlit top-mount billboard (Autos & Bikes)', mult: '0.9x' }
                  ].map(space => (
                    <label
                      key={space.id}
                      className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                        adSpace === space.id
                          ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 ring-1 ring-orange-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{space.name}</span>
                        <input
                          type="radio"
                          name="adSpace"
                          checked={adSpace === space.id}
                          onChange={() => setAdSpace(space.id as AdSpace)}
                          className="accent-orange-500"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{space.desc}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">Campaign Duration</label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 60, 90].map(days => (
                    <button
                      type="button"
                      key={days}
                      onClick={() => setDurationDays(days)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
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

            {/* Step 3: Creative Design Upload */}
            <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-orange-500" />
                <span>3. Upload Advertisement Artwork & Mockup</span>
              </h2>

              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-5 text-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Drop high-resolution print artwork here</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Supports PNG, JPG, or PDF (300 DPI recommended)</p>

                <div className="mt-3">
                  <label className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer shadow-2xs inline-block">
                    Select File from Device
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {adCreativePreview && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <img
                    src={adCreativePreview}
                    alt="Ad preview"
                    className="w-14 h-14 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{adCreativeName}</p>
                    <p className="text-[11px] text-emerald-500 font-medium">Ready for Admin Inspection</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Pricing Summary & Escrow Guarantee */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Investment & Reach Breakdown
              </h3>

              {/* Reach Projection */}
              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-xl border border-orange-100 dark:border-orange-900/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-orange-950 dark:text-orange-300 font-medium">Estimated Street Views:</span>
                  <span className="font-extrabold text-orange-600 dark:text-orange-400 text-sm tabular-nums">
                    {estimatedImpressions.toLocaleString()} views
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-orange-950 dark:text-orange-300 font-medium">Daily Distance Target:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                    {currentVehicle?.dailyAverageKm} km/day
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-orange-950 dark:text-orange-300 font-medium">Total Campaign Mileage:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                    {(currentVehicle?.dailyAverageKm || 60) * durationDays} km tracked
                  </span>
                </div>
              </div>

              {/* Price Calculation Table */}
              <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Base Vehicle Rate:</span>
                  <span className="tabular-nums">₹{dailyRate}/day</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Placement Format Multiplier:</span>
                  <span className="tabular-nums">{spaceMultiplier}x ({adSpace})</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Daily Rate:</span>
                  <span className="tabular-nums font-semibold">₹{adjustedDailyRate}/day</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Duration ({durationDays} days):</span>
                  <span className="tabular-nums font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Platform & 3M Application Facilitation (10%):</span>
                  <span className="tabular-nums">₹{platformFee.toLocaleString()}</span>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-baseline font-bold">
                  <span className="text-sm text-slate-900 dark:text-white">Total Campaign Escrow:</span>
                  <span className="text-xl text-orange-500 tabular-nums">
                    ₹{totalCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Security note */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>ChhotaBheem - AdOnWheel Escrow Safeguard</span>
                </div>
                <p>
                  Your payment is securely reserved in platform escrow. The driver is paid only after regular route milestones are GPS verified.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Reserving Inventory in Escrow...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Confirm Booking & Hold in Escrow</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

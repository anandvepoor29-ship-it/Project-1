import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Campaign, CampaignStatus } from '../types';
import { 
  Plus, 
  Car, 
  MapPin, 
  TrendingUp, 
  Eye, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  ExternalLink,
  Activity
} from 'lucide-react';

export const AdvertiserDashboard: React.FC = () => {
  const { 
    campaigns, 
    currentUser, 
    setActivePage, 
    setSelectedVehicleForBooking, 
    vehicles 
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Filter campaigns for advertiser
  const myCampaigns = campaigns.filter(c => {
    // Show user's campaigns, or all if demo
    return true;
  });

  const filteredCampaigns = myCampaigns.filter(c => {
    if (statusFilter === 'All') return true;
    return c.status === statusFilter;
  });

  // Analytics KPIs
  const totalSpent = myCampaigns.reduce((acc, c) => acc + (c.paymentStatus !== 'Refunded' ? c.totalCost : 0), 0);
  const activeCount = myCampaigns.filter(c => c.status === 'Active').length;
  const totalVerifiedKm = myCampaigns.reduce((acc, c) => acc + c.tracking.verifiedKm, 0);
  const totalImpressions = myCampaigns.reduce((acc, c) => {
    const days = c.durationDays || 30;
    return acc + Math.round((280000 / 30) * days);
  }, 0);

  const getStatusBadge = (status: CampaignStatus) => {
    switch (status) {
      case 'Active':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span> Active Moving</span>;
      case 'Pending':
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Pending Review</span>;
      case 'Approved':
        return <span className="bg-sky-100 text-sky-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Approved & Wrap Ready</span>;
      case 'Completed':
        return <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-600" /> Completed</span>;
      case 'Rejected':
        return <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Rejected</span>;
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Advertiser Control Center</span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Campaigns & Fleet Tracking</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Logged in as <span className="font-semibold text-slate-800 dark:text-slate-200">{currentUser?.name}</span> ({currentUser?.company || 'Brand Partner'})
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActivePage('marketplace')}
              className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Browse Fleets
            </button>
            <button
              onClick={() => setActivePage('campaign-booking')}
              className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Launch New Campaign</span>
            </button>
          </div>
        </div>

        {/* Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Moving Campaigns</span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-1">{activeCount}</p>
            <span className="text-[11px] text-emerald-500 font-medium mt-1 inline-block">GPS Connected</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verified Driven Distance</span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-1">{totalVerifiedKm.toLocaleString()} km</p>
            <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">Audited Transit Paths</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Est. Street Eyeballs</span>
            <p className="text-2xl font-bold text-orange-500 tabular-nums mt-1">{(totalImpressions / 1000).toFixed(0)}k+</p>
            <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">High-Density Corridors</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Media Investment</span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-1">₹{totalSpent.toLocaleString()}</p>
            <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">100% Escrow Protected</span>
          </div>
        </div>

        {/* Campaign Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'Active', 'Pending', 'Approved', 'Completed', 'Rejected'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-orange-500 text-white shadow-xs font-bold'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {status} ({status === 'All' ? myCampaigns.length : myCampaigns.filter(c => c.status === status).length})
            </button>
          ))}
        </div>

        {/* Campaigns Table & List */}
        <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Campaign Bookings & Tracking Logs</h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">Live RTO & GPS Synchronization</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredCampaigns.length === 0 ? (
              <div className="p-12 text-center">
                <Car className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No campaigns found under "{statusFilter}"</p>
                <button
                  onClick={() => setActivePage('campaign-booking')}
                  className="mt-3 px-4 py-2 bg-orange-500 text-white text-xs font-semibold rounded-lg"
                >
                  Book a Campaign
                </button>
              </div>
            ) : (
              filteredCampaigns.map(camp => (
                <div key={camp.id} className="p-5 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={camp.adCreativeUrl}
                      alt={camp.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{camp.title}</span>
                        {getStatusBadge(camp.status)}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Brand: <span className="font-semibold text-slate-700 dark:text-slate-200">{camp.brandName}</span> · Vehicle: <span className="font-semibold text-slate-700 dark:text-slate-200">{camp.vehicleTitle}</span> ({camp.vehicleType})
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                        <span>Format: <strong className="text-slate-700 dark:text-slate-300">{camp.adSpace}</strong></span>
                        <span>·</span>
                        <span>Duration: <strong className="text-slate-700 dark:text-slate-300">{camp.durationDays} Days</strong></span>
                        <span>·</span>
                        <span>Total: <strong className="text-slate-900 dark:text-white font-bold tabular-nums">₹{camp.totalCost.toLocaleString()}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Tracking progress bar & Actions */}
                  <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t lg:border-t-0 border-slate-100 dark:border-slate-800 pt-3 lg:pt-0">
                    <div className="w-full sm:w-48 space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500 dark:text-slate-400">Verified Distance</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                          {camp.tracking.verifiedKm} / {camp.tracking.targetKm} km
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-orange-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, Math.round((camp.tracking.verifiedKm / (camp.tracking.targetKm || 1)) * 100))}%`
                          }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCampaign(camp)}
                      className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      View Details & Audit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Campaign Inspection & GPS Audit Modal */}
        {selectedCampaign && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150 space-y-5">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Audit & Telemetry Dossier</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{selectedCampaign.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Booking ID: {selectedCampaign.id} · Created: {selectedCampaign.createdAt}</p>
                </div>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              </div>

              {/* Status workflow indicators */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Campaign Verification Pipeline</span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className={`p-2 rounded-lg border ${
                    selectedCampaign.ownerApprovalStatus === 'Approved' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>
                    <p className="font-bold">1. Vehicle Owner</p>
                    <p className="text-[11px] mt-0.5">{selectedCampaign.ownerApprovalStatus}</p>
                  </div>
                  <div className={`p-2 rounded-lg border ${
                    selectedCampaign.adminApprovalStatus === 'Approved' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>
                    <p className="font-bold">2. Admin Verification</p>
                    <p className="text-[11px] mt-0.5">{selectedCampaign.adminApprovalStatus}</p>
                  </div>
                  <div className={`p-2 rounded-lg border ${
                    selectedCampaign.status === 'Active' ? 'bg-orange-50 border-orange-200 text-orange-800' :
                    selectedCampaign.status === 'Completed' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}>
                    <p className="font-bold">3. Street Active</p>
                    <p className="text-[11px] mt-0.5">{selectedCampaign.status}</p>
                  </div>
                </div>
              </div>

              {/* Artwork & Vehicle Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-3">
                  <span className="text-xs font-bold text-slate-700 block mb-2">Approved Artwork Design</span>
                  <img
                    src={selectedCampaign.adCreativeUrl}
                    alt="Creative"
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <p className="text-[11px] text-slate-500 mt-2">{selectedCampaign.adCreativeName}</p>
                </div>
                <div className="border border-slate-200 rounded-xl p-3 text-xs space-y-2">
                  <span className="text-xs font-bold text-slate-700 block mb-2">Vehicle Specifications</span>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Fleet:</span>
                    <span className="font-semibold text-slate-800">{selectedCampaign.vehicleTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Partner Driver:</span>
                    <span className="font-semibold text-slate-800">{selectedCampaign.ownerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone Contact:</span>
                    <span className="font-semibold text-slate-800">{selectedCampaign.ownerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Region:</span>
                    <span className="font-semibold text-slate-800">{selectedCampaign.targetCity}</span>
                  </div>
                </div>
              </div>

              {/* Financial Escrow Summary */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Daily Advertising Rate:</span>
                  <span className="font-semibold text-slate-800 tabular-nums">₹{selectedCampaign.dailyRate} /day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Platform Facilitation:</span>
                  <span className="font-semibold text-slate-800 tabular-nums">₹{selectedCampaign.platformFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Escrow Deposited:</span>
                  <span className="font-bold text-slate-900 tabular-nums">₹{selectedCampaign.totalCost}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5">
                  <span className="text-slate-700 font-semibold">Payment Status:</span>
                  <span className="font-bold text-emerald-600">{selectedCampaign.paymentStatus}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

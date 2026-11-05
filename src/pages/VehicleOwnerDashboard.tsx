import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Car, 
  Wallet, 
  Check, 
  X, 
  Clock, 
  Plus, 
  CheckCircle2, 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck,
  CreditCard,
  TrendingUp,
  FileText
} from 'lucide-react';

export const VehicleOwnerDashboard: React.FC = () => {
  const { 
    vehicles, 
    campaigns, 
    currentUser, 
    ownerActionCampaign, 
    setActivePage, 
    payouts, 
    requestPayout 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'requests' | 'active' | 'fleet' | 'earnings'>('requests');
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('10000');
  const [payoutMethod, setPayoutMethod] = useState('UPI Direct');
  const [payoutAccount, setPayoutAccount] = useState('suresh.kumar@okhdfcbank');

  // Filter owner's data
  const myVehicles = vehicles;
  const incomingRequests = campaigns.filter(c => c.ownerApprovalStatus === 'Pending');
  const activeAndApproved = campaigns.filter(c => c.status === 'Active' || c.status === 'Approved');
  
  // Calculate earnings
  const completedEarnings = payouts.filter(p => p.status === 'Completed').reduce((acc, p) => acc + p.amount, 0);
  const escrowPending = campaigns.filter(c => c.status === 'Active').reduce((acc, c) => acc + c.ownerEarnings, 0);

  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestPayout(Number(withdrawAmount), payoutMethod, payoutAccount);
    setShowPayoutModal(false);
  };

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Fleet Partner Portal</span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Vehicle Owner Dashboard</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Logged in as <span className="font-semibold text-slate-800 dark:text-slate-200">{currentUser?.name || 'Suresh Kumar'}</span> · Partner ID #{currentUser?.id || 'user-own-1'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowPayoutModal(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Wallet className="w-4 h-4" />
              <span>Request Payout</span>
            </button>
            <button
              onClick={() => setActivePage('add-vehicle')}
              className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>List New Vehicle</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Lifetime Earnings</span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-1">₹{completedEarnings.toLocaleString()}</p>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 inline-block">Disbursed to Bank</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Earnings in Escrow</span>
            <p className="text-2xl font-bold text-orange-500 tabular-nums mt-1">₹{escrowPending.toLocaleString()}</p>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1 inline-block">Releases on Campaign End</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Registered Vehicles</span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-1">{myVehicles.length}</p>
            <span className="text-[11px] text-sky-600 dark:text-sky-400 font-medium mt-1 inline-block">100% RC Verified</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pending Requests</span>
            <p className="text-2xl font-bold text-amber-500 tabular-nums mt-1">{incomingRequests.length}</p>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1 inline-block">Requires Your Decision</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'requests', label: `Incoming Requests (${incomingRequests.length})` },
            { id: 'active', label: `Active & Approved Campaigns (${activeAndApproved.length})` },
            { id: 'fleet', label: `My Fleet Vehicles (${myVehicles.length})` },
            { id: 'earnings', label: `Earnings & Payout Ledger (${payouts.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Incoming Booking Requests */}
        {activeTab === 'requests' && (
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">New Advertising Booking Requests</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Review creative placements and accept or reject schedules.</p>
              </div>
            </div>

            {incomingRequests.length === 0 ? (
              <div className="p-12 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">All caught up! No pending booking requests.</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Advertisers browse your vehicles in the marketplace to send new requests.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {incomingRequests.map(camp => (
                  <div key={camp.id} className="p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <div className="flex items-start gap-4">
                      <img
                        src={camp.adCreativeUrl}
                        alt="Creative"
                        className="w-20 h-20 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{camp.title}</span>
                          <span className="bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            New Request
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300">
                          Brand: <strong>{camp.brandName}</strong> ({camp.advertiserCompany})
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Requested Vehicle: <strong>{camp.vehicleTitle}</strong> · Format: <strong>{camp.adSpace}</strong>
                        </p>
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 pt-1">
                          <span>Duration: <strong>{camp.durationDays} Days</strong></span>
                          <span>·</span>
                          <span>Your Earnings: <strong className="text-emerald-500 font-bold tabular-nums">₹{camp.ownerEarnings.toLocaleString()}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end border-t border-slate-100 dark:border-slate-800 lg:border-t-0 pt-3 lg:pt-0">
                      <button
                        onClick={() => ownerActionCampaign(camp.id, 'reject')}
                        className="px-4 py-2 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                      <button
                        onClick={() => ownerActionCampaign(camp.id, 'approve')}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept & Forward to Admin</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Active & Approved Campaigns */}
        {activeTab === 'active' && (
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Current Running Campaigns on Your Vehicles</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ensure your vehicle drives regular routes to meet verified GPS milestones.</p>
            </div>

            {activeAndApproved.length === 0 ? (
              <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-xs">
                No active campaigns currently on your vehicles.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {activeAndApproved.map(camp => (
                  <div key={camp.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={camp.adCreativeUrl}
                        alt="Creative"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm">{camp.title}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            camp.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' : 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300'
                          }`}>
                            {camp.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Brand: {camp.brandName} · Format: {camp.adSpace}
                        </p>
                        <p className="text-xs text-emerald-500 font-bold">
                          Pending Payout on Finish: ₹{camp.ownerEarnings.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 w-full md:w-48 text-right">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Verified GPS Progress</span>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                        {camp.tracking.verifiedKm} / {camp.tracking.targetKm} km
                      </p>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mt-1">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min(100, Math.round((camp.tracking.verifiedKm / (camp.tracking.targetKm || 1)) * 100))}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: My Fleet Vehicles */}
        {activeTab === 'fleet' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Registered Vehicles ({myVehicles.length})</h2>
              <button
                onClick={() => setActivePage('add-vehicle')}
                className="px-3.5 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> List Another Vehicle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myVehicles.map(veh => (
                <div key={veh.id} className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 bg-slate-100 dark:bg-slate-800">
                      <img
                        src={veh.image}
                        alt={veh.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                        {veh.vehicleType}
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> RC Approved
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{veh.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Reg: <span className="font-mono text-slate-700 dark:text-slate-300">{veh.regNumber}</span> · {veh.city}</p>
                      
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/60 text-xs flex justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Daily Average</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{veh.dailyAverageKm} km/day</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Earning Rate</span>
                          <span className="font-bold text-emerald-500">₹{veh.dailyRate}/day</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-slate-700 dark:text-slate-300">Corridors: </span>
                        <span>{veh.primaryRoutes.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 mt-2 flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Status: <strong className="text-emerald-500">Available for Ads</strong></span>
                    <button
                      onClick={() => setActivePage('marketplace')}
                      className="text-orange-500 hover:text-orange-600 font-semibold cursor-pointer"
                    >
                      View on Market →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Earnings & Payout Ledger */}
        {activeTab === 'earnings' && (
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Payout Records & UPI Transfers</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">All payments are reconciled through ChhotaBheem - AdOnWheel Escrow clearing.</p>
              </div>
              <button
                onClick={() => setShowPayoutModal(true)}
                className="px-3.5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
              >
                Withdraw Balance
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {payouts.map(pay => (
                <div key={pay.id} className="p-4 flex items-center justify-between hover:bg-slate-50/60 dark:hover:bg-slate-800/40 text-xs">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{pay.campaignTitle}</p>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">Method: {pay.paymentMethod} · {pay.accountOrUpi}</p>
                    <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500">Ref: {pay.transactionRef}</p>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-emerald-500 tabular-nums">+₹{pay.amount.toLocaleString()}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      pay.status === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' :
                      pay.status === 'Processing' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {pay.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Withdrawal Modal */}
        {showPayoutModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Request Earnings Withdrawal</h3>
                <button onClick={() => setShowPayoutModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">✕</button>
              </div>

              <form onSubmit={handlePayoutSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Withdrawal Amount (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
                  />
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Available balance in completed escrow: ₹18,360</p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Payout Channel</label>
                  <select
                    value={payoutMethod}
                    onChange={e => setPayoutMethod(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="UPI Direct">UPI Direct (Google Pay / PhonePe / Paytm)</option>
                    <option value="NEFT Bank Transfer">NEFT / IMPS Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">UPI ID or Bank Account Details</label>
                  <input
                    type="text"
                    required
                    value={payoutAccount}
                    onChange={e => setPayoutAccount(e.target.value)}
                    placeholder="E.g. yourname@okhdfcbank"
                    className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPayoutModal(false)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                  >
                    Confirm Payout
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

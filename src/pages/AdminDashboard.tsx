import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Users, 
  Car, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  RefreshCw,
  Search,
  Eye,
  Sliders,
  DollarSign,
  Layers,
  Sparkles
} from 'lucide-react';
import { Campaign, Vehicle, Complaint } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    vehicles, 
    campaigns, 
    users, 
    complaints, 
    verifyVehicle, 
    adminActionCampaign, 
    resolveComplaint,
    resetToDefaultData,
    currentUser
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'vehicles' | 'users' | 'complaints'>('overview');
  const [complaintNote, setComplaintNote] = useState('');
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);

  // Statistics
  const totalAdvertisers = users.filter(u => u.role === 'advertiser').length;
  const totalOwners = users.filter(u => u.role === 'owner').length;
  const totalVehiclesCount = vehicles.length;
  const totalCampaignsCount = campaigns.length;
  const activeCampaignsCount = campaigns.filter(c => c.status === 'Active').length;
  const pendingApprovalsCount = campaigns.filter(c => c.adminApprovalStatus === 'Pending' || c.status === 'Pending').length;
  const totalPlatformGross = campaigns.reduce((acc, c) => acc + (c.paymentStatus !== 'Refunded' ? c.totalCost : 0), 0);
  const totalPlatformCommission = Math.round(totalPlatformGross * 0.1);

  const pendingVehicles = vehicles.filter(v => v.verificationStatus === 'pending');
  const pendingCampaigns = campaigns.filter(c => c.adminApprovalStatus === 'Pending' || c.status === 'Pending');

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Super Administrator Portal</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-900 dark:bg-orange-500 text-white text-[10px] font-bold">SYSTEM ACTIVE</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Platform Command & Governance</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Logged in as <span className="font-semibold text-slate-800 dark:text-slate-200">{currentUser?.name || 'Priya Nair'}</span> (Admin HQ)
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={resetToDefaultData}
              className="px-3.5 py-2 bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Reset Demo Seed Data</span>
            </button>
          </div>
        </div>

        {/* Executive Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Total Users</span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">{users.length}</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">{totalAdvertisers} Adv · {totalOwners} Owners</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Total Fleets</span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">{totalVehiclesCount}</p>
            <span className="text-[10px] text-emerald-500">{vehicles.filter(v => v.verificationStatus === 'verified').length} Verified</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Active Transit Ads</span>
            <p className="text-2xl font-bold text-orange-500 tabular-nums mt-0.5">{activeCampaignsCount}</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Live GPS Stream</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Action Pending</span>
            <p className="text-2xl font-bold text-amber-500 tabular-nums mt-0.5">{pendingApprovalsCount + pendingVehicles.length}</p>
            <span className="text-[10px] text-amber-500">Needs Review</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Gross Escrow Vol</span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">₹{(totalPlatformGross / 1000).toFixed(1)}k</p>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">100% Protected</span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Net Take (10%)</span>
            <p className="text-2xl font-bold text-emerald-500 tabular-nums mt-0.5">₹{(totalPlatformCommission / 1000).toFixed(1)}k</p>
            <span className="text-[10px] text-emerald-500">Platform Revenue</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Dashboard & Quick Approvals' },
            { id: 'campaigns', label: `Manage Campaigns (${campaigns.length})` },
            { id: 'vehicles', label: `Verify Vehicles (${vehicles.length})` },
            { id: 'users', label: `User Accounts (${users.length})` },
            { id: 'complaints', label: `Support Tickets (${complaints.length})` }
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

        {/* TAB 1: OVERVIEW & QUICK APPROVALS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Urgent Review Queue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Campaign verification queue */}
              <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Campaigns Awaiting Admin Verification</h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                    {pendingCampaigns.length} Pending
                  </span>
                </div>

                {pendingCampaigns.length === 0 ? (
                  <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-6">No campaigns awaiting admin approval.</p>
                ) : (
                  <div className="space-y-3">
                    {pendingCampaigns.map(camp => (
                      <div key={camp.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold text-xs text-slate-900 dark:text-white">{camp.title}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">Brand: {camp.brandName} · Format: {camp.adSpace}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">Vehicle: {camp.vehicleTitle}</p>
                          </div>
                          <span className="font-bold text-xs text-slate-900 dark:text-white tabular-nums">₹{camp.totalCost}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            Owner status: <strong className={camp.ownerApprovalStatus === 'Approved' ? 'text-emerald-500' : 'text-amber-500'}>{camp.ownerApprovalStatus}</strong>
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => adminActionCampaign(camp.id, 'reject')}
                              className="px-2.5 py-1 text-[11px] font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-md hover:bg-rose-100 dark:hover:bg-rose-900/50 cursor-pointer"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => adminActionCampaign(camp.id, 'approve')}
                              className="px-3 py-1 text-[11px] font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 cursor-pointer"
                            >
                              Approve Design
                            </button>
                            <button
                              onClick={() => adminActionCampaign(camp.id, 'activate')}
                              className="px-3 py-1 text-[11px] font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 cursor-pointer"
                            >
                              Activate on Street
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Vehicle Document Verification Queue */}
              <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Vehicle RTO Documents Inspection</h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                    {pendingVehicles.length} Pending
                  </span>
                </div>

                {pendingVehicles.length === 0 ? (
                  <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-6">All registered vehicles are fully verified.</p>
                ) : (
                  <div className="space-y-3">
                    {pendingVehicles.map(veh => (
                      <div key={veh.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold text-xs text-slate-900 dark:text-white">{veh.title}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">{veh.makeModel} · Reg #{veh.regNumber} ({veh.city})</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">Owner: {veh.ownerName}</p>
                          </div>
                          <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded">
                            Pending RC Check
                          </span>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                          <button
                            onClick={() => verifyVehicle(veh.id, 'rejected')}
                            className="px-2.5 py-1 text-[11px] font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-md cursor-pointer"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => verifyVehicle(veh.id, 'verified')}
                            className="px-3.5 py-1 text-[11px] font-semibold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 cursor-pointer"
                          >
                            Verify & Authorize
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE ALL CAMPAIGNS */}
        {activeTab === 'campaigns' && (
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">All Campaigns Lifecycle Control</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Directly activate GPS, approve creatives, or disburse completed funds.</p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {campaigns.map(camp => (
                <div key={camp.id} className="p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <div className="flex items-start gap-3">
                    <img
                      src={camp.adCreativeUrl}
                      alt={camp.title}
                      className="w-14 h-14 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{camp.title}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          camp.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' :
                          camp.status === 'Pending' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' :
                          camp.status === 'Approved' ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' :
                          camp.status === 'Completed' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                        }`}>
                          {camp.status}
                        </span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400">
                        Brand: <strong className="text-slate-800 dark:text-slate-200">{camp.brandName}</strong> · Vehicle: {camp.vehicleTitle} ({camp.vehicleType})
                      </p>
                      <p className="text-slate-500 dark:text-slate-400">
                        Escrow: ₹{camp.totalCost} · Owner Take: ₹{camp.ownerEarnings} · Fee: ₹{camp.platformFee}
                      </p>
                    </div>
                  </div>

                  {/* Lifecycle action buttons for admin */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {camp.status !== 'Approved' && camp.status !== 'Active' && camp.status !== 'Completed' && (
                      <button
                        onClick={() => adminActionCampaign(camp.id, 'approve')}
                        className="px-2.5 py-1 text-xs bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 cursor-pointer"
                      >
                        Approve
                      </button>
                    )}
                    {camp.status !== 'Active' && camp.status !== 'Completed' && (
                      <button
                        onClick={() => adminActionCampaign(camp.id, 'activate')}
                        className="px-2.5 py-1 text-xs bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 cursor-pointer"
                      >
                        Activate Campaign
                      </button>
                    )}
                    {camp.status === 'Active' && (
                      <button
                        onClick={() => adminActionCampaign(camp.id, 'complete')}
                        className="px-2.5 py-1 text-xs bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 cursor-pointer"
                      >
                        Mark Completed & Disburse
                      </button>
                    )}
                    {camp.status !== 'Rejected' && camp.status !== 'Completed' && (
                      <button
                        onClick={() => adminActionCampaign(camp.id, 'reject')}
                        className="px-2.5 py-1 text-xs bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 font-semibold rounded-md hover:bg-rose-100 cursor-pointer"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: VERIFY VEHICLES */}
        {activeTab === 'vehicles' && (
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Vehicle Inventory Verification</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Validate commercial permits, fitness certificates, and insurance coverage.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {vehicles.map(v => (
                <div key={v.id} className="p-4 flex items-center justify-between hover:bg-slate-50/70 dark:hover:bg-slate-800/40 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={v.image} alt={v.title} className="w-14 h-12 object-cover rounded-lg border border-slate-200 dark:border-slate-700" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{v.title}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.verificationStatus === 'verified' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' :
                          v.verificationStatus === 'pending' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                        }`}>
                          {v.verificationStatus.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">Reg #{v.regNumber} · Owner: {v.ownerName} · {v.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {v.verificationStatus !== 'verified' && (
                      <button
                        onClick={() => verifyVehicle(v.id, 'verified')}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-md font-semibold text-xs cursor-pointer hover:bg-emerald-700"
                      >
                        Approve RC
                      </button>
                    )}
                    {v.verificationStatus !== 'rejected' && (
                      <button
                        onClick={() => verifyVehicle(v.id, 'rejected')}
                        className="px-3 py-1 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900 rounded-md font-semibold text-xs cursor-pointer"
                      >
                        Revoke / Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: USER ACCOUNTS */}
        {activeTab === 'users' && (
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Platform Registered Accounts</h2>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map(u => (
                <div key={u.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-900 dark:bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{u.name} ({u.company || u.city})</p>
                      <p className="text-slate-500 dark:text-slate-400">{u.email} · {u.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold uppercase text-[10px]">
                      {u.role}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COMPLAINTS & TICKETS */}
        {activeTab === 'complaints' && (
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs space-y-4 p-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Grievance & Support Tickets</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Review feedback and complaints submitted by advertisers or vehicle owners.</p>
            </div>

            <div className="space-y-4">
              {complaints.map(comp => (
                <div key={comp.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{comp.subject}</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">By {comp.userName} ({comp.userRole.toUpperCase()}) · Filed {comp.createdAt}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      comp.status === 'Resolved' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                    }`}>
                      {comp.status}
                    </span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">{comp.message}</p>

                  {comp.resolutionNotes && (
                    <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900 text-emerald-900 dark:text-emerald-300">
                      <strong>Resolution Note:</strong> {comp.resolutionNotes}
                    </div>
                  )}

                  {comp.status !== 'Resolved' && (
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type resolution remarks..."
                        value={selectedComplaintId === comp.id ? complaintNote : ''}
                        onChange={e => {
                          setSelectedComplaintId(comp.id);
                          setComplaintNote(e.target.value);
                        }}
                        className="flex-1 py-1.5 px-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                      />
                      <button
                        onClick={() => {
                          resolveComplaint(comp.id, complaintNote || 'Addressed and resolved by platform admin.');
                          setComplaintNote('');
                          setSelectedComplaintId(null);
                        }}
                        className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold text-xs hover:bg-emerald-700 cursor-pointer"
                      >
                        Resolve Ticket
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

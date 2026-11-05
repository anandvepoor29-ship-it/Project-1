import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CreditCard, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  DollarSign, 
  FileText,
  Wallet,
  AlertCircle,
  X
} from 'lucide-react';
import { PayoutRecord } from '../types';

export const PaymentManagement: React.FC = () => {
  const { payouts, campaigns, currentUser, requestPayout } = useApp();

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('12500');
  const [selectedReceipt, setSelectedReceipt] = useState<PayoutRecord | null>(null);

  // Escrow metrics
  const totalHeldInEscrow = campaigns.filter(c => c.paymentStatus === 'In Escrow' || c.status === 'Active').reduce((acc, c) => acc + c.totalCost, 0);
  const totalDisbursed = payouts.filter(p => p.status === 'Completed').reduce((acc, p) => acc + p.amount, 0);
  const totalProcessing = payouts.filter(p => p.status === 'Processing').reduce((acc, p) => acc + p.amount, 0);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    requestPayout(Number(withdrawAmount), 'UPI Direct', 'partner.pay@okhdfc');
    setShowWithdrawModal(false);
  };

  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Financial Treasury & Clearing</span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">Payment Management & Escrow</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Transparent escrow-backed fund holding ensures fair payments for both advertisers and vehicle owners.
            </p>
          </div>

          <button
            onClick={() => setShowWithdrawModal(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Wallet className="w-4 h-4" />
            <span>Request Payout</span>
          </button>
        </div>

        {/* Escrow Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Secured in Escrow</span>
              <ShieldCheck className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">₹{totalHeldInEscrow.toLocaleString()}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Releases upon GPS km milestone verification</p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Lifetime Disbursed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-emerald-500 tabular-nums">₹{totalDisbursed.toLocaleString()}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Transferred directly to verified owner UPI / NEFT</p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Processing Clearances</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-amber-500 tabular-nums">₹{totalProcessing.toLocaleString()}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Bank automated clearing window (24h)</p>
          </div>
        </div>

        {/* Security Mechanism Explainer */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>How ChhotaBheem - AdOnWheel Escrow Protects Your Capital</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When an advertiser books a vehicle, 100% of the funds are deposited in an isolated trust account. The driver is paid upon successful completion of daily route distance. If a vehicle breaks down or is taken off-road, the advertiser receives an immediate prorated refund.
            </p>
          </div>
          <div className="bg-slate-800/90 px-4 py-3 rounded-xl border border-slate-700 text-xs shrink-0 space-y-1">
            <p className="text-slate-400">Platform Facilitation Rate</p>
            <p className="text-base font-bold text-orange-400">Flat 10% on Booking</p>
            <p className="text-[10px] text-slate-400">Covers 3M application & RTO check</p>
          </div>
        </div>

        {/* Ledger & Transactions Table */}
        <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Transaction & Settlement History</h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Reconciled Live</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {payouts.map(record => (
              <div key={record.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{record.campaignTitle}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      record.status === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' :
                      record.status === 'Processing' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {record.status}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">
                    Beneficiary: <strong className="text-slate-800 dark:text-slate-200">{record.ownerName}</strong> · Account: {record.accountOrUpi} ({record.paymentMethod})
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                    Ref ID: {record.transactionRef} · Date: {record.date}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
                    ₹{record.amount.toLocaleString()}
                  </span>
                  <button
                    onClick={() => setSelectedReceipt(record)}
                    className="p-2 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    title="Download Receipt"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Printable/Viewable Escrow Receipt Modal */}
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in duration-150">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">ChhotaBheem - AdOnWheel Official Settlement</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">Electronic Payment Voucher</h3>
                </div>
                <button onClick={() => setSelectedReceipt(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Voucher Reference:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedReceipt.transactionRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Settlement Date:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedReceipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Payee Partner:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedReceipt.ownerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Transfer Mode:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{selectedReceipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Target Account / VPA:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">{selectedReceipt.accountOrUpi}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-bold text-sm">
                  <span className="text-slate-900 dark:text-white">Disbursed Amount:</span>
                  <span className="text-emerald-500 tabular-nums">₹{selectedReceipt.amount.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
                This transaction was processed and verified by ChhotaBheem - AdOnWheel Escrow Services with 256-bit TLS encryption.
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedReceipt(null);
                  }}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Save / Print Voucher
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Withdrawal Modal */}
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Instant Escrow Release Request</h3>
                <button onClick={() => setShowWithdrawModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">✕</button>
              </div>

              <form onSubmit={handleWithdraw} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Amount to Transfer (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowWithdrawModal(false)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 cursor-pointer"
                  >
                    Authorize Transfer
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

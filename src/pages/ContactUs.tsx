import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const { addComplaint, currentUser } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Brand Campaign Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    addComplaint(`${category}: ${subject}`, message);
    setIsSubmitted(true);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Fleet Support & Corporate Sales</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Get in Touch with ChhotaBheem - AdOnWheel</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Have questions about fleet wrapping, campaign flight dates, RTO compliance, or becoming a multi-city fleet partner? Our team responds within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                Regional Hubs & Support
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Bengaluru Headquarters</strong>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">Brigade Towers, MG Road, Ashok Nagar, Bengaluru 560001</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Mumbai Operations Hub</strong>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">BKC Express Pavilion, Bandra Kurla Complex, Mumbai 400051</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Toll-Free Fleet Partner Helpline</strong>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">+91 (080) 4120-9433 / +91 98765-WHEEL</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Direct Email Support</strong>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">support@adonwheel.com · partner@adonwheel.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 text-xs space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-orange-400 font-bold">
                <Clock className="w-4 h-4" />
                <span>Operating Hours</span>
              </div>
              <p className="text-slate-300">
                Monday to Saturday: 8:00 AM – 9:00 PM IST<br />
                Sunday: Emergency On-Road Hotline Open 24/7
              </p>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Dispatched Successfully!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Your ticket has been logged into the ChhotaBheem - AdOnWheel Admin Support Console. A fleet representative will contact you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white text-xs font-semibold rounded-lg hover:bg-orange-600 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                  Send a Direct Inquiry or Ticket
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="E.g. Rohit Sharma"
                      className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Inquiry Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Brand Campaign Inquiry">Brand Campaign Inquiry (Advertiser)</option>
                    <option value="Fleet Partner Enrollment">Fleet Partner Enrollment (Vehicle Owner)</option>
                    <option value="3M Vinyl Installation Query">3M Vinyl Installation Center Slotting</option>
                    <option value="GPS Telemetry Audit">GPS Telemetry / Mileage Audit Question</option>
                    <option value="Escrow & Payout Clearance">Escrow & Payout Clearance Inquiry</option>
                    <option value="General Support">General Support / Diploma Project Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Subject Line</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="Brief summary of your inquiry..."
                    className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Detailed Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Please specify target routes, fleet size, or details..."
                    className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry to Fleet Operations</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

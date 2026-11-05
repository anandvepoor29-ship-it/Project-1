import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { CampaignBooking } from './pages/CampaignBooking';
import { AdvertiserDashboard } from './pages/AdvertiserDashboard';
import { VehicleOwnerDashboard } from './pages/VehicleOwnerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AddVehicle } from './pages/AddVehicle';
import { CreateAd } from './pages/CreateAd';
import { HowItWorks } from './pages/HowItWorks';
import { AboutUs } from './pages/AboutUs';
import { PaymentManagement } from './pages/PaymentManagement';
import { ContactUs } from './pages/ContactUs';
import { AuthPage } from './pages/AuthPage';
import { RoleSelectModal } from './components/RoleSelectModal';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activePage, notification, theme, isRoleModalOpen, closeRoleModal } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'marketplace':
        return <Marketplace />;
      case 'campaign-booking':
        return <CampaignBooking />;
      case 'advertiser-dashboard':
        return <AdvertiserDashboard />;
      case 'owner-dashboard':
        return <VehicleOwnerDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'add-vehicle':
        return <AddVehicle />;
      case 'create-ad':
        return <CreateAd />;
      case 'how-it-works':
        return <HowItWorks />;
      case 'about':
        return <AboutUs />;
      case 'payments':
        return <PaymentManagement />;
      case 'contact':
        return <ContactUs />;
      case 'login':
        return <AuthPage initialMode="login" />;
      case 'register':
        return <AuthPage initialMode="register" />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-orange-500 selection:text-white transition-colors duration-200 ${
      theme === 'dark' ? 'bg-ambient-dark text-slate-100' : 'bg-ambient-light text-slate-900'
    }`}>
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className={`p-4 rounded-xl shadow-xl border flex items-start gap-3 ${
            notification.type === 'error'
              ? 'bg-rose-900 text-white border-rose-800'
              : notification.type === 'info'
              ? 'bg-slate-900 text-white border-slate-800'
              : 'bg-emerald-900 text-white border-emerald-800'
          }`}>
            {notification.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : notification.type === 'info' ? (
              <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs">
              <p className="font-semibold">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar />

      {/* Dynamic Viewport */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Role Selection Prompt Modal */}
      <RoleSelectModal isOpen={isRoleModalOpen} onClose={closeRoleModal} />

      {/* Professional Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

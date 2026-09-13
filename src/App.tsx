import React, { useState } from 'react';
import { PharmacyProvider, usePharmacy } from './context/PharmacyContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroBanner } from './components/customer/HeroBanner';
import { ProductCatalog } from './components/customer/ProductCatalog';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { HealthHub } from './components/customer/HealthHub';
import { ProductDetailModal } from './components/customer/ProductDetailModal';
import { PrescriptionUploadModal } from './components/customer/PrescriptionUploadModal';
import { CartDrawer } from './components/customer/CartDrawer';
import { StaffPortal } from './components/staff/StaffPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProjectReportView } from './components/report/ProjectReportView';
import { WelcomePage } from './components/welcome/WelcomePage';
import { 
  ShoppingBag, 
  User, 
  Heart, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  Phone
} from 'lucide-react';

const PharmacyAppContent: React.FC = () => {
  const { currentTab, setCurrentTab } = usePharmacy();
  const [customerView, setCustomerView] = useState<'catalog' | 'dashboard' | 'hub'>('catalog');

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation Header */}
      <Header />

      {/* Main Content Viewport */}
      <main className={`flex-1 w-full ${currentTab === 'welcome' ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8'}`}>
        
        {/* TAB 0: WELCOME & ONBOARDING PORTAL */}
        {currentTab === 'welcome' && <WelcomePage />}

        {/* TAB 1: CUSTOMER STOREFRONT */}
        {currentTab === 'customer' && (
          <div className="space-y-8">
            
            {/* Customer Sub-Nav: Store Catalog vs My Orders vs Knowledge Hub */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCustomerView('catalog')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                    customerView === 'catalog'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Medicine Store</span>
                </button>

                <button
                  onClick={() => setCustomerView('dashboard')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                    customerView === 'dashboard'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Account & Orders</span>
                </button>

                <button
                  onClick={() => setCustomerView('hub')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                    customerView === 'hub'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Health Hub & Dosage Tool</span>
                </button>
              </div>

              {/* Kurunegala Delivery Status Pill */}
              <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-2xl border border-emerald-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Kurunegala Central Hub Active • Same-Day Delivery Ready</span>
              </div>
            </div>

            {/* Sub-view Content */}
            {customerView === 'catalog' && (
              <div className="space-y-8">
                <HeroBanner />
                <ProductCatalog />
              </div>
            )}

            {customerView === 'dashboard' && <CustomerDashboard />}

            {customerView === 'hub' && <HealthHub />}

          </div>
        )}

        {/* TAB 2: STAFF PORTAL */}
        {currentTab === 'staff' && <StaffPortal />}

        {/* TAB 3: ADMINISTRATOR DASHBOARD */}
        {currentTab === 'admin' && <AdminDashboard />}

        {/* TAB 4: SYSTEM DOCUMENTATION REPORT & SITE MAP */}
        {currentTab === 'report' && <ProjectReportView />}

      </main>

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <PrescriptionUploadModal />
      <CartDrawer />

      {/* Application Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <PharmacyProvider>
      <PharmacyAppContent />
    </PharmacyProvider>
  );
}

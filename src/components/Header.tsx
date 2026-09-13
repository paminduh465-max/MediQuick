import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  ShoppingBag, 
  FileText, 
  ShieldAlert, 
  Bell, 
  UploadCloud, 
  MapPin, 
  PhoneCall, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  BookOpen,
  UserCheck,
  Building2,
  Clock,
  User,
  LogOut,
  Github,
  ExternalLink,
  HeartPulse,
  ChevronDown
} from 'lucide-react';
import { usePharmacy, MainNavTab } from '../context/PharmacyContext';

export const Header: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    currentUser,
    logout,
    cartItemCount,
    setIsCartOpen,
    setIsUploadRxOpen,
    unreadCount,
    notifications,
    markNotificationAsRead,
    resetAllData
  } = usePharmacy();

  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
      
      {/* ========================================================= */}
      {/* 1. TOP BLACK BAR (EXACT MATCH FROM USER'S SCREENSHOT)     */}
      {/* ========================================================= */}
      <div className="bg-[#181818] text-[#E5E7EB] text-xs px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-black">
        <div className="font-normal tracking-wide text-xs">
          MediQuick Pharmacy, Kurunegala, Sri Lanka
        </div>
        
        <div className="flex items-center flex-wrap gap-2 text-xs font-normal text-[#E5E7EB]">
          <a 
            href="tel:1990" 
            className="hover:text-white transition-colors"
          >
            Emergency Hotline: 1990 (Suwa Seriya)
          </a>

          <span className="text-slate-500 mx-1">|</span>

          <a 
            href="tel:+94372221000" 
            className="hover:text-white transition-colors"
          >
            Pharmacy: +94 37 222 1000
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN NAVBAR (EXACT MATCH FROM USER'S SCREENSHOT)       */}
      {/* ========================================================= */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo: "MediQuick" in pure green sans-serif text (no icon box) */}
          <div 
            onClick={() => setCurrentTab('advice')}
            className="cursor-pointer select-none"
            title="MediQuick"
          >
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#187265] hover:opacity-90 transition-opacity">
              MediQuick
            </span>
          </div>

          {/* Screenshot Format Navigation Links */}
          <nav className="flex items-center flex-wrap gap-2 sm:gap-4 md:gap-6 text-sm font-normal text-slate-700">
            <button
              onClick={() => setCurrentTab('welcome')}
              className={`py-1.5 px-2.5 rounded transition-colors ${
                currentTab === 'welcome' ? 'text-[#187265] font-semibold' : 'hover:text-[#187265]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setCurrentTab('report')}
              className={`py-1.5 px-2.5 rounded transition-colors ${
                currentTab === 'report' ? 'text-[#187265] font-semibold' : 'hover:text-[#187265]'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => setCurrentTab('customer')}
              className={`py-1.5 px-2.5 rounded transition-colors ${
                currentTab === 'customer' ? 'text-[#187265] font-semibold' : 'hover:text-[#187265]'
              }`}
            >
              Shop and Order
            </button>

            <button
              onClick={() => setIsUploadRxOpen(true)}
              className="py-1.5 px-2.5 rounded hover:text-[#187265] transition-colors"
            >
              Contact Us
            </button>

            <button
              onClick={() => setCurrentTab('customer')}
              className="py-1.5 px-2.5 rounded hover:text-[#187265] transition-colors"
            >
              My Account
            </button>

            {/* Medical Advice - with subtle border box matching the screenshot */}
            <button
              onClick={() => setCurrentTab('advice')}
              className={`py-1.5 px-3 rounded-md border transition-all ${
                currentTab === 'advice'
                  ? 'border-slate-300 text-slate-800 bg-slate-50/80 font-medium'
                  : 'border-transparent hover:border-slate-300 text-slate-700'
              }`}
            >
              Medical Advice
            </button>

            {/* Subtle Cart Indicator for functionality */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 ml-1 text-slate-600 hover:text-[#187265] transition-colors"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-[#187265] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};

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
  ExternalLink
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
    searchQuery,
    setSearchQuery,
    prescriptions,
    resetAllData
  } = usePharmacy();

  const [showNotifs, setShowNotifs] = useState(false);
  const pendingRxCount = prescriptions.filter(p => p.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Notification Announcement Bar */}
      <div className="bg-emerald-800 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium bg-emerald-700/70 px-2 py-0.5 rounded text-[11px]">
            <MapPin className="w-3 h-3 text-emerald-300" /> Kurunegala, Wayamba Province
          </span>
          <span className="hidden sm:inline text-emerald-100 flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-300" /> Express 2-4 Hr Delivery within Kurunegala Municipal Limits
          </span>
        </div>
        <div className="flex items-center gap-3 text-emerald-100 text-[11px]">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> NMRA / SLFDA Compliant
          </span>
          <a 
            href="https://paminduh465-max.github.io/MediQuick/" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Open Live GitHub Pages Deployment"
            className="hidden md:inline-flex items-center gap-1 bg-emerald-700/80 hover:bg-emerald-600/90 text-white px-2 py-0.5 rounded transition-colors font-medium"
          >
            <Github className="w-3 h-3 text-emerald-200" />
            <span>GitHub Pages Live</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>
          <a 
            href="https://github.com/paminduh465-max/MediQuick" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Open GitHub Source Repository"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Github className="w-3 h-3 text-emerald-300" />
            <span className="hidden sm:inline">Repo</span>
          </a>
          <a href="tel:+94372224589" className="hover:text-white transition-colors flex items-center gap-1">
            <PhoneCall className="w-3 h-3 text-emerald-300" /> +94 37 222 4589
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setCurrentTab('welcome')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Medi<span className="text-emerald-600">Quick</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                  Pharmacy
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">
                Kurunegala • Est. 2026
              </p>
            </div>
          </div>

          {/* Search Bar (primarily visible on customer view) */}
          <div className="flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-medicines-input"
                type="text"
                placeholder="Search medicines (e.g. Paracetamol, Amoxicillin, Ventolin, Samahan)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentTab !== 'customer') setCurrentTab('customer');
                }}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prescription Upload Quick Button */}
            <button
              id="upload-rx-quick-btn"
              onClick={() => setIsUploadRxOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl transition-colors shadow-xs"
            >
              <UploadCloud className="w-4 h-4 text-emerald-600" />
              <span>Upload Rx</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                id="header-notification-btn"
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Live System Notifications ({unreadCount})
                    </span>
                    <button
                      onClick={() => {
                        notifications.forEach(n => markNotificationAsRead(n.id));
                      }}
                      className="text-[11px] text-emerald-600 hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 mt-2">
                    {notifications.slice(0, 5).map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-2.5 rounded-lg text-xs cursor-pointer hover:bg-slate-50 transition-colors ${n.read ? 'opacity-70' : 'bg-emerald-50/50'}`}
                      >
                        <div className="flex items-center justify-between font-semibold text-slate-800">
                          <span>{n.title}</span>
                          <span className="text-[10px] font-normal text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-600 mt-1">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-500 text-slate-950 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Session Pill or Sign In Trigger */}
            {currentUser ? (
              <div className="flex items-center gap-1 sm:pl-2 sm:border-l sm:border-slate-200">
                <div 
                  onClick={() => setCurrentTab('welcome')}
                  className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl cursor-pointer transition-colors"
                  title="Signed in - Click to manage account"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-800 leading-none truncate max-w-[100px]">
                      {currentUser.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-slate-500 capitalize">{currentUser.role}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentTab('welcome')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors shadow-2xs"
              >
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">Sign In / Register</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Module Navigation Tabs */}
        <div className="flex items-center justify-between border-t border-slate-100 py-1.5 overflow-x-auto scrollbar-none">
          <nav className="flex items-center gap-1 sm:gap-2 min-w-max">
            <button
              id="tab-welcome-overview"
              onClick={() => setCurrentTab('welcome')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'welcome'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Welcome & Overview</span>
            </button>

            <button
              id="tab-customer-store"
              onClick={() => setCurrentTab('customer')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'customer'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>Customer Portal & Store</span>
            </button>

            <button
              id="tab-pharmacist-portal"
              onClick={() => setCurrentTab('staff')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                currentTab === 'staff'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Pharmacy Staff Portal</span>
              {pendingRxCount > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px] font-bold">
                  {pendingRxCount} Rx
                </span>
              )}
            </button>

            <button
              id="tab-admin-operations"
              onClick={() => setCurrentTab('admin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'admin'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Admin & Compliance</span>
            </button>

            <button
              id="tab-academic-report"
              onClick={() => setCurrentTab('report')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'report'
                  ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 shadow-2xs font-bold'
                  : 'text-indigo-700 bg-indigo-50/50 hover:bg-indigo-100/70'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Academic Report & Site Map</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-indigo-200 text-indigo-800 rounded">
                Assessment
              </span>
            </button>
          </nav>

          <button
            onClick={resetAllData}
            title="Reset sample data to initial state"
            className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-700 px-2 py-1 rounded hover:bg-slate-100 transition-colors ml-4"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </header>
  );
};

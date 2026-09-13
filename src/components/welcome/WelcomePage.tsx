import React, { useState } from 'react';
import { 
  Pill, 
  ShieldCheck, 
  Truck, 
  Clock, 
  User, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Building2, 
  Sparkles, 
  LogIn, 
  UserPlus, 
  Calculator, 
  ThermometerSnowflake, 
  HeartPulse, 
  LogOut, 
  BadgeCheck, 
  Award,
  ChevronRight,
  BookOpen,
  UserCheck,
  ShoppingBag
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';
import { UserRole } from '../../types';

export const WelcomePage: React.FC = () => {
  const { 
    currentUser, 
    login, 
    signup, 
    logout, 
    setCurrentTab, 
    products, 
    prescriptions,
    staffList
  } = usePharmacy();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<UserRole>('customer');
  const [loginError, setLoginError] = useState('');

  // Sign up form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('+94 77 ');
  const [signupRole, setSignupRole] = useState<UserRole>('customer');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupAddress, setSignupAddress] = useState('Kurunegala Town');
  const [signupSlmc, setSignupSlmc] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [signupError, setSignupError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim()) {
      setLoginError('Please enter your email or username.');
      return;
    }
    login(loginEmail, loginRole);
  };

  const handleQuickDemoLogin = (email: string, role: UserRole, name: string) => {
    login(email, role, name);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setSignupError('Please fill in all mandatory fields.');
      return;
    }
    if (!agreeTerms) {
      setSignupError('You must agree to NMRA safe drug dispensing terms.');
      return;
    }
    if (signupRole === 'pharmacist' && !signupSlmc.trim()) {
      setSignupError('SLMC Registration Number is required for licensed pharmacist accounts.');
      return;
    }

    signup({
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      role: signupRole,
      address: signupAddress,
      slmcLicense: signupRole === 'pharmacist' ? signupSlmc : undefined
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Top Welcome Announcement */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white text-xs py-2 px-4 border-b border-emerald-700/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-700/80 px-2 py-0.5 rounded font-semibold text-emerald-200 uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3 text-emerald-300" /> NMRA Certified
            </span>
            <span>Serving Kurunegala & North Western Province with 24/7 Digital Healthcare</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200">
            <span className="flex items-center gap-1">
              <ThermometerSnowflake className="w-3 h-3 text-cyan-300" /> Cold-Chain Verified
            </span>
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-emerald-300" /> Express 2-4 Hr Kurunegala Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Hero & Auth Hub Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Welcome & Overview Highlights */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                <span>MediQuick Pharmacy Kurunegala • License # NMRA-KU-2026-0891</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Modern Healthcare & <span className="text-emerald-700">Digital Pharmacy</span> for Kurunegala
              </h1>

              <p className="text-base text-slate-600 leading-relaxed">
                Welcome to MediQuick Pharmacy — Sri Lanka’s comprehensive digital pharmacy platform. We combine rapid local doorstep medicine delivery with verified doctor prescription review, cold-chain pharmaceutical safety, and SLMC-licensed pharmacist guidance.
              </p>

              {/* Key Trust Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">NMRA Compliant</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Strict scheduled medicine validation & tamper-proof seals</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-2">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Kurunegala Express</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">2-4 hour rapid dispatch across municipal limits & suburbs</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">SLMC Pharmacists</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">On-staff B.Pharm clinical review for every prescription</p>
                </div>
              </div>

              {/* Quick Jump Action Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setCurrentTab('customer')}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Browse Medicine Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setCurrentTab('report')}
                  className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>System Architecture & Report</span>
                </button>
              </div>

              {/* Live Status Ticker */}
              <div className="flex items-center gap-6 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold text-slate-700">{products.length} Products</span> in active inventory
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  <span className="font-semibold text-slate-700">{staffList.length} Licensed Pharmacists</span> on duty
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="font-semibold text-slate-700">{prescriptions.length} Prescriptions</span> processed
                </div>
              </div>

            </div>

            {/* Right Column: Sign Up / Login Hub */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                
                {/* If already logged in */}
                {currentUser ? (
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Active Session
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 mt-1">
                          Welcome, {currentUser.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Signed in as <span className="font-semibold capitalize text-slate-700">{currentUser.role}</span>
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-md">
                        {currentUser.name.charAt(0)}
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Email:</span>
                        <span className="font-medium text-slate-800">{currentUser.email}</span>
                      </div>
                      {currentUser.phone && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Phone:</span>
                          <span className="font-medium text-slate-800">{currentUser.phone}</span>
                        </div>
                      )}
                      {currentUser.slmcLicense && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">SLMC License:</span>
                          <span className="font-bold text-teal-700">{currentUser.slmcLicense}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-500">Default Area:</span>
                        <span className="font-medium text-slate-800">{currentUser.address || 'Kurunegala'}</span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <button
                        onClick={() => {
                          if (currentUser.role === 'pharmacist') setCurrentTab('staff');
                          else if (currentUser.role === 'admin') setCurrentTab('admin');
                          else setCurrentTab('customer');
                        }}
                        className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <span>
                          {currentUser.role === 'pharmacist' 
                            ? 'Go to Staff Dispensing Desk' 
                            : currentUser.role === 'admin' 
                              ? 'Open Admin Compliance Dashboard' 
                              : 'Enter Customer Store & Orders'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setCurrentTab('customer')}
                          className="py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                        >
                          Customer Portal
                        </button>
                        <button
                          onClick={logout}
                          className="py-2.5 border border-rose-200 hover:bg-rose-50 text-rose-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Auth Mode Tabs */}
                    <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50">
                      <button
                        onClick={() => {
                          setAuthMode('login');
                          setLoginError('');
                          setSignupError('');
                        }}
                        className={`py-3.5 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                          authMode === 'login'
                            ? 'bg-white text-emerald-800 border-b-2 border-emerald-600 shadow-2xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                      </button>

                      <button
                        onClick={() => {
                          setAuthMode('signup');
                          setLoginError('');
                          setSignupError('');
                        }}
                        className={`py-3.5 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                          authMode === 'signup'
                            ? 'bg-white text-emerald-800 border-b-2 border-emerald-600 shadow-2xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Create Account</span>
                      </button>
                    </div>

                    <div className="p-6">
                      {authMode === 'login' ? (
                        /* LOGIN FORM */
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Email or Username
                            </label>
                            <div className="relative">
                              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                              <input
                                type="text"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                placeholder="e.g. dhammika.r@gmail.com"
                                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all text-slate-900"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-xs font-bold text-slate-700">
                                Password
                              </label>
                              <span className="text-[11px] text-emerald-700 hover:underline cursor-pointer">
                                Forgot password?
                              </span>
                            </div>
                            <div className="relative">
                              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                              <input
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all text-slate-900"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                              Role Type
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {(['customer', 'pharmacist', 'admin'] as UserRole[]).map((r) => (
                                <button
                                  key={r}
                                  type="button"
                                  onClick={() => setLoginRole(r)}
                                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold capitalize border transition-all ${
                                    loginRole === r
                                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                  }`}
                                >
                                  {r === 'customer' ? 'Patient' : r === 'pharmacist' ? 'Pharmacist' : 'Admin'}
                                </button>
                              ))}
                            </div>
                          </div>

                          {loginError && (
                            <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                              {loginError}
                            </p>
                          )}

                          <button
                            type="submit"
                            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
                          >
                            <LogIn className="w-4 h-4" />
                            <span>Sign In to MediQuick</span>
                          </button>

                          {/* Quick 1-Click Demo Profiles for Seamless Testing */}
                          <div className="pt-3 border-t border-slate-100">
                            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                              Instant Demo Personas (1-Click Login)
                            </span>
                            <div className="space-y-1.5">
                              <button
                                type="button"
                                onClick={() => handleQuickDemoLogin('dhammika.r@gmail.com', 'customer', 'Dhammika Ranasinghe')}
                                className="w-full p-2 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-colors flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                                    DR
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-900">
                                      Dhammika Ranasinghe
                                    </p>
                                    <p className="text-[10px] text-slate-500">Patient • Kurunegala</p>
                                  </div>
                                </div>
                                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                                  Customer
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleQuickDemoLogin('kasun.s@mediquick.lk', 'pharmacist', 'Kasun B. Senanayake, B.Pharm')}
                                className="w-full p-2 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-xl text-left transition-colors flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">
                                    KS
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-800 group-hover:text-teal-900">
                                      Kasun B. Senanayake, B.Pharm
                                    </p>
                                    <p className="text-[10px] text-slate-500">SLMC #PH-8921 • Pharmacist</p>
                                  </div>
                                </div>
                                <span className="text-[10px] font-semibold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded">
                                  Staff
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleQuickDemoLogin('chandima.admin@mediquick.lk', 'admin', 'Chandima Herath')}
                                className="w-full p-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-colors flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs font-bold">
                                    CH
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-900">
                                      Chandima Herath
                                    </p>
                                    <p className="text-[10px] text-slate-500">Chief Pharmacist & Compliance</p>
                                  </div>
                                </div>
                                <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
                                  Admin
                                </span>
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        /* SIGN UP FORM */
                        <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={signupName}
                              onChange={(e) => setSignupName(e.target.value)}
                              placeholder="e.g. Dr. Priyantha Dissanayake"
                              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-slate-900"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                                placeholder="name@domain.lk"
                                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                value={signupPhone}
                                onChange={(e) => setSignupPhone(e.target.value)}
                                placeholder="+94 77 123 4567"
                                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none text-slate-900"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                              Register Account As
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setSignupRole('customer')}
                                className={`py-2 px-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                                  signupRole === 'customer'
                                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                <span className="block font-bold">Patient / Customer</span>
                                <span className="text-[10px] text-slate-500">Order medicines & track Rx</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setSignupRole('pharmacist')}
                                className={`py-2 px-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                                  signupRole === 'pharmacist'
                                    ? 'bg-teal-50 border-teal-600 text-teal-900'
                                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                <span className="block font-bold">SLMC Pharmacist</span>
                                <span className="text-[10px] text-slate-500">Clinical verification desk</span>
                              </button>
                            </div>
                          </div>

                          {signupRole === 'pharmacist' && (
                            <div>
                              <label className="block text-xs font-bold text-teal-800 mb-1">
                                SLMC License Number *
                              </label>
                              <input
                                type="text"
                                value={signupSlmc}
                                onChange={(e) => setSignupSlmc(e.target.value)}
                                placeholder="e.g. SLMC-PH-9412"
                                className="w-full px-3 py-2 text-xs bg-teal-50/50 border border-teal-300 rounded-xl focus:bg-white focus:outline-none text-slate-900 font-mono"
                              />
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                Password *
                              </label>
                              <input
                                type="password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none text-slate-900"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">
                                Kurunegala Area
                              </label>
                              <input
                                type="text"
                                value={signupAddress}
                                onChange={(e) => setSignupAddress(e.target.value)}
                                placeholder="Circular Rd, Kurunegala"
                                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none text-slate-900"
                              />
                            </div>
                          </div>

                          <div className="flex items-start gap-2 pt-1">
                            <input
                              type="checkbox"
                              id="agree-terms"
                              checked={agreeTerms}
                              onChange={(e) => setAgreeTerms(e.target.checked)}
                              className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                            />
                            <label htmlFor="agree-terms" className="text-[11px] text-slate-600 leading-tight">
                              I agree to NMRA safe drug dispensing regulations and declare that health submissions are accurate.
                            </label>
                          </div>

                          {signupError && (
                            <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                              {signupError}
                            </p>
                          )}

                          <button
                            type="submit"
                            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>Register & Access Portal</span>
                          </button>
                        </form>
                      )}
                    </div>
                  </>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comprehensive Site Overview Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/70 px-3 py-1 rounded-full">
              Full Platform Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Four Interconnected Portals for End-to-End Pharmacy Operations
            </h2>
            <p className="text-sm text-slate-600">
              MediQuick integrates customer ordering, clinical pharmacist validation, administrative compliance, and academic technical documentation in a unified responsive system.
            </p>
          </div>

          {/* 4 Main System Modules Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Customer Store & Health Hub */}
            <div 
              onClick={() => setCurrentTab('customer')}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Pill className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Module 01</span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Customer Store & Health Hub
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Search and filter over-the-counter and prescription medicines, upload doctor prescriptions, calculate pediatric doses, and track orders.
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Schedule IV Rx gating</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>In-cart instant order placement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Interactive dosage calculator</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Enter Customer Store</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. Pharmacy Staff Portal */}
            <div 
              onClick={() => setCurrentTab('staff')}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Module 02</span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    Staff Dispensing Console
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Licensed pharmacists verify uploaded prescriptions against SLMC registries, manage batch inventory, and respond to clinical inquiries.
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Prescription verification queue</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Batch & expiry date tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Patient inquiry response desk</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
                <span>Enter Staff Console</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 3. Admin & Compliance Operations */}
            <div 
              onClick={() => setCurrentTab('admin')}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">Module 03</span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Admin & Compliance Portal
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Executive metrics, revenue analytics, staff roster allocation, NMRA regulatory inspections, and immutable audit logs.
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Real-time operations KPIs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Audit logs for all actions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>NMRA cold-chain monitoring</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
                <span>Enter Admin Portal</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 4. Academic Project Report & Site Map */}
            <div 
              onClick={() => setCurrentTab('report')}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Module 04</span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    Academic Report & Site Map
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Comprehensive documentation covering system architecture, ER diagrams, test validation matrices, and assessment specifications.
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Complete assessment report</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Interactive visual site tree</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>NMRA Sri Lanka standards</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
                <span>View Full Report</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

          {/* Interactive Feature Deep-Dive Cards */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Interactive Tools You Can Explore Immediately
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => setCurrentTab('customer')}
                className="p-5 bg-slate-50 hover:bg-emerald-50/50 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">
                    Pediatric Dosage Calculator
                  </h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Compute recommended pediatric liquid suspension dosages based on weight in kilograms (Paracetamol, Amoxicillin, Ibuprofen).
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mt-3">
                  Open Calculator <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div 
                onClick={() => setCurrentTab('customer')}
                className="p-5 bg-slate-50 hover:bg-teal-50/50 rounded-xl border border-slate-200 hover:border-teal-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-800">
                    Prescription Upload & Review
                  </h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Upload doctor prescription scans with allergy declarations and track their review status by our on-duty pharmacists.
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 mt-3">
                  Upload Prescription <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div 
                onClick={() => setCurrentTab('customer')}
                className="p-5 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-800">
                    Wayamba Health & Wellness Hub
                  </h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Read clinical wellness articles curated for Sri Lankan patients covering Dengue prevention, diabetes management, and safe storage.
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 mt-3">
                  Explore Health Hub <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

          {/* Physical Pharmacy & Regional Delivery Details */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 px-2.5 py-1 rounded border border-emerald-800">
                  Kurunegala Physical Operations
                </span>
                <h3 className="text-2xl font-bold">
                  Visit MediQuick Central Dispensary in Kurunegala
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Located strategically on Circular Road opposite Teaching Hospital Kurunegala, our modern temperature-controlled facility houses emergency pharmaceuticals, vaccines, and our central delivery fleet.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Physical Location</p>
                      <p className="text-slate-400">No. 45/A, Circular Road, Kurunegala</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Dispensary Hours</p>
                      <p className="text-slate-400">Mon - Sun: 7:00 AM - 11:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Direct Hotline</p>
                      <p className="text-slate-400">+94 37 222 4589</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Truck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Delivery Zone</p>
                      <p className="text-slate-400">Kurunegala, Ibbagamuwa, Wariyapola, Mawathagama</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-300" />
                  <h4 className="text-sm font-bold text-white">Ready to Explore?</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You can explore the live store as a guest, log into the pharmacist verification desk, or review our academic system report.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => setCurrentTab('customer')}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm"
                  >
                    Enter Store as Guest
                  </button>
                  <button
                    onClick={() => setCurrentTab('report')}
                    className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs transition-colors border border-white/20"
                  >
                    View Academic Report & Architecture
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

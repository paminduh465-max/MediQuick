import React, { useState, useMemo } from 'react';
import { 
  Search,
  PhoneCall,
  AlertTriangle, 
  CheckCircle2, 
  Calculator, 
  ShieldAlert,
  Clock, 
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  BookOpen,
  Info,
  X,
  Send,
  Sparkles,
  MapPin,
  ExternalLink,
  Flame,
  Activity,
  HeartPulse,
  Syringe
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';
import { AdviceCategory, MedicalAdviceItem } from '../../types';
import { ADVICE_CATEGORIES, MEDICAL_ADVICE_ITEMS } from '../../data/medicalAdviceData';
import heroImage from '../../assets/images/medical_hub_hero_1789304133457.jpg';

export const HealthHub: React.FC = () => {
  const { submitInquiry, currentUser } = usePharmacy();

  // Search & Category State matching the format
  const [selectedCategory, setSelectedCategory] = useState<AdviceCategory>('emergency_first_aid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MedicalAdviceItem | null>(null);

  // Ask a Pharmacist Quick Drawer/Modal State
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [askSubject, setAskSubject] = useState('');
  const [askMessage, setAskMessage] = useState('');
  const [askSubmitted, setAskSubmitted] = useState(false);

  // Interactive Clinical Utility: Pediatric Paracetamol Safe Dosage Estimator
  const [patientWeightKg, setPatientWeightKg] = useState<number>(18);
  const calcResult = useMemo(() => {
    // Sri Lanka Paediatric Association: 15mg/kg per single dose, max 60mg/kg/day
    const single = Math.round(patientWeightKg * 15);
    const maxDaily = Math.round(patientWeightKg * 60);
    const syrupMl120 = Number((single / 24).toFixed(1)); // 120mg/5ml = 24mg/ml
    const syrupMl250 = Number((single / 50).toFixed(1)); // 250mg/5ml = 50mg/ml
    return {
      singleDoseMg: single,
      maxDailyMg: maxDaily,
      syrupMl120,
      syrupMl250
    };
  }, [patientWeightKg]);

  // Filtered advice items based on active category & search query
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      return MEDICAL_ADVICE_ITEMS.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.symptoms?.some(s => s.toLowerCase().includes(query)) ||
        item.immediateSteps.some(step => step.toLowerCase().includes(query)) ||
        item.categoryLabel.toLowerCase().includes(query)
      );
    }
    return MEDICAL_ADVICE_ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory, searchQuery]);

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askMessage.trim()) return;

    submitInquiry({
      customerName: currentUser?.name || 'Verified Patient (Kurunegala)',
      customerEmail: currentUser?.email || 'patient@mediquick.lk',
      customerPhone: currentUser?.phone || '+94 77 123 4567',
      category: 'dosage_advice',
      subject: askSubject.trim() || 'Medical Advice Request',
      message: askMessage.trim()
    });

    setAskSubmitted(true);
    setTimeout(() => {
      setAskSubmitted(false);
      setIsAskModalOpen(false);
      setAskSubject('');
      setAskMessage('');
    }, 2500);
  };

  return (
    <div className="w-full pb-16">

      {/* ========================================================= */}
      {/* 1. HERO BANNER (EXACT MATCH FROM USER'S SCREENSHOT)       */}
      {/* ========================================================= */}
      <section 
        id="medical-advice-hero"
        className="relative w-full overflow-hidden text-white min-h-[380px] sm:min-h-[420px] flex items-center justify-center px-4 sm:px-8 py-14 sm:py-20"
      >
        {/* Background photo of doctor/patient consultation */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Medical consultation"
            className="w-full h-full object-cover object-center"
          />
          {/* Exact teal-green tinted overlay matching the user's screenshot */}
          <div className="absolute inset-0 bg-[#165E52]/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#187265]/40" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          
          {/* Main Title: Medical Advice & Emergency Care Hub */}
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-white leading-tight">
            Medical Advice & Emergency Care Hub
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 font-normal max-w-2xl mx-auto leading-relaxed">
            Verified health guidelines, first-aid protocols, and chronic disease management provided by registered Sri Lankan pharmacists & medical professionals.
          </p>

          {/* Search Bar Capsule (Pill Format from Screenshot) */}
          <div className="pt-4 max-w-xl mx-auto w-full">
            <div className="flex items-center bg-white rounded-full p-1.5 shadow-lg transition-all focus-within:ring-2 focus-within:ring-[#187265]/50">
              <input
                id="medical-advice-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for diseases, symptoms, or health advice"
                className="w-full pl-6 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none rounded-full"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 mr-2 text-xs font-bold"
                >
                  ✕
                </button>
              )}

              <button
                id="medical-advice-search-btn"
                type="button"
                className="shrink-0 px-8 py-2.5 rounded-full bg-[#187265] hover:bg-[#146054] active:bg-[#105046] text-white font-medium text-sm transition-all shadow-sm"
              >
                Search
              </button>
            </div>

            {searchQuery && (
              <p className="text-xs text-emerald-100 mt-2 font-medium">
                Found {filteredItems.length} medical guideline{filteredItems.length === 1 ? '' : 's'} matching "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CATEGORY PILLS (MATCHING THE SCREENSHOT FORMAT EXACTLY) */}
      {/* ========================================================= */}
      <section id="medical-advice-categories" className="bg-white border-b border-slate-200/80 py-6 sm:py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4">
            {ADVICE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id && !searchQuery;
              return (
                <button
                  key={cat.id}
                  id={`cat-pill-${cat.id}`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSearchQuery('');
                  }}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#187265] text-white shadow-xs'
                      : 'bg-[#F0F4F4] text-slate-700 hover:bg-[#E4ECEC]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Guidelines & Interactive Clinical Cards Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

      {/* ========================================================= */}
      {/* 3. RAPID EMERGENCY HOTLINES STRIP                         */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-emerald-950 text-white rounded-2xl p-4 sm:p-5 shadow-md border border-rose-800/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>National & Regional Emergency Response Network</span>
              <span className="px-2 py-0.2 rounded-full bg-rose-500/30 text-rose-300 text-[10px] uppercase font-black tracking-wider">
                24/7 Active
              </span>
            </h4>
            <p className="text-[11px] text-slate-300">
              Immediate triage and dispatch for severe trauma, venomous bites, cardiac arrest, or acute poisoning.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <a
            href="tel:1990"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-all shadow-md hover:scale-105"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Dial 1990 (Suwa Seriya Ambulance)</span>
          </a>

          <a
            href="tel:+94372221000"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pharmacy: +94 37 222 1000</span>
          </a>

          <button
            onClick={() => setIsAskModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 font-bold text-xs transition-all"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Ask Pharmacist</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. CLINICAL PEDIATRIC DOSING CALCULATOR (In Personal Care) */}
      {/* ========================================================= */}
      {(selectedCategory === 'personal_care_advice' || searchQuery.includes('paracetamol') || searchQuery.includes('dose') || searchQuery.includes('child')) && (
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Sri Lanka Paediatric Association Validated</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Pediatric Paracetamol Safe Dosage Estimator
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Paracetamol dosage is strictly calculated by body weight (15mg/kg per single dose every 4–6 hours), not simply by chronological age. Household kitchen spoons should never be used.
              </p>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-emerald-200 mb-2">
                  Child's Body Weight (kg): <strong className="text-white text-base ml-1">{patientWeightKg} kg</strong>
                </label>
                <input
                  type="range"
                  min="4"
                  max="50"
                  step="1"
                  value={patientWeightKg}
                  onChange={(e) => setPatientWeightKg(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2.5 bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
                  <span>Infant (4 kg)</span>
                  <span>Toddler (12 kg)</span>
                  <span>Child (25 kg)</span>
                  <span>Adolescent (50 kg)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Calculated Safe Parameters
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900/70 p-2.5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Single Dose (15mg/kg)</span>
                  <span className="text-lg font-bold text-emerald-300">{calcResult.singleDoseMg} mg</span>
                </div>
                <div className="bg-slate-900/70 p-2.5 rounded-xl border border-white/10">
                  <span className="text-[10px] text-slate-400 block">24-Hr Maximum Limit</span>
                  <span className="text-lg font-bold text-amber-300">{calcResult.maxDailyMg} mg</span>
                </div>
              </div>

              <div className="text-xs bg-slate-900/70 p-3 rounded-xl border border-white/10 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">If using 120mg/5ml Syrup:</span>
                  <span className="font-bold text-white bg-emerald-800/80 px-2 py-0.5 rounded text-sm">
                    {calcResult.syrupMl120} ml
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">If using 250mg/5ml Forte Syrup:</span>
                  <span className="font-bold text-white bg-teal-800/80 px-2 py-0.5 rounded text-sm">
                    {calcResult.syrupMl250} ml
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                * MediQuick Kurunegala includes a complimentary CE-certified 5ml oral dosing syringe with every pediatric syrup order.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. MEDICAL GUIDELINES LIST & CARDS                        */}
      {/* ========================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {searchQuery ? 'Search Results' : ADVICE_CATEGORIES.find(c => c.id === selectedCategory)?.label}
            </h3>
            <p className="text-xs text-slate-500">
              Clinical protocols formulated under Sri Lankan national pharmacological guidelines
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {filteredItems.length} article{filteredItems.length === 1 ? '' : 's'}
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="font-bold text-slate-800 text-sm">No guidelines matching your search</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching with common terms like "fever", "snakebite", "dengue", "paracetamol", or "blood pressure".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('emergency_first_aid');
              }}
              className="px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredItems.map((item) => {
              const isUrgent = item.severity === 'emergency';
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`bg-white rounded-3xl border transition-all cursor-pointer hover:shadow-lg flex flex-col p-6 space-y-4 group ${
                    isUrgent ? 'border-rose-200 hover:border-rose-400 bg-rose-50/20' : 'border-slate-200/90 hover:border-emerald-400'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          isUrgent ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.urgencyLabel}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isUrgent ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>

                  {/* Immediate Key Action Preview */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                      Immediate Priority Action:
                    </span>
                    <p className="text-slate-800 font-medium text-[11px] flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item.immediateSteps[0]}</span>
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate max-w-[200px]">Reviewed by: {item.reviewedBy.split(',')[0]}</span>
                    <span className="text-emerald-700 font-bold group-hover:underline">
                      View Full Protocol &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      </div>

      {/* ========================================================= */}
      {/* 6. MODAL: DETAILED CLINICAL PROTOCOL MODAL                 */}
      {/* ========================================================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 my-6">
            
            {/* Modal Header */}
            <div className={`p-6 border-b text-white ${
              selectedItem.severity === 'emergency' 
                ? 'bg-gradient-to-r from-rose-900 to-slate-900' 
                : 'bg-gradient-to-r from-teal-900 to-slate-900'
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white">
                      {selectedItem.urgencyLabel}
                    </span>
                    <span className="text-xs text-white/80">{selectedItem.categoryLabel}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-white/80 font-medium">
                    {selectedItem.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-xs sm:text-sm">
              
              {/* Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-slate-700 leading-relaxed">
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-600" /> Clinical Overview
                </h5>
                <p>{selectedItem.summary}</p>
              </div>

              {/* Symptoms / Warning Signs */}
              {selectedItem.symptoms && selectedItem.symptoms.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Warning Signs & Symptoms to Recognize
                  </h5>
                  <ul className="space-y-1.5 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/70">
                    {selectedItem.symptoms.map((sym, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-800 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Immediate Step-by-Step Action List */}
              <div className="space-y-2">
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Immediate Step-by-Step Action Plan
                </h5>
                <ol className="space-y-2 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-200/80">
                  {selectedItem.immediateSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-800 text-xs leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Critical DO NOTs */}
              {selectedItem.doNotList && selectedItem.doNotList.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-bold text-rose-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> Dangerous Common Mistakes to Strictly AVOID
                  </h5>
                  <ul className="space-y-1.5 bg-rose-50 p-4 rounded-2xl border border-rose-200">
                    {selectedItem.doNotList.map((dont, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-rose-950 font-medium text-xs">
                        <span className="text-rose-600 font-bold shrink-0">✕</span>
                        <span>{dont}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Local Kurunegala Facility Context */}
              {selectedItem.kurunegalaContext && (
                <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-xs space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-teal-900">
                    <MapPin className="w-3.5 h-3.5 text-teal-700" /> Kurunegala Healthcare System Integration
                  </span>
                  <p>{selectedItem.kurunegalaContext}</p>
                </div>
              )}

              {/* Sign-off Banner */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Clinical Oversight: {selectedItem.reviewedBy}</span>
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                >
                  Close Guidelines
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. MODAL: ASK A PHARMACIST FORM                           */}
      {/* ========================================================= */}
      {isAskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Ask a Registered Pharmacist</h4>
                  <p className="text-[11px] text-slate-500">Supervised by Kasun Senanayake (SLMC-P8821)</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAskModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {askSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-slate-900 text-sm">Consultation Query Submitted</h5>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Your question has been forwarded directly to our duty pharmacist at the Kurunegala dispensary. You will receive a response shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAskSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Health Topic or Medication Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Paracetamol & Amoxicillin interaction question"
                    value={askSubject}
                    onChange={(e) => setAskSubject(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Question / Patient Symptoms Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please include age, current medications, known allergies, and specific questions..."
                    value={askMessage}
                    onChange={(e) => setAskMessage(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 text-slate-900 resize-none"
                  />
                </div>

                <p className="text-[10px] text-slate-400 italic">
                  * In life-threatening emergencies (difficulty breathing, chest pain, profuse bleeding), do not wait for a message — call 1990 immediately.
                </p>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAskModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Duty Pharmacist</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

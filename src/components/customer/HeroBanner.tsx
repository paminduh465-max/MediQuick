import React from 'react';
import { 
  UploadCloud, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles, 
  HeartHandshake, 
  CheckCircle,
  Pill
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';

export const HeroBanner: React.FC = () => {
  const { setIsUploadRxOpen, setSelectedCategory, setCurrentTab } = usePharmacy();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-10 mb-8 shadow-xl border border-slate-700/50">
      
      {/* Background Decorative Graphic */}
      <div className="absolute right-0 top-0 -mt-8 -mr-8 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Kurunegala's Premier Digital Pharmacy Network</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-3">
          Your Health, Delivered in Hours. <br className="hidden sm:inline" />
          <span className="text-emerald-400 font-bold">Licensed Pharmacist Verification Guaranteed.</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed max-w-2xl font-normal">
          From essential prescription heart and diabetes medications to daily wellness and personal care. MediQuick delivers right to your doorstep across Kurunegala with full NMRA regulatory compliance.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="hero-upload-rx-btn"
            onClick={() => setIsUploadRxOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 hover:scale-102"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Doctor Prescription</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('all');
              const el = document.getElementById('medicine-catalog-anchor');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-600/60 transition-all"
          >
            <Pill className="w-4 h-4 text-emerald-400" />
            <span>Browse Catalog</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-700/60 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>2-4 Hr Kurunegala Express</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>SLMC Certified Pharmacists</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Genuine Pharmaceuticals</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Free Dosage Counseling</span>
          </div>
        </div>

      </div>
    </div>
  );
};

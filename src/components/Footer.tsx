import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  FileText, 
  AlertCircle 
} from 'lucide-react';
import { usePharmacy } from '../context/PharmacyContext';

export const Footer: React.FC = () => {
  const { setCurrentTab } = usePharmacy();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand and Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                MQ
              </div>
              <div>
                <span className="font-black text-base tracking-tight text-white block">
                  MediQuick<span className="text-emerald-400">.lk</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Kurunegala Licensed Online Pharmacy
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Delivering authentic pharmaceuticals, prescription verifications, and professional healthcare consultations to patients across Kurunegala and North Western Province.
            </p>

            <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-1 text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>NMRA Sri Lanka Licensed Facility</span>
              </div>
              <p className="text-slate-400">
                Premises Reg: <strong>NMRA/WP/KRN-8814</strong> • Supervised by Kasun Senanayake, B.Pharm (SLMC Reg: P8821).
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider">System Portals</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setCurrentTab('customer')} className="hover:text-white transition-colors">
                  Medicine Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('customer')} className="hover:text-white transition-colors">
                  Upload Doctor Prescription
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('customer')} className="hover:text-white transition-colors">
                  Knowledge Hub & Dosage Tool
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('staff')} className="hover:text-emerald-400 transition-colors">
                  Pharmacy Staff Portal
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('admin')} className="hover:text-emerald-400 transition-colors">
                  Administration Console
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('report')} className="text-emerald-400 font-bold hover:underline">
                  Project Report & Site Map
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Kurunegala Service Centers */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider">Kurunegala Hub</h4>
            <ul className="space-y-2.5 text-slate-400 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>45 Town Hall Road, Kurunegala 60000, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+94 37 222 4595 / +94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>care@mediquick.lk</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dispatch: 24/7 Everyday</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Medical Notice */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider">Emergency Notice</h4>
            <div className="p-3 bg-rose-950/40 rounded-2xl border border-rose-800/40 text-rose-200 text-[11px] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-rose-300">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Immediate Medical Emergency?</span>
              </div>
              <p className="text-rose-200/80 leading-snug">
                For urgent life-threatening crises, dial Sri Lanka National Ambulance immediately:
              </p>
              <div className="pt-1 text-sm font-black text-rose-300">
                Call 1990 (Suwa Seriya)
              </div>
              <p className="text-[10px] text-rose-300/70">
                Kurunegala Teaching Hospital ER: +94 37 222 2261
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} MediQuick Pharmacy (Pvt) Ltd. All Rights Reserved. Regulated under the NMRA Act of Sri Lanka.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Coursework Application & Web System Documentation Assessment</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

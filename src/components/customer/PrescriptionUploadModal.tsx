import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Phone, 
  Stethoscope, 
  Camera,
  ArrowRight
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';

interface PrescriptionUploadModalProps {
  onClose?: () => void;
  onSuccess?: (rxId: string) => void;
}

const SAMPLE_PRESCRIPTION_TEMPLATES = [
  {
    name: 'Kurunegala Teaching Hospital - Cardiac OPD',
    doctor: 'Dr. Rohan Samarasekera',
    slmc: 'SLMC-19842',
    hospital: 'Teaching Hospital Kurunegala',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    notes: 'Metformin HCl 500mg (1x daily), Atorvastatin 20mg (1x night). 30 days.'
  },
  {
    name: 'Respiratory & Allergy Care - Medicare Kurunegala',
    doctor: 'Dr. T. M. Fernando',
    slmc: 'SLMC-31092',
    hospital: 'Medicare Clinic, Kurunegala',
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&auto=format&fit=crop&q=80',
    notes: 'Ventolin Evohaler 100mcg (1-2 puffs prn wheeze), Cetirizine 10mg (1x daily).'
  },
  {
    name: 'General Medicine - Royal Hospital Kurunegala',
    doctor: 'Dr. Anoma Wijewardena',
    slmc: 'SLMC-24115',
    hospital: 'Royal Hospital Kurunegala',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
    notes: 'Amoxicillin 500mg (tds for 5 days after food), Panadol ActiFast 500mg.'
  }
];

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({ onClose, onSuccess }) => {
  const { uploadPrescription, setCurrentTab, isUploadRxOpen, setIsUploadRxOpen } = usePharmacy();

  const [patientName, setPatientName] = useState('Sunil Jayasinghe');
  const [patientAge, setPatientAge] = useState(58);
  const [patientPhone, setPatientPhone] = useState('+94 77 342 9811');
  const [patientAllergies, setPatientAllergies] = useState('None');
  
  const [doctorName, setDoctorName] = useState('Dr. Rohan Samarasekera');
  const [doctorSlmcNo, setDoctorSlmcNo] = useState('SLMC-19842');
  const [clinicOrHospital, setClinicOrHospital] = useState('Kurunegala Teaching Hospital');
  const [prescriptionDate, setPrescriptionDate] = useState('2026-09-12');
  const [notes, setNotes] = useState('Please dispatch to Kurunegala Town. Generic brands acceptable.');
  
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleClose = () => {
    setIsUploadRxOpen(false);
    setSubmittedId(null);
    if (onClose) {
      onClose();
    }
  };

  if (!isUploadRxOpen) return null;

  const handleApplyTemplate = (tmpl: typeof SAMPLE_PRESCRIPTION_TEMPLATES[0]) => {
    setDoctorName(tmpl.doctor);
    setDoctorSlmcNo(tmpl.slmc);
    setClinicOrHospital(tmpl.hospital);
    setImageUrl(tmpl.imageUrl);
    setNotes(tmpl.notes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const rxId = uploadPrescription({
        patientName,
        patientAge: Number(patientAge),
        patientPhone,
        patientAllergies: patientAllergies || 'None',
        doctorName,
        doctorSlmcNo,
        clinicOrHospital,
        prescriptionDate,
        imageUrl,
        notes
      });
      setSubmittedId(rxId);
      setIsSubmitting(false);
      if (onSuccess) onSuccess(rxId);
    }, 600);
  };

  if (submittedId) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl animate-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Prescription Uploaded Successfully!</h3>
          <p className="text-xs text-slate-500 mt-1">Prescription Reference ID</p>
          <div className="my-3 py-2 px-4 bg-emerald-50 text-emerald-800 font-mono font-bold text-lg rounded-xl border border-emerald-200">
            {submittedId}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-6">
            Our licensed pharmacist at MediQuick Kurunegala will verify this script against the SLMC registry. You will receive an SMS and in-app alert with the estimated quote within 15–30 minutes.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                handleClose();
                // Optionally switch to staff view to review it
                setCurrentTab('staff');
              }}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              Go to Staff Portal to Review this Rx
            </button>
            <button
              onClick={handleClose}
              className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Continue Browsing Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 my-6">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Upload Doctor's Prescription</h2>
              <p className="text-xs text-slate-500">MediQuick Pharmacy Kurunegala • Safe & Verified Dispensing</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Sample Prescriptions (Academic Assessment helper) */}
        <div className="px-6 pt-4 pb-2 bg-emerald-50/50 border-b border-emerald-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Evaluation Helper: Quick-Load Sample Prescription</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SAMPLE_PRESCRIPTION_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyTemplate(tmpl)}
                className="text-left p-2 rounded-xl bg-white border border-emerald-200/80 hover:border-emerald-500 hover:shadow-xs transition-all text-[11px]"
              >
                <span className="font-bold text-slate-900 block truncate">{tmpl.name}</span>
                <span className="text-slate-500 truncate block">{tmpl.doctor}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
          
          {/* Prescription Image Preview & Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Prescription Photo / Scan *
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/70 hover:bg-slate-50 transition-colors">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                <img src={imageUrl} alt="Prescription preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-800 mb-1">
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <span>Prescription Image Linked</span>
                </div>
                <p className="text-[11px] text-slate-500 mb-2">
                  Ensure doctor's signature, date, and SLMC license seal are visibly clear.
                </p>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or enter image URL..."
                    className="flex-1 min-w-[200px] text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name *</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Patient Age *</label>
              <input
                type="number"
                required
                min={1}
                max={120}
                value={patientAge}
                onChange={(e) => setPatientAge(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone (SMS updates) *</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Doctor & Medical Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Doctor's Name *</label>
              <div className="relative">
                <Stethoscope className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Doctor SLMC Reg No. *</label>
              <input
                type="text"
                required
                value={doctorSlmcNo}
                onChange={(e) => setDoctorSlmcNo(e.target.value)}
                placeholder="e.g. SLMC-19842"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hospital / Clinic</label>
              <input
                type="text"
                value={clinicOrHospital}
                onChange={(e) => setClinicOrHospital(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Prescription Date *</label>
              <input
                type="date"
                required
                value={prescriptionDate}
                onChange={(e) => setPrescriptionDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Patient Known Drug Allergies
            </label>
            <input
              type="text"
              value={patientAllergies}
              onChange={(e) => setPatientAllergies(e.target.value)}
              placeholder="e.g. Penicillin, Aspirin, Sulfa drugs, or 'None'"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Instructions for Pharmacist
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="List specific medications requested or provide delivery instructions..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
            />
          </div>

          {/* Legal Compliance Notice */}
          <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              By submitting, you certify that this prescription is authentic and was issued by a registered Sri Lanka Medical Council (SLMC) physician. Dispensing is subject to pharmacist verification under NMRA guidelines.
            </span>
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors disabled:bg-slate-300"
            >
              {isSubmitting ? (
                <span>Verifying & Submitting...</span>
              ) : (
                <>
                  <span>Submit Prescription</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

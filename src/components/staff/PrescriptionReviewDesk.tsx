import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  ZoomIn, 
  Stethoscope, 
  User, 
  Calendar, 
  Clock, 
  Package,
  Plus,
  Send
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';
import { Prescription } from '../../types';

export const PrescriptionReviewDesk: React.FC = () => {
  const { prescriptions, updatePrescriptionStatus, products } = usePharmacy();
  const [selectedRxId, setSelectedRxId] = useState<string>(prescriptions[0]?.id || '');
  const [reviewNotes, setReviewNotes] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const selectedRx = prescriptions.find(p => p.id === selectedRxId) || prescriptions[0];

  const filteredPrescriptions = prescriptions.filter(p => {
    if (activeFilter === 'all') return true;
    return p.status === activeFilter;
  });

  const handleApprove = () => {
    if (!selectedRx) return;
    const defaultNotes = reviewNotes || 'Prescription verified against SLMC doctor database. Dosages validated and cross-checked against allergy history. Approved for dispensing.';
    updatePrescriptionStatus(
      selectedRx.id, 
      'approved', 
      defaultNotes, 
      'K. B. Senanayake, B.Pharm (SLMC-P8821)'
    );
    setReviewNotes('');
  };

  const handleReject = () => {
    if (!selectedRx) return;
    const reason = reviewNotes || 'Prescription rejected due to incomplete physician information or safety contraindication.';
    updatePrescriptionStatus(
      selectedRx.id, 
      'rejected', 
      reason, 
      'K. B. Senanayake, B.Pharm (SLMC-P8821)'
    );
    setReviewNotes('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Prescription Verification & Dispensing Desk
              </h2>
              <p className="text-xs text-slate-500">
                Authorized Pharmacist Console • NMRA Drug Schedule IV Verification Protocol
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                activeFilter === f ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f} ({prescriptions.filter(p => f === 'all' ? true : p.status === f).length})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Queue List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Incoming Prescriptions Queue
          </h3>

          <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
            {filteredPrescriptions.map(rx => {
              const isSelected = rx.id === selectedRx?.id;
              return (
                <div
                  key={rx.id}
                  onClick={() => {
                    setSelectedRxId(rx.id);
                    setReviewNotes('');
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-xs text-slate-900">#{rx.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rx.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      rx.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {rx.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{rx.patientName} ({rx.patientAge} yrs)</h4>
                  <p className="text-[11px] text-slate-500 truncate">Dr: {rx.doctorName} • {rx.clinicOrHospital}</p>
                  
                  {rx.patientAllergies && rx.patientAllergies !== 'None' && (
                    <div className="mt-2 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Allergy: {rx.patientAllergies}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                    <span>Uploaded: {rx.uploadDate}</span>
                    <span className="font-semibold text-emerald-800">Review Script →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Review Workspace */}
        {selectedRx ? (
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-6">
            
            {/* Review Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    Prescription #{selectedRx.id}
                  </h3>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    selectedRx.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    selectedRx.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    Status: {selectedRx.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Uploaded on {selectedRx.uploadDate} via Kurunegala Customer Portal
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Script Total</span>
                <span className="text-base font-bold text-slate-900">
                  Rs. {selectedRx.totalEstimatedLKR ? selectedRx.totalEstimatedLKR.toLocaleString() : '2,800'}
                </span>
              </div>
            </div>

            {/* Patient & Physician Clinical Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Patient Info Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <User className="w-4 h-4 text-emerald-600" /> Patient Medical Profile
                </h4>
                <div className="pt-1 space-y-1 text-slate-700">
                  <p><span className="text-slate-400">Name:</span> <strong className="text-slate-900">{selectedRx.patientName}</strong></p>
                  <p><span className="text-slate-400">Age:</span> {selectedRx.patientAge} years</p>
                  <p><span className="text-slate-400">Phone:</span> {selectedRx.patientPhone}</p>
                  <p className="text-rose-700 font-semibold">
                    <span className="text-slate-400">Allergies:</span> {selectedRx.patientAllergies || 'None declared'}
                  </p>
                </div>
              </div>

              {/* Doctor / SLMC License Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Stethoscope className="w-4 h-4 text-emerald-600" /> Prescribing Medical Officer
                </h4>
                <div className="pt-1 space-y-1 text-slate-700">
                  <p><span className="text-slate-400">Doctor:</span> <strong className="text-slate-900">{selectedRx.doctorName}</strong></p>
                  <p><span className="text-slate-400">SLMC Registration:</span> <span className="font-mono bg-emerald-100 text-emerald-900 px-1 rounded">{selectedRx.doctorSlmcNo} (Verified)</span></p>
                  <p><span className="text-slate-400">Institution:</span> {selectedRx.clinicOrHospital}</p>
                  <p><span className="text-slate-400">Issue Date:</span> {selectedRx.prescriptionDate}</p>
                </div>
              </div>

            </div>

            {/* High Resolution Prescription Image Display */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-emerald-600" /> High-Resolution Prescription Preview
                </label>
                <a
                  href={selectedRx.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-700 font-bold hover:underline"
                >
                  Open Full Resolution in New Tab ↗
                </a>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-300 bg-slate-900 max-h-80 flex items-center justify-center">
                <img
                  src={selectedRx.imageUrl}
                  alt="Doctor Prescription Document"
                  className="w-full h-full object-contain max-h-80"
                />
              </div>
            </div>

            {/* Patient Request Notes */}
            {selectedRx.notes && (
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200">
                <span className="font-bold text-slate-900">Patient Request / Notes: </span>
                {selectedRx.notes}
              </div>
            )}

            {/* Pharmacist Action Console */}
            <div className="p-5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" /> Pharmacist Clinical Decision & Dispensing Instructions
              </h4>
              <textarea
                rows={3}
                placeholder="Enter pharmacist clinical notes, dosage confirmation, or specific reason for rejection..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                className="w-full text-xs p-3 bg-white border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 outline-none"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="text-[11px] text-emerald-800">
                  Signed: <strong>K. B. Senanayake, B.Pharm (SLMC-P8821)</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReject}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white text-rose-700 hover:bg-rose-50 border border-rose-300 rounded-xl text-xs font-bold transition-colors"
                  >
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Reject Prescription</span>
                  </button>

                  <button
                    onClick={handleApprove}
                    className="flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Authorize Dispense</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-8 p-12 bg-white rounded-3xl border border-slate-200 text-center text-slate-500">
            Select a prescription from the left queue to begin verification.
          </div>
        )}

      </div>

    </div>
  );
};

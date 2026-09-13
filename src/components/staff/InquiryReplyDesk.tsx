import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  User, 
  Phone, 
  ShieldCheck, 
  HelpCircle,
  Stethoscope
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';

export const InquiryReplyDesk: React.FC = () => {
  const { inquiries, respondToInquiry } = usePharmacy();
  const [selectedInquiryId, setSelectedInquiryId] = useState<string>(
    inquiries.find(i => i.status === 'pending')?.id || inquiries[0]?.id || ''
  );
  const [replyText, setReplyText] = useState('');
  const [responderName, setResponderName] = useState('K. B. Senanayake, B.Pharm (SLMC-P8821)');

  const selectedInquiry = inquiries.find(i => i.id === selectedInquiryId) || inquiries[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !replyText.trim()) return;

    respondToInquiry(selectedInquiry.id, replyText, responderName);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Patient Consultation & Inquiry Helpdesk</h2>
          <p className="text-xs text-slate-500">
            Direct pharmacist-to-patient communication for clinical questions and dosage counseling
          </p>
        </div>

        <div className="text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl font-bold border border-emerald-200">
          {inquiries.filter(i => i.status === 'pending').length} Inquiries Pending Response
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Inquiry Queue */}
        <div className="lg:col-span-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Patient Messages
          </h3>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {inquiries.map(inq => {
              const isSelected = inq.id === selectedInquiry?.id;
              return (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiryId(inq.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {inq.category.replace('_', ' ')}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                      inq.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inq.status === 'resolved' ? 'Answered' : 'Pending'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{inq.subject}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{inq.message}</p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                    <span>{inq.customerName}</span>
                    <span>{inq.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reply Workspace */}
        {selectedInquiry ? (
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
            
            <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {selectedInquiry.category.replace('_', ' ')}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {selectedInquiry.subject}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submitted on {selectedInquiry.createdAt}
                </p>
              </div>

              <div className="text-right text-xs">
                <span className="font-bold text-slate-900 block">{selectedInquiry.customerName}</span>
                <span className="text-slate-500">{selectedInquiry.customerEmail}</span>
                {selectedInquiry.customerPhone && (
                  <span className="text-slate-400 block">{selectedInquiry.customerPhone}</span>
                )}
              </div>
            </div>

            {/* Customer Message Card */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs leading-relaxed space-y-1">
              <span className="font-bold text-slate-700 block text-[11px] uppercase">
                Patient Medical Question:
              </span>
              <p className="text-slate-900 font-medium whitespace-pre-wrap">
                {selectedInquiry.message}
              </p>
            </div>

            {/* Existing Response (if already resolved) */}
            {selectedInquiry.response && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Response Sent by: {selectedInquiry.respondedBy}</span>
                  </span>
                  <span className="text-[10px] font-normal text-emerald-700">{selectedInquiry.respondedAt}</span>
                </div>
                <p className="text-emerald-950 whitespace-pre-wrap leading-relaxed pt-1">
                  {selectedInquiry.response}
                </p>
              </div>
            )}

            {/* Pharmacist Reply Composer */}
            <form onSubmit={handleSendReply} className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedInquiry.response ? 'Update Professional Response:' : 'Write Pharmacist Response:'}
                </label>
                <div className="text-[11px] text-slate-500">
                  Signing as: <strong>{responderName}</strong>
                </div>
              </div>

              <textarea
                required
                rows={4}
                placeholder="Provide evidence-based pharmacological advice, administration advice, or clinical warnings..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Clinical Advice to Patient</span>
                </button>
              </div>
            </form>

          </div>
        ) : (
          <div className="lg:col-span-8 p-12 bg-white rounded-3xl border border-slate-200 text-center text-slate-500">
            Select an inquiry from the left to view details and compose an answer.
          </div>
        )}

      </div>

    </div>
  );
};

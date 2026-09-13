import React, { useState } from 'react';
import { 
  Package, 
  FileText, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  MapPin, 
  ChevronRight, 
  UploadCloud, 
  Send,
  User,
  Phone,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';
import { Order, Prescription } from '../../types';

export const CustomerDashboard: React.FC = () => {
  const { 
    orders, 
    prescriptions, 
    inquiries, 
    submitInquiry, 
    setIsUploadRxOpen,
    setCurrentTab
  } = usePharmacy();

  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'prescriptions' | 'inquiry'>('orders');

  // Inquiry form
  const [inquiryName, setInquiryName] = useState('Dhammika Ranasinghe');
  const [inquiryEmail, setInquiryEmail] = useState('dhammika.r@gmail.com');
  const [inquiryPhone, setInquiryPhone] = useState('+94 77 654 3210');
  const [inquiryCategory, setInquiryCategory] = useState<'drug_interaction' | 'dosage_advice' | 'stock_inquiry' | 'prescription_guidance' | 'general'>('drug_interaction');
  const [inquirySubject, setInquirySubject] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquirySubject || !inquiryMessage) return;

    submitInquiry({
      customerName: inquiryName,
      customerEmail: inquiryEmail,
      customerPhone: inquiryPhone,
      category: inquiryCategory,
      subject: inquirySubject,
      message: inquiryMessage
    });

    setSubmittedMessage(true);
    setInquirySubject('');
    setInquiryMessage('');
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  const getOrderStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Delivered</span>;
      case 'out_for_delivery':
        return <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse"><Truck className="w-3 h-3" /> Out for Delivery</span>;
      case 'dispensed':
        return <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Package className="w-3 h-3" /> Dispensed & Packed</span>;
      case 'processing':
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Processing Order</span>;
      case 'prescription_verification':
        return <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><FileText className="w-3 h-3" /> Verifying Prescription</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">{status}</span>;
    }
  };

  const getRxStatusBadge = (status: Prescription['status']) => {
    switch (status) {
      case 'approved':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Approved by Pharmacist</span>;
      case 'verified':
        return <span className="bg-sky-100 text-sky-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Under Review</span>;
      case 'pending':
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> Queued for Review</span>;
      case 'rejected':
        return <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Rejected</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Account Profile Ribbon */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            DR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Dhammika Ranasinghe</h2>
              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Verified Patient
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Circular Road, Kurunegala • +94 77 654 3210
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsUploadRxOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload New Prescription</span>
          </button>
        </div>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'orders'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('prescriptions')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'prescriptions'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Uploaded Prescriptions ({prescriptions.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('inquiry')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'inquiry'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Pharmacist Consultations ({inquiries.length})</span>
        </button>
      </div>

      {/* Tab 1: Orders History */}
      {activeSubTab === 'orders' && (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-900 text-sm">#{order.id}</span>
                  <span className="text-xs text-slate-400 font-mono">Tracking: {order.trackingNumber}</span>
                  {getOrderStatusBadge(order.status)}
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">{order.orderDate}</span>
                  <span className="text-sm font-bold text-slate-900">Rs. {order.totalLKR.toLocaleString()}</span>
                </div>
              </div>

              {/* Items in order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {order.items?.map((item, idx) => {
                  if (!item || !item.product) return null;
                  return (
                    <div key={idx} className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <img 
                        src={item.product?.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'} 
                        alt={item.product?.name || 'Medicine'} 
                        className="w-10 h-10 rounded-lg object-cover" 
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-slate-900 truncate">{item.product?.name}</h5>
                        <span className="text-[11px] text-slate-500">{item.quantity}x @ Rs. {item.product?.priceLKR}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Meta Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{order.deliveryAddress}, {order.city}</span>
                  </span>
                  <span>•</span>
                  <span>Method: <strong className="text-slate-700 uppercase">{order.deliveryMethod.replace('_', ' ')}</strong></span>
                </div>
                <div className="text-emerald-700 font-medium">
                  Pharmacist Sign-Off: {order.pharmacistSignOff || 'Verified'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Prescriptions List */}
      {activeSubTab === 'prescriptions' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                All prescriptions submitted to MediQuick Kurunegala are archived for medical audit and regulatory compliance with Sri Lanka NMRA.
              </span>
            </div>
            <button
              onClick={() => setIsUploadRxOpen(true)}
              className="shrink-0 px-3 py-1 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800"
            >
              + Upload
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescriptions.map(rx => (
              <div key={rx.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-slate-900">#{rx.id}</span>
                  {getRxStatusBadge(rx.status)}
                </div>

                <div className="flex gap-3">
                  <img
                    src={rx.imageUrl}
                    alt="Prescription script"
                    className="w-20 h-20 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                  />
                  <div className="text-xs space-y-1">
                    <p><strong className="text-slate-700">Patient:</strong> {rx.patientName} ({rx.patientAge} yrs)</p>
                    <p><strong className="text-slate-700">Doctor:</strong> {rx.doctorName} ({rx.doctorSlmcNo})</p>
                    <p><strong className="text-slate-700">Hospital:</strong> {rx.clinicOrHospital}</p>
                    <p><strong className="text-slate-700">Uploaded:</strong> {rx.uploadDate}</p>
                  </div>
                </div>

                {rx.notes && (
                  <div className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                    <strong>Patient Note:</strong> {rx.notes}
                  </div>
                )}

                {rx.pharmacistReviewNotes && (
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-xs text-emerald-900 border border-emerald-100">
                    <div className="flex items-center gap-1 font-bold mb-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Pharmacist Review ({rx.reviewedBy}):</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">{rx.pharmacistReviewNotes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Inquiries & Consultations */}
      {activeSubTab === 'inquiry' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Submit New Inquiry Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Ask a Licensed Pharmacist</h3>
              <p className="text-xs text-slate-500">
                Have questions about drug interactions, pediatric dosage, or medicine availability in Kurunegala?
              </p>
            </div>

            {submittedMessage && (
              <div className="p-3 bg-emerald-50 text-emerald-900 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your inquiry has been submitted! Our pharmacist will reply promptly.</span>
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Category *</label>
                <select
                  value={inquiryCategory}
                  onChange={(e) => setInquiryCategory(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                >
                  <option value="drug_interaction">Drug-Drug Interaction Check</option>
                  <option value="dosage_advice">Dosage & Administration Timing</option>
                  <option value="prescription_guidance">Prescription Requirement Clarification</option>
                  <option value="stock_inquiry">Kurunegala Stock Availability</option>
                  <option value="general">General Health & Wellness Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Taking Atorvastatin with Grapefruit juice"
                  value={inquirySubject}
                  onChange={(e) => setInquirySubject(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Question *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your current medications, symptoms, and exact health questions..."
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry to Pharmacist</span>
              </button>
            </form>
          </div>

          {/* Past Inquiries & Pharmacist Replies */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Your Consultation History</h3>
            
            {inquiries.map(inq => (
              <div key={inq.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {inq.category.replace('_', ' ')}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    inq.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {inq.status === 'resolved' ? 'Answered' : 'Awaiting Pharmacist Response'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{inq.subject}</h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl">
                  {inq.message}
                </p>

                {inq.response ? (
                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        <span>Reply from: {inq.respondedBy}</span>
                      </span>
                      <span className="text-[10px] font-normal text-emerald-700">{inq.respondedAt}</span>
                    </div>
                    <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                      {inq.response}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-400">Submitted on {inq.createdAt}</span>
                    <button
                      onClick={() => setCurrentTab('staff')}
                      className="text-xs text-emerald-700 font-bold underline"
                    >
                      (Switch to Staff Portal to answer this inquiry)
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

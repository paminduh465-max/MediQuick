import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Printer, 
  FileText, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';
import { Order } from '../../types';

export const OrderFulfillmentDesk: React.FC = () => {
  const { orders, updateOrderStatus } = usePharmacy();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeOrderForSlip, setActiveOrderForSlip] = useState<Order | null>(null);

  const filteredOrders = orders.filter(o => {
    if (selectedStatus === 'all') return true;
    return o.status === selectedStatus;
  });

  const getNextStatus = (curr: Order['status']): Order['status'] | null => {
    switch (curr) {
      case 'prescription_verification': return 'processing';
      case 'processing': return 'dispensed';
      case 'dispensed': return 'out_for_delivery';
      case 'out_for_delivery': return 'delivered';
      default: return null;
    }
  };

  const getStatusLabel = (s: Order['status']) => {
    return s.replace(/_/g, ' ').toUpperCase();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Order Dispensing & Fulfillment Desk</h2>
          <p className="text-xs text-slate-500">
            Kurunegala Hub Dispatch Operations • Cold-Chain Packaging & Delivery Tracking
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
          {['all', 'prescription_verification', 'processing', 'dispensed', 'out_for_delivery', 'delivered'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded-lg capitalize transition-colors whitespace-nowrap ${
                selectedStatus === st ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => {
          const next = getNextStatus(order.status);
          return (
            <div key={order.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-sm text-slate-900">#{order.id}</span>
                  <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                    Track: {order.trackingNumber}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                    order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'dispensed' ? 'bg-purple-100 text-purple-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveOrderForSlip(order)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Dispensing Slip</span>
                  </button>

                  {next && (
                    <button
                      onClick={() => updateOrderStatus(order.id, next, 'K. B. Senanayake (Chief Pharmacist)')}
                      className="flex items-center gap-1 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
                    >
                      <span>Advance to: {getStatusLabel(next)}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Order Details & Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase">Customer Info</span>
                  <p><strong className="text-slate-900">{order.customerName}</strong></p>
                  <p className="text-slate-600 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" /> {order.customerPhone}
                  </p>
                  <p className="text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> {order.deliveryAddress}, {order.city}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase">Shipping & Payment</span>
                  <p>Method: <strong className="text-slate-900 uppercase">{order.deliveryMethod.replace('_', ' ')}</strong></p>
                  <p>Payment: <strong className="text-emerald-700 uppercase">{order.paymentMethod} ({order.paymentStatus})</strong></p>
                  <p>Total: <strong className="text-slate-900">Rs. {order.totalLKR.toLocaleString()}</strong></p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase">Regulatory & Audit</span>
                  <p>Prescription: {order.associatedPrescriptionId ? <span className="font-mono font-bold text-emerald-800">#{order.associatedPrescriptionId} (Verified)</span> : 'OTC items only'}</p>
                  <p>Pharmacist Sign-Off: <span className="text-slate-700 font-medium">{order.pharmacistSignOff || 'Pending'}</span></p>
                  <p className="text-slate-400 text-[10px]">{order.orderDate}</p>
                </div>

              </div>

              {/* Medicines in Order */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase">
                    <tr>
                      <th className="p-2.5">Medicine Item</th>
                      <th className="p-2.5">Category</th>
                      <th className="p-2.5">Batch</th>
                      <th className="p-2.5">Qty</th>
                      <th className="p-2.5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-2.5 font-bold text-slate-900">
                          {item.product.name} ({item.product.genericName})
                        </td>
                        <td className="p-2.5">
                          {item.product.requiresPrescription ? (
                            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">Rx Required</span>
                          ) : (
                            <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">OTC</span>
                          )}
                        </td>
                        <td className="p-2.5 font-mono text-[11px] text-slate-600">{item.product.batchNumber}</td>
                        <td className="p-2.5 font-bold">{item.quantity}</td>
                        <td className="p-2.5 text-right font-bold text-slate-900">
                          Rs. {(item.product.priceLKR * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          );
        })}
      </div>

      {/* Printable Dispensing Label & Slip Simulator */}
      {activeOrderForSlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="border-b-2 border-dashed border-slate-300 pb-4 mb-4 text-center">
              <div className="font-bold text-lg text-slate-900">MediQuick Pharmacy Kurunegala</div>
              <p className="text-xs text-slate-500">Town Hall Road, Kurunegala • Reg: NMRA/WP/KRN-881</p>
              <div className="text-xs font-mono font-bold mt-2 bg-slate-100 py-1 rounded">
                DISPENSING MANIFEST #{activeOrderForSlip.id}
              </div>
            </div>

            <div className="text-xs space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient / Recipient:</span>
                <span className="font-bold">{activeOrderForSlip.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span>{activeOrderForSlip.deliveryAddress}, {activeOrderForSlip.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tracking Code:</span>
                <span className="font-mono font-bold text-emerald-800">{activeOrderForSlip.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Bill:</span>
                <span className="font-bold text-sm">Rs. {activeOrderForSlip.totalLKR.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5 mb-4">
              <div className="font-bold text-slate-700">Dispensed Pharmaceutical Units:</div>
              {activeOrderForSlip.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-[11px]">
                  <span>{it.product.name} ({it.product.dosageForm})</span>
                  <span className="font-mono">Qty: {it.quantity} | B:{it.product.batchNumber}</span>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-emerald-50 rounded-xl text-[10px] text-emerald-900 border border-emerald-200 mb-4">
              <strong>Pharmacist Verification Certification:</strong> Formulations checked for label dosage directions, expiry threshold, and patient safety by K. B. Senanayake, B.Pharm (SLMC-P8821).
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveOrderForSlip(null)}
                className="flex-1 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Manifest dispatched to Kurunegala thermal label printer.');
                  setActiveOrderForSlip(null);
                }}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Simulate Print</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

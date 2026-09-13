import React, { useState } from 'react';
import { 
  FileText, 
  Package, 
  Truck, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { PrescriptionReviewDesk } from './PrescriptionReviewDesk';
import { InventoryManager } from './InventoryManager';
import { OrderFulfillmentDesk } from './OrderFulfillmentDesk';
import { InquiryReplyDesk } from './InquiryReplyDesk';
import { usePharmacy } from '../../context/PharmacyContext';

export const StaffPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prescriptions' | 'inventory' | 'orders' | 'inquiries'>('prescriptions');
  const { prescriptions, products, orders, inquiries } = usePharmacy();

  const pendingRxCount = prescriptions.filter(p => p.status === 'pending').length;
  const pendingInquiryCount = inquiries.filter(i => i.status === 'pending').length;
  const lowStockCount = products.filter(p => p.stock <= p.minStockAlert).length;
  const activeOrdersCount = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;

  return (
    <div className="space-y-6">
      
      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200">
        
        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'prescriptions'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Prescriptions Verification</span>
          {pendingRxCount > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'prescriptions' ? 'bg-white text-emerald-900' : 'bg-amber-500 text-white'
            }`}>
              {pendingRxCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'inventory'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Inventory & Availability</span>
          {lowStockCount > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'inventory' ? 'bg-white text-emerald-900' : 'bg-amber-100 text-amber-800'
            }`}>
              {lowStockCount} Low
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'orders'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Order Fulfillment & Dispensing</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
            activeTab === 'orders' ? 'bg-white text-emerald-900' : 'bg-slate-100 text-slate-700'
          }`}>
            {activeOrdersCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'inquiries'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Customer Health Inquiries</span>
          {pendingInquiryCount > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'inquiries' ? 'bg-white text-emerald-900' : 'bg-rose-500 text-white'
            }`}>
              {pendingInquiryCount}
            </span>
          )}
        </button>

      </div>

      {/* Render Active Desk */}
      <div>
        {activeTab === 'prescriptions' && <PrescriptionReviewDesk />}
        {activeTab === 'inventory' && <InventoryManager />}
        {activeTab === 'orders' && <OrderFulfillmentDesk />}
        {activeTab === 'inquiries' && <InquiryReplyDesk />}
      </div>

    </div>
  );
};

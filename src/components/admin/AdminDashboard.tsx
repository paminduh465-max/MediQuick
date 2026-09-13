import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Lock, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Key, 
  Clock, 
  Mail, 
  Phone,
  Layers,
  X
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';
import { StaffMember } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    orders, 
    products, 
    prescriptions, 
    staffList, 
    auditLogs, 
    addStaff, 
    updateStaffStatus 
  } = usePharmacy();

  const [activeTab, setActiveTab] = useState<'overview' | 'staff' | 'compliance' | 'audit'>('overview');
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  // New staff form state
  const [staffName, setStaffName] = useState('');
  const [staffRole, setStaffRole] = useState<StaffMember['role']>('pharmacist');
  const [staffSlmc, setStaffSlmc] = useState('SLMC-P9980');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPhone, setStaffPhone] = useState('+94 37 222 4595');
  const [staffShift, setStaffShift] = useState<StaffMember['shift']>('Morning');

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalLKR, 0);
  const totalPrescriptions = prescriptions.length;
  const approvedPrescriptions = prescriptions.filter(p => p.status === 'approved').length;
  const rxApprovalRate = totalPrescriptions > 0 ? Math.round((approvedPrescriptions / totalPrescriptions) * 100) : 100;

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    addStaff({
      name: staffName,
      role: staffRole,
      slmcLicense: staffRole === 'pharmacist' ? staffSlmc : undefined,
      email: staffEmail,
      phone: staffPhone,
      status: 'active',
      shift: staffShift
    });
    setShowAddStaffModal(false);
    setStaffName('');
    setStaffEmail('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-100 text-indigo-800">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                System Administration & Governance Console
              </h2>
              <p className="text-xs text-slate-500">
                MediQuick Pharmacy Kurunegala • Operations, Staff RBAC & Regulatory Audits
              </p>
            </div>
          </div>
        </div>

        {/* Subtabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {[
            { id: 'overview', label: 'Operations KPI', icon: TrendingUp },
            { id: 'staff', label: 'Staff Roles & RBAC', icon: Users },
            { id: 'compliance', label: 'NMRA Compliance', icon: ShieldCheck },
            { id: 'audit', label: 'System Audit Logs', icon: Activity },
          ].map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  activeTab === t.id ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview KPIs */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase">Gross Pharmacy Volume</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">Rs. {totalRevenue.toLocaleString()}</div>
              <span className="text-[11px] text-emerald-700 font-medium">From verified completed & active orders</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase">Prescription Clearance Rate</span>
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-indigo-700">{rxApprovalRate}%</div>
              <span className="text-[11px] text-slate-500 font-medium">SLMC physician check SLA: &lt; 25 mins</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase">Kurunegala Express Fulfillment</span>
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">2.4 hrs avg</div>
              <span className="text-[11px] text-blue-700 font-medium">Town Hall, Circular Rd, Puttalam Rd</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase">Active Duty Personnel</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{staffList.filter(s => s.status === 'active').length} on shift</div>
              <span className="text-[11px] text-slate-500 font-medium">Licensed Pharmacists & Dispatch</span>
            </div>
          </div>

          {/* Quick Operations Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" /> Today's Real-Time Pharmacy Activity
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span>Prescription Verifications Today</span>
                  <span className="font-bold text-slate-900">{prescriptions.length} submitted</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span>Orders Dispatched from Kurunegala</span>
                  <span className="font-bold text-slate-900">{orders.length} packages</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span>Restricted Substances Blockades</span>
                  <span className="font-bold text-rose-700">100% Gated by Rx Check</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" /> Pharmacy License Credentials
              </h3>
              <div className="space-y-2 text-xs text-slate-600">
                <p><strong>Pharmacy Facility Name:</strong> MediQuick Pharmacy (Pvt) Ltd</p>
                <p><strong>Municipal Authority:</strong> Kurunegala Municipal Council (KMC)</p>
                <p><strong>NMRA Registration No:</strong> NMRA/R/KRN-2026-0814</p>
                <p><strong>Supervising Pharmacist:</strong> Kasun B. Senanayake (SLMC Reg: P8821)</p>
                <p><strong>Insured Cold-Chain Compliance:</strong> 2°C – 8°C Monitored Refrigerator Unit #1 & #2 Active</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Staff Roles & Permissions (RBAC) */}
      {activeTab === 'staff' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Pharmacy Staff & Access Control (RBAC)</h3>
              <p className="text-xs text-slate-500">Manage licensed pharmacists, inventory staff, and delivery dispatchers</p>
            </div>
            <button
              onClick={() => setShowAddStaffModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Onboard New Staff</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Staff Member</th>
                  <th className="px-4 py-3.5">Assigned Role</th>
                  <th className="px-4 py-3.5">SLMC License</th>
                  <th className="px-4 py-3.5">Contact Details</th>
                  <th className="px-4 py-3.5">Shift</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {staffList.map(st => (
                  <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-slate-900">{st.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">ID: {st.id}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        st.role === 'pharmacist' ? 'bg-emerald-100 text-emerald-800' :
                        st.role === 'admin' ? 'bg-indigo-100 text-indigo-800' :
                        st.role === 'inventory_officer' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {st.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-700">
                      {st.slmcLicense || 'N/A'}
                    </td>
                    <td className="px-4 py-3.5 space-y-0.5 text-[11px]">
                      <div>{st.email}</div>
                      <div className="text-slate-400">{st.phone}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-bold text-slate-700">
                        {st.shift} Shift
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => updateStaffStatus(st.id, st.status === 'active' ? 'on_leave' : 'active')}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                          st.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {st.status === 'active' ? '● On Duty' : '○ On Leave'}
                      </button>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="text-[11px] text-emerald-700 font-bold hover:underline cursor-pointer">
                        Edit Access
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RBAC Permission Matrix Card */}
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 text-xs">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-emerald-700" /> Role-Based Access Control (RBAC) Governance Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-slate-700">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Customer</span>
                <p className="text-[11px] text-slate-500">Browse catalog, upload prescriptions, order medicines, check order status, submit health inquiries.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Licensed Pharmacist</span>
                <p className="text-[11px] text-slate-500">Verify prescriptions, check SLMC doctor registries, clinical dosage validation, answer customer inquiries.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Inventory Officer</span>
                <p className="text-[11px] text-slate-500">Track batch numbers, record consignments, manage expiry alerts, update stock quantities.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Administrator</span>
                <p className="text-[11px] text-slate-500">Manage user roles, oversee security audit logs, audit regulatory compliance, configure branch operations.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: NMRA Regulatory Compliance */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Sri Lanka National Medicines Regulatory Authority (NMRA) Compliance Check
                </h3>
                <p className="text-xs text-slate-500">
                  Standard Operating Procedures (SOP) for Online Dispensing of Scheduled Pharmaceuticals
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { title: 'Schedule IV Prescription Enforcement', status: 'Compliant', desc: 'All restricted antimicrobials and cardiovascular agents require valid uploaded script before checkout.' },
                { title: 'SLMC Registration Registry Cross-Check', status: 'Compliant', desc: 'Prescribing doctors are cross-checked by licensed pharmacists before medication dispatch.' },
                { title: 'Batch Traceability & Expiry Safeguards', status: 'Compliant', desc: 'Each medicine unit dispensed is attached to batch ID and inspected for minimum 6-month shelf life.' },
                { title: 'Cold-Chain Biological Storage Guarantee', status: 'Compliant', desc: 'Inhalers, insulin, and sensitive preparations maintained at certified Kurunegala temperature parameters.' },
                { title: 'Patient Data Privacy & Record Archival', status: 'Compliant', desc: 'Prescriptions retained for mandatory 24-month audit retention period under Ministry of Health rules.' }
              ].map((comp, idx) => (
                <div key={idx} className="flex items-start justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{comp.title}</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">{comp.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {comp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: System Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Immutable System Audit Trail</h3>
              <p className="text-xs text-slate-500">Logs every prescription verification, stock adjustment, and administrative change</p>
            </div>
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
              {auditLogs.length} Events Logged
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      log.severity === 'critical' ? 'bg-rose-100 text-rose-800' :
                      log.severity === 'warning' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {log.severity}
                    </span>
                  </div>
                  <p className="text-slate-600">{log.details}</p>
                  <p className="text-[10px] text-slate-400">Actor: <strong>{log.actor}</strong> ({log.role})</p>
                </div>
                <div className="text-right text-[11px] font-mono text-slate-400 shrink-0">
                  {log.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Onboard Staff Member</h3>
              <button onClick={() => setShowAddStaffModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nadeesha Priyadarshani"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role *</label>
                  <select
                    value={staffRole}
                    onChange={(e) => setStaffRole(e.target.value as any)}
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  >
                    <option value="pharmacist">Pharmacist</option>
                    <option value="inventory_officer">Inventory Officer</option>
                    <option value="dispatcher">Dispatcher</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Shift</label>
                  <select
                    value={staffShift}
                    onChange={(e) => setStaffShift(e.target.value as any)}
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  >
                    <option value="Morning">Morning (8am-4pm)</option>
                    <option value="Evening">Evening (4pm-12am)</option>
                    <option value="Night">Night (12am-8am)</option>
                  </select>
                </div>
              </div>

              {staffRole === 'pharmacist' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">SLMC License Number *</label>
                  <input
                    type="text"
                    required
                    value={staffSlmc}
                    onChange={(e) => setStaffSlmc(e.target.value)}
                    placeholder="SLMC-P9980"
                    className="w-full p-2 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@mediquick.lk"
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={staffPhone}
                  onChange={(e) => setStaffPhone(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

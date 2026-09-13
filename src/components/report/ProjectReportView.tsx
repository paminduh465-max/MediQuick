import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Database, 
  Smartphone, 
  Workflow, 
  Award, 
  User, 
  Building2, 
  ChevronRight, 
  Map, 
  Layout, 
  Cpu, 
  AlertCircle,
  ExternalLink,
  Github
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';

export const ProjectReportView: React.FC = () => {
  const { setCurrentTab } = usePharmacy();
  const [activeReportSection, setActiveReportSection] = useState<string>('exec_summary');

  const sections = [
    { id: 'exec_summary', title: '1. Executive Summary & Scenario', icon: Building2 },
    { id: 'sitemap_ia', title: '2. Complete Site Map & User Journeys', icon: Map },
    { id: 'ui_mockups', title: '3. UI Design Specifications & Mock-ups', icon: Layout },
    { id: 'func_spec', title: '4. Functional Requirements & Assumptions', icon: Layers },
    { id: 'tech_arch', title: '5. Web System Technical Documentation', icon: Database },
    { id: 'safety_compliance', title: '6. NMRA & Clinical Safety Protocols', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      
      {/* Report Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Academic Coursework Assessment & System Specification Report</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            MediQuick Online Pharmacy System Specification & Architecture
          </h1>
          <p className="text-xs text-slate-300">
            Comprehensive Documentation covering System Analysis, Site Map, UI Mock-ups, and Implementation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors border border-white/20"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report (PDF)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Table of Contents */}
        <div className="lg:col-span-4 space-y-2">
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 block">
              Report Table of Contents
            </span>

            {sections.map(sec => {
              const Icon = sec.icon;
              const isSelected = activeReportSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveReportSection(sec.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all text-left ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-700'}`} />
                    <span>{sec.title}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'opacity-100' : 'opacity-40'}`} />
                </button>
              );
            })}
          </div>

          {/* Student & Project Metadata Box */}
          <div className="bg-emerald-50 rounded-3xl border border-emerald-200 p-5 text-xs text-emerald-950 space-y-3">
            <h4 className="font-bold flex items-center gap-1.5 text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Project Assessment Metadata</span>
            </h4>
            <div className="space-y-1 text-[11px] text-emerald-900/80">
              <p><strong>Organization:</strong> MediQuick Pharmacy (Pvt) Ltd</p>
              <p><strong>Location:</strong> Kurunegala, North Western Province, Sri Lanka</p>
              <p><strong>Target Architecture:</strong> Full-Stack React / Vite SPA with Offline Persistence</p>
              <p><strong>Regulatory Standard:</strong> Sri Lanka NMRA Act No. 5 of 2015</p>
              <p><strong>Assessment Criterion:</strong> Originality, Functional Quality & Documentation</p>
            </div>

            <div className="pt-2 border-t border-emerald-200/80 space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Repository & Live Deployment
              </span>
              <a 
                href="https://paminduh465-max.github.io/MediQuick/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-xl bg-white border border-emerald-200 text-emerald-800 font-bold hover:bg-emerald-100/60 transition-all text-[11px]"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Github className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="truncate">paminduh465-max.github.io/MediQuick</span>
                </div>
                <ExternalLink className="w-3 h-3 shrink-0 text-emerald-600" />
              </a>

              <a 
                href="https://github.com/paminduh465-max/MediQuick"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-xl bg-emerald-100/50 hover:bg-emerald-100 text-emerald-900 font-medium transition-all text-[11px]"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Github className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="truncate">GitHub Repository</span>
                </div>
                <ExternalLink className="w-3 h-3 shrink-0 text-emerald-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Section Content Body */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* 1. Executive Summary */}
          {activeReportSection === 'exec_summary' && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Chapter 1</span>
                <h2 className="text-xl font-black text-slate-900">Executive Summary & Organizational Context</h2>
              </div>

              <p>
                <strong>“MediQuick Pharmacy”</strong> is a premier healthcare enterprise established in the commercial heart of <strong>Kurunegala, Sri Lanka</strong>. While traditional brick-and-mortar pharmacies face logistical bottlenecks—including long patient queues, illegible handwriting on physical prescriptions, stock stockouts, and geographic barriers across the Kurunegala district—MediQuick aims to pioneer a digitized, compliant pharmaceutical delivery model.
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Core Strategic Objectives:</h3>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                  <li><strong>Universal Healthcare Access:</strong> Enable patients across Kurunegala, Mawathagama, Wariyapola, and Kuliyapitiya to safely order medications.</li>
                  <li><strong>Digital Prescription Verification:</strong> Safeguard patient safety by instituting a mandatory pharmacist review gate for Schedule IV restricted drugs before dispensing.</li>
                  <li><strong>Live Inventory & Expiry Control:</strong> Prevent stockouts and eliminate expired drug dispensing through automated batch tracking.</li>
                  <li><strong>Clinical Patient Counseling:</strong> Provide direct asynchronous access to Sri Lanka Medical Council (SLMC) licensed pharmacists for drug interaction and dosage inquiries.</li>
                </ul>
              </div>

              <p>
                This system bridges the gap between modern e-commerce convenience and rigorous pharmaceutical oversight, adhering strictly to the guidelines of the <strong>National Medicines Regulatory Authority (NMRA) of Sri Lanka</strong>.
              </p>
            </div>
          )}

          {/* 2. Site Map & Information Architecture */}
          {activeReportSection === 'sitemap_ia' && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Chapter 2</span>
                <h2 className="text-xl font-black text-slate-900">Comprehensive Site Map & Information Architecture</h2>
              </div>

              <p>
                The MediQuick Pharmacy web system is structured into four functional tiers: Public/Customer Portal, Pharmacist Verification Desk, Inventory Fulfillment Engine, and Administrative Governance Console.
              </p>

              {/* Graphical Visual Site Map Tree */}
              <div className="p-5 bg-slate-900 text-white rounded-3xl font-mono text-xs overflow-x-auto space-y-4 border border-slate-800">
                <div className="text-emerald-400 font-bold text-sm">
                  [MEDICKQUICK PHARMACY WEB SYSTEM ARCHITECTURE]
                </div>
                
                <div className="space-y-3 pl-2 text-slate-300">
                  <div>
                    <span className="text-teal-400 font-bold">├── 0.0 WELCOME & ONBOARDING PORTAL</span>
                    <div className="pl-6 space-y-1 text-slate-400">
                      <p>├── 0.1 High-Impact Welcome Hero & Value Propositions</p>
                      <p>├── 0.2 Interactive Authentication Hub (Sign In / Register Customer & Pharmacist)</p>
                      <p>├── 0.3 1-Click Instant Persona Logins (Patient, Licensed Pharmacist, Admin)</p>
                      <p>├── 0.4 Full System Architecture & Portals Overview</p>
                      <p>└── 0.5 Kurunegala Physical Dispensary & Regional Logistics Coverage</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-amber-400 font-bold">├── 1.0 CUSTOMER-FACING STOREFRONT</span>
                    <div className="pl-6 space-y-1 text-slate-400">
                      <p>├── 1.1 Home / Emergency Hero Banner (Quick Rx Upload, Express Helpline)</p>
                      <p>├── 1.2 Categorized Medicine Catalog</p>
                      <p>│   ├── Prescription Medicines (Schedule IV Rx Gated)</p>
                      <p>│   ├── Over-the-Counter (OTC) Drugs</p>
                      <p>│   ├── Wellness & Dietary Supplements</p>
                      <p>│   └── Personal Care & Hygiene Supplies</p>
                      <p>├── 1.3 Prescription Upload Studio (File Drag-and-Drop, Patient & Doctor Meta)</p>
                      <p>├── 1.4 Product Details Modal (Dosage, Active Ingredients, Side Effects, Safety Warnings)</p>
                      <p>├── 1.5 Shopping Cart & Express Order Placement (Kurunegala Express / Pickup, COD / Card)</p>
                      <p>├── 1.6 Patient Account Dashboard (Live Orders Tracking, Rx Status, Inquiries)</p>
                      <p>└── 1.7 Health & Wellness Knowledge Hub (Pediatric Dosage Calculator, Health Articles, Reviews)</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-emerald-400 font-bold">├── 2.0 PHARMACY STAFF & DISPENSING PORTAL</span>
                    <div className="pl-6 space-y-1 text-slate-400">
                      <p>├── 2.1 Prescription Review Desk (Doctor SLMC Cross-Check, High-Res Zoom, Clinical Sign-Off)</p>
                      <p>├── 2.2 Inventory Management Console (Batch Tracking, Expiry Thresholds, Stock Adjustments)</p>
                      <p>├── 2.3 Order Fulfillment & Dispensing Desk (Status Advance, Printable Dispensing Slips)</p>
                      <p>└── 2.4 Patient Consultation Helpdesk (Direct Pharmacist Q&A Responses)</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-indigo-400 font-bold">├── 3.0 SYSTEM ADMINISTRATION & GOVERNANCE</span>
                    <div className="pl-6 space-y-1 text-slate-400">
                      <p>├── 3.1 Operations KPI Matrix (Gross Sales Volume, Rx Clearance Rate, Fulfillment Time)</p>
                      <p>├── 3.2 Staff Directory & Role-Based Access Control (RBAC - Pharmacist, Inventory, Admin)</p>
                      <p>├── 3.3 NMRA Regulatory Compliance Audit Checklist</p>
                      <p>└── 3.4 Immutable Audit Trail (Timestamped Security Logs)</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-cyan-400 font-bold">└── 4.0 SYSTEM DOCUMENTATION & REPORT VIEW</span>
                    <div className="pl-6 space-y-1 text-slate-400">
                      <p>└── Integrated Specification Report & Academic Evaluation Data</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
                <strong>Navigation Principle:</strong> Single-click role switching is enabled via the top navigation bar, allowing immediate auditing of customer, staff, and admin workflows without losing operational state.
              </div>
            </div>
          )}

          {/* 3. UI Design Specifications & Mock-ups */}
          {activeReportSection === 'ui_mockups' && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Chapter 3</span>
                <h2 className="text-xl font-black text-slate-900">UI Design Specifications & Interactive Mock-ups</h2>
              </div>

              <p>
                In strict adherence to the project brief, the application incorporates human-centered interface patterns tailored for clinical safety and user clarity.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs uppercase mb-2">A. Visual Hierarchy & Color Psychology</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                    <li><strong>Primary Medical Green (#047857 / Emerald 700):</strong> Communicates clinical trustworthiness, health, and vitality.</li>
                    <li><strong>Safety Alert Amber (#D97706 / Amber 600):</strong> Flags expiring drugs, low-stock thresholds, and pending pharmacist verifications.</li>
                    <li><strong>Regulatory Rose/Red (#BE123C / Rose 700):</strong> Highlights restricted Schedule IV prescriptions and critical contraindications.</li>
                    <li><strong>Cool Slate Neutrals (#0F172A / Slate 900):</strong> Ensures maximum optical contrast, meeting WCAG AA accessibility standards for elderly patients.</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs uppercase mb-2">B. Key UI Components & Mock-up Mapping</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <strong>1. Prescription Upload Modal:</strong>
                      <p className="text-slate-500 mt-1">Dual-mode file uploader supporting mobile camera snaps and file drag-and-drop, paired with mandatory patient allergy declaration fields.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <strong>2. Pharmacist Verification Workspace:</strong>
                      <p className="text-slate-500 mt-1">Split-screen layout with queue on left, high-res prescription canvas on center-right, and clinical sign-off authorization panel below.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <strong>3. Dosage Calculator Widget:</strong>
                      <p className="text-slate-500 mt-1">Weight-based clinical slider for calculating pediatric paracetamol dosages according to Sri Lankan pediatric hospital guidelines.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <strong>4. Dispensing Slip Generator:</strong>
                      <p className="text-slate-500 mt-1">Simulated thermal printer slip with batch barcodes, expiry stamps, patient instructions, and licensed pharmacist certification.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs uppercase mb-2">C. Responsive Breakpoints</h4>
                  <p className="text-xs text-slate-600">
                    Engineered mobile-first using Tailwind CSS. Fluidly adapts from single-column mobile viewports (360px+) to dense multi-column staff desktops (1280px+). All interactive touch targets strictly maintain a minimum height of 44px for accessibility.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. Functional Requirements & Assumptions */}
          {activeReportSection === 'func_spec' && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Chapter 4</span>
                <h2 className="text-xl font-black text-slate-900">Functional Requirements & System Assumptions</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">4.1 Detailed Functional Matrix by Stakeholder</h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-emerald-800">Customer Role:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                        <li>Browse categorized pharmaceutical catalog with multi-facet filters.</li>
                        <li>Upload valid prescriptions with patient details, age, and known drug allergies.</li>
                        <li>View detailed pharmacological information: dosage guidelines, safety precautions, storage.</li>
                        <li>Manage shopping cart and checkout with automated Schedule IV prescription gating.</li>
                        <li>Track live order fulfillment status with dedicated tracking codes.</li>
                        <li>Submit clinical inquiries to licensed pharmacists and view historical replies.</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-emerald-800">Pharmacy Staff (Pharmacist & Inventory):</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                        <li>Verify digital prescriptions, check SLMC doctor registries, and add clinical dispensing notes.</li>
                        <li>Approve or reject prescriptions with mandatory rejection reasoning.</li>
                        <li>Manage inventory stock levels with fast incremental adjustments.</li>
                        <li>Track batch numbers, manufacturing lots, and expiry thresholds.</li>
                        <li>Fulfill and advance orders along the delivery pipeline.</li>
                        <li>Print professional pharmaceutical dispensing slips and manifests.</li>
                        <li>Formulate evidence-based answers to patient health inquiries.</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="text-emerald-800">System Administrator:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                        <li>Monitor real-time executive dashboard KPIs (revenue, clearance rate, delivery SLA).</li>
                        <li>Manage staff roles and assign shift schedules (Morning, Evening, Night).</li>
                        <li>Audit system security with an immutable event audit trail.</li>
                        <li>Ensure regulatory compliance with Sri Lankan NMRA guidelines.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-2">
                  <h3 className="font-bold text-amber-900 uppercase flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>4.2 Clearly Mentioned System Assumptions (As Specified in Assessment Brief)</span>
                  </h3>
                  <ol className="list-decimal list-inside space-y-1 text-amber-950">
                    <li><strong>Prescription Validity:</strong> Prescriptions uploaded to the system are assumed to be issued within the last 6 months by a medical officer registered with the Sri Lanka Medical Council (SLMC).</li>
                    <li><strong>Delivery Boundary:</strong> Same-day express dispatch applies to the Kurunegala municipal area (within 15km radius of Kurunegala Clock Tower). Deliveries outside are routed via registered courier.</li>
                    <li><strong>Cold-Chain Integrity:</strong> Biologicals (e.g. insulin, vaccines) require special cold-pack courier handling; the system flags these items for refrigerated packaging prior to dispatch.</li>
                    <li><strong>Emergency Disclaimer:</strong> MediQuick explicitly disclaims that online ordering is not a substitute for immediate hospital emergency care. Immediate emergency contact numbers (1990 Suwa Seriya) are visibly embedded.</li>
                    <li><strong>Demonstration Persistence:</strong> For assessment and simulation purposes, the system utilizes synchronous browser-local data storage with pre-seeded test scenarios, enabling testing of workflows without requiring external credit card charges.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* 5. Web System Technical Documentation */}
          {activeReportSection === 'tech_arch' && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Chapter 5</span>
                <h2 className="text-xl font-black text-slate-900">Web System Technical Documentation</h2>
              </div>

              <div className="space-y-4 text-xs">
                <p>
                  The system is architected as a modern, high-performance web application utilizing modern software engineering practices.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Frontend Framework</span>
                    <p className="text-slate-600">React 18 with TypeScript for complete compile-time type safety across all medical entities.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Styling Engine</span>
                    <p className="text-slate-600">Tailwind CSS utility architecture ensuring responsive UI without external CSS overhead.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">State Engine</span>
                    <p className="text-slate-600">PharmacyContext React Provider providing centralized state dispatch and localStorage synchronization.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Vector Iconography</span>
                    <p className="text-slate-600">Lucide-React for clean iconography throughout catalog, clinical, and dashboard views.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs uppercase">Key Entity Data Models:</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li><code>Product</code>: id, name, genericName, brand, category, priceLKR, stock, minStockAlert, dosageForm, strength, requiresPrescription, batchNumber, expiryDate, inStock.</li>
                    <li><code>Prescription</code>: id, patientName, patientAge, doctorName, doctorSlmcNo, clinicOrHospital, imageUrl, status, pharmacistReviewNotes, reviewedBy.</li>
                    <li><code>Order</code>: id, customerName, items, totalLKR, status, deliveryMethod, paymentMethod, trackingNumber, associatedPrescriptionId, pharmacistSignOff.</li>
                    <li><code>StaffMember</code>: id, name, role, slmcLicense, email, phone, status, shift.</li>
                    <li><code>AuditLog</code>: id, timestamp, action, actor, role, severity, details.</li>
                  </ul>
                </div>

                {/* 5.2 GitHub Pages Deployment & CI/CD Section */}
                <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl border border-slate-700 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <Github className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          5.2 GitHub Pages Deployment & Hosting Architecture
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Automated CI/CD workflow configured for: <code className="text-emerald-300">paminduh465-max.github.io/MediQuick/</code>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a 
                        href="https://paminduh465-max.github.io/MediQuick/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
                      >
                        <span>Open Live Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a 
                        href="https://github.com/paminduh465-max/MediQuick"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs transition-colors"
                      >
                        <span>GitHub Repo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Why it was failing & Resolution Explanation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-rose-500/30 space-y-1.5">
                      <span className="font-bold text-rose-300 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                        Root Cause (Why 404 / Blank Screen occurred):
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                        <li><strong>Missing Base URL:</strong> Vite defaulted to root <code>/</code>, requesting bundles at <code>domain/assets/...</code> instead of subfolder <code>/MediQuick/assets/...</code>.</li>
                        <li><strong>Uncompiled Raw Files:</strong> Direct GitHub Pages serving without GitHub Actions attempted to load uncompiled <code>/src/main.tsx</code> raw TypeScript.</li>
                      </ul>
                    </div>

                    <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-emerald-500/30 space-y-1.5">
                      <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Permanent Architectural Solution Implemented:
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                        <li><strong>Relative Asset Resolution:</strong> Configured <code>base: './'</code> in <code>vite.config.ts</code> for flawless routing under subpaths.</li>
                        <li><strong>Automated CI/CD Workflow:</strong> Added <code>.github/workflows/deploy.yml</code> for automated GitHub Pages builds.</li>
                        <li><strong>Jekyll & SPA Bypass:</strong> Added <code>public/.nojekyll</code> and <code>public/404.html</code> fallbacks.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Quick Activation Checklist */}
                  <div className="p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700/80 text-[11px] space-y-2">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider block">
                      3 Steps to Activate in GitHub Settings:
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300">
                      <li>Commit and push the project changes to your GitHub repository (<code>main</code> branch).</li>
                      <li>In your GitHub repo, go to <strong>Settings</strong> &rarr; <strong>Pages</strong>.</li>
                      <li>Under <strong>Build and deployment &gt; Source</strong>, select <strong>GitHub Actions</strong>. GitHub will automatically run the build and publish the live site to <code className="text-emerald-300">https://paminduh465-max.github.io/MediQuick/</code>.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. NMRA & Clinical Safety Protocols */}
          {activeReportSection === 'safety_compliance' && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Chapter 6</span>
                <h2 className="text-xl font-black text-slate-900">NMRA Regulatory Compliance & Clinical Safety Protocols</h2>
              </div>

              <p>
                Operating a digital pharmacy in Sri Lanka requires adherence to the <strong>National Medicines Regulatory Authority (NMRA) Act No. 5 of 2015</strong> and the <strong>Cosmetics, Devices and Drugs Act</strong>. MediQuick enforces these statutory obligations programmatically.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <strong className="text-emerald-800">1. Strict Separation of OTC vs Prescription Medications:</strong>
                  <p className="text-slate-600 mt-1">
                    Antimicrobials (e.g. Amoxicillin, Ciprofloxacin) and cardiovascular agents (e.g. Atorvastatin, Metformin) are tagged as <code>requiresPrescription: true</code>. The system prevents cart checkout containing these items unless an approved prescription ID is linked.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <strong className="text-emerald-800">2. Pharmacist Verification Sign-Off:</strong>
                  <p className="text-slate-600 mt-1">
                    Every order containing prescription drugs requires an authorized digital sign-off with the supervising pharmacist's name and SLMC registration number (e.g. Kasun B. Senanayake, B.Pharm, SLMC-P8821).
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <strong className="text-emerald-800">3. Batch Traceability & Recall Readiness:</strong>
                  <p className="text-slate-600 mt-1">
                    Every product record maintains an active pharmaceutical batch number (e.g. <code>MQ-2026-088</code>) and expiry date. In the event of a manufacturer recall, the system can instantly isolate all affected orders and notify patients.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <strong className="text-emerald-800">4. Antimicrobial Resistance (AMR) Stewardship:</strong>
                  <p className="text-slate-600 mt-1">
                    The integrated Knowledge Hub educates patients on completing antibiotic courses, curbing self-medication, and preventing antibiotic resistance—a major healthcare priority for Sri Lanka's Ministry of Health.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-emerald-700 text-white rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">Review Complete Application Live</h4>
                  <p className="text-xs text-emerald-100">Switch between views to experience the live prototype.</p>
                </div>
                <button
                  onClick={() => setCurrentTab('customer')}
                  className="px-4 py-2 bg-white text-emerald-900 rounded-xl font-bold text-xs hover:bg-emerald-50 transition-colors shadow-sm"
                >
                  Go to Customer Store
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

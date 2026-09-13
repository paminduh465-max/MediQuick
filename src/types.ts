export type UserRole = 'customer' | 'pharmacist' | 'admin';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  slmcLicense?: string;
  isRegistered?: boolean;
}

export type ProductCategory = 
  | 'all'
  | 'prescription'
  | 'otc'
  | 'wellness'
  | 'personal_care';

export interface Product {
  id: string;
  name: string;
  genericName: string;
  brand: string;
  category: 'prescription' | 'otc' | 'wellness' | 'personal_care';
  priceLKR: number;
  stock: number;
  minStockAlert: number;
  dosageForm: 'Tablet' | 'Capsule' | 'Syrup' | 'Inhaler' | 'Cream' | 'Drops' | 'Powder' | 'Device';
  strength: string;
  requiresPrescription: boolean;
  packSize: string;
  description: string;
  dosageGuidelines: string;
  safetyInstructions: string;
  contraindications: string[];
  sideEffects: string[];
  storageInstructions: string;
  imageUrl: string;
  batchNumber: string;
  expiryDate: string;
  inStock: boolean;
  featured?: boolean;
}

export type PrescriptionStatus = 'pending' | 'verified' | 'approved' | 'rejected';

export interface Prescription {
  id: string;
  patientName: string;
  patientAge: number;
  patientPhone: string;
  patientAllergies?: string;
  doctorName: string;
  doctorSlmcNo: string;
  clinicOrHospital: string;
  prescriptionDate: string;
  uploadDate: string;
  imageUrl: string;
  status: PrescriptionStatus;
  notes?: string;
  pharmacistReviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  matchedProductIds?: string[];
  totalEstimatedLKR?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending_payment' | 'prescription_verification' | 'processing' | 'dispensed' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  city: string;
  district: string;
  deliveryMethod: 'kurunegala_express' | 'province_standard' | 'islandwide_courier' | 'store_pickup';
  paymentMethod: 'card' | 'cod' | 'bank_transfer';
  paymentStatus: 'paid' | 'pending' | 'cod';
  items: CartItem[];
  subtotalLKR: number;
  deliveryFeeLKR: number;
  totalLKR: number;
  status: OrderStatus;
  orderDate: string;
  associatedPrescriptionId?: string;
  trackingNumber: string;
  pharmacistSignOff?: string;
}

export interface Inquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  category: 'drug_interaction' | 'dosage_advice' | 'stock_inquiry' | 'prescription_guidance' | 'general';
  subject: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'resolved';
  response?: string;
  respondedBy?: string;
  respondedAt?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'prescription' | 'order' | 'inventory' | 'inquiry' | 'info';
  timestamp: string;
  read: boolean;
  targetRole?: UserRole | 'all';
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'pharmacist' | 'inventory_officer' | 'admin' | 'dispatcher';
  slmcLicense?: string;
  email: string;
  phone: string;
  status: 'active' | 'on_leave';
  shift: 'Morning' | 'Evening' | 'Night';
}

export interface HealthArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  tags: string[];
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  details: string;
  severity: 'info' | 'warning' | 'critical';
}

export type AdviceCategory = 
  | 'emergency_first_aid'
  | 'personal_care_advice'
  | 'skin_care'
  | 'communicable_diseases'
  | 'non_communicable_diseases';

export interface MedicalAdviceItem {
  id: string;
  category: AdviceCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  iconName?: string;
  severity: 'emergency' | 'warning' | 'guideline';
  urgencyLabel: string;
  summary: string;
  symptoms?: string[];
  immediateSteps: string[];
  doNotList?: string[];
  recommendedSupplies?: string[];
  kurunegalaContext?: string;
  reviewedBy: string;
}

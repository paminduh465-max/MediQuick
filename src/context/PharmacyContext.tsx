import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Prescription,
  Order,
  Inquiry,
  AppNotification,
  StaffMember,
  AuditLog,
  CartItem,
  UserRole,
  ProductCategory,
  CurrentUser
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_ORDERS,
  INITIAL_INQUIRIES,
  INITIAL_NOTIFICATIONS,
  INITIAL_STAFF,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

export type MainNavTab = 'welcome' | 'customer' | 'staff' | 'admin' | 'report';

interface PharmacyContextType {
  // Navigation & Role
  currentTab: MainNavTab;
  setCurrentTab: (tab: MainNavTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser: CurrentUser | null;
  login: (email: string, role?: UserRole, name?: string) => void;
  signup: (userData: { name: string; email: string; role: UserRole; phone: string; address?: string; slmcLicense?: string }) => void;
  logout: () => void;
  
  // Data state
  products: Product[];
  prescriptions: Prescription[];
  orders: Order[];
  inquiries: Inquiry[];
  notifications: AppNotification[];
  staffList: StaffMember[];
  auditLogs: AuditLog[];
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalLKR: number;
  cartItemCount: number;
  hasPrescriptionItemInCart: boolean;
  
  // Product actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  adjustStock: (id: string, delta: number) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  // Prescription actions
  uploadPrescription: (rx: Omit<Prescription, 'id' | 'uploadDate' | 'status'>) => string;
  updatePrescriptionStatus: (id: string, status: Prescription['status'], notes?: string, reviewerName?: string) => void;
  
  // Order actions
  placeOrder: (orderData: Omit<Order, 'id' | 'orderDate' | 'trackingNumber'>) => Order;
  updateOrderStatus: (id: string, status: Order['status'], signOff?: string) => void;
  
  // Inquiry actions
  submitInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  respondToInquiry: (id: string, response: string, responder: string) => void;
  
  // Staff actions
  addStaff: (staff: Omit<StaffMember, 'id'>) => void;
  updateStaffStatus: (id: string, status: StaffMember['status']) => void;
  
  // Notifications
  markNotificationAsRead: (id: string) => void;
  unreadCount: number;
  
  // Modals & UI helpers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isUploadRxOpen: boolean;
  setIsUploadRxOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  
  // Search & Catalog Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;

  // Reset to initial mock data
  resetAllData: () => void;
}

const PharmacyContext = createContext<PharmacyContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'mediquick_pharmacy_';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export const PharmacyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<MainNavTab>(() => loadFromStorage('currentTab', 'welcome'));
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => loadFromStorage('currentUser', null));
  
  const [products, setProducts] = useState<Product[]>(() => loadFromStorage('products', INITIAL_PRODUCTS));
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => loadFromStorage('prescriptions', INITIAL_PRESCRIPTIONS));
  const [orders, setOrders] = useState<Order[]>(() => loadFromStorage('orders', INITIAL_ORDERS));
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => loadFromStorage('inquiries', INITIAL_INQUIRIES));
  const [notifications, setNotifications] = useState<AppNotification[]>(() => loadFromStorage('notifications', INITIAL_NOTIFICATIONS));
  const [staffList, setStaffList] = useState<StaffMember[]>(() => loadFromStorage('staff', INITIAL_STAFF));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => loadFromStorage('auditLogs', INITIAL_AUDIT_LOGS));
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage('cart', []));

  // UI state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUploadRxOpen, setIsUploadRxOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');

  // Persistence hooks
  useEffect(() => saveToStorage('currentTab', currentTab), [currentTab]);
  useEffect(() => saveToStorage('currentUser', currentUser), [currentUser]);
  useEffect(() => saveToStorage('products', products), [products]);
  useEffect(() => saveToStorage('prescriptions', prescriptions), [prescriptions]);
  useEffect(() => saveToStorage('orders', orders), [orders]);
  useEffect(() => saveToStorage('inquiries', inquiries), [inquiries]);
  useEffect(() => saveToStorage('notifications', notifications), [notifications]);
  useEffect(() => saveToStorage('staff', staffList), [staffList]);
  useEffect(() => saveToStorage('auditLogs', auditLogs), [auditLogs]);
  useEffect(() => saveToStorage('cart', cart), [cart]);

  // Sync role with navigation tab and currentUser
  useEffect(() => {
    if (currentUser) {
      setUserRole(currentUser.role);
    } else {
      if (currentTab === 'staff') {
        setUserRole('pharmacist');
      } else if (currentTab === 'admin') {
        setUserRole('admin');
      } else if (currentTab === 'customer') {
        setUserRole('customer');
      }
    }
  }, [currentTab, currentUser]);

  const addAudit = (action: string, details: string, severity: 'info' | 'warning' | 'critical' = 'info') => {
    const actorName = currentUser 
      ? `${currentUser.name} (${currentUser.role})` 
      : userRole === 'admin' 
        ? 'Chandima Herath (Admin)' 
        : userRole === 'pharmacist' 
          ? 'Kasun B. Senanayake (Pharmacist)' 
          : 'Customer Portal';
    const newLog: AuditLog = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: actorName,
      role: currentUser?.role || userRole,
      action,
      details,
      severity
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const login = (email: string, role?: UserRole, name?: string) => {
    let resolvedRole: UserRole = role || 'customer';
    let resolvedName = name || 'Dhammika Ranasinghe';
    let slmcLicense: string | undefined = undefined;

    if (email.toLowerCase().includes('pharmacist') || email.toLowerCase().includes('kasun') || resolvedRole === 'pharmacist') {
      resolvedRole = 'pharmacist';
      resolvedName = name || 'Kasun B. Senanayake, B.Pharm';
      slmcLicense = 'SLMC-PH-8921';
    } else if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('chandima') || resolvedRole === 'admin') {
      resolvedRole = 'admin';
      resolvedName = name || 'Chandima Herath';
    }

    const user: CurrentUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: resolvedName,
      email,
      role: resolvedRole,
      phone: resolvedRole === 'pharmacist' ? '+94 71 889 0021' : '+94 77 654 3210',
      address: 'Kurunegala Town, Sri Lanka',
      slmcLicense,
      isRegistered: true
    };

    setCurrentUser(user);
    setUserRole(resolvedRole);
    addAudit('User Login', `Session started for ${user.name} (${user.role})`, 'info');

    // Auto navigate to role primary view
    if (resolvedRole === 'pharmacist') {
      setCurrentTab('staff');
    } else if (resolvedRole === 'admin') {
      setCurrentTab('admin');
    } else {
      setCurrentTab('customer');
    }
  };

  const signup = (userData: { name: string; email: string; role: UserRole; phone: string; address?: string; slmcLicense?: string }) => {
    const newUser: CurrentUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      address: userData.address || 'Kurunegala',
      slmcLicense: userData.slmcLicense,
      isRegistered: true
    };

    setCurrentUser(newUser);
    setUserRole(userData.role);
    addAudit('User Registration', `New ${userData.role} registered: ${userData.name} (${userData.email})`, 'info');

    if (userData.role === 'pharmacist') {
      setCurrentTab('staff');
    } else if (userData.role === 'admin') {
      setCurrentTab('admin');
    } else {
      setCurrentTab('customer');
    }
  };

  const logout = () => {
    const prevUser = currentUser?.name || 'User';
    setCurrentUser(null);
    setUserRole('customer');
    addAudit('User Logout', `${prevUser} signed out of system`, 'info');
    setCurrentTab('welcome');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    // Add brief notification
    setNotifications(prev => [
      {
        id: `NT-${Date.now()}`,
        title: 'Item Added to Cart',
        message: `${product.name} (${quantity}x) added to your shopping cart.`,
        type: 'info',
        timestamp: 'Just now',
        read: false,
        targetRole: 'customer'
      },
      ...prev
    ]);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalLKR = cart.reduce((sum, item) => sum + (item.product.priceLKR * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const hasPrescriptionItemInCart = cart.some(item => item.product.requiresPrescription);

  // Product Actions
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newId = `MED-${String(products.length + 1).padStart(3, '0')}`;
    const newProd: Product = { ...productData, id: newId };
    setProducts(prev => [newProd, ...prev]);
    addAudit('Product Registered', `Added new product "${newProd.name}" (${newProd.category}) to MediQuick catalog.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    addAudit('Product Updated', `Updated catalog details for product ID ${id}.`);
  };

  const deleteProduct = (id: string) => {
    const prod = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    addAudit('Product Removed', `Removed ${prod?.name || id} from MediQuick catalog.`, 'warning');
  };

  const adjustStock = (id: string, delta: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + delta);
        return {
          ...p,
          stock: newStock,
          inStock: newStock > 0
        };
      }
      return p;
    }));
    addAudit('Inventory Adjustment', `Adjusted stock for product ${id} by ${delta > 0 ? '+' : ''}${delta} units.`);
  };

  // Prescription Actions
  const uploadPrescription = (rxData: Omit<Prescription, 'id' | 'uploadDate' | 'status'>): string => {
    const id = `RX-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newRx: Prescription = {
      ...rxData,
      id,
      uploadDate: new Date().toLocaleString(),
      status: 'pending'
    };
    setPrescriptions(prev => [newRx, ...prev]);
    setNotifications(prev => [
      {
        id: `NT-${Date.now()}`,
        title: 'New Prescription Submitted',
        message: `Prescription #${id} uploaded for ${newRx.patientName}. Ready for Pharmacist review.`,
        type: 'prescription',
        timestamp: 'Just now',
        read: false,
        targetRole: 'pharmacist'
      },
      ...prev
    ]);
    addAudit('Prescription Ingested', `Customer uploaded Rx #${id} for patient ${newRx.patientName} (Doctor: ${newRx.doctorName}).`);
    return id;
  };

  const updatePrescriptionStatus = (id: string, status: Prescription['status'], notes?: string, reviewerName?: string) => {
    setPrescriptions(prev => prev.map(rx => {
      if (rx.id === id) {
        return {
          ...rx,
          status,
          pharmacistReviewNotes: notes || rx.pharmacistReviewNotes,
          reviewedBy: reviewerName || 'Pharmacist on Duty (SLMC-P8821)',
          reviewedAt: new Date().toLocaleString()
        };
      }
      return rx;
    }));

    setNotifications(prev => [
      {
        id: `NT-${Date.now()}`,
        title: `Prescription #${id} ${status.toUpperCase()}`,
        message: status === 'approved' 
          ? `Your prescription #${id} has been verified by the licensed pharmacist. You may now proceed with medicine fulfillment.`
          : `Prescription #${id} status changed to ${status}. Notes: ${notes || 'Updated by pharmacy staff.'}`,
        type: 'prescription',
        timestamp: 'Just now',
        read: false,
        targetRole: 'customer'
      },
      ...prev
    ]);

    addAudit('Prescription Verification', `Rx #${id} status changed to [${status}]. Reviewer: ${reviewerName || 'Pharmacist'}.`);
  };

  // Order Actions
  const placeOrder = (orderData: Omit<Order, 'id' | 'orderDate' | 'trackingNumber'>): Order => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const tracking = `MQ-${orderData.deliveryMethod.substring(0, 3).toUpperCase()}-${orderNum}`;
    const newOrder: Order = {
      ...orderData,
      id: `ORD-2026-${orderNum}`,
      orderDate: new Date().toLocaleString(),
      trackingNumber: tracking,
      pharmacistSignOff: hasPrescriptionItemInCart ? 'Pending Final Dispensing Check' : 'Auto-Verified (OTC)'
    };
    
    setOrders(prev => [newOrder, ...prev]);

    // Deduct stock
    orderData.items.forEach(item => {
      adjustStock(item.product.id, -item.quantity);
    });

    clearCart();

    // Create notifications
    setNotifications(prev => [
      {
        id: `NT-ORD-${Date.now()}`,
        title: 'New Order Received',
        message: `Order #${newOrder.id} placed by ${newOrder.customerName}. Total: Rs. ${newOrder.totalLKR.toLocaleString()}`,
        type: 'order',
        timestamp: 'Just now',
        read: false,
        targetRole: 'pharmacist'
      },
      {
        id: `NT-ORD-CUST-${Date.now()}`,
        title: 'Order Confirmed!',
        message: `Thank you for choosing MediQuick. Your order #${newOrder.id} (${tracking}) is being prepared.`,
        type: 'order',
        timestamp: 'Just now',
        read: false,
        targetRole: 'customer'
      },
      ...prev
    ]);

    addAudit('Order Placed', `Order #${newOrder.id} created with ${newOrder.items.length} items. Total: Rs. ${newOrder.totalLKR}.`);
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: Order['status'], signOff?: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === id) {
        return {
          ...ord,
          status,
          pharmacistSignOff: signOff || ord.pharmacistSignOff
        };
      }
      return ord;
    }));

    setNotifications(prev => [
      {
        id: `NT-${Date.now()}`,
        title: `Order Status: ${status.replace('_', ' ').toUpperCase()}`,
        message: `Order #${id} has transitioned to status: ${status.replace(/_/g, ' ')}.`,
        type: 'order',
        timestamp: 'Just now',
        read: false,
        targetRole: 'customer'
      },
      ...prev
    ]);

    addAudit('Order Status Transition', `Order #${id} updated to state: ${status}.`);
  };

  // Inquiry Actions
  const submitInquiry = (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toLocaleString(),
      status: 'pending'
    };
    setInquiries(prev => [newInquiry, ...prev]);

    setNotifications(prev => [
      {
        id: `NT-${Date.now()}`,
        title: 'Customer Medical Inquiry',
        message: `New query from ${newInquiry.customerName} on ${newInquiry.category.replace('_', ' ')}.`,
        type: 'inquiry',
        timestamp: 'Just now',
        read: false,
        targetRole: 'pharmacist'
      },
      ...prev
    ]);

    addAudit('Inquiry Submitted', `Customer submitted consultation query: "${newInquiry.subject}"`);
  };

  const respondToInquiry = (id: string, response: string, responder: string) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return {
          ...inq,
          status: 'resolved',
          response,
          respondedBy: responder,
          respondedAt: new Date().toLocaleString()
        };
      }
      return inq;
    }));

    setNotifications(prev => [
      {
        id: `NT-${Date.now()}`,
        title: 'Pharmacist Replied to Your Inquiry',
        message: `Pharmacist ${responder} replied to your health question: "${response.substring(0, 60)}..."`,
        type: 'inquiry',
        timestamp: 'Just now',
        read: false,
        targetRole: 'customer'
      },
      ...prev
    ]);

    addAudit('Inquiry Resolved', `Pharmacist responded to customer query ID ${id}.`);
  };

  // Staff Management
  const addStaff = (staffData: Omit<StaffMember, 'id'>) => {
    const newStaff: StaffMember = {
      ...staffData,
      id: `STF-${String(staffList.length + 1).padStart(3, '0')}`
    };
    setStaffList(prev => [...prev, newStaff]);
    addAudit('Staff Onboarded', `Added staff member ${newStaff.name} as ${newStaff.role}.`);
  };

  const updateStaffStatus = (id: string, status: StaffMember['status']) => {
    setStaffList(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    addAudit('Staff Status Changed', `Staff member ${id} status changed to ${status}.`);
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const resetAllData = () => {
    setProducts(INITIAL_PRODUCTS);
    setPrescriptions(INITIAL_PRESCRIPTIONS);
    setOrders(INITIAL_ORDERS);
    setInquiries(INITIAL_INQUIRIES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setStaffList(INITIAL_STAFF);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setCart([]);
    localStorage.clear();
  };

  return (
    <PharmacyContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        userRole,
        setUserRole,
        currentUser,
        login,
        signup,
        logout,
        products,
        prescriptions,
        orders,
        inquiries,
        notifications,
        staffList,
        auditLogs,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalLKR,
        cartItemCount,
        hasPrescriptionItemInCart,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustStock,
        selectedProduct,
        setSelectedProduct,
        uploadPrescription,
        updatePrescriptionStatus,
        placeOrder,
        updateOrderStatus,
        submitInquiry,
        respondToInquiry,
        addStaff,
        updateStaffStatus,
        markNotificationAsRead,
        unreadCount,
        isCartOpen,
        setIsCartOpen,
        isUploadRxOpen,
        setIsUploadRxOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        resetAllData
      }}
    >
      {children}
    </PharmacyContext.Provider>
  );
};

export const usePharmacy = (): PharmacyContextType => {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error('usePharmacy must be used within a PharmacyProvider');
  }
  return context;
};

import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  FileText, 
  ShieldAlert, 
  Truck, 
  Package, 
  CheckCircle2,
  Store,
  CreditCard,
  Banknote,
  MapPin,
  Check
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';
import { Order } from '../../types';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    cartTotalLKR,
    hasPrescriptionItemInCart,
    prescriptions,
    placeOrder,
    setCurrentTab,
    setIsUploadRxOpen
  } = usePharmacy();

  const [deliveryMethod, setDeliveryMethod] = useState<Order['deliveryMethod']>('kurunegala_express');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('cod');
  const [address, setAddress] = useState('No. 45/A, Circular Road, Kurunegala');
  const [customerName, setCustomerName] = useState('Dhammika Ranasinghe');
  const [customerPhone, setCustomerPhone] = useState('+94 77 654 3210');
  const [selectedRxId, setSelectedRxId] = useState<string>(
    prescriptions.length > 0 ? prescriptions[0].id : ''
  );
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  if (!isCartOpen) return null;

  const deliveryFee = deliveryMethod === 'store_pickup' ? 0 : 250;
  const grandTotal = cartTotalLKR + deliveryFee;

  const handlePlaceOrder = () => {
    const order = placeOrder({
      customerName,
      customerPhone,
      customerEmail: 'dhammika.r@gmail.com',
      deliveryAddress: deliveryMethod === 'store_pickup' ? 'Kurunegala Central Pharmacy Store Pickup' : address,
      city: 'Kurunegala',
      district: 'Kurunegala District',
      deliveryMethod,
      paymentMethod,
      paymentStatus: paymentMethod === 'card' ? 'paid' : 'cod',
      items: [...cart],
      subtotalLKR: cartTotalLKR,
      deliveryFeeLKR: deliveryFee,
      totalLKR: grandTotal,
      status: hasPrescriptionItemInCart ? 'prescription_verification' : 'processing',
      associatedPrescriptionId: hasPrescriptionItemInCart ? selectedRxId : undefined
    });

    setLastPlacedOrder(order);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={() => {
          setIsCartOpen(false);
          setLastPlacedOrder(null);
        }}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-2xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Cart Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base font-bold text-slate-900">Your Cart</h2>
              {cart.length > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {cart.length} items
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setLastPlacedOrder(null);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* If order just completed */}
          {lastPlacedOrder ? (
            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Order Confirmed!</h3>
              <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                Thank you, {lastPlacedOrder.customerName}. Your order has been placed with MediQuick Pharmacy Kurunegala.
              </p>
              
              <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order Reference:</span>
                  <span className="font-bold text-slate-900">{lastPlacedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tracking Number:</span>
                  <span className="font-mono font-bold text-emerald-700">{lastPlacedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Amount:</span>
                  <span className="font-bold text-slate-900">Rs. {lastPlacedOrder.totalLKR.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-semibold text-[11px]">
                    {lastPlacedOrder.status === 'prescription_verification' ? 'Rx Verification Pending' : 'Processing'}
                  </span>
                </div>
              </div>

              <div className="w-full space-y-2 pt-4">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setLastPlacedOrder(null);
                    setCurrentTab('customer');
                  }}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  View in My Orders
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setLastPlacedOrder(null);
                  }}
                  className="w-full py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Rx Warning Banner if cart contains prescription medicines */}
              {hasPrescriptionItemInCart && (
                <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold">Prescription Items Detected</p>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      Your cart contains scheduled prescription medicines. Please attach an active prescription below.
                    </p>
                    {prescriptions.length > 0 ? (
                      <div className="mt-2">
                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-0.5">Select Uploaded Rx</label>
                        <select
                          value={selectedRxId}
                          onChange={(e) => setSelectedRxId(e.target.value)}
                          className="w-full p-1.5 text-xs bg-white border border-amber-300 rounded-lg text-slate-800"
                        >
                          {prescriptions.map((rx) => (
                            <option key={rx.id} value={rx.id}>
                              {rx.id} - {rx.patientName} ({rx.doctorName})
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsUploadRxOpen(true)}
                        className="mt-1.5 text-[11px] font-bold text-emerald-800 underline hover:text-emerald-950 flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" /> Upload Prescription Now
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-slate-100">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-400">
                      <Package className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm">Your shopping cart is empty</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      Browse our categorized inventory of prescription and over-the-counter medicines.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {cart.map(({ product, quantity }) => {
                        if (!product) return null;
                        return (
                          <div key={product.id} className="py-2.5 flex gap-3">
                            <img
                              src={product.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'}
                              alt={product.name || 'Medicine'}
                              className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-50"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-xs font-bold text-slate-900 truncate">
                                  {product.name}
                                </h4>
                                <button
                                  onClick={() => removeFromCart(product.id)}
                                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <p className="text-[11px] text-slate-500 truncate mb-1">
                                {product.genericName} • {product.strength}
                              </p>

                              {product.requiresPrescription && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded mb-1">
                                  <FileText className="w-2.5 h-2.5" /> Rx Required
                                </span>
                              )}

                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs font-bold text-slate-900">
                                  Rs. {(product.priceLKR * quantity).toLocaleString()}
                                </span>

                                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 text-xs font-bold">
                                  <button
                                    onClick={() => updateCartQuantity(product.id, quantity - 1)}
                                    className="px-2 py-0.5 text-slate-600 hover:bg-slate-200"
                                  >
                                    -
                                  </button>
                                  <span className="px-2 text-slate-800">{quantity}</span>
                                  <button
                                    onClick={() => updateCartQuantity(product.id, quantity + 1)}
                                    className="px-2 py-0.5 text-slate-600 hover:bg-slate-200"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Delivery & Payment Options */}
                    <div className="pt-4 border-t border-slate-200 space-y-3 text-xs">
                      <div>
                        <span className="block font-bold text-slate-700 mb-1.5">Delivery Method</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setDeliveryMethod('kurunegala_express')}
                            className={`p-2 rounded-xl border text-left flex items-start gap-1.5 transition-all ${
                              deliveryMethod === 'kurunegala_express'
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <Truck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                            <div>
                              <p className="text-[11px] leading-tight">Kurunegala Express</p>
                              <span className="text-[10px] text-slate-500 font-normal">Rs. 250</span>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeliveryMethod('store_pickup')}
                            className={`p-2 rounded-xl border text-left flex items-start gap-1.5 transition-all ${
                              deliveryMethod === 'store_pickup'
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <Store className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                            <div>
                              <p className="text-[11px] leading-tight">Pharmacy Pickup</p>
                              <span className="text-[10px] text-emerald-700 font-bold">Free</span>
                            </div>
                          </button>
                        </div>
                      </div>

                      {deliveryMethod !== 'store_pickup' && (
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Delivery Address</label>
                          <div className="relative">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Address in Kurunegala"
                              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="block font-bold text-slate-700 mb-1.5">Payment Method</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('cod')}
                            className={`p-2 rounded-xl border text-left flex items-start gap-1.5 transition-all ${
                              paymentMethod === 'cod'
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <Banknote className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                            <div>
                              <p className="text-[11px] leading-tight">Cash on Delivery</p>
                              <span className="text-[10px] text-slate-500 font-normal">Pay upon receipt</span>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`p-2 rounded-xl border text-left flex items-start gap-1.5 transition-all ${
                              paymentMethod === 'card'
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <CreditCard className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                            <div>
                              <p className="text-[11px] leading-tight">Online Card</p>
                              <span className="text-[10px] text-slate-500 font-normal">Visa / Master</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900">Rs. {cartTotalLKR.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Delivery Fee</span>
                      <span className="font-semibold text-slate-900">
                        {deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                      <span>Total Amount</span>
                      <span className="text-emerald-700 text-base">
                        Rs. {grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={clearCart}
                      className="px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                    >
                      <span>Place Order (Rs. {grandTotal.toLocaleString()})</span>
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

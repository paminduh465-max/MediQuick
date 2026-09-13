import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  AlertOctagon, 
  ShieldAlert, 
  CheckCircle2, 
  ShoppingBag, 
  Thermometer, 
  Package, 
  Calendar, 
  UploadCloud, 
  HelpCircle 
} from 'lucide-react';
import { Product } from '../../types';
import { usePharmacy } from '../../context/PharmacyContext';

interface ProductDetailModalProps {
  product?: Product | null;
  onClose?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product: propProduct, onClose }) => {
  const { addToCart, setIsUploadRxOpen, selectedProduct, setSelectedProduct } = usePharmacy();
  const [quantity, setQuantity] = useState(1);

  const product = propProduct || selectedProduct;

  if (!product) {
    return null;
  }

  const handleClose = () => {
    setSelectedProduct(null);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Modal Header */}
        <div className="relative aspect-16/7 bg-slate-100 overflow-hidden">
          <img
            src={product.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'}
            alt={product.name || 'Medicine'}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="bg-slate-950/80 backdrop-blur-xs px-3 py-1 rounded-lg text-xs font-semibold">
              {product.brand}
            </span>
            <span className="bg-emerald-600/90 backdrop-blur-xs px-3 py-1 rounded-lg text-xs font-semibold">
              Batch: {product.batchNumber}
            </span>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {product.requiresPrescription ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  <FileText className="w-3.5 h-3.5" /> Prescription Required (Schedule IV Drug)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Over-The-Counter (OTC)
                </span>
              )}
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                {product.dosageForm} • {product.strength}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">{product.name}</h2>
            <p className="text-sm font-medium text-emerald-700 italic">{product.genericName}</p>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">{product.description}</p>
          </div>

          {/* Dosage and Usage Guidelines */}
          {product.dosageGuidelines && (
            <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-100">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Dosage Guidelines & Administration
              </h4>
              <p className="text-sm text-emerald-950 leading-relaxed font-medium">
                {product.dosageGuidelines}
              </p>
            </div>
          )}

          {/* Safety & Contraindications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-100">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-amber-700" /> Contraindications & Warnings
              </h4>
              <ul className="space-y-1 text-xs text-amber-950">
                {product.contraindications && product.contraindications.length > 0 ? (
                  product.contraindications.map((contra, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{contra}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-amber-900">None reported for standard therapeutic doses.</li>
                )}
              </ul>
              {product.safetyInstructions && (
                <p className="mt-2 text-[11px] text-amber-800 font-medium">
                  {product.safetyInstructions}
                </p>
              )}
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-slate-600" /> Reported Side Effects
              </h4>
              <ul className="space-y-1 text-xs text-slate-700">
                {product.sideEffects && product.sideEffects.length > 0 ? (
                  product.sideEffects.map((side, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-400 font-bold">•</span>
                      <span>{side}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-slate-500">No common adverse effects noted.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Storage & Regulatory Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-slate-500" />
              <div>
                <span className="text-slate-400 block text-[10px]">Storage</span>
                <span className="font-semibold text-slate-800">{product.storageInstructions || 'Below 25°C'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <div>
                <span className="text-slate-400 block text-[10px]">Expiry Date</span>
                <span className="font-semibold text-slate-800">{product.expiryDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-slate-500" />
              <div>
                <span className="text-slate-400 block text-[10px]">Stock Availability</span>
                <span className={`font-semibold ${product.stock > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {product.stock > 0 ? `${product.stock} units available` : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>

          {/* If requires prescription, show upload CTA */}
          {product.requiresPrescription && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h5 className="font-bold text-xs text-rose-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" /> Valid Prescription Required
                </h5>
                <p className="text-xs text-rose-700 mt-0.5">
                  Sri Lanka NMRA regulations require a licensed doctor's prescription for this medication.
                </p>
              </div>
              <button
                onClick={() => {
                  handleClose();
                  setIsUploadRxOpen(true);
                }}
                className="shrink-0 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Prescription</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer with Pricing & Add to Cart */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Total Price</span>
            <div className="text-2xl font-black text-slate-900">
              Rs. {((product.priceLKR || 0) * quantity).toLocaleString()}
              {quantity > 1 && (
                <span className="text-xs text-slate-500 font-normal ml-2">
                  (Rs. {(product.priceLKR || 0).toLocaleString()} each)
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors font-bold text-sm"
              >
                -
              </button>
              <span className="px-3 text-sm font-bold text-slate-900">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors font-bold text-sm"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product, quantity);
                handleClose();
              }}
              disabled={!product.inStock}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white rounded-xl font-bold text-sm shadow-md transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

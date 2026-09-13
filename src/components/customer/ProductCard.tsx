import React from 'react';
import { 
  FileText, 
  ShoppingBag, 
  AlertTriangle, 
  Info, 
  Check, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { Product } from '../../types';
import { usePharmacy } from '../../context/PharmacyContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, cart } = usePharmacy();
  const inCart = cart.find(item => item.product.id === product.id);

  const getCategoryBadge = (cat: Product['category']) => {
    switch (cat) {
      case 'prescription':
        return <span className="bg-rose-100 text-rose-800 text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1"><FileText className="w-3 h-3" /> Rx Required</span>;
      case 'otc':
        return <span className="bg-sky-100 text-sky-800 text-[11px] font-semibold px-2 py-0.5 rounded-md">OTC Medicine</span>;
      case 'wellness':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-md">Wellness</span>;
      case 'personal_care':
        return <span className="bg-purple-100 text-purple-800 text-[11px] font-semibold px-2 py-0.5 rounded-md">Personal Care</span>;
    }
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* Product Image and Badges */}
      <div className="relative aspect-4/3 bg-slate-50 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {getCategoryBadge(product.category)}
        </div>

        {product.stock <= product.minStockAlert && product.stock > 0 && (
          <div className="absolute bottom-2 left-2.5 bg-amber-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
            <Clock className="w-2.5 h-2.5" /> Low Stock: {product.stock} left
          </div>
        )}
      </div>

      {/* Product Details Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mb-1">
          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">{product.dosageForm}</span>
          <span>•</span>
          <span>{product.strength}</span>
          <span>•</span>
          <span>{product.packSize}</span>
        </div>

        <h3 
          onClick={() => setSelectedProduct(product)}
          className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1"
          title={product.name}
        >
          {product.name}
        </h3>
        
        <p className="text-xs text-slate-500 italic mb-2 line-clamp-1">
          {product.genericName}
        </p>

        <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>

        {/* Quick dosage instruction glance */}
        <div className="bg-slate-50 rounded-xl p-2.5 text-[11px] text-slate-600 border border-slate-100 mb-3 flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span className="line-clamp-2">
            <strong>Dosage:</strong> {product.dosageGuidelines}
          </span>
        </div>

        {/* Price & Action Footer */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block leading-tight">Price</span>
            <span className="text-lg font-bold text-slate-900">
              Rs. {product.priceLKR.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              id={`view-detail-btn-${product.id}`}
              onClick={() => setSelectedProduct(product)}
              className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors text-xs font-semibold"
              title="View full medical guidelines & contraindications"
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              id={`add-to-cart-btn-${product.id}`}
              onClick={() => addToCart(product, 1)}
              disabled={!product.inStock}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                product.inStock
                  ? inCart
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added ({inCart.quantity})</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>

        {product.requiresPrescription && (
          <div className="mt-2 text-[10px] text-rose-600 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-rose-500" />
            <span>Prescription verification required before dispatch</span>
          </div>
        )}
      </div>
    </div>
  );
};

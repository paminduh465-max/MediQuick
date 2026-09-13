import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Layers, 
  SlidersHorizontal, 
  Sparkles, 
  FileText, 
  Pill, 
  Heart, 
  Smile, 
  Check,
  Search
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';
import { ProductCard } from './ProductCard';
import { ProductCategory, Product } from '../../types';

export const ProductCatalog: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery 
  } = usePharmacy();

  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [rxFilter, setRxFilter] = useState<'all' | 'rx_only' | 'otc_only'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'name'>('featured');

  const categories: { id: ProductCategory; label: string; icon: any }[] = [
    { id: 'all', label: 'All Healthcare Products', icon: Layers },
    { id: 'prescription', label: 'Prescription Medicines', icon: FileText },
    { id: 'otc', label: 'Over-the-Counter (OTC)', icon: Pill },
    { id: 'wellness', label: 'Wellness & Supplements', icon: Heart },
    { id: 'personal_care', label: 'Personal Care & Hygiene', icon: Smile },
  ];

  const forms = ['all', 'Tablet', 'Capsule', 'Syrup', 'Inhaler', 'Cream', 'Powder', 'Device'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Dosage form filter
      if (selectedForm !== 'all' && product.dosageForm !== selectedForm) {
        return false;
      }

      // Rx filter
      if (rxFilter === 'rx_only' && !product.requiresPrescription) return false;
      if (rxFilter === 'otc_only' && product.requiresPrescription) return false;

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchGeneric = product.genericName.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        if (!matchName && !matchGeneric && !matchBrand && !matchCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.priceLKR - b.priceLKR;
      if (sortBy === 'price_desc') return b.priceLKR - a.priceLKR;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedForm, rxFilter, searchQuery, sortBy]);

  return (
    <div id="medicine-catalog-anchor" className="space-y-6">
      
      {/* Category Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1 text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span>Filter:</span>
          </div>

          {/* Rx Requirement Filter */}
          <select
            value={rxFilter}
            onChange={(e) => setRxFilter(e.target.value as any)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">All Medicine Types</option>
            <option value="rx_only">Prescription Only (Rx)</option>
            <option value="otc_only">OTC & Wellness Only</option>
          </select>

          {/* Form Factor Filter */}
          <select
            value={selectedForm}
            onChange={(e) => setSelectedForm(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">All Dosage Forms</option>
            {forms.filter(f => f !== 'all').map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          {(selectedCategory !== 'all' || selectedForm !== 'all' || rxFilter !== 'all' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedForm('all');
                setRxFilter('all');
                setSearchQuery('');
              }}
              className="text-emerald-700 hover:text-emerald-900 font-bold underline text-[11px] ml-1"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Right: Sort and Count */}
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-[11px]">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="featured">Featured First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">No matching medications found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or clearing your form and prescription filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedForm('all');
              setRxFilter('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

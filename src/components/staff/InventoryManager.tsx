import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  X, 
  Edit3, 
  Trash2, 
  Calendar, 
  DollarSign, 
  Layers, 
  TrendingUp,
  FileText
} from 'lucide-react';
import { usePharmacy } from '../../context/PharmacyContext';
import { Product } from '../../types';

export const InventoryManager: React.FC = () => {
  const { 
    products, 
    adjustStock, 
    updateProduct, 
    addProduct, 
    deleteProduct 
  } = usePharmacy();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Product Form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdGeneric, setNewProdGeneric] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('prescription');
  const [newProdPrice, setNewProdPrice] = useState(750);
  const [newProdStock, setNewProdStock] = useState(100);
  const [newProdMinStock, setNewProdMinStock] = useState(20);
  const [newProdForm, setNewProdForm] = useState<Product['dosageForm']>('Tablet');
  const [newProdStrength, setNewProdStrength] = useState('500mg');
  const [newProdRequiresRx, setNewProdRequiresRx] = useState(true);
  const [newProdPackSize, setNewProdPackSize] = useState('Strip of 20 tablets');
  const [newProdBatch, setNewProdBatch] = useState('MQ-2026-001');
  const [newProdExpiry, setNewProdExpiry] = useState('2027-12-31');
  const [newProdDesc, setNewProdDesc] = useState('Standard clinical formulation for therapeutic indication.');
  const [newProdDosage, setNewProdDosage] = useState('Take 1 tablet twice daily with meals as directed by physician.');
  const [newProdSafety, setNewProdSafety] = useState('Store below 25C. Keep away from direct sunlight.');

  const totalStockUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValuationLKR = products.reduce((sum, p) => sum + (p.priceLKR * p.stock), 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStockAlert).length;

  const filteredProducts = products.filter(p => {
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.genericName.toLowerCase().includes(q) ||
        p.batchNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProdName,
      genericName: newProdGeneric,
      brand: newProdBrand,
      category: newProdCategory,
      priceLKR: Number(newProdPrice),
      stock: Number(newProdStock),
      minStockAlert: Number(newProdMinStock),
      dosageForm: newProdForm,
      strength: newProdStrength,
      requiresPrescription: newProdRequiresRx,
      packSize: newProdPackSize,
      description: newProdDesc,
      dosageGuidelines: newProdDosage,
      safetyInstructions: newProdSafety,
      contraindications: ['Known hypersensitivity'],
      sideEffects: ['Mild nausea', 'Headache'],
      storageInstructions: 'Store in cool dry place below 25°C',
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
      batchNumber: newProdBatch,
      expiryDate: newProdExpiry,
      inStock: Number(newProdStock) > 0,
      featured: false
    });
    setShowAddModal(false);
    // Reset form
    setNewProdName('');
    setNewProdGeneric('');
    setNewProdBrand('');
  };

  return (
    <div className="space-y-6">
      
      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Total Listed SKUs</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{products.length}</div>
          <span className="text-[11px] text-emerald-700 font-medium">Across 4 major categories</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Stock Units in Store</span>
            <Package className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalStockUnits.toLocaleString()}</div>
          <span className="text-[11px] text-slate-500 font-medium">Kurunegala Central Hub</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Low Stock Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600">{lowStockCount}</div>
          <span className="text-[11px] text-amber-700 font-medium">Requires supplier replenishment</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Total Inventory Value</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            Rs. {totalValuationLKR.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">LKR Wholesale / Retail</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[260px]">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by medicine name, generic name, batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700"
          >
            <option value="all">All Categories</option>
            <option value="prescription">Prescription</option>
            <option value="otc">Over-the-Counter</option>
            <option value="wellness">Wellness</option>
            <option value="personal_care">Personal Care</option>
          </select>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Medicine / Consignment</span>
        </button>

      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Medicine Name & Generic</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Batch / Expiry</th>
                <th className="px-4 py-3.5">Price (LKR)</th>
                <th className="px-4 py-3.5">Current Stock</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProducts.map(p => {
                const isLow = p.stock <= p.minStockAlert;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={p.imageUrl} alt={p.name} className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0" />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 truncate">{p.name}</div>
                          <div className="text-[11px] text-slate-500 truncate">{p.genericName} • {p.strength}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 capitalize">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        p.category === 'prescription' ? 'bg-rose-100 text-rose-800' :
                        p.category === 'otc' ? 'bg-sky-100 text-sky-800' :
                        p.category === 'wellness' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {p.category.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-mono text-slate-800 text-[11px]">{p.batchNumber}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Exp: {p.expiryDate}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-bold text-slate-900">
                      Rs. {p.priceLKR.toLocaleString()}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${isLow ? 'text-amber-600' : 'text-slate-900'}`}>
                          {p.stock}
                        </span>
                        {isLow && (
                          <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                            LOW
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                          p.inStock && p.stock > 0
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                        }`}
                      >
                        {p.inStock && p.stock > 0 ? 'Active (In Stock)' : 'Out of Stock'}
                      </button>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        {/* Quick stock decrement & increment buttons */}
                        <button
                          onClick={() => adjustStock(p.id, -10)}
                          title="Reduce stock by 10"
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-bold text-slate-700"
                        >
                          -10
                        </button>
                        <button
                          onClick={() => adjustStock(p.id, 10)}
                          title="Add 10 units"
                          className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded text-[11px] font-bold"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          title="Delete from Catalog"
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 my-6">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">Add New Pharmaceutical Product</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="p-6 max-h-[70vh] overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Product Brand Name *</label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Augmentin 625mg"
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Generic Name / Active Substance *</label>
                  <input
                    type="text"
                    required
                    value={newProdGeneric}
                    onChange={(e) => setNewProdGeneric(e.target.value)}
                    placeholder="e.g. Amoxicillin + Clavulanic Acid"
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full p-2 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="prescription">Prescription</option>
                    <option value="otc">Over-The-Counter</option>
                    <option value="wellness">Wellness</option>
                    <option value="personal_care">Personal Care</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Dosage Form</label>
                  <select
                    value={newProdForm}
                    onChange={(e) => setNewProdForm(e.target.value as any)}
                    className="w-full p-2 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Inhaler">Inhaler</option>
                    <option value="Cream">Cream</option>
                    <option value="Powder">Powder</option>
                    <option value="Device">Device</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Strength</label>
                  <input
                    type="text"
                    value={newProdStrength}
                    onChange={(e) => setNewProdStrength(e.target.value)}
                    placeholder="e.g. 500mg, 10mg/ml"
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (LKR) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Initial Stock Units *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Low Stock Alert Level</label>
                  <input
                    type="number"
                    value={newProdMinStock}
                    onChange={(e) => setNewProdMinStock(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch Number *</label>
                  <input
                    type="text"
                    required
                    value={newProdBatch}
                    onChange={(e) => setNewProdBatch(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    required
                    value={newProdExpiry}
                    onChange={(e) => setNewProdExpiry(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="requiresRxCheck"
                  checked={newProdRequiresRx}
                  onChange={(e) => setNewProdRequiresRx(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="requiresRxCheck" className="font-bold text-slate-800">
                  Requires Valid Doctor Prescription (Schedule IV Restricted Drug)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs"
                >
                  Save to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

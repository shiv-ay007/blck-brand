import { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Package,
  Layers,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';
import ProductModal from '../Components/ProductModal.jsx';
import StatusBadge from '../Components/StatusBadge.jsx';

export default function Products() {
  const { products, addProduct, updateProduct, toggleProductVisibility, deleteProduct } =
    useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchSearch =
        prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.subName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prod.color?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter === 'All' || prod.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [products, searchTerm, categoryFilter]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...formData });
    } else {
      addProduct(formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#028f99]">
              INVENTORY & RELEASES
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-mono text-slate-500">CATALOG</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-mono">
            PRODUCT MANAGEMENT
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold font-mono tracking-wider uppercase rounded-lg transition-colors shadow-xs"
        >
          <Plus size={15} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers size={15} className="text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-mono font-semibold bg-transparent text-slate-700 outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Footwear & Socks">Footwear & Socks</option>
            <option value="Heavyweight Tees">Heavyweight Tees</option>
            <option value="Capsules & Drops">Capsules & Drops</option>
          </select>
        </div>

        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by title, colorway..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
          />
        </div>
      </div>

      {/* Product Grid / Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => {
          const isLowStock = product.stock <= 5;
          const isHidden = product.status === 'Hidden';

          return (
            <div
              key={product.id}
              className={`bg-white border rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                isHidden ? 'border-slate-300 opacity-75' : 'border-slate-200'
              }`}
            >
              <div>
                {/* Product Image Box */}
                <div className="relative aspect-[4/3] bg-slate-100 flex items-center justify-center p-4 border-b border-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <StatusBadge status={product.status} />
                  </div>
                  {isLowStock && (
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-amber-500 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xs">
                      <AlertTriangle size={11} />
                      <span>LOW STOCK</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {product.id} · {product.category}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {product.name}
                  </h3>
                  <div className="text-xs text-slate-500 truncate">
                    {product.subName || product.color}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-mono">Price</span>
                      <div className="flex items-baseline gap-1.5 font-mono">
                        <span className="font-bold text-slate-900 text-sm">₹{product.price}</span>
                        {product.compareAt && (
                          <span className="line-through text-slate-400 text-xs">
                            ₹{product.compareAt}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">Available Stock</span>
                      <span
                        className={`font-mono font-bold text-xs ${
                          isLowStock ? 'text-amber-600' : 'text-slate-800'
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleProductVisibility(product.id)}
                  title={isHidden ? 'Make product active' : 'Hide from storefront'}
                  className="flex items-center gap-1 text-[11px] font-mono font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {isHidden ? <EyeOff size={13} /> : <Eye size={13} />}
                  <span>{isHidden ? 'Hidden' : 'Visible'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                    title="Edit Product"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
}

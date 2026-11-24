import { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Layers,
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
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#deded8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#028f99]">
              INVENTORY & RELEASES
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-widest">
              CATALOG
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1.5 font-heading">
            PRODUCT MANAGEMENT
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold font-mono tracking-wider uppercase rounded-xl transition-all shadow-xs"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#deded8] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Layers size={17} className="text-neutral-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-mono font-bold uppercase tracking-wider bg-transparent text-neutral-800 outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Footwear & Socks">Footwear & Socks</option>
            <option value="Heavyweight Tees">Heavyweight Tees</option>
            <option value="Capsules & Drops">Capsules & Drops</option>
          </select>
        </div>

        <div className="relative min-w-[280px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by title, colorway..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
          />
        </div>
      </div>

      {/* Product Grid / Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isLowStock = product.stock <= 5;
          const isHidden = product.status === 'Hidden';

          return (
            <div
              key={product.id}
              className={`bg-white border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                isHidden ? 'border-[#deded8] opacity-70' : 'border-[#deded8]'
              }`}
            >
              <div>
                {/* Product Image Box */}
                <div className="relative aspect-[4/3] bg-[#f7f7f4] flex items-center justify-center p-5 border-b border-[#deded8]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <StatusBadge status={product.status} />
                  </div>
                  {isLowStock && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500 text-white text-[11px] font-mono font-bold px-2.5 py-0.5 rounded shadow-xs">
                      <AlertTriangle size={12} />
                      <span>LOW STOCK</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 space-y-2.5">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                    {product.id} · {product.category}
                  </div>
                  <h3 className="font-bold text-base text-neutral-900 font-heading leading-snug">
                    {product.name}
                  </h3>
                  <div className="text-xs text-neutral-500 truncate font-sans">
                    {product.subName || product.color}
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-[#deded8]/70">
                    <div>
                      <span className="text-[11px] text-neutral-400 block font-mono">Price</span>
                      <div className="flex items-baseline gap-2 font-mono mt-0.5">
                        <span className="font-bold text-neutral-900 text-base">₹{product.price}</span>
                        {product.compareAt && (
                          <span className="line-through text-neutral-400 text-xs">
                            ₹{product.compareAt}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-neutral-400 block font-mono">Available Stock</span>
                      <span
                        className={`font-mono font-bold text-sm block mt-0.5 ${
                          isLowStock ? 'text-amber-600' : 'text-neutral-900'
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-5 py-3.5 bg-[#f7f7f4] border-t border-[#deded8] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleProductVisibility(product.id)}
                  title={isHidden ? 'Make product active' : 'Hide from storefront'}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-600 hover:text-neutral-900 transition-colors uppercase tracking-wider"
                >
                  {isHidden ? <EyeOff size={15} /> : <Eye size={15} />}
                  <span>{isHidden ? 'Hidden' : 'Visible'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
                    title="Edit Product"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 size={16} />
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

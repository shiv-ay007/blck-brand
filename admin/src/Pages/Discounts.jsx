import { useState } from 'react';
import { Tag, Plus, Trash2, Calendar, Percent, IndianRupee, X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';
import StatusBadge from '../Components/StatusBadge.jsx';

export default function Discounts() {
  const { discounts, addDiscount, deleteDiscount } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage',
    value: 15,
    minOrderValue: 999,
    usageLimit: 100,
    expiresAt: '2026-12-31',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addDiscount({
      ...formData,
      code: formData.code.toUpperCase().trim(),
      value: Number(formData.value),
      minOrderValue: Number(formData.minOrderValue),
      usageLimit: Number(formData.usageLimit),
    });
    setModalOpen(false);
    setFormData({
      code: '',
      type: 'percentage',
      value: 15,
      minOrderValue: 999,
      usageLimit: 100,
      expiresAt: '2026-12-31',
      description: '',
    });
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#deded8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#028f99]">
              MARKETING & OFFERS
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-widest">
              PROMOTIONS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1.5 font-heading">
            DISCOUNT CODES
          </h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold font-mono tracking-wider uppercase rounded-xl transition-all shadow-xs"
        >
          <Plus size={16} />
          <span>Create Promo Code</span>
        </button>
      </div>

      {/* Promo Code Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.map((disc) => (
          <div
            key={disc.id}
            className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#deded8]/60">
                <div className="flex items-center gap-2 font-mono font-bold text-lg text-neutral-900 tracking-wider">
                  <Tag size={18} className="text-[#028f99]" />
                  <span>{disc.code}</span>
                </div>
                <StatusBadge status={disc.status} />
              </div>

              <div className="py-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400 uppercase">Discount Rate</span>
                  <span className="font-heading font-extrabold text-neutral-900 text-lg">
                    {disc.type === 'percentage' ? `${disc.value}% OFF` : `₹${disc.value} FLAT`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Min. Order Value</span>
                  <span className="font-bold text-neutral-800">₹{disc.minOrderValue}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Total Usage</span>
                  <span className="font-bold text-neutral-800">
                    {disc.usedCount} / {disc.usageLimit}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400 flex items-center gap-1">
                    <Calendar size={13} />
                    <span>Expiry Date</span>
                  </span>
                  <span className="text-neutral-700 font-semibold">{disc.expiresAt}</span>
                </div>

                {disc.description && (
                  <p className="text-xs text-neutral-500 bg-[#f7f7f4] p-3 rounded-xl border border-[#deded8]/70 mt-2">
                    {disc.description}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#deded8]/60 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">{disc.id}</span>
              <button
                onClick={() => deleteDiscount(disc.id)}
                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                title="Delete Code"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
          <div className="bg-white rounded-3xl w-full max-w-lg border border-[#deded8] shadow-2xl p-7">
            <div className="flex items-center justify-between pb-4 border-b border-[#deded8]">
              <h3 className="font-bold text-lg text-neutral-900 font-heading uppercase tracking-tight">
                Create Promo Code
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="py-5 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. BLCKSTREET25"
                  className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono font-bold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                    Min. Order (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1 font-mono">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Launch weekend special"
                  className="w-full px-4 py-2.5 border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="pt-3 border-t border-[#deded8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold font-mono uppercase tracking-wider text-white bg-neutral-900 hover:bg-black rounded-xl shadow-xs"
                >
                  Save Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

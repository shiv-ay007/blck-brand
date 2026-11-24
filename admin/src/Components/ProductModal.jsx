import { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  UploadCloud,
  Image as ImageIcon,
  Link as LinkIcon,
  Palette,
  Trash2,
  Check,
} from 'lucide-react';

const PRESET_COLORS = [
  { name: 'Teal', hex: '#028f99' },
  { name: 'Pure Black', hex: '#000000' },
  { name: 'Crimson Red', hex: '#dc2626' },
  { name: 'Ivory Cream', hex: '#f5f5f0' },
  { name: 'Slate Grey', hex: '#475569' },
  { name: 'Forest Green', hex: '#166534' },
  { name: 'Royal Navy', hex: '#1e3a8a' },
  { name: 'Acid Lime', hex: '#84cc16' },
];

export default function ProductModal({ isOpen, onClose, onSave, product }) {
  const fileInputRef = useRef(null);
  const [imageInputMode, setImageInputMode] = useState('upload'); // 'upload' | 'url'
  const [selectedHex, setSelectedHex] = useState('#028f99');
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    subName: '',
    category: 'Footwear & Socks',
    price: 799,
    compareAt: 999,
    stock: 25,
    sizes: 'One Size',
    color: 'Teal (#028f99)',
    image: '/assets/blck-310-green-socks.webp',
    status: 'Active',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes || 'One Size',
      });
      // Extract hex from color string if present like (#028f99)
      const hexMatch = product.color?.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/);
      if (hexMatch) {
        setSelectedHex(hexMatch[0]);
      }
      if (product.image?.startsWith('data:')) {
        setImageInputMode('upload');
      } else {
        setImageInputMode('url');
      }
    } else {
      setFormData({
        name: '',
        subName: '',
        category: 'Footwear & Socks',
        price: 799,
        compareAt: 999,
        stock: 25,
        sizes: 'One Size',
        color: 'Teal (#028f99)',
        image: '/assets/blck-310-green-socks.webp',
        status: 'Active',
      });
      setSelectedHex('#028f99');
      setImageInputMode('upload');
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        image: event.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleColorPresetClick = (hex, name) => {
    setSelectedHex(hex);
    setFormData((prev) => ({
      ...prev,
      color: `${name} (${hex})`,
    }));
  };

  const handleNativeColorChange = (hex) => {
    setSelectedHex(hex);
    setFormData((prev) => ({
      ...prev,
      color: `Custom (${hex.toUpperCase()})`,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      compareAt: Number(formData.compareAt) || 0,
      stock: Number(formData.stock),
      sizes: formData.sizes.split(',').map((s) => s.trim()).filter(Boolean),
    };
    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto border border-[#deded8] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-7 py-5 border-b border-[#deded8] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2.5">
            <Sparkles size={20} className="text-[#028f99]" />
            <h3 className="font-bold text-lg text-neutral-900 font-heading uppercase tracking-tight">
              {product ? 'Edit Product' : 'Add New Product'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-7 space-y-5 text-sm">
          {/* Product Title */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. 310 / Teal Monster Socks"
              className="w-full px-4 py-2.5 text-sm border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-medium"
            />
          </div>

          {/* Capsule / Subtitle */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
              Capsule / Subtitle
            </label>
            <input
              type="text"
              value={formData.subName}
              onChange={(e) => setFormData({ ...formData, subName: e.target.value })}
              placeholder="e.g. Night Market Skate Crew · Teal"
              className="w-full px-4 py-2.5 text-sm border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-medium"
            />
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
                Sale Price (₹) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2.5 text-sm border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
                Compare Price (₹)
              </label>
              <input
                type="number"
                min="0"
                value={formData.compareAt}
                onChange={(e) => setFormData({ ...formData, compareAt: e.target.value })}
                className="w-full px-4 py-2.5 text-sm border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
              />
            </div>
          </div>

          {/* Stock & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
                Inventory Stock *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2.5 text-sm border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 text-sm border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-white"
              >
                <option value="Footwear & Socks">Footwear & Socks</option>
                <option value="Heavyweight Tees">Heavyweight Tees</option>
                <option value="Capsules & Drops">Capsules & Drops</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          {/* Color Chooser Section */}
          <div className="p-4 bg-[#fbfbfa] border border-[#deded8] rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-800 uppercase tracking-wider font-mono flex items-center gap-2">
                <Palette size={15} className="text-[#028f99]" />
                <span>Color Selection</span>
              </label>
              <span className="text-[11px] font-mono text-neutral-500">
                Pick color or click swatch
              </span>
            </div>

            {/* Presets + Color Picker wheel */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Native Color Picker Circle */}
              <div className="relative group">
                <input
                  type="color"
                  value={selectedHex}
                  onChange={(e) => handleNativeColorChange(e.target.value)}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-xs cursor-pointer opacity-0 absolute inset-0 z-10"
                  title="Choose Custom Color"
                />
                <div
                  className="w-8 h-8 rounded-full border-2 border-neutral-300 shadow-xs flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: selectedHex }}
                  title={`Selected: ${selectedHex}`}
                />
              </div>

              {/* Preset Swatches */}
              <div className="h-5 w-[1px] bg-neutral-300 mx-1" />

              {PRESET_COLORS.map((preset) => {
                const isSelected = selectedHex.toLowerCase() === preset.hex.toLowerCase();
                return (
                  <button
                    key={preset.hex}
                    type="button"
                    onClick={() => handleColorPresetClick(preset.hex, preset.name)}
                    className={`relative w-7 h-7 rounded-full border transition-all hover:scale-110 flex items-center justify-center ${
                      isSelected
                        ? 'border-neutral-900 ring-2 ring-neutral-900/30 scale-105'
                        : 'border-black/15 shadow-2xs'
                    }`}
                    style={{ backgroundColor: preset.hex }}
                    title={`${preset.name} (${preset.hex})`}
                  >
                    {isSelected && (
                      <Check
                        size={12}
                        className={preset.hex === '#f5f5f0' ? 'text-black' : 'text-white'}
                        strokeWidth={3}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Color Text / Name Input */}
            <div className="pt-1">
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="e.g. Teal (#028f99) or Carbon Black / Red"
                className="w-full px-3.5 py-2 text-xs border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-white font-medium"
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5 font-mono">
              Sizes (comma separated)
            </label>
            <input
              type="text"
              value={formData.sizes}
              onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
              placeholder="e.g. One Size or S, M, L"
              className="w-full px-4 py-2.5 text-sm border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {/* Product Photo Upload / Image Section */}
          <div className="p-4 bg-[#fbfbfa] border border-[#deded8] rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-800 uppercase tracking-wider font-mono flex items-center gap-2">
                <ImageIcon size={15} className="text-[#028f99]" />
                <span>Product Photo</span>
              </label>

              {/* Mode Switch Tabs */}
              <div className="flex items-center gap-1 bg-neutral-200/70 p-1 rounded-xl text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setImageInputMode('upload')}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    imageInputMode === 'upload'
                      ? 'bg-white text-neutral-900 font-bold shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <UploadCloud size={13} />
                  <span>Upload File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputMode('url')}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    imageInputMode === 'url'
                      ? 'bg-white text-neutral-900 font-bold shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <LinkIcon size={13} />
                  <span>Image URL</span>
                </button>
              </div>
            </div>

            {/* Mode 1: Drag & Drop Upload */}
            {imageInputMode === 'upload' ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files?.[0])}
                  className="hidden"
                />

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                    isDragging
                      ? 'border-[#028f99] bg-[#028f99]/5'
                      : 'border-neutral-300 hover:border-neutral-400 bg-white'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
                    <UploadCloud size={20} />
                  </div>
                  <div className="text-xs font-medium text-neutral-700">
                    <span className="font-bold text-[#028f99]">Click to upload</span> or drag and drop photo
                  </div>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    Supports PNG, JPG, WEBP, SVG
                  </p>
                </div>
              </div>
            ) : (
              /* Mode 2: Direct URL */
              <div>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://... or /assets/product.webp"
                  className="w-full px-4 py-2.5 text-xs border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-white font-mono"
                />
              </div>
            )}

            {/* Image Preview Box */}
            {formData.image && (
              <div className="pt-2 flex items-center gap-4 bg-white p-3 rounded-xl border border-[#deded8]">
                <div className="w-16 h-16 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = '/assets/blck-310-green-socks.webp';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-mono text-emerald-600 font-bold block uppercase">
                    ✓ Photo Loaded & Ready
                  </span>
                  <p className="text-xs font-mono text-neutral-500 truncate mt-0.5">
                    {formData.image.startsWith('data:') ? 'Local file uploaded' : formData.image}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove photo"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#deded8] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold font-mono uppercase tracking-wider text-white bg-neutral-900 hover:bg-black rounded-xl transition-colors shadow-xs"
            >
              {product ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

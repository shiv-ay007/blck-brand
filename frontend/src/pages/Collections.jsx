import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Flame, SlidersHorizontal, Sparkles, ShieldCheck, Check, ArrowDown } from 'lucide-react';
import ProductCard from '../components/common/ProductCard.jsx';
import { products } from '../data/products.js';

const colorFilters = [
  { id: 'all', label: 'All Colors' },
  { id: 'teal', label: 'Teal 310', match: 'teal' },
  { id: 'black', label: 'Carbon Black', match: 'black' },
  { id: 'crimson', label: 'Crimson Red', match: 'crimson' },
  { id: 'cream', label: 'Vintage Cream', match: 'cream' },
  { id: 'magenta', label: 'Acid Magenta', match: 'magenta' },
  { id: 'olive', label: 'Military Olive', match: 'olive' },
];

export default function Collections() {
  const [selectedColor, setSelectedColor] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedColor !== 'all') {
      const target = colorFilters.find((c) => c.id === selectedColor)?.match || '';
      result = result.filter((p) =>
        `${p.name} ${p.color} ${p.subName}`.toLowerCase().includes(target.toLowerCase())
      );
    }

    if (sortBy === 'low') {
      result.sort((a, b) => a.samplePrice - b.samplePrice);
    } else if (sortBy === 'high') {
      result.sort((a, b) => b.samplePrice - a.samplePrice);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedColor, sortBy]);

  const scrollToProducts = () => {
    const el = document.getElementById('collection-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 md:pt-28 pb-24 bg-[#f7f7f4] min-h-screen text-[#111]">
      {/* 1. HERO SECTION (Featured Drop 001 Highlight Banner) */}
      <section className="max-w-[1460px] w-[calc(100%-32px)] md:w-[calc(100%-80px)] mx-auto mb-14 md:mb-20">
        <div className="bg-[#031d25] rounded-2xl overflow-hidden text-white grid grid-cols-1 lg:grid-cols-12 shadow-2xl border border-white/10">
          {/* Editorial Campaign Photo on Left */}
          <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[440px] lg:min-h-[540px] bg-[#021319]">
            <img
              src="/assets/editorial-crop.webp"
              alt="BLCK Collection Editorial"
              className="absolute inset-0 w-full h-full object-cover object-top filter brightness-95"
            />
            {/* Smooth gradient blend into dark teal container */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#031d25] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#031d25]/60 lg:to-[#031d25]" />

            {/* Pill Badge */}
            <div className="absolute top-6 left-6 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[10px] font-mono tracking-widest flex items-center gap-1.5 shadow-md">
              <Flame size={12} className="text-[#028f99]" />
              <span className="font-bold">THE INAUGURAL DROP</span>
            </div>
          </div>

          {/* Details & CTA on Right */}
          <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#028f99] font-bold uppercase block mb-2">
                DROP 001 / FIRST RELEASE
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4 leading-tight">
                310 TEAL MONSTER
              </h1>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-6 font-normal">
                Graphic streetwear crew socks featuring the iconic BLCK 310 artwork, ribbed compression cuff, and deep #028f99 teal colorway.
              </p>

              {/* Embedded Product Card Preview */}
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3.5 rounded-lg mb-8 backdrop-blur-sm">
                <div className="w-16 h-20 bg-white/10 rounded flex-shrink-0 flex items-center justify-center p-1 border border-white/5">
                  <img
                    src="/assets/blck-310-green-socks.webp"
                    alt="310 Teal Monster Socks"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#028f99] font-bold block uppercase tracking-wider">
                    COLLECTION EXCLUSIVE
                  </span>
                  <strong className="text-base font-bold text-white block mt-0.5">₹799 INR</strong>
                  <span className="text-xs text-neutral-400">Available in One Size (Unisex)</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/product/blck-310-green-monster-socks"
                className="btn btn-dark !bg-white !text-black hover:!bg-[#028f99] hover:!text-white flex-1 text-center justify-center gap-2 font-bold py-3.5"
              >
                VIEW DROP DETAILS <ArrowUpRight size={16} />
              </Link>
              <button
                type="button"
                onClick={scrollToProducts}
                className="px-6 py-3.5 text-xs font-bold tracking-widest uppercase border border-white/30 rounded text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                EXPLORE ALL ITEMS <ArrowDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COLLECTION PRODUCTS & FILTER CONTROLS */}
      <section id="collection-products" className="max-w-[1460px] w-[calc(100%-32px)] md:w-[calc(100%-80px)] mx-auto scroll-mt-28">
        {/* Section Header & Top Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#deded8]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#028f99] font-bold mb-1">
              <Sparkles size={14} />
              <span>OFFICIAL DROPS & CAPSULES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-neutral-900 m-0">
              COLLECTION PRODUCTS
            </h2>
          </div>

          {/* Right Controls: Item Count & Sort Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-neutral-500 font-medium">
              SHOWING {filteredProducts.length} OF {products.length} ITEMS
            </span>

            <div className="flex items-center gap-2 bg-white border border-[#deded8] px-3 py-1.5 rounded text-xs">
              <SlidersHorizontal size={14} className="text-neutral-500" />
              <label htmlFor="sort-select" className="font-mono text-neutral-500 uppercase tracking-wider text-[10px]">
                SORT:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-xs uppercase tracking-wider outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mr-1 flex-shrink-0">
            FILTER COLOR:
          </span>
          {colorFilters.map((tab) => {
            const isActive = selectedColor === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedColor(tab.id)}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap rounded-md flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#111] text-white shadow-sm'
                    : 'bg-white text-neutral-700 hover:text-black border border-[#deded8] hover:border-black'
                }`}
              >
                {isActive && <Check size={12} strokeWidth={3} />}
                <span>{tab.label}</span>
              </button>
            );
          })}

          {selectedColor !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedColor('all')}
              className="text-xs font-mono text-neutral-500 hover:text-black underline ml-2 whitespace-nowrap"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Product Cards Grid (Taller, spacious streetwear cards) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#deded8] rounded-xl p-12 text-center my-12">
            <h3 className="text-xl font-bold uppercase tracking-tight text-neutral-800 mb-2">
              No products found
            </h3>
            <p className="text-sm text-neutral-500 mb-6">
              No items match the selected color filter.
            </p>
            <button
              type="button"
              onClick={() => setSelectedColor('all')}
              className="btn btn-dark"
            >
              SHOW ALL PRODUCTS
            </button>
          </div>
        )}
      </section>

      {/* 3. BRAND ETHOS & QUALITY ASSURANCE STRIP */}
      <section className="max-w-[1460px] w-[calc(100%-32px)] md:w-[calc(100%-80px)] mx-auto mt-12">
        <div className="bg-[#111] text-white p-8 md:p-12 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8 shadow-xl">
          <div className="flex items-start gap-4">
            <ShieldCheck size={24} className="text-[#028f99] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm uppercase tracking-wider block font-bold">LIMITED CAPSULES</strong>
              <p className="text-xs text-neutral-400 mt-1 m-0 leading-relaxed">
                Numbered editions produced in strict batch counts to ensure authentic exclusivity.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Sparkles size={24} className="text-[#028f99] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm uppercase tracking-wider block font-bold">PREMIUM MILL SPEC</strong>
              <p className="text-xs text-neutral-400 mt-1 m-0 leading-relaxed">
                Heavyweight custom cotton, reinforced arch compression, and color-fast reactive dyes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Flame size={24} className="text-[#028f99] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm uppercase tracking-wider block font-bold">ORIGINAL IDENTITY</strong>
              <p className="text-xs text-neutral-400 mt-1 m-0 leading-relaxed">
                Independent streetwear culture engineered without corporate compromise.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

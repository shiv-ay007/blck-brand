import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Bookmark,
  Check,
  Layers,
  Package,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react';
import { products } from '../../data/products.js';
import { useCart } from '../../context/CartContext.jsx';
import { formatINR } from '../../utils/currency.js';
import toast from 'react-hot-toast';

export default function DropSection() {
  const { addItem } = useCart();
  const [activeSockIndex, setActiveSockIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [added, setAdded] = useState(false);

  // The 3 signature sock pairs in this single bundle card
  const trioSocks = [
    products[0], // Teal Monster
    products[1], // Tejas Crimson
    products[2], // Night Market Black
  ];

  const bundlePrice = 1999;
  const originalPrice = trioSocks.reduce((sum, p) => sum + p.samplePrice, 0);
  const savings = originalPrice - bundlePrice;

  const handleAddBundle = () => {
    trioSocks.forEach((p) => addItem(p.id, 'One Size', 1));
    setAdded(true);
    toast.success('3-Pair Pack added to your bag!', {
      duration: 3000,
      icon: '🧦',
    });
    setTimeout(() => setAdded(false), 3000);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked((prev) => !prev);
    toast.success(!bookmarked ? 'Saved 3-Pair Pack to wishlist' : 'Removed from wishlist', {
      duration: 1800,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-[#f4f4f0] border-t border-b border-[#e5e5df]" id="signature-trio">
      <div className="max-w-[1460px] w-[calc(100%-40px)] md:w-[calc(100%-80px)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ============================================================ */}
          {/* LEFT COLUMN: TEXT CONTENT & BUNDLE VALUE STORY               */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow Pill */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded uppercase">
                <Layers size={12} className="text-[#028f99]" />
                01 / SIGNATURE TRIO
              </span>
              <span className="text-[11px] font-mono text-[#028f99] font-bold tracking-wider uppercase bg-[#028f99]/10 px-2 py-0.5 rounded">
                SAVE ₹{savings}
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-neutral-900 m-0 leading-[1.05] mb-5">
              THE 3-PAIR <br />
              <em className="text-neutral-900 font-medium italic">COLLECTION.</em>
            </h2>

            {/* Narrative / Description */}
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed mb-6 font-normal max-w-[540px]">
              Engineered for the daily rotation. One curated card featuring our three
              inaugural designs — <strong>Teal Monster</strong>, <strong>Tejas Crimson</strong>, and{' '}
              <strong>Night Market Skate Crew</strong>. Premium combed cotton with stay-up arch compression.
            </p>

            {/* 3 Items Breakdown Mini-List */}
            <div className="bg-white border border-[#e5e5df] rounded-xl p-4 sm:p-5 mb-6 shadow-xs max-w-[540px]">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-3 font-bold">
                WHAT'S IN THE PACK (3 ITEMS):
              </span>
              <div className="space-y-2.5">
                {trioSocks.map((sock, i) => (
                  <div
                    key={sock.id}
                    onMouseEnter={() => setActiveSockIndex(i)}
                    className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer ${activeSockIndex === i ? 'bg-[#f4f4f0]' : 'hover:bg-[#fafaf7]'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-neutral-900 text-white font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <strong className="text-xs sm:text-sm font-bold text-neutral-900 block tracking-tight">
                          {sock.name}
                        </strong>
                        <span className="text-[11px] text-neutral-500 font-mono">
                          {sock.color}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-800">
                      {formatINR(sock.samplePrice)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & CTA Block */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 max-w-[540px]">
              <div className="font-mono">
                <span className="text-xs uppercase text-neutral-400 block tracking-wider">
                  BUNDLE PRICE (3 PAIRS)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-neutral-900 leading-none">
                    {formatINR(bundlePrice)}
                  </span>
                  <span className="text-sm text-neutral-400 line-through">
                    {formatINR(originalPrice)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddBundle}
                className={`flex-1 min-h-[50px] px-6 py-3.5 rounded-lg font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm ${added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#111] hover:bg-[#028f99] text-white hover:shadow-md'
                  }`}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>3 PAIRS IN YOUR BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ADD 3-PAIR PACK TO BAG</span>
                  </>
                )}
              </button>
            </div>

            {/* Badges & Secondary links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono text-neutral-500 pt-3 border-t border-[#deded8] max-w-[540px]">
              <span className="flex items-center gap-1.5 text-neutral-700">
                <Truck size={14} className="text-[#028f99]" /> FREE SHIPPING ACROSS INDIA
              </span>
              <span className="flex items-center gap-1.5 text-neutral-700">
                <Package size={14} className="text-[#028f99]" /> COLLECTOR TRIO PACKAGING
              </span>
              <Link
                to="/collections"
                className="text-neutral-900 font-bold hover:text-[#028f99] flex items-center gap-1 ml-auto"
              >
                VIEW ALL DROP <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: SINGLE CARD WITH ALL 3 SOCKS TOGETHER         */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 flex justify-center">
            <article className="group relative w-full max-w-[560px] bg-white rounded-2xl p-4 sm:p-6 border border-[#e5e5df] shadow-md hover:shadow-xl transition-all">

              {/* Card Top Badges & Bookmark */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#111] text-white text-[10px] font-bold font-mono tracking-wider px-2.5 py-1 rounded uppercase flex items-center gap-1">
                    <Sparkles size={12} className="text-[#028f99]" />
                    3-PACK BUNDLE
                  </span>
                  <span className="bg-[#028f99]/10 text-[#028f99] text-[10px] font-bold font-mono tracking-wider px-2 py-0.5 rounded uppercase">
                    3 ITEMS INCLUDED
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleBookmark}
                  className={`p-2 rounded-full transition-all ${bookmarked
                      ? 'bg-black text-white'
                      : 'bg-[#f4f4f0] text-neutral-700 hover:bg-neutral-200'
                    }`}
                  aria-label={bookmarked ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} strokeWidth={2} />
                </button>
              </div>

              {/* CARD MEDIA STAGE: ALL 3 SOCKS SIDE-BY-SIDE INSIDE THIS ONE CARD */}
              <div className="relative aspect-[4/3.4] sm:aspect-[4/3.2] w-full bg-[#f7f7f4] rounded-xl overflow-hidden border border-[#eaeae4] p-3 sm:p-6 flex items-end justify-center">
                {/* Background subtle watermark logo */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                  <span className="font-extrabold text-[120px] font-mono tracking-tighter">
                    BLCK
                  </span>
                </div>

                {/* 3 Socks Trio Display standing together */}
                <div className="relative w-full h-full grid grid-cols-3 gap-2 sm:gap-3 items-end justify-items-center z-10">
                  {trioSocks.map((sock, idx) => {
                    const isHovered = activeSockIndex === idx;
                    return (
                      <Link
                        key={sock.id}
                        to={`/product/${sock.slug}`}
                        onMouseEnter={() => setActiveSockIndex(idx)}
                        className={`group/sock flex flex-col items-center justify-end h-full w-full transition-all duration-300 ${isHovered
                            ? 'scale-105 -translate-y-2 z-20'
                            : 'opacity-90 hover:opacity-100'
                          }`}
                      >
                        {/* Individual Sock Image */}
                        <div className="w-full flex-1 flex items-center justify-center p-1 sm:p-2">
                          <img
                            src={sock.image}
                            alt={sock.name}
                            className="max-h-[220px] sm:max-h-[260px] md:max-h-[280px] w-auto object-contain filter drop-shadow-md transition-transform duration-300"
                          />
                        </div>

                        {/* Sock mini tag at bottom of each sock */}
                        <div
                          className={`mt-1 px-2 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase text-center transition-all ${isHovered
                              ? 'bg-[#111] text-white shadow-xs'
                              : 'bg-white/80 text-neutral-700 border border-neutral-200'
                            }`}
                        >
                          PAIR 0{idx + 1}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Quick Add Overlay inside the card on hover */}
                <div className="absolute inset-x-4 bottom-4 z-20 translate-y-14 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    type="button"
                    onClick={handleAddBundle}
                    className="w-full bg-[#111] hover:bg-[#028f99] text-white text-xs font-bold tracking-wider py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-xl transition-colors uppercase font-mono"
                  >
                    <ShoppingBag size={15} />
                    <span>ADD ALL 3 PAIRS TO BAG · {formatINR(bundlePrice)}</span>
                  </button>
                </div>
              </div>

              {/* CARD DETAILS BELOW IMAGE */}
              <div className="pt-4 pb-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 m-0">
                      BLCK / SIGNATURE TRIO PACK (3 PAIRS)
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">
                      Includes Teal Monster · Tejas Crimson · Night Market Skate Crew
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0 font-mono">
                    <span className="text-base sm:text-lg font-bold text-neutral-900 block leading-tight">
                      {formatINR(bundlePrice)}
                    </span>
                    <span className="text-[11px] text-neutral-400 line-through block">
                      {formatINR(originalPrice)}
                    </span>
                  </div>
                </div>

                {/* Active sock indicator pill bar */}
                <div className="mt-3.5 pt-3 border-t border-[#f0f0ea] flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400 text-[11px]">
                    HOVERED PAIR:
                  </span>
                  <span className="text-[#028f99] font-bold text-[11px] uppercase tracking-wider">
                    {trioSocks[activeSockIndex].name} ({trioSocks[activeSockIndex].color})
                  </span>
                </div>
              </div>

            </article>
          </div>

        </div>
      </div>
    </section>
  );
}
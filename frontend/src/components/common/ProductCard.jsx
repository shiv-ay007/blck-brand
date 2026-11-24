import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { formatINR } from '../../utils/currency.js';
import { useCart } from '../../context/CartContext.jsx';
import toast from 'react-hot-toast';

/**
 * Modern streetwear product card matching reference (Image 3):
 * - Top-left: "New" pill tag
 * - Top-right: Bookmark / Wishlist icon
 * - Tall vertical aspect ratio (3/4)
 * - Clean title & subtitle typography below
 */
export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked((prev) => !prev);
    toast.success(!bookmarked ? 'Saved to wishlist' : 'Removed from wishlist', {
      duration: 1800,
    });
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
  };

  return (
    <article className="group flex flex-col w-full flex-1">
      {/* Card Media Container with taller editorial streetwear height */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[3/4.2] min-h-[340px] sm:min-h-[380px] md:min-h-[400px] w-full bg-[#f4f4f0] rounded-lg overflow-hidden border border-[#e5e5df] hover:border-black transition-all shadow-xs hover:shadow-md"
        aria-label={`View ${product.name}`}
      >
        {/* Top-left: "New" tag pill */}
        <span className="absolute top-3 left-3 z-10 bg-white/95 text-black text-[10px] font-bold font-mono tracking-wider px-2 py-0.5 rounded shadow-xs backdrop-blur-xs uppercase">
          {product.tag || 'New'}
        </span>

        {/* Top-right: Bookmark button */}
        <button
          type="button"
          onClick={handleBookmark}
          className={`absolute top-3 right-3 z-10 p-1.5 rounded-full backdrop-blur-xs transition-all ${
            bookmarked
              ? 'bg-black text-white'
              : 'bg-white/80 text-black/70 hover:bg-white hover:text-black shadow-xs'
          }`}
          aria-label={bookmarked ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>

        {/* Product Image */}
        <div className="w-full h-full p-4 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Quick Add Overlay on hover */}
        <div className="absolute inset-x-2 bottom-2 z-10 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-[#111] hover:bg-[#028f99] text-white text-xs font-bold tracking-wider py-2.5 px-3 rounded flex items-center justify-center gap-2 shadow-lg transition-colors uppercase"
          >
            <ShoppingBag size={14} />
            <span>ADD TO BAG · {formatINR(product.samplePrice)}</span>
          </button>
        </div>
      </Link>

      {/* Card Information Below (matching Image 3 reference) */}
      <div className="pt-3 pb-1 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link
            to={`/product/${product.slug}`}
            className="block text-xs md:text-sm font-bold tracking-tight text-neutral-900 truncate hover:text-[#028f99] transition-colors"
          >
            {product.subName || product.name}
          </Link>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] font-mono text-neutral-500 tracking-wide uppercase">
              {product.color}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-right flex-shrink-0">
          <span className="text-xs md:text-sm font-bold text-neutral-900 block font-mono">
            {formatINR(product.samplePrice)}
          </span>
          {product.compareAt && (
            <span className="text-[10px] text-neutral-400 line-through block font-mono">
              {formatINR(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

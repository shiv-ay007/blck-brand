import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard.jsx';
import { products } from '../../data/products.js';

/**
 * Reusable product cards carousel/grid section matching reference (Image 3):
 * - Clean header: "Latest drop - Night Market" / "All Drops"
 * - Horizontal smooth-scrolling row with left/right buttons & responsive grid
 * - Can be called across Home page, Collections page, and Shop.
 */
export default function ProductCardsSection({
  title = 'Latest drop · Night Market & Capsules',
  subtitle = 'BLCK 2026 Edition',
  viewAllLink = '/collections',
  className = '',
}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className={`py-12 md:py-20 bg-[#f7f7f4] ${className}`}>
      <div className="max-w-[1460px] w-[calc(100%-48px)] md:w-[calc(100%-92px)] mx-auto">
        {/* Section Header (matching Image 3 layout) */}
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8 pb-4 border-b border-[#deded8]">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-3xl font-bold tracking-tight text-neutral-900 m-0">
              {title}
            </h2>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#028f99] font-bold uppercase tracking-wider bg-[#028f99]/10 px-2 py-0.5 rounded">
              {products.length} PRODUCTS
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={viewAllLink}
              className="text-xs md:text-sm font-bold tracking-wider uppercase text-neutral-800 hover:text-[#028f99] flex items-center gap-1.5 transition-colors"
            >
              <span>Discover more</span>
              <ArrowRight size={14} />
            </Link>

            {/* Scroll Navigation Arrows */}
            <div className="hidden md:flex items-center gap-1">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="p-1.5 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="p-1.5 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Carousel (Smooth horizontal scroll with taller, wider cards) */}
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
        >
          {products.map((product) => (
            <div key={product.id} className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

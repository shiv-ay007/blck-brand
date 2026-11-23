import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * AboutPreviewSection — Home page about preview using 100% pure Tailwind CSS.
 */
export default function AboutPreviewSection() {
  return (
    <section className="w-full overflow-hidden bg-[#f7f7f4]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px] lg:min-h-[660px]">
        {/* Left Column: Image with full standing person on teal backdrop */}
        <div className="relative bg-[#028f99] overflow-hidden min-h-[460px] sm:min-h-[540px] lg:min-h-[660px] flex items-end justify-center">
          <img
            src="/assets/lifestyle-teal.webp"
            alt="BLCK model standing in streetwear"
            loading="lazy"
            className="w-full h-full object-contain object-bottom absolute inset-0 select-none pointer-events-none"
          />

          {/* Circular Stamp Badge */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-white text-white -rotate-[17deg] flex flex-col items-center justify-center text-center font-bold font-mono text-xs sm:text-sm leading-tight backdrop-blur-xs bg-black/15 shadow-md">
            <span>BUILT</span>
            <span>DIFFERENT</span>
            <span className="text-[9px] font-normal">®</span>
          </div>
        </div>

        {/* Right Column: Editorial Text */}
        <div className="flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 py-14 sm:py-16 lg:py-20 bg-[#f7f7f4]">
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-500 font-mono mb-4 block">
            WHO WE ARE / THE BLCK STORY
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight text-neutral-900 leading-[0.92] m-0 mb-6">
            NOT HERE <br />
            TO <em className="italic font-medium">FIT IN.</em>
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-4 max-w-[480px]">
            BLCK is a New Delhi streetwear project with its own point of view.
            An independent expression of individuality, brought to life through
            bold graphics and considered everyday pieces.
          </p>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8 max-w-[480px]">
            Our first spotlight is the 310 Green Monster socks. This is where
            the story starts — and the next chapter is yours to write.
          </p>

          <div>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-900 border-b border-black pb-2 hover:gap-5 hover:text-[#028f99] hover:border-[#028f99] transition-all"
            >
              <span>DISCOVER OUR STORY</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './HeroSection.css';

/**
 * Minimal editorial hero: still image only (no video).
 * The BLCK logo coin is a real button: clicking it slides a product preview out.
 */
export default function HeroSection() {
  const [showDrop, setShowDrop] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setShowDrop(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section className="minimal-hero" aria-label="BLCK first drop — 310 Green Monster socks">
      <img
        className="minimal-hero__photo"
        src="/assets/hero-editorial.webp"
        alt="Streetwear model wearing green BLCK-inspired socks in a teal studio"
        fetchPriority="high"
        decoding="async"
      />
      <div className="minimal-hero__fade" aria-hidden="true" />

      <div className={`minimal-hero__interaction${showDrop ? ' is-expanded' : ''}`}>
        <button
          className="minimal-hero__coin"
          type="button"
          aria-label={showDrop ? 'Close BLCK product preview' : 'Explore BLCK 310 socks'}
          aria-expanded={showDrop}
          aria-controls="blck-hero-product-preview"
          onClick={() => setShowDrop((current) => !current)}
        >
          <span className="minimal-hero__coin-face">
            <img src="/assets/blck-monogram.png" alt="" draggable="false" />
          </span>
        </button>

        <div
          id="blck-hero-product-preview"
          className="minimal-hero__product-preview"
          aria-hidden={!showDrop}
        >
          <img src="/assets/blck-310-green-socks.webp" alt="BLCK 310 Green Monster socks" />
          <div className="minimal-hero__product-info">
            <span>THE FIRST DROP / 001</span>
            <strong>310 GREEN MONSTER</strong>
            <Link to="/product/blck-310-green-monster-socks" tabIndex={showDrop ? 0 : -1}>
              VIEW THE SOCKS <ArrowUpRight size={14} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </div>

      <Link className="minimal-hero__shop" to="/shop">
        SHOP NOW <ArrowUpRight size={15} strokeWidth={1.8} />
      </Link>
    </section>
  );
}

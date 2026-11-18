import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Hero3DCoin from './Hero3DCoin';
import './HeroSection.css';

/**
 * Editorial hero with interactive 3D rotating coin in center.
 */
export default function HeroSection() {
  return (
    <section className="minimal-hero" aria-label="BLCK hero section">
      <img
        className="minimal-hero__photo"
        src="/assets/hero-editorial.webp"
        alt="Streetwear model in teal studio"
        fetchPriority="high"
        decoding="async"
      />
      <div className="minimal-hero__fade" aria-hidden="true" />

      <div className="minimal-hero__interaction">
        <Hero3DCoin />
      </div>

      <Link className="minimal-hero__shop" to="/shop">
        SHOP NOW <ArrowUpRight size={15} strokeWidth={1.8} />
      </Link>
    </section>
  );
}

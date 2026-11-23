import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Hero3DCoin from './Hero3DCoin';
import './HeroSection.css';

function getHeroVideoSrc() {
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches) {
    return '/assets/blck-hero-mobile.mp4';
  }
  return '/assets/blck-hero-desktop.mp4';
}

/**
 * Editorial hero with interactive 3D rotating coin in center.
 */
export default function HeroSection() {
  const [videoSrc, setVideoSrc] = useState(getHeroVideoSrc);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 760px)');
    const updateVideoSrc = () => {
      setVideoSrc(mediaQuery.matches ? '/assets/blck-hero-mobile.mp4' : '/assets/blck-hero-desktop.mp4');
    };

    updateVideoSrc();
    mediaQuery.addEventListener('change', updateVideoSrc);
    return () => mediaQuery.removeEventListener('change', updateVideoSrc);
  }, []);

  return (
    <section className="minimal-hero" aria-label="BLCK hero section">
      <video
        key={videoSrc}
        className="minimal-hero__photo"
        src={videoSrc}
        poster="/assets/hero-video-poster.webp"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
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

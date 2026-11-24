import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__upper">
        <div className="footer__head">
          <span className="eyebrow eyebrow--light">THE BLCK UNIVERSE</span>
          <h2>
            WEAR YOUR
            <br/>
            <em>OWN ENERGY.</em>
          </h2>
        </div>
        <Link
          to="/contact"
          className="group relative inline-flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-4 sm:py-5 rounded-full bg-white text-black hover:bg-[#028f99] hover:text-white transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(2,143,153,0.45)] hover:scale-105 active:scale-95 no-underline flex-shrink-0 mt-8 lg:mt-0"
          aria-label="Contact BLCK"
        >
          <div className="flex flex-col text-left">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-black/60 group-hover:text-white/80 transition-colors font-bold">
              GET IN TOUCH
            </span>
            <span className="text-base sm:text-xl font-bold font-mono tracking-wider uppercase leading-tight mt-0.5">
              LET'S TALK
            </span>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black text-white group-hover:bg-white group-hover:text-[#028f99] flex items-center justify-center transition-all duration-300 group-hover:rotate-45 shadow-sm flex-shrink-0">
            <ArrowUpRight size={22} strokeWidth={2.5} />
          </div>
        </Link>
      </div>
      <div className="shell footer__grid">
        <div className="footer__brand">
          <BrandLogo inverse />
          <p>Unapologetic. Independent. Different by design. Streetwear from New Delhi.</p>
        </div>
        <div>
          <p className="footer__label">EXPLORE</p>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/collections">Collections</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/about">Our Story</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div>
          <p className="footer__label">HELP &amp; POLICIES</p>
          <NavLink to="/policies/shipping">Shipping Info</NavLink>
          <NavLink to="/policies/returns">Returns &amp; Exchanges</NavLink>
          <NavLink to="/policies/privacy">Privacy Policy</NavLink>
          <NavLink to="/policies/terms">Terms of Service</NavLink>
        </div>
        <div>
          <p className="footer__label">GET IN TOUCH</p>
          <a href="mailto:blckofficial2026@gmail.com">blckofficial2026@gmail.com</a>
          <a href="https://wa.me/919899733351" target="_blank" rel="noreferrer">
            WhatsApp: +91 98997 33351 <ArrowUpRight size={12}/>
          </a>
          <span>New Delhi, India</span>
        </div>
      </div>
      <div className="shell footer__bottom">
        <span>© {new Date().getFullYear()} BLCK. ALL RIGHTS RESERVED.</span>
        <span>MADE FOR THE ONES WHO DON'T FOLLOW. <ArrowRight size={13} /></span>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
}

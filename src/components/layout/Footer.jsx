import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__upper">
        <div className="footer__head"><span className="eyebrow eyebrow--light">THE BLCK UNIVERSE</span><h2>WEAR YOUR<br/><em>OWN ENERGY.</em></h2></div>
        <a href="mailto:blckofficial2026@gmail.com?subject=BLCK%20Enquiry" className="footer__reach">LET'S TALK <ArrowUpRight size={28}/></a>
      </div>
      <div className="shell footer__grid">
        <div className="footer__brand"><BrandLogo inverse /><p>Unapologetic. Independent. Different by design. Streetwear from New Delhi.</p></div>
        <div><p className="footer__label">EXPLORE</p><NavLink to="/">Home</NavLink><NavLink to="/collections">Collections</NavLink><NavLink to="/shop">Shop</NavLink><NavLink to="/about">Our Story</NavLink><NavLink to="/contact">Contact</NavLink></div>
        <div><p className="footer__label">HELP & POLICIES</p><NavLink to="/policies/shipping">Shipping Info</NavLink><NavLink to="/policies/returns">Returns & Exchanges</NavLink><NavLink to="/policies/privacy">Privacy Policy</NavLink><NavLink to="/policies/terms">Terms of Service</NavLink></div>
        <div><p className="footer__label">GET IN TOUCH</p><a href="mailto:blckofficial2026@gmail.com">blckofficial2026@gmail.com</a><a href="https://wa.me/919899733351" target="_blank" rel="noreferrer">WhatsApp: +91 98997 33351 <ArrowUpRight size={12}/></a><span>New Delhi, India</span></div>
      </div>
      <div className="shell footer__bottom"><span>© {new Date().getFullYear()} BLCK. ALL RIGHTS RESERVED.</span><span>MADE FOR THE ONES WHO DON'T FOLLOW. <ArrowRight size={13} /></span><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button></div>
    </footer>
  );
}

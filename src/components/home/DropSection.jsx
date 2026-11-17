import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard.jsx';
import { products } from '../../data/products.js';

export default function DropSection() {
  return <section className="drop-section section-space shell" id="latest-drop">
    <div className="section-head"><div><span className="eyebrow">01 / FIRST RELEASE</span><h2>THE FIRST <em>DROP.</em></h2></div><Link to="/shop" className="arrow-link">EXPLORE THE COLLECTION <ArrowUpRight size={18}/></Link></div>
    <div className="drop-grid"><div className="drop-grid__product"><ProductCard product={products[0]} /></div><Link to={`/product/${products[0].slug}`} className="editorial-tile"><img src="/assets/editorial-crop.webp" alt="Model styling BLCK 310 socks in a teal studio" loading="lazy"/><div className="editorial-tile__content"><span>THE LOOK / 001</span><p>EVERY DETAIL<br/>TELLS A STORY.</p><span className="editorial-tile__action">DISCOVER THE DROP <ArrowRight size={18}/></span></div></Link></div>
    <div className="drop-section__foot"><span>THE ONLY RULE? THERE ARE NONE.</span><span>DESIGN NO. 310 / GREEN MONSTER</span></div>
  </section>;
}

import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, X, ArrowUpRight } from 'lucide-react';
import BrandLogo from '../common/BrandLogo.jsx';
import { useCart } from '../../context/CartContext.jsx';

const menuItems = [
  { label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' }, { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';
  const { itemCount, setDrawerOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 45);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  const transparent = isHome && !scrolled && !menuOpen && !searchOpen;
  const runSearch = (event) => { event.preventDefault(); navigate(`/shop?q=${encodeURIComponent(query.trim())}`); setSearchOpen(false); };

  return (
    <>
      <header className={`site-header ${transparent ? 'site-header--transparent' : 'site-header--solid'}`}>
        <nav className="site-nav shell" aria-label="Main navigation">
          <div className="site-nav__left desktop-nav">
            <NavLink to="/shop">NEW IN</NavLink><NavLink to="/shop">COLLECTIONS</NavLink>
          </div>
          <button className="icon-button mobile-menu-trigger" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={24} /></button>
          <BrandLogo className="site-nav__brand" />
          <div className="site-nav__right">

            <button className="icon-button search-trigger" aria-label="Search products" onClick={() => setSearchOpen((value) => !value)}><Search size={19} strokeWidth={1.7} /></button>
            <button className="icon-button cart-trigger" aria-label={`Open shopping bag with ${itemCount} items`} onClick={() => setDrawerOpen(true)}><ShoppingBag size={19} strokeWidth={1.7}/><span className="cart-number">{itemCount}</span></button>
            <button className="icon-button desktop-menu-trigger" type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu"><Menu size={23} strokeWidth={1.6} /></button>
          </div>
        </nav>
        {searchOpen && <form className="search-bar" onSubmit={runSearch}><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="SEARCH THE DROP..." aria-label="Search products" /><button type="submit" aria-label="Submit search"><ArrowUpRight size={20}/></button></form>}
      </header>
      {menuOpen && <div className="mobile-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu"><div className="mobile-overlay__top"><BrandLogo /><button className="icon-button" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X/></button></div><div className="mobile-overlay__links">{menuItems.map((item, index) => <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight/></NavLink>)}</div><div className="mobile-overlay__bottom">INDEPENDENT BY DESIGN. / NEW DELHI</div></div>}
    </>
  );
}

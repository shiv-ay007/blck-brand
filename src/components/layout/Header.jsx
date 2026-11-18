import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, X, ArrowUpRight, Home } from 'lucide-react';
import BrandLogo from '../common/BrandLogo.jsx';
import { useCart } from '../../context/CartContext.jsx';

const menuItems = [
  { label: 'Home', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: 'Shop All', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
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

  // Handle scroll state for transparent / solid navbar
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 35);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock body scroll and listen for Escape key when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const runSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  // Header appearance styles based on page and scroll
  const isTransparent = isHome && !scrolled && !menuOpen && !searchOpen;
  const headerThemeClasses = isTransparent
    ? 'bg-transparent text-white border-transparent'
    : isHome
    ? 'bg-[#031d25]/92 backdrop-blur-md border-b border-white/10 text-white shadow-lg'
    : 'bg-[#f7f7f4]/95 backdrop-blur-md border-b border-[#deded8] text-[#111] shadow-xs';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerThemeClasses}`}
      >
        <nav
          className="max-w-[1460px] w-[calc(100%-48px)] md:w-[calc(100%-92px)] mx-auto h-[74px] md:h-[84px] grid grid-cols-3 items-center"
          aria-label="Main navigation"
        >
          {/* Left Navigation: NEW IN, COLLECTIONS, and HOME icon */}
          <div className="flex items-center gap-5 md:gap-7 text-[10px] md:text-[11px] font-bold tracking-[0.14em] uppercase">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `transition-opacity hover:opacity-60 hidden sm:inline-block ${
                  isActive ? 'opacity-60' : ''
                }`
              }
            >
              NEW IN
            </NavLink>

            <NavLink
              to="/collections"
              className={({ isActive }) =>
                `transition-opacity hover:opacity-60 ${isActive ? 'opacity-60' : ''}`
              }
            >
              COLLECTIONS
            </NavLink>

            {/* Home Icon beside Collections */}
            <Link
              to="/"
              title="Home"
              aria-label="Go to Home"
              className="flex items-center justify-center p-1 hover:opacity-60 transition-opacity"
            >
              <Home size={15} strokeWidth={2} />
            </Link>
          </div>

          {/* Centered Brand Wordmark */}
          <div className="flex items-center justify-center">
            <Link to="/" className="inline-flex items-center justify-center" aria-label="BLCK Home">
              <img
                src="/assets/blck-wordmark.png"
                alt="BLCK"
                className={`h-5 md:h-6 object-contain transition-all ${
                  !isTransparent && !isHome ? 'filter-none' : ''
                }`}
              />
            </Link>
          </div>

          {/* Right Navigation: Search, Cart & Menu */}
          <div className="flex items-center justify-end gap-3 md:gap-5">
            <button
              type="button"
              className="p-2 hover:opacity-60 transition-opacity"
              aria-label="Search products"
              onClick={() => setSearchOpen((val) => !val)}
            >
              <Search size={18} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              className="relative p-2 flex items-center gap-1.5 hover:opacity-60 transition-opacity"
              aria-label={`Open cart with ${itemCount} items`}
              onClick={() => setDrawerOpen(true)}
            >
              <ShoppingBag size={18} strokeWidth={1.8} />
              <span className="text-[11px] font-bold">{itemCount}</span>
            </button>

            <button
              type="button"
              className="p-2 hover:opacity-60 transition-opacity"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.8} />
            </button>
          </div>
        </nav>

        {/* Dropdown Search Bar */}
        {searchOpen && (
          <form
            onSubmit={runSearch}
            className="w-full bg-[#0a1b22] border-t border-b border-white/10 px-6 md:px-16 py-4 flex items-center gap-4 text-white animate-in slide-in-from-top-2 duration-200"
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH DROPS, SOCKS, APPAREL..."
              className="w-full bg-transparent text-sm md:text-base font-bold tracking-wider placeholder-white/40 outline-none text-white"
              aria-label="Search query"
            />
            <button
              type="submit"
              className="p-1 hover:text-[#028f99] transition-colors"
              aria-label="Submit search"
            >
              <ArrowUpRight size={20} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-1 hover:opacity-60 text-white/70"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </form>
        )}
      </header>

      {/* Fullscreen Luxury Streetwear Menu Drawer (Tailwind CSS) */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[100] bg-[#021319]/98 text-white flex flex-col justify-between p-6 md:p-12 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-300"
        >
          {/* Top Bar */}
          <div className="max-w-[1460px] w-full mx-auto flex items-center justify-between pb-6 border-b border-white/10">
            <Link to="/" onClick={() => setMenuOpen(false)} className="inline-flex items-center">
              <img
                src="/assets/blck-wordmark.png"
                alt="BLCK"
                className="h-6 md:h-7 object-contain brightness-0 invert"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"
              aria-label="Close menu"
            >
              <span>CLOSE</span>
              <X size={15} strokeWidth={2.5} />
            </button>
          </div>

          {/* Center Content Grid */}
          <div className="max-w-[1460px] w-full mx-auto py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
            {/* Left Nav Column: Big Streetwear Navigation Links */}
            <div className="lg:col-span-7 flex flex-col gap-3 md:gap-5">
              {menuItems.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between py-2 border-b border-white/10 hover:border-white transition-colors"
                >
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="text-xs md:text-sm font-mono text-white/40 group-hover:text-[#028f99] transition-colors">
                      0{index + 1}
                    </span>
                    <span className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase group-hover:translate-x-2 transition-transform">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={28}
                    className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#028f99] transition-all"
                  />
                </NavLink>
              ))}
            </div>

            {/* Right Aside Column: Featured Drop Showcase & Studio Info */}
            <div className="lg:col-span-5 flex flex-col gap-8 lg:pl-12 lg:border-l lg:border-white/10">
              {/* Featured Drop 001 Card */}
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/50 block mb-3">
                  FEATURED DROP / 001
                </span>
                <Link
                  to="/product/blck-310-green-monster-socks"
                  onClick={() => setMenuOpen(false)}
                  className="group block bg-[#05212b] border border-white/15 p-4 rounded-lg hover:border-[#028f99] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-24 bg-white/5 rounded overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                      <img
                        src="/assets/blck-310-green-socks.webp"
                        alt="310 Teal Monster Socks"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-mono text-[#028f99] font-bold">LIMITED EDITION</span>
                      <strong className="text-sm md:text-base font-bold text-white tracking-tight">
                        310 TEAL MONSTER SOCKS
                      </strong>
                      <span className="text-xs text-white/60 flex items-center gap-1 group-hover:text-white transition-colors">
                        EXPLORE PRODUCT <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Collections Categories */}
              <div className="grid grid-cols-2 gap-6 text-xs">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase text-white/40 tracking-wider">
                    COLLECTIONS
                  </span>
                  <Link
                    to="/collections"
                    onClick={() => setMenuOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    All Collections
                  </Link>
                  <Link
                    to="/shop"
                    onClick={() => setMenuOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Footwear & Socks
                  </Link>
                  <Link
                    to="/shop"
                    onClick={() => setMenuOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Heavyweight Tees
                  </Link>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase text-white/40 tracking-wider">
                    STUDIO
                  </span>
                  <p className="text-white/80 m-0">New Delhi, India</p>
                  <p className="text-white/50 text-[11px] m-0">contact@blckbrand.com</p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    STORE ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div className="max-w-[1460px] w-full mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] md:text-xs font-mono tracking-widest text-white/40">
            <span>BLCK™ — MADE TO STAND APART</span>
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                INSTAGRAM ↗
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                TWITTER ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

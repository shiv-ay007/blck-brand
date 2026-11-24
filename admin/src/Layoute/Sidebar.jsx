import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  CreditCard,
  Tag,
  Truck,
  RotateCcw,
  FileSpreadsheet,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';

export default function Sidebar({ isCollapsed, onToggle, isMobileOpen, onCloseMobile }) {
  const { logout } = useAdmin();

  const navItems = [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard },
    { label: 'Orders', to: '/orders', icon: ShoppingBag },
    { label: 'Products', to: '/products', icon: Package },
    { label: 'Customers', to: '/customers', icon: Users },
    { label: 'Payments', to: '/payments', icon: CreditCard },
    { label: 'Discount Codes', to: '/discounts', icon: Tag },
    { label: 'Shipping Integration', to: '/shipping', icon: Truck },
    { label: 'Returns & Refunds', to: '/returns', icon: RotateCcw },
    { label: 'Reports & Exports', to: '/reports', icon: FileSpreadsheet },
    { label: 'Contact Enquiries', to: '/enquiries', icon: MessageSquare },
    { label: 'Store Settings', to: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-[#040d12] text-white flex flex-col justify-between border-r border-white/10 transition-all duration-300 ease-in-out shadow-2xl md:shadow-none ${
          isCollapsed ? 'md:w-20' : 'md:w-72'
        } ${
          isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Section with Hamburger Button INSIDE Sidebar Header */}
        <div className="flex flex-col flex-1 min-h-0">
          <div
            className={`h-20 flex items-center border-b border-white/10 transition-all flex-shrink-0 ${
              isCollapsed ? 'justify-center px-3' : 'px-6 justify-between'
            }`}
          >
            {/* Logo (Shown when expanded) */}
            {!isCollapsed && (
              <Link to="/" className="flex items-center overflow-hidden">
                <img
                  src="/assets/blck-wordmark.png"
                  alt="BLCK"
                  className="h-6 object-contain brightness-0 invert"
                />
              </Link>
            )}

            {/* The Hamburger Button INSIDE the Sidebar */}
            <button
              type="button"
              onClick={onToggle}
              className={`rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center border border-white/10 bg-white/5 active:scale-95 ${
                isCollapsed ? 'w-11 h-11 p-2' : 'p-2.5'
              }`}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Menu size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Navigation Links Scrollable Area */}
          <nav
            className={`flex-1 overflow-y-auto space-y-1 mt-2.5 scrollbar-none ${
              isCollapsed ? 'p-2' : 'p-3.5'
            }`}
          >
            {!isCollapsed && (
              <div className="px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-white/40">
                STORE MANAGEMENT
              </div>
            )}
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  title={item.label}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onCloseMobile();
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center rounded-xl transition-all duration-200 ${
                      isCollapsed
                        ? 'justify-center p-3 text-center'
                        : 'px-3.5 py-2.5 gap-3 text-[14px]'
                    } ${
                      isActive
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'text-white/60 hover:text-white hover:bg-white/5 font-medium'
                    }`
                  }
                >
                  <Icon size={19} strokeWidth={2} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="truncate whitespace-nowrap">{item.label}</span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Store Status & Admin Logout */}
        <div className={`border-t border-white/10 space-y-2 flex-shrink-0 ${isCollapsed ? 'p-2' : 'p-4'}`}>
          {/* Live Store */}
          {isCollapsed ? (
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              title="Store Live (Open storefront)"
              className="w-11 h-11 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 hover:text-[#028f99] transition-colors"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </a>
          ) : (
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-semibold tracking-wide text-white/90">
                  Store Live
                </span>
              </div>
              <a
                href="http://localhost:5173"
                target="_blank"
                rel="noreferrer"
                title="Open storefront"
                className="text-white/40 hover:text-[#028f99] transition-colors p-1"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {/* User profile & logout button */}
          <button
            onClick={logout}
            title="Sign Out"
            className={`w-full flex items-center text-xs font-mono font-semibold tracking-wider uppercase text-white/50 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer ${
              isCollapsed ? 'justify-center p-3' : 'justify-between px-3 py-2'
            }`}
          >
            {isCollapsed ? (
              <LogOut size={17} />
            ) : (
              <>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center p-1 border border-white/15">
                    <img
                      src="/assets/blck-monogram.png"
                      alt="Admin"
                      className="w-full h-full object-contain brightness-0 invert"
                    />
                  </div>
                  <span>Sign Out</span>
                </div>
                <LogOut size={15} />
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

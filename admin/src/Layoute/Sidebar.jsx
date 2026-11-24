import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  X,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';

export default function Sidebar({ isOpen, onClose }) {
  const { logout, orders, enquiries } = useAdmin();

  // Active / pending badges
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing').length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  const navItems = [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard },
    { label: 'Orders', to: '/orders', icon: ShoppingBag, badge: pendingOrdersCount },
    { label: 'Products', to: '/products', icon: Package },
    { label: 'Customers', to: '/customers', icon: Users },
    { label: 'Payments', to: '/payments', icon: CreditCard },
    { label: 'Contact Enquiries', to: '/enquiries', icon: MessageSquare, badge: newEnquiriesCount },
    { label: 'Store Settings', to: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#040d12] text-slate-300 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Brand Header */}
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/assets/blck-wordmark.png"
                alt="BLCK"
                className="h-5 object-contain brightness-0 invert"
              />
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#028f99] uppercase bg-[#028f99]/15 px-1.5 py-0.5 rounded border border-[#028f99]/30">
                ADMIN
              </span>
            </Link>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white md:hidden"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 mt-2">
            <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
              Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'bg-[#028f99] text-white shadow-xs font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon size={17} strokeWidth={2} />
                    <span>{item.label}</span>
                  </div>

                  {Boolean(item.badge) && (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Store Status & Admin Logout Card */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          {/* Live Store Pill */}
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono text-slate-300 font-semibold">
                Store Live
              </span>
            </div>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              title="Open storefront"
              className="text-slate-400 hover:text-[#028f99] transition-colors p-1"
            >
              <ExternalLink size={13} />
            </a>
          </div>

          {/* User profile & logout button */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/20"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center p-0.5 border border-slate-700">
                <img
                  src="/assets/blck-monogram.png"
                  alt="Admin"
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
              <span className="text-left font-mono">Sign Out</span>
            </div>
            <LogOut size={14} />
          </button>
        </div>
      </aside>
    </>
  );
}

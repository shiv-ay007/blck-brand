import { Menu } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';

export default function Header({ onMenuClick }) {
  const { user, settings } = useAdmin();

  const adminName = user?.name || settings?.adminName || 'Admin';

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/95 backdrop-blur-md border-b border-[#deded8] px-5 sm:px-8 lg:px-10 flex items-center justify-between transition-all">
      {/* Left: Mobile-only trigger & Welcome greeting */}
      <div className="flex items-center gap-4">
        {/* Mobile-only toggle if sidebar is closed offscreen */}
        <button
          type="button"
          onClick={onMenuClick}
          className="p-2.5 rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100 transition-all cursor-pointer flex md:hidden items-center justify-center border border-[#deded8] bg-white shadow-xs active:scale-95"
          aria-label="Open sidebar"
          title="Open sidebar"
        >
          <Menu size={20} strokeWidth={2} />
        </button>

        {/* Welcome back Greeting */}
        <div className="flex items-center gap-2 text-base sm:text-lg font-bold font-heading text-neutral-900 tracking-tight">
          <span>Welcome back,</span>
          <span className="text-[#028f99] font-black">{adminName}</span>
        </div>
      </div>

      {/* Right: Admin profile pill */}
      <div className="flex items-center gap-4">
        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#040d12] flex items-center justify-center p-2 shadow-xs border border-black/10">
            <img
              src="/assets/blck-monogram.png"
              alt="Admin"
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-bold text-neutral-900 font-heading leading-tight tracking-tight">
              {adminName}
            </div>
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              {user?.role || 'Super Admin'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

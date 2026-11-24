import { Menu, Bell, Shield, Calendar } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';

export default function Header({ onMenuClick }) {
  const { user } = useAdmin();

  const todayFormatted = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile hamburger & Welcome */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
          <Calendar size={14} className="text-[#028f99]" />
          <span>{todayFormatted}</span>
        </div>
      </div>

      {/* Right: Status badge & Admin profile pill */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-mono">
          <Shield size={12} className="text-[#028f99]" />
          <span>BLCK HQ CONTROL</span>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#040d12] flex items-center justify-center p-1 border border-slate-300">
            <img
              src="/assets/blck-monogram.png"
              alt="Admin"
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-slate-900 leading-tight">
              {user?.name || 'Administrator'}
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              {user?.role || 'Super Admin'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

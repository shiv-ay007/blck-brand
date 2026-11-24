import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const ok = login(email.trim(), password.trim());
      setLoading(false);
      if (ok) {
        navigate('/');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@blckbrand.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-[#040d12] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#028f99]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#07161e] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 text-white">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-3">
            <img
              src="/assets/blck-wordmark.png"
              alt="BLCK"
              className="h-7 object-contain brightness-0 invert"
            />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#028f99] font-bold">
            HQ ADMIN CONTROL CENTER
          </p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-2">
            Sign In to Manage Store
          </h2>
        </div>

        {/* Demo Credentials Quick-Fill Alert */}
        <div className="mb-6 p-3.5 bg-slate-900/90 border border-[#028f99]/30 rounded-xl flex items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <KeyRound size={13} className="text-[#028f99]" />
              <span>Demo Admin Access</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
              admin@blckbrand.com / admin123
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1 text-[11px] font-mono font-bold bg-[#028f99] hover:bg-[#028f99]/80 text-white rounded transition-colors"
          >
            Auto Fill
          </button>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail size={16} />
              </div>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@blckbrand.com"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-900/80 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#028f99] focus:ring-1 focus:ring-[#028f99]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock size={16} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-900/80 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#028f99] focus:ring-1 focus:ring-[#028f99]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-[#028f99] hover:bg-[#027c85] disabled:opacity-50 text-white text-xs font-bold font-mono tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? (
              <span>AUTHENTICATING...</span>
            ) : (
              <>
                <span>SIGN IN TO DASHBOARD</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>Encrypted Session · Authorized Personnel Only</span>
          </div>
        </div>
      </div>
    </div>
  );
}

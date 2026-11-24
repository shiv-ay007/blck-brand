import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <div className="min-h-screen bg-[#040d12] flex items-center justify-center p-5 relative overflow-hidden font-sans">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#028f99]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg bg-[#07161e] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-white">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-3">
            <img
              src="/assets/blck-wordmark.png"
              alt="BLCK"
              className="h-8 object-contain brightness-0 invert"
            />
          </div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#028f99] font-bold">
            HQ ADMIN CONTROL CENTER
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-white mt-2">
            Sign In to Manage Store
          </h2>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2 font-mono">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                <Mail size={18} />
              </div>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@blckbrand.com"
                className="w-full pl-11 pr-4 py-3 text-sm bg-black/40 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#028f99] focus:ring-1 focus:ring-[#028f99]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2 font-mono">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 text-sm bg-black/40 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#028f99] focus:ring-1 focus:ring-[#028f99]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors focus:outline-none"
                tabIndex="-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3.5 px-5 bg-[#028f99] hover:bg-[#027c85] disabled:opacity-50 text-white text-xs font-bold font-mono tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? (
              <span>AUTHENTICATING...</span>
            ) : (
              <>
                <span>SIGN IN TO DASHBOARD</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-white/40">
            <ShieldCheck size={15} className="text-emerald-400" />
            <span>Encrypted Session · Authorized Personnel Only</span>
          </div>
        </div>
      </div>
    </div>
  );
}

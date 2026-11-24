import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CommunitySection() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setJoined(true);
      toast.success('Welcome to the BLCK Drop Squad! VIP access confirmed.', {
        duration: 3500,
        icon: '⚡',
      });
      setEmail('');
    }
  };

  return (
    <section className="py-8 pb-16 md:py-12 md:pb-20 bg-[#f7f7f4]">
      <div className="max-w-[1460px] w-[calc(100%-40px)] md:w-[calc(100%-80px)] mx-auto">
        <div className="relative overflow-hidden bg-[#040d12] text-white rounded-3xl p-7 sm:p-10 md:p-14 lg:p-16 border border-white/10 shadow-2xl">
          {/* Ambient Streetwear Glow Accents */}
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#028f99]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#028f99]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline, Concept & Perks */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-[#028f99]/20 border border-[#028f99]/40 text-[#028f99] text-[10px] sm:text-[11px] font-mono font-bold tracking-widest px-3 py-1 rounded-full uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#028f99] animate-pulse" />
                  03 / BLCK DROP SQUAD · VIP ACCESS
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading text-white leading-[0.95] mb-4">
                STAY IN<br />
                <span className="text-[#028f99] italic font-serif">THE LOOP.</span>
              </h2>

              <p className="text-white/70 text-sm sm:text-base max-w-[480px] leading-relaxed mb-6 font-sans">
                Never miss an exclusive release. Get direct alerts for limited capsule drops, private restocks, and members-only secret perks before items sell out.
              </p>

              {/* VIP Perks Pills */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">
                  ⚡ 1-Hour Early Access
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">
                  📦 Secret Capsule Restocks
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80">
                  🎁 Private Community Drops
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Connect Box */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles size={16} className="text-[#028f99]" />
                  <h3 className="text-sm sm:text-base font-bold font-heading uppercase text-white tracking-wider">
                    Join The Inner Circle
                  </h3>
                </div>
                <p className="text-xs text-white/60 mb-5 font-sans leading-relaxed">
                  Connect directly with the BLCK team on WhatsApp for instant release drops and private assistance.
                </p>

                {/* Primary WhatsApp VIP CTA */}
                <a
                  href="https://wa.me/919899733351?text=Hi%20BLCK%2C%20please%20keep%20me%20updated%20about%20new%20drops."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold font-mono tracking-wider text-xs sm:text-sm uppercase flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-[#25D366]/25 hover:scale-[1.02] active:scale-95 no-underline mb-4"
                >
                  <MessageCircle size={17} strokeWidth={2.5} />
                  <span>CONNECT ON WHATSAPP</span>
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </a>

                {/* Quick Email Drop Alert Form */}
                <form onSubmit={handleJoin} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER YOUR EMAIL..."
                      className="flex-1 px-4 py-2.5 bg-black/40 border border-white/15 rounded-xl text-white text-xs font-mono placeholder-white/30 focus:outline-none focus:border-[#028f99] focus:ring-1 focus:ring-[#028f99]"
                    />
                    <button
                      type="submit"
                      className="py-2.5 px-4 bg-white hover:bg-neutral-200 text-black font-bold font-mono text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <span>JOIN VIP</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>NEW DELHI STUDIO</span>
                </span>
                <span className="text-[#028f99] font-bold">100% INDEPENDENT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

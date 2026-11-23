/**
 * HeroBridgeSection — 100% Pure Tailwind CSS.
 * Sits directly below the hero: dark ticker + 4-column brand stats.
 */
export default function HeroBridgeSection() {
  const pillars = [
    { number: '001', label: 'First Drop', sub: 'Now Live', icon: '◈' },
    { number: '310', label: 'Green Monster', sub: 'Signature Design', icon: '◉' },
    { number: '100%', label: 'Independent', sub: 'No Compromise', icon: '◆' },
    { number: 'NDL', label: 'New Delhi', sub: 'Origin', icon: '◎' },
  ];

  return (
    <div className="w-full bg-[#f7f7f4]">
      {/* Top dark ticker strip matching hero bottom */}
      <div className="w-full bg-[#040d12] h-12 overflow-hidden flex items-center">
        <div className="flex w-max animate-[ticker_28s_linear_infinite]">
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              className="text-white/60 text-[11px] font-bold font-mono tracking-[0.16em] uppercase flex items-center gap-3 px-4 whitespace-nowrap"
            >
              <span>BLCK IS A STATE OF MIND</span>
              <span className="text-[#028f99] text-base">✳</span>
              <span>NOT HERE TO FIT IN</span>
              <span className="text-[#028f99] text-base">✳</span>
            </span>
          ))}
        </div>
      </div>

      {/* 4 Stats Grid in Pure Tailwind */}
      <div className="max-w-[1460px] w-[calc(100%-40px)] md:w-[calc(100%-80px)] mx-auto border-b border-[#deded8]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#deded8]">
          {pillars.map((p) => (
            <div
              key={p.number}
              className="group relative flex flex-col items-center justify-center text-center p-6 sm:p-8 md:p-11 transition-all duration-300 hover:-translate-y-1 bg-[#f7f7f4]"
            >
              {/* Rotating icon on hover */}
              <span className="text-xl text-[#028f99] mb-1.5 transition-transform duration-500 group-hover:rotate-180 select-none">
                {p.icon}
              </span>

              {/* Number with gradient shimmer */}
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold font-mono tracking-tight text-neutral-900 group-hover:text-[#028f99] transition-colors leading-none">
                {p.number}
              </span>

              {/* Label */}
              <span className="text-[11px] font-bold font-mono tracking-wider uppercase text-neutral-900 mt-2.5">
                {p.label}
              </span>

              {/* Sub label */}
              <span className="text-[10px] font-semibold font-mono tracking-wider uppercase text-[#028f99] mt-0.5">
                {p.sub}
              </span>

              {/* Bottom active underline on hover */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#028f99] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto py-5 px-5 sm:px-8 lg:px-10 border-t border-[#deded8] bg-white text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
      <div className="flex items-center gap-2">
        <span className="font-bold text-neutral-900 tracking-wider">BLCK™ STREETWEAR</span>
        <span>— Store Operations & Control Center</span>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Operational
        </span>
        <span className="text-neutral-400 font-mono">v1.2.0</span>
      </div>
    </footer>
  );
}

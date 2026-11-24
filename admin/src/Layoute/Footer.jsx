export default function Footer() {
  return (
    <footer className="mt-auto py-4 px-4 sm:px-8 border-t border-slate-200 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
      <div className="flex items-center gap-2">
        <span className="font-bold text-slate-800">BLCK™ STREETWEAR</span>
        <span>— Admin Control Center</span>
      </div>

      <div className="flex items-center gap-4 text-[11px]">
        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Operational
        </span>
        <span className="text-slate-400">v1.0.0</span>
      </div>
    </footer>
  );
}

export default function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtitle,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
          {title}
        </span>
        {Icon && (
          <div className="p-2.5 rounded-lg bg-slate-900 text-white">
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
          {value}
        </div>
        {(change || subtitle) && (
          <div className="flex items-center gap-2 mt-2 text-xs">
            {change && (
              <span
                className={`font-semibold font-mono px-1.5 py-0.5 rounded ${
                  isPositive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {isPositive ? '+' : ''}{change}
              </span>
            )}
            {subtitle && <span className="text-slate-500">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

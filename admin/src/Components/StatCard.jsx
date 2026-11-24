export default function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtitle,
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#deded8] p-6 sm:p-7 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500 font-mono">
          {title}
        </span>
        {Icon && (
          <div className="p-3 rounded-xl bg-[#040d12] text-white shadow-xs flex-shrink-0">
            <Icon size={20} strokeWidth={2} />
          </div>
        )}
      </div>

      <div className="mt-5">
        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 font-heading leading-none">
          {value}
        </div>
        {(change || subtitle) && (
          <div className="flex items-center gap-2.5 mt-3 text-xs">
            {change && (
              <span
                className={`font-bold font-mono px-2 py-0.5 rounded-md ${
                  isPositive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {isPositive ? '+' : ''}{change}
              </span>
            )}
            {subtitle && <span className="text-neutral-500 font-medium">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

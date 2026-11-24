export default function StatusBadge({ status }) {
  const getStyle = (val) => {
    switch (val?.toLowerCase()) {
      // Order / Payment / Enquiry success
      case 'delivered':
      case 'paid':
      case 'resolved':
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';

      // Pending / In progress
      case 'processing':
      case 'in progress':
      case 'shipped':
        return 'bg-sky-50 text-sky-700 border-sky-200';

      case 'pending':
      case 'new':
      case 'low stock':
        return 'bg-amber-50 text-amber-700 border-amber-200';

      // Danger / Cancelled / Failed
      case 'cancelled':
      case 'failed':
      case 'refunded':
      case 'out of stock':
        return 'bg-rose-50 text-rose-700 border-rose-200';

      case 'hidden':
        return 'bg-slate-100 text-slate-600 border-slate-300';

      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono uppercase tracking-wide border ${getStyle(
        status
      )}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {status}
    </span>
  );
}

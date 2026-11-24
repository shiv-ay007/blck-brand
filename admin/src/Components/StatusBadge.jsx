export default function StatusBadge({ status }) {
  const getStyle = (val) => {
    switch (val?.toLowerCase()) {
      // Order / Payment / Enquiry success
      case 'delivered':
      case 'paid':
      case 'resolved':
      case 'active':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';

      // Pending / In progress
      case 'processing':
      case 'in progress':
      case 'shipped':
        return 'bg-sky-50 text-sky-800 border-sky-300';

      case 'pending':
      case 'new':
      case 'low stock':
        return 'bg-amber-50 text-amber-800 border-amber-300';

      // Danger / Cancelled / Failed
      case 'cancelled':
      case 'failed':
      case 'refunded':
      case 'out of stock':
        return 'bg-rose-50 text-rose-800 border-rose-300';

      case 'hidden':
        return 'bg-neutral-100 text-neutral-600 border-neutral-300';

      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-300';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider border ${getStyle(
        status
      )}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 opacity-80" />
      {status}
    </span>
  );
}

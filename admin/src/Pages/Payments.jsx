import { useState, useMemo } from 'react';
import { Search, CheckCircle2, Clock, AlertOctagon } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';
import StatusBadge from '../Components/StatusBadge.jsx';

export default function Payments() {
  const { payments } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPayments = useMemo(() => {
    return payments.filter((pay) => {
      const matchSearch =
        pay.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pay.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pay.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pay.reference.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'All' || pay.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [payments, searchTerm, statusFilter]);

  // Aggregate stats
  const totalPaid = payments
    .filter((p) => p.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingCod = payments
    .filter((p) => p.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const failedCount = payments.filter((p) => p.status === 'Failed').length;

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#deded8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#028f99]">
              FINANCE & GATEWAYS
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-widest">
              TRANSACTIONS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1.5 font-heading">
            PAYMENT TRACKING
          </h1>
        </div>
      </div>

      {/* Gateway Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
              Total Successful Paid
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-3xl font-heading font-extrabold text-neutral-900">
            ₹{totalPaid.toLocaleString('en-IN')}
          </div>
          <div className="text-xs font-mono text-neutral-400 mt-1.5">
            Settled via Razorpay & UPI
          </div>
        </div>

        <div className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
              Pending Collections (COD)
            </span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-3xl font-heading font-extrabold text-amber-600">
            ₹{pendingCod.toLocaleString('en-IN')}
          </div>
          <div className="text-xs font-mono text-neutral-400 mt-1.5">
            To collect on delivery
          </div>
        </div>

        <div className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
              Failed Transactions
            </span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <AlertOctagon size={18} />
            </div>
          </div>
          <div className="text-3xl font-heading font-extrabold text-rose-600">
            {failedCount}
          </div>
          <div className="text-xs font-mono text-neutral-400 mt-1.5">
            Bank decline / timeout
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#deded8] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['All', 'Paid', 'Pending', 'Failed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap ${
                statusFilter === st ? 'bg-neutral-900 text-white shadow-xs' : 'text-neutral-600 hover:bg-[#f7f7f4]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[280px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ref ID, order ID, customer..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white border border-[#deded8] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f7f7f4] text-neutral-500 font-mono text-xs uppercase tracking-wider border-b border-[#deded8]">
              <tr>
                <th className="py-4 px-5">Payment ID</th>
                <th className="py-4 px-5">Order ID</th>
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">Gateway & Method</th>
                <th className="py-4 px-5">Reference Code</th>
                <th className="py-4 px-5">Amount</th>
                <th className="py-4 px-5 text-right">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#deded8]/60">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-[#f7f7f4]/60 transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-neutral-900 text-sm">
                      {pay.id}
                      <div className="text-xs text-neutral-400 font-normal mt-0.5">{pay.date}</div>
                    </td>
                    <td className="py-4 px-5 font-mono text-[#028f99] font-bold text-sm">
                      {pay.orderId}
                    </td>
                    <td className="py-4 px-5 font-bold text-neutral-900 text-sm">
                      {pay.customer}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-neutral-900 text-sm">{pay.gateway}</div>
                      <div className="text-xs text-neutral-500 font-mono">{pay.method}</div>
                    </td>
                    <td className="py-4 px-5 font-mono text-xs text-neutral-600 bg-[#f7f7f4] px-2.5 py-1 rounded-md">
                      {pay.reference}
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-neutral-900 text-sm">
                      ₹{pay.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <StatusBadge status={pay.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400 font-mono text-sm">
                    No transactions match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

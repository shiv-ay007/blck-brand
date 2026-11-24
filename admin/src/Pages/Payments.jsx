import { useState, useMemo } from 'react';
import { Search, CreditCard, CheckCircle2, Clock, AlertOctagon, RefreshCw, ShieldCheck } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#028f99]">
              FINANCE & GATEWAYS
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-mono text-slate-500">TRANSACTIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-mono">
            PAYMENT TRACKING
          </h1>
        </div>
      </div>

      {/* Gateway Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
              Total Successful Paid
            </span>
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-slate-900">
            ₹{totalPaid.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            Settled via Razorpay & UPI
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
              Pending Collections (COD)
            </span>
            <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
              <Clock size={16} />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-amber-600">
            ₹{pendingCod.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            To collect on delivery
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
              Failed Transactions
            </span>
            <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
              <AlertOctagon size={16} />
            </div>
          </div>
          <div className="text-2xl font-mono font-bold text-rose-600">
            {failedCount}
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">
            Bank decline / timeout
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['All', 'Paid', 'Pending', 'Failed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === st ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ref ID, order ID, customer..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Payment ID</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Gateway & Method</th>
                <th className="py-3 px-4">Reference Code</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4 text-right">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {pay.id}
                      <div className="text-[10px] text-slate-400 font-normal">{pay.date}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#028f99] font-bold">
                      {pay.orderId}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {pay.customer}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{pay.gateway}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{pay.method}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600 bg-slate-50/50 px-2 py-1 rounded">
                      {pay.reference}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      ₹{pay.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <StatusBadge status={pay.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-mono text-xs">
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

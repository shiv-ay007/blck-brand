import { useState } from 'react';
import { RotateCcw, CheckCircle2, Clock, IndianRupee, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';
import StatusBadge from '../Components/StatusBadge.jsx';

export default function Returns() {
  const { returns, updateReturnStatus } = useAdmin();

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#deded8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#028f99]">
              POST-PURCHASE & SUPPORT
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-widest">
              DISPUTES & EXCHANGES
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1.5 font-heading">
            RETURNS & REFUNDS
          </h1>
        </div>

        <div className="text-xs font-mono text-neutral-600 bg-white border border-[#deded8] px-4 py-2 rounded-xl shadow-xs">
          Active Returns: <strong className="text-amber-600 font-bold">{returns.length}</strong>
        </div>
      </div>

      {/* Returns Table */}
      <div className="bg-white border border-[#deded8] rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#deded8] flex items-center justify-between">
          <h2 className="text-base font-bold font-heading uppercase tracking-wider text-neutral-900">
            Customer Return Requests
          </h2>
          <span className="text-xs font-mono text-neutral-400">
            Integrated with Gateway Instant Refund API
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f7f7f4] text-neutral-500 font-mono text-xs uppercase tracking-wider border-b border-[#deded8]">
              <tr>
                <th className="py-4 px-5">Return ID</th>
                <th className="py-4 px-5">Order ID</th>
                <th className="py-4 px-5">Customer & Item</th>
                <th className="py-4 px-5">Return Reason</th>
                <th className="py-4 px-5">Refund Amount</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Refund Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#deded8]/60">
              {returns.map((ret) => (
                <tr key={ret.id} className="hover:bg-[#f7f7f4]/60 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-neutral-900 text-sm">
                    {ret.id}
                    <div className="text-xs text-neutral-400 font-normal mt-0.5 font-mono">
                      {ret.requestedDate}
                    </div>
                  </td>
                  <td className="py-4 px-5 font-mono text-[#028f99] font-bold text-sm">
                    {ret.orderId}
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-bold text-neutral-900 text-sm">{ret.customer}</div>
                    <div className="text-xs text-neutral-500 font-sans mt-0.5">{ret.item}</div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="text-xs text-neutral-700 bg-[#f7f7f4] p-2 rounded-lg border border-[#deded8]/70 max-w-xs">
                      {ret.reason}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-mono font-bold text-neutral-900 text-sm">
                      ₹{ret.amount}
                    </div>
                    <div className="text-xs text-neutral-400 font-mono mt-0.5">
                      Via {ret.gateway}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <StatusBadge status={ret.status} />
                  </td>
                  <td className="py-4 px-5 text-right">
                    {ret.status === 'Pending Review' ? (
                      <button
                        onClick={() => updateReturnStatus(ret.id, 'Approved')}
                        className="px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider bg-sky-50 text-sky-800 border border-sky-300 hover:bg-sky-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <CheckCircle2 size={13} />
                        <span>Approve Return</span>
                      </button>
                    ) : ret.status === 'Approved' ? (
                      <button
                        onClick={() => updateReturnStatus(ret.id, 'Refund Initiated')}
                        className="px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider bg-neutral-900 hover:bg-black text-white rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <IndianRupee size={13} />
                        <span>Initiate Refund</span>
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-emerald-600 font-bold uppercase">
                        ✓ Refund Sent
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

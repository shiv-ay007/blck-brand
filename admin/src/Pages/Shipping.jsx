import { useState } from 'react';
import { Truck, RefreshCw, Printer, ExternalLink, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';
import StatusBadge from '../Components/StatusBadge.jsx';

export default function Shipping() {
  const { shipments, createShippingLabel, syncCourierTracking } = useAdmin();
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      syncCourierTracking();
      setSyncing(false);
    }, 600);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#deded8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#028f99]">
              LOGISTICS & DISPATCH
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-widest">
              COURIER PARTNERS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1.5 font-heading">
            SHIPPING INTEGRATION
          </h1>
        </div>

        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold font-mono tracking-wider uppercase rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-60"
        >
          <RefreshCw size={15} className={syncing ? 'animate-spin' : ''} />
          <span>{syncing ? 'Syncing...' : 'Sync Courier API'}</span>
        </button>
      </div>

      {/* Courier Partner Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
              Delhivery Express
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-xl font-heading font-extrabold text-neutral-900">
            API CONNECTED
          </div>
          <div className="text-xs font-mono text-neutral-400 mt-1">
            Surface & Express active · Rate card ₹70/kg
          </div>
        </div>

        <div className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
              BlueDart Air
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-xl font-heading font-extrabold text-neutral-900">
            METRO PRIORITY
          </div>
          <div className="text-xs font-mono text-neutral-400 mt-1">
            Next day air dispatch enabled
          </div>
        </div>

        <div className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
              Shiprocket Sync
            </span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <Truck size={18} />
            </div>
          </div>
          <div className="text-xl font-heading font-extrabold text-sky-700">
            AUTO-ASSIGN
          </div>
          <div className="text-xs font-mono text-neutral-400 mt-1">
            Xpressbees & Shadowfax fallback
          </div>
        </div>
      </div>

      {/* Shipments List */}
      <div className="bg-white border border-[#deded8] rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#deded8] flex items-center justify-between">
          <h2 className="text-base font-bold font-heading uppercase tracking-wider text-neutral-900">
            Active Packages & Waybills
          </h2>
          <span className="text-xs font-mono text-neutral-500 font-semibold">
            {shipments.length} Active Shipments
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f7f7f4] text-neutral-500 font-mono text-xs uppercase tracking-wider border-b border-[#deded8]">
              <tr>
                <th className="py-4 px-5">Shipment ID</th>
                <th className="py-4 px-5">Order ID</th>
                <th className="py-4 px-5">Courier & AWB</th>
                <th className="py-4 px-5">Destination</th>
                <th className="py-4 px-5">Courier Status</th>
                <th className="py-4 px-5">Last Synced</th>
                <th className="py-4 px-5 text-right">Label Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#deded8]/60">
              {shipments.map((shp) => (
                <tr key={shp.id} className="hover:bg-[#f7f7f4]/60 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-neutral-900 text-sm">
                    {shp.id}
                  </td>
                  <td className="py-4 px-5 font-mono text-[#028f99] font-bold text-sm">
                    {shp.orderId}
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-semibold text-neutral-900 text-sm">{shp.courier}</div>
                    <div className="text-xs font-mono text-neutral-500 bg-[#f7f7f4] px-2 py-0.5 rounded w-max mt-0.5">
                      {shp.awb}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-xs text-neutral-600 font-mono">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-neutral-400" />
                      <span>{shp.destination}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <StatusBadge status={shp.deliveryStatus} />
                  </td>
                  <td className="py-4 px-5 text-xs font-mono text-neutral-400">
                    {shp.lastSync}
                  </td>
                  <td className="py-4 px-5 text-right">
                    {shp.labelStatus === 'Created' ? (
                      <button
                        onClick={() => window.print()}
                        className="px-3.5 py-1.5 text-xs font-mono font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <Printer size={13} />
                        <span>Print Label</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => createShippingLabel(shp.id)}
                        className="px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider bg-neutral-900 hover:bg-black text-white rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <Truck size={13} />
                        <span>Generate Label</span>
                      </button>
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

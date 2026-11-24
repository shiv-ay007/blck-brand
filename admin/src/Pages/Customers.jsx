import { useState, useMemo } from 'react';
import { Search, Mail, Phone, MapPin, UserCheck, UserX } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';

export default function Customers() {
  const { customers } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      const matchSearch =
        cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.phone.includes(searchTerm) ||
        cust.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType =
        filterType === 'All'
          ? true
          : filterType === 'Ordered'
          ? cust.hasOrdered
          : !cust.hasOrdered;

      return matchSearch && matchType;
    });
  }, [customers, searchTerm, filterType]);

  const totalRegistered = customers.length;
  const activeBuyers = customers.filter((c) => c.hasOrdered).length;
  const leadsOnly = customers.filter((c) => !c.hasOrdered).length;

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#deded8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#028f99]">
              USER DIRECTORY
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-widest">
              PROFILES
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1.5 font-heading">
            CUSTOMER RECORDS
          </h1>
        </div>

        {/* Quick summary metrics */}
        <div className="flex items-center gap-2.5">
          <div className="bg-white border border-[#deded8] px-4 py-2 rounded-xl text-xs font-mono">
            Total: <strong className="text-neutral-900 font-bold">{totalRegistered}</strong>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-xl text-xs font-mono">
            Buyers: <strong className="font-bold">{activeBuyers}</strong>
          </div>
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-xl text-xs font-mono">
            Leads: <strong className="font-bold">{leadsOnly}</strong>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#deded8] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setFilterType('All')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all ${
              filterType === 'All' ? 'bg-neutral-900 text-white shadow-xs' : 'text-neutral-600 hover:bg-[#f7f7f4]'
            }`}
          >
            All Registered ({totalRegistered})
          </button>
          <button
            onClick={() => setFilterType('Ordered')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all ${
              filterType === 'Ordered' ? 'bg-neutral-900 text-white shadow-xs' : 'text-neutral-600 hover:bg-[#f7f7f4]'
            }`}
          >
            Active Buyers ({activeBuyers})
          </button>
          <button
            onClick={() => setFilterType('NoOrder')}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all ${
              filterType === 'NoOrder' ? 'bg-neutral-900 text-white shadow-xs' : 'text-neutral-600 hover:bg-[#f7f7f4]'
            }`}
          >
            No Orders Yet ({leadsOnly})
          </button>
        </div>

        <div className="relative min-w-[280px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer by name, email, city..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-[#deded8] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f7f7f4] text-neutral-500 font-mono text-xs uppercase tracking-wider border-b border-[#deded8]">
              <tr>
                <th className="py-4 px-5">Customer ID</th>
                <th className="py-4 px-5">Name & City</th>
                <th className="py-4 px-5">Contact Info</th>
                <th className="py-4 px-5">Registered Date</th>
                <th className="py-4 px-5">Orders Placed</th>
                <th className="py-4 px-5">Total Spent</th>
                <th className="py-4 px-5 text-right">Account Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#deded8]/60">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-[#f7f7f4]/60 transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-neutral-900 text-sm">
                      {cust.id}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-bold text-neutral-900 text-sm font-heading">{cust.name}</div>
                      <div className="text-xs text-neutral-500 font-mono flex items-center gap-1 mt-0.5">
                        <MapPin size={12} className="text-neutral-400" />
                        <span>{cust.city}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="text-neutral-800 flex items-center gap-2 font-mono text-xs">
                        <Mail size={13} className="text-neutral-400" />
                        <span>{cust.email}</span>
                      </div>
                      <div className="text-neutral-500 flex items-center gap-2 font-mono text-xs mt-1">
                        <Phone size={13} className="text-neutral-400" />
                        <span>{cust.phone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono text-xs text-neutral-600">
                      {cust.registeredDate}
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-neutral-900 text-sm">
                      {cust.ordersCount} {cust.ordersCount === 1 ? 'order' : 'orders'}
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-neutral-900 text-sm">
                      ₹{cust.totalSpent.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-5 text-right">
                      {cust.hasOrdered ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
                          <UserCheck size={13} />
                          <span>Active Buyer</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-300">
                          <UserX size={13} />
                          <span>No Orders Yet</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400 font-mono text-sm">
                    No customers found matching the search criteria.
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

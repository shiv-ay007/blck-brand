import { useState, useMemo } from 'react';
import { Search, Mail, Phone, MapPin, UserCheck, UserX, ShoppingBag, ArrowUpRight } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#028f99]">
              USER DIRECTORY
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-mono text-slate-500">PROFILES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-mono">
            CUSTOMER RECORDS
          </h1>
        </div>

        {/* Quick summary metrics */}
        <div className="flex items-center gap-2">
          <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono">
            Total: <strong className="text-slate-900">{totalRegistered}</strong>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-mono">
            Buyers: <strong>{activeBuyers}</strong>
          </div>
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-lg text-xs font-mono">
            Leads: <strong>{leadsOnly}</strong>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterType('All')}
            className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-colors ${
              filterType === 'All' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Registered ({totalRegistered})
          </button>
          <button
            onClick={() => setFilterType('Ordered')}
            className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-colors ${
              filterType === 'Ordered' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Active Buyers ({activeBuyers})
          </button>
          <button
            onClick={() => setFilterType('NoOrder')}
            className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-colors ${
              filterType === 'NoOrder' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            No Orders Yet ({leadsOnly})
          </button>
        </div>

        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer by name, email, city..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Customer ID</th>
                <th className="py-3 px-4">Name & City</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Registered Date</th>
                <th className="py-3 px-4">Orders Placed</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4 text-right">Account Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {cust.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 text-sm">{cust.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <MapPin size={11} />
                        <span>{cust.city}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-700 flex items-center gap-1.5 font-mono">
                        <Mail size={12} className="text-slate-400" />
                        <span>{cust.email}</span>
                      </div>
                      <div className="text-slate-500 flex items-center gap-1.5 font-mono text-[11px] mt-0.5">
                        <Phone size={11} className="text-slate-400" />
                        <span>{cust.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {cust.registeredDate}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {cust.ordersCount} {cust.ordersCount === 1 ? 'order' : 'orders'}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      ₹{cust.totalSpent.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {cust.hasOrdered ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <UserCheck size={12} />
                          <span>Active Buyer</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <UserX size={12} />
                          <span>No Orders Yet</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-mono text-xs">
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

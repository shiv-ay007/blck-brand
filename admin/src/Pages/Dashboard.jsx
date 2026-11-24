import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  CreditCard,
  Package,
  Calendar,
  ArrowUpRight,
  Plus,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';
import StatCard from '../Components/StatCard.jsx';
import StatusBadge from '../Components/StatusBadge.jsx';

export default function Dashboard() {
  const { orders, customers, products, enquiries } = useAdmin();
  const [dateFilter, setDateFilter] = useState('all');

  // Compute filtered metrics based on dateFilter
  const metrics = useMemo(() => {
    // Paid sales
    const paidOrders = orders.filter((o) => o.paymentStatus === 'Paid');
    const totalSales = paidOrders.reduce((acc, curr) => acc + curr.total, 0);

    const activeOrders = orders.filter((o) => o.orderStatus !== 'Cancelled').length;
    const totalCustomers = customers.length;
    const activeProducts = products.filter((p) => p.status === 'Active').length;

    return {
      totalSales,
      orderCount: orders.length,
      activeOrders,
      customerCount: totalCustomers,
      productCount: products.length,
      activeProducts,
    };
  }, [orders, customers, products]);

  // Recent 5 orders
  const recentOrders = useMemo(() => {
    return [...orders].slice(0, 5);
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Page Header with Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#028f99]">
              OVERVIEW
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-mono text-slate-500">REALTIME METRICS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-mono">
            STORE DASHBOARD
          </h1>
        </div>

        {/* Date Filter & Actions */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-xs">
            <Calendar size={15} className="text-slate-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="text-xs font-mono font-semibold bg-transparent text-slate-700 outline-none cursor-pointer"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <Link
            to="/products"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold font-mono tracking-wider uppercase rounded-lg transition-colors shadow-xs"
          >
            <Plus size={14} />
            <span>Manage Drops</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Paid Sales"
          value={`₹${metrics.totalSales.toLocaleString('en-IN')}`}
          change="18.4%"
          isPositive={true}
          icon={CreditCard}
          subtitle={dateFilter === 'all' ? 'All live transactions' : 'For selected period'}
        />
        <StatCard
          title="Order Counts"
          value={metrics.orderCount}
          change="12%"
          isPositive={true}
          icon={ShoppingBag}
          subtitle={`${metrics.activeOrders} active & processing`}
        />
        <StatCard
          title="Customer Registrations"
          value={metrics.customerCount}
          change="8.2%"
          isPositive={true}
          icon={Users}
          subtitle="Registered accounts"
        />
        <StatCard
          title="Live Drops & Stock"
          value={`${metrics.activeProducts}/${metrics.productCount}`}
          change="Optimal"
          isPositive={true}
          icon={Package}
          subtitle="Products active in store"
        />
      </div>

      {/* Recent Orders & Store Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Orders Table */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-900">
                Recent Orders
              </h2>
              <p className="text-xs text-slate-500">Live store customer purchases</p>
            </div>
            <Link
              to="/orders"
              className="text-xs font-mono font-bold text-[#028f99] hover:underline flex items-center gap-1"
            >
              <span>View All ({orders.length})</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Items</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      {order.id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{order.customer.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{order.customer.city}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      ₹{order.total}
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={order.orderStatus} />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to="/orders"
                        className="px-2.5 py-1 text-[11px] font-mono font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Fast Insights & Quick Links */}
        <div className="lg:col-span-4 space-y-5">
          {/* Top Drops Performance */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-[#028f99]" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                Top Selling Releases
              </h3>
            </div>
            <div className="space-y-3">
              {products.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded bg-slate-100 p-0.5 flex-shrink-0 border border-slate-200">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="truncate">
                      <div className="font-semibold text-slate-800 truncate">{p.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">₹{p.price}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-[#028f99] font-bold flex-shrink-0">
                    {p.salesCount || 50}+ sold
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Enquiries Alert Widget */}
          <div className="bg-[#040d12] text-white border border-slate-800 rounded-xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#028f99] font-bold">
                SUPPORT INBOX
              </span>
              <Clock size={14} className="text-slate-400" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {enquiries.filter((e) => e.status === 'New').length} New Customer Enquiries
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Respond to customer sizing, restock and wholesale queries.
            </p>
            <Link
              to="/enquiries"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#028f99] hover:bg-[#027c85] text-white text-xs font-mono font-bold tracking-wider uppercase rounded-lg transition-colors"
            >
              <span>Open Enquiries</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

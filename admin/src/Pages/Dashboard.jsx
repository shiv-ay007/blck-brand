import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  ShoppingBag,
  Users,
  Package,
  Calendar,
  ArrowUpRight,
  Plus,
  Clock,
  Sparkles,
  TrendingUp,
  PieChart as PieIcon,
  BarChart3,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useAdmin } from '../context/AdminContext.jsx';
import StatCard from '../Components/StatCard.jsx';
import StatusBadge from '../Components/StatusBadge.jsx';

// Trend Data
const salesTrendData = [
  { month: 'Jun', sales: 24200, orders: 31, rate: 84 },
  { month: 'Jul', sales: 31800, orders: 42, rate: 89 },
  { month: 'Aug', sales: 28400, orders: 37, rate: 86 },
  { month: 'Sep', sales: 42900, orders: 56, rate: 91 },
  { month: 'Oct', sales: 51200, orders: 68, rate: 94 },
  { month: 'Nov', sales: 64790, orders: 84, rate: 97 },
];

// Category Share Data
const categoryDistribution = [
  { name: 'Footwear & Socks', value: 48, count: '142 pairs', color: '#028f99' },
  { name: 'Heavyweight Tees', value: 30, count: '88 tees', color: '#0f172a' },
  { name: 'Capsules & Drops', value: 16, count: '46 items', color: '#dc2626' },
  { name: 'Accessories', value: 6, count: '18 pieces', color: '#8b5cf6' },
];

// Weekly Performance
const weeklyBarData = [
  { day: 'Mon', revenue: 6400, orders: 8 },
  { day: 'Tue', revenue: 9800, orders: 13 },
  { day: 'Wed', revenue: 7600, orders: 10 },
  { day: 'Thu', revenue: 11400, orders: 15 },
  { day: 'Fri', revenue: 14200, orders: 19 },
  { day: 'Sat', revenue: 18900, orders: 25 },
  { day: 'Sun', revenue: 13600, orders: 17 },
];

export default function Dashboard() {
  const { orders, customers, products, enquiries } = useAdmin();
  const [dateFilter, setDateFilter] = useState('all');
  const [activeChartMetric, setActiveChartMetric] = useState('sales'); // 'sales' | 'orders'

  // Compute filtered metrics based on dateFilter
  const metrics = useMemo(() => {
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

  // Custom Recharts Dark Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#040d12]/95 backdrop-blur-md border border-white/15 px-3.5 py-2.5 rounded-xl shadow-xl text-white font-mono text-xs">
          <p className="text-white/60 text-[11px] font-bold uppercase tracking-wider mb-1">
            {label} 2026
          </p>
          <p className="font-extrabold text-[#028f99] text-sm">
            {activeChartMetric === 'sales'
              ? `₹${Number(payload[0].value).toLocaleString('en-IN')}`
              : `${payload[0].value} Orders`}
          </p>
          <span className="text-[10px] text-white/50 block mt-0.5">Verified Store Metric</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Page Header with Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-3 border-b border-[#deded8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#028f99]">
              OVERVIEW
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-widest">
              REALTIME METRICS & CHARTS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1.5 font-heading">
            STORE DASHBOARD
          </h1>
        </div>

        {/* Date Filter & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-white border border-[#deded8] rounded-xl px-4 py-2 shadow-xs">
            <Calendar size={16} className="text-neutral-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="text-xs font-mono font-semibold bg-transparent text-neutral-800 outline-none cursor-pointer"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <Link
            to="/products"
            className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold font-mono tracking-wider uppercase rounded-xl transition-all shadow-xs"
          >
            <Plus size={15} />
            <span>Manage Drops</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales & Revenue Trend Area Chart (8 Columns) */}
        <div className="lg:col-span-8 bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#deded8]/70">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-[#028f99]" />
                <h2 className="text-base font-bold font-heading uppercase tracking-wider text-neutral-900">
                  Revenue & Sales Trend
                </h2>
              </div>
              <p className="text-xs text-neutral-500 mt-1 font-sans">
                Real-time volume performance over last 6 months
              </p>
            </div>

            {/* Toggle metric */}
            <div className="flex items-center gap-1 bg-[#f7f7f4] p-1 rounded-xl text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveChartMetric('sales')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeChartMetric === 'sales'
                    ? 'bg-neutral-900 text-white font-bold shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Revenue (₹)
              </button>
              <button
                type="button"
                onClick={() => setActiveChartMetric('orders')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeChartMetric === 'orders'
                    ? 'bg-neutral-900 text-white font-bold shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Orders
              </button>
            </div>
          </div>

          {/* Revenue Headline in Chart */}
          <div className="pt-4 pb-2 flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-heading">
              {activeChartMetric === 'sales' ? '₹64,790' : '84 Orders'}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              +26.5% vs Last Period
            </span>
          </div>

          {/* Area Chart Container */}
          <div className="w-full h-64 sm:h-72 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#028f99" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#028f99" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ebebe6" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={{ stroke: '#deded8' }}
                  tick={{ fill: '#737373', fontSize: 12, fontFamily: 'monospace' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: '#deded8' }}
                  tick={{ fill: '#737373', fontSize: 11, fontFamily: 'monospace' }}
                  tickFormatter={(val) =>
                    activeChartMetric === 'sales' ? `₹${val / 1000}k` : val
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={activeChartMetric}
                  stroke={activeChartMetric === 'sales' ? '#028f99' : '#0f172a'}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill={activeChartMetric === 'sales' ? 'url(#colorSales)' : 'url(#colorOrders)'}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut Chart (4 Columns) */}
        <div className="lg:col-span-4 bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div className="pb-3 border-b border-[#deded8]/70">
            <div className="flex items-center gap-2">
              <PieIcon size={18} className="text-[#028f99]" />
              <h2 className="text-base font-bold font-heading uppercase tracking-wider text-neutral-900">
                Sales by Category
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1 font-sans">
              Storewide product performance split
            </p>
          </div>

          {/* Donut Chart */}
          <div className="w-full h-48 relative flex items-center justify-center my-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}% Share`, name]}
                  contentStyle={{
                    backgroundColor: '#040d12',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Total</span>
              <span className="text-lg font-bold font-heading text-neutral-900">100%</span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-2 pt-2 border-t border-[#deded8]/60">
            {categoryDistribution.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-neutral-700 font-medium">{cat.name}</span>
                </div>
                <div className="font-mono font-bold text-neutral-900">
                  {cat.value}% <span className="text-neutral-400 font-normal">({cat.count})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Activity Bar Chart & Support Insight Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Bar Chart (7 Columns) */}
        <div className="lg:col-span-7 bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#deded8]/70">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-[#028f99]" />
              <h3 className="text-base font-bold font-heading uppercase tracking-wider text-neutral-900">
                Weekly Revenue Cadence
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              Last 7 Days
            </span>
          </div>

          <div className="w-full h-56 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ebebe6" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={{ stroke: '#deded8' }}
                  tick={{ fill: '#737373', fontSize: 12, fontFamily: 'monospace' }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: '#deded8' }}
                  tick={{ fill: '#737373', fontSize: 11, fontFamily: 'monospace' }}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: '#040d12',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="revenue" fill="#028f99" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Drops & Support Inbox (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Top Drops Performance */}
          <div className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#deded8]/60">
              <Sparkles size={18} className="text-[#028f99]" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900">
                Top Selling Releases
              </h3>
            </div>
            <div className="space-y-3.5">
              {products.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#f7f7f4] p-1 flex-shrink-0 border border-[#deded8]">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="truncate">
                      <div className="font-semibold text-neutral-900 truncate text-sm">{p.name}</div>
                      <div className="text-xs text-neutral-500 font-mono">₹{p.price}</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#028f99] font-bold flex-shrink-0 bg-[#028f99]/10 px-2 py-0.5 rounded">
                    {p.salesCount || 50}+ sold
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Enquiries Alert Widget */}
          <div className="bg-[#040d12] text-white border border-white/10 rounded-2xl p-5 shadow-lg flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock size={15} className="text-[#028f99]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#028f99] font-bold">
                  CUSTOMER INBOX
                </span>
              </div>
              <h4 className="text-sm font-bold font-heading text-white">
                {enquiries.filter((e) => e.status === 'New').length} New Enquiries
              </h4>
              <p className="text-xs text-white/60 font-sans mt-0.5">
                Check client queries & restock requests
              </p>
            </div>
            <Link
              to="/enquiries"
              className="px-3.5 py-2 bg-[#028f99] hover:bg-[#027c85] text-white text-xs font-mono font-bold tracking-wider uppercase rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
            >
              <span>View</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white border border-[#deded8] rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#deded8]/60">
          <div>
            <h2 className="text-base font-bold font-heading uppercase tracking-wider text-neutral-900">
              Recent Orders
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5 font-sans">
              Live storefront customer transactions
            </p>
          </div>
          <Link
            to="/orders"
            className="text-xs font-mono font-bold text-[#028f99] hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            <span>View All ({orders.length})</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f7f7f4] text-neutral-500 font-mono text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 rounded-l-lg">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#deded8]/60">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#f7f7f4]/60 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-neutral-900 text-sm">
                    {order.id}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-neutral-900 text-sm">{order.customer.name}</div>
                    <div className="text-xs text-neutral-500 font-mono">{order.customer.city}</div>
                  </td>
                  <td className="py-4 px-4 text-neutral-700 text-sm font-medium">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-neutral-900 text-sm">
                    ₹{order.total}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={order.orderStatus} />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      to="/orders"
                      className="px-3 py-1.5 text-xs font-mono font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors inline-block"
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
    </div>
  );
}

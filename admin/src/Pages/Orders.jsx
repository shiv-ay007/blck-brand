import { useState, useMemo } from 'react';
import { Search, ShoppingBag, Eye, X, MapPin, Phone, Mail, Package, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';
import StatusBadge from '../Components/StatusBadge.jsx';

export default function Orders() {
  const { orders, updateOrderStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'All' || order.orderStatus === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => ({ ...prev, orderStatus: newStatus }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#028f99]">
              SALES & DISPATCH
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-mono text-slate-500">FULFILLMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-mono">
            ORDER MANAGEMENT
          </h1>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-xs">
          Total Orders: <strong className="text-slate-900">{orders.length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Status filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search order ID, customer, city..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items Ordered</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {order.id}
                      <div className="text-[10px] text-slate-400 font-normal">
                        {new Date(order.date).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{order.customer.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{order.customer.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="max-w-[200px] truncate text-slate-700">
                        {order.items.map((i) => `${i.name} (×${i.qty})`).join(', ')}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {order.items.length} {order.items.length === 1 ? 'line item' : 'line items'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      ₹{order.total}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-[11px] font-semibold text-slate-700 font-mono">
                        {order.paymentMethod}
                      </div>
                      <StatusBadge status={order.paymentStatus} />
                    </td>
                    <td className="py-3.5 px-4">
                      {/* Interactive Status Selector */}
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-xs font-mono font-semibold bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none cursor-pointer text-slate-800"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-2.5 py-1 text-xs font-mono font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors inline-flex items-center gap-1"
                      >
                        <Eye size={12} />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-mono text-xs">
                    No orders match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#028f99]">
                  ORDER DETAILS
                </span>
                <h3 className="text-lg font-bold font-mono text-slate-900">{selectedOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              {/* Customer and Delivery info */}
              <div className="bg-slate-50 p-3.5 rounded-xl space-y-2">
                <div className="font-bold font-mono uppercase text-slate-700 text-[11px]">
                  Customer & Shipping
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">{selectedOrder.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Phone size={12} />
                    <span>{selectedOrder.customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 col-span-2">
                    <Mail size={12} />
                    <span>{selectedOrder.customer.email}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-500 col-span-2">
                    <MapPin size={12} className="flex-shrink-0 mt-0.5" />
                    <span>{selectedOrder.deliveryAddress}</span>
                  </div>
                </div>
              </div>

              {/* Items Breakdown */}
              <div>
                <div className="font-bold font-mono uppercase text-slate-700 text-[11px] mb-2">
                  Items Summary
                </div>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between bg-white">
                      <div className="flex items-center gap-2.5">
                        <Package size={15} className="text-[#028f99]" />
                        <div>
                          <div className="font-semibold text-slate-800">{item.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">Qty: {item.qty}</div>
                        </div>
                      </div>
                      <div className="font-mono font-bold text-slate-900">
                        ₹{item.price * item.qty}
                      </div>
                    </div>
                  ))}
                  <div className="p-3 bg-slate-50 flex items-center justify-between font-mono font-bold text-slate-900">
                    <span>Total Amount:</span>
                    <span>₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Current Status:</span>
                  <StatusBadge status={selectedOrder.orderStatus} />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, 'Delivered')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <CheckCircle2 size={13} />
                    <span>Mark Delivered</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

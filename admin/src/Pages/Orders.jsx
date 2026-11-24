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
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#deded8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#028f99]">
              SALES & DISPATCH
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-widest">
              FULFILLMENT
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1.5 font-heading">
            ORDER MANAGEMENT
          </h1>
        </div>

        <div className="text-xs font-mono text-neutral-600 bg-white border border-[#deded8] px-4 py-2 rounded-xl shadow-xs">
          Total Orders: <strong className="text-neutral-900 text-sm font-bold">{orders.length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#deded8] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-xs font-mono font-bold rounded-xl transition-all whitespace-nowrap uppercase tracking-wider ${
                statusFilter === status
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:bg-[#f7f7f4] hover:text-neutral-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[280px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search order ID, customer, city..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-[#deded8] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#deded8] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f7f7f4] text-neutral-500 font-mono text-xs uppercase tracking-wider border-b border-[#deded8]">
              <tr>
                <th className="py-4 px-5">Order ID</th>
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">Items Ordered</th>
                <th className="py-4 px-5">Total Amount</th>
                <th className="py-4 px-5">Payment</th>
                <th className="py-4 px-5">Order Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#deded8]/60">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#f7f7f4]/60 transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-neutral-900 text-sm">
                      {order.id}
                      <div className="text-xs text-neutral-400 font-normal mt-0.5">
                        {new Date(order.date).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-neutral-900 text-sm">{order.customer.name}</div>
                      <div className="text-xs text-neutral-500 font-mono">{order.customer.email}</div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="max-w-[220px] truncate text-neutral-800 font-medium">
                        {order.items.map((i) => `${i.name} (×${i.qty})`).join(', ')}
                      </div>
                      <div className="text-xs text-neutral-400 font-mono">
                        {order.items.length} {order.items.length === 1 ? 'line item' : 'line items'}
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-neutral-900 text-sm">
                      ₹{order.total}
                    </td>
                    <td className="py-4 px-5">
                      <div className="text-xs font-semibold text-neutral-800 font-mono mb-1">
                        {order.paymentMethod}
                      </div>
                      <StatusBadge status={order.paymentStatus} />
                    </td>
                    <td className="py-4 px-5">
                      {/* Interactive Status Selector */}
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-xs font-mono font-semibold bg-[#f7f7f4] border border-[#deded8] rounded-lg px-3 py-1.5 outline-none cursor-pointer text-neutral-900 hover:border-neutral-400 transition-colors"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3.5 py-1.5 text-xs font-mono font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <Eye size={13} />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400 font-mono text-sm">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-[#deded8] shadow-2xl p-7">
            <div className="flex items-center justify-between pb-4 border-b border-[#deded8]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#028f99]">
                  ORDER DETAILS
                </span>
                <h3 className="text-xl font-bold font-heading text-neutral-900 mt-0.5">{selectedOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-5 space-y-5 text-sm">
              {/* Customer and Delivery info */}
              <div className="bg-[#f7f7f4] p-4 rounded-xl space-y-2.5 border border-[#deded8]">
                <div className="font-bold font-mono uppercase text-neutral-700 text-xs tracking-wider">
                  Customer & Shipping Address
                </div>
                <div className="grid grid-cols-2 gap-3 text-neutral-700 text-sm">
                  <div>
                    <span className="font-bold text-neutral-900">{selectedOrder.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 font-mono text-xs">
                    <Phone size={13} />
                    <span>{selectedOrder.customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 font-mono text-xs col-span-2">
                    <Mail size={13} />
                    <span>{selectedOrder.customer.email}</span>
                  </div>
                  <div className="flex items-start gap-2 text-neutral-600 col-span-2 text-xs leading-relaxed">
                    <MapPin size={14} className="flex-shrink-0 mt-0.5 text-neutral-400" />
                    <span>{selectedOrder.deliveryAddress}</span>
                  </div>
                </div>
              </div>

              {/* Items Breakdown */}
              <div>
                <div className="font-bold font-mono uppercase text-neutral-700 text-xs tracking-wider mb-2.5">
                  Items Summary
                </div>
                <div className="divide-y divide-[#deded8] border border-[#deded8] rounded-xl overflow-hidden">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between bg-white text-sm">
                      <div className="flex items-center gap-3">
                        <Package size={17} className="text-[#028f99]" />
                        <div>
                          <div className="font-semibold text-neutral-900">{item.name}</div>
                          <div className="text-xs text-neutral-400 font-mono">Qty: {item.qty}</div>
                        </div>
                      </div>
                      <div className="font-mono font-bold text-neutral-900">
                        ₹{item.price * item.qty}
                      </div>
                    </div>
                  ))}
                  <div className="p-4 bg-[#f7f7f4] flex items-center justify-between font-mono font-bold text-neutral-900 text-sm">
                    <span>Total Amount:</span>
                    <span className="text-base">₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs text-neutral-400 block font-mono mb-1">Current Status:</span>
                  <StatusBadge status={selectedOrder.orderStatus} />
                </div>
                <button
                  onClick={() => handleStatusChange(selectedOrder.id, 'Delivered')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <CheckCircle2 size={15} />
                  <span>Mark Delivered</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

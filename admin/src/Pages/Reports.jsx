import { useState } from 'react';
import { Download, FileSpreadsheet, Check, Calendar, BarChart3, TrendingUp } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';
import toast from 'react-hot-toast';

export default function Reports() {
  const { orders, products, customers, payments } = useAdmin();

  // Helper to trigger CSV download in browser
  const downloadCSV = (filename, csvContent) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${filename} downloaded successfully!`);
  };

  // Export Sales Report
  const exportSalesCSV = () => {
    const headers = 'Order ID,Customer,Date,Payment Method,Payment Status,Total Amount\n';
    const rows = orders
      .map(
        (o) =>
          `"${o.id}","${o.customer.name}","${o.date}","${o.paymentMethod}","${o.paymentStatus}","${o.total}"`
      )
      .join('\n');
    downloadCSV(`BLCK_Sales_Report_${new Date().toISOString().slice(0, 10)}.csv`, headers + rows);
  };

  // Export Inventory CSV
  const exportInventoryCSV = () => {
    const headers = 'Product ID,Product Name,Category,Color,Stock Units,Price,Status\n';
    const rows = products
      .map(
        (p) =>
          `"${p.id}","${p.name}","${p.category}","${p.color}","${p.stock}","${p.price}","${p.status}"`
      )
      .join('\n');
    downloadCSV(`BLCK_Inventory_Stock_${new Date().toISOString().slice(0, 10)}.csv`, headers + rows);
  };

  // Export Customers CSV
  const exportCustomersCSV = () => {
    const headers = 'Customer ID,Name,Email,Phone,City,Total Orders,Total Spent,Buyer Type\n';
    const rows = customers
      .map(
        (c) =>
          `"${c.id}","${c.name}","${c.email}","${c.phone}","${c.city}","${c.ordersCount}","${c.totalSpent}","${
            c.hasOrdered ? 'Active Buyer' : 'Lead'
          }"`
      )
      .join('\n');
    downloadCSV(`BLCK_Customers_${new Date().toISOString().slice(0, 10)}.csv`, headers + rows);
  };

  // Export Orders Full Detail CSV
  const exportOrdersCSV = () => {
    const headers = 'Order ID,Customer,Phone,City,Items Count,Total,Order Status,Delivery Address\n';
    const rows = orders
      .map(
        (o) =>
          `"${o.id}","${o.customer.name}","${o.customer.phone}","${o.customer.city}","${o.items.length}","${o.total}","${o.orderStatus}","${o.deliveryAddress}"`
      )
      .join('\n');
    downloadCSV(`BLCK_Full_Orders_${new Date().toISOString().slice(0, 10)}.csv`, headers + rows);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#deded8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#028f99]">
              ANALYTICS & EXPORTS
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-mono font-semibold text-neutral-500 uppercase tracking-widest">
              DATA DUMPS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1.5 font-heading">
            REPORTS & EXPORTS
          </h1>
        </div>
      </div>

      {/* 4 CSV Export Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Report Card */}
        <div className="bg-white border border-[#deded8] rounded-2xl p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-neutral-900 text-white rounded-xl">
                <FileSpreadsheet size={22} />
              </div>
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                CSV EXPORT
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-xl text-neutral-900">
              Sales & Revenue Report
            </h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Complete breakdown of all store orders, payment transaction statuses, total revenues, and methods (Razorpay, UPI, COD).
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[#deded8]/60 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-500">
              {orders.length} transaction rows
            </span>
            <button
              onClick={exportSalesCSV}
              className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-mono font-bold tracking-wider uppercase rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Download size={14} />
              <span>Download CSV</span>
            </button>
          </div>
        </div>

        {/* Inventory Stock CSV */}
        <div className="bg-white border border-[#deded8] rounded-2xl p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#028f99] text-white rounded-xl">
                <FileSpreadsheet size={22} />
              </div>
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                CSV EXPORT
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-xl text-neutral-900">
              Inventory & Drops Catalog
            </h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Export current warehouse stock counts, SKU identifiers, sale prices, compare prices, colorways, and active visibility flags.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[#deded8]/60 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-500">
              {products.length} product records
            </span>
            <button
              onClick={exportInventoryCSV}
              className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-mono font-bold tracking-wider uppercase rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Download size={14} />
              <span>Download CSV</span>
            </button>
          </div>
        </div>

        {/* Customer Directory CSV */}
        <div className="bg-white border border-[#deded8] rounded-2xl p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-neutral-900 text-white rounded-xl">
                <FileSpreadsheet size={22} />
              </div>
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                CSV EXPORT
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-xl text-neutral-900">
              Customer Directory & Leads
            </h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Download customer database with registered contact emails, phone numbers, shipping cities, total lifetime spend, and orders placed.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[#deded8]/60 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-500">
              {customers.length} user records
            </span>
            <button
              onClick={exportCustomersCSV}
              className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-mono font-bold tracking-wider uppercase rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Download size={14} />
              <span>Download CSV</span>
            </button>
          </div>
        </div>

        {/* Full Orders & Delivery CSV */}
        <div className="bg-white border border-[#deded8] rounded-2xl p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#028f99] text-white rounded-xl">
                <FileSpreadsheet size={22} />
              </div>
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                CSV EXPORT
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-xl text-neutral-900">
              Fulfillment & Dispatch Sheet
            </h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Export complete packing sheet containing customer delivery addresses, phone contacts, items per package, and current shipping status.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[#deded8]/60 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-500">
              {orders.length} order lines
            </span>
            <button
              onClick={exportOrdersCSV}
              className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-mono font-bold tracking-wider uppercase rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Download size={14} />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

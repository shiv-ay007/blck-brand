import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import {
  initialProducts,
  initialOrders,
  initialCustomers,
  initialPayments,
  initialEnquiries,
  initialSettings,
  initialDiscounts,
  initialShipments,
  initialReturns,
} from '../data/mockData.js';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  // Authentication State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('blck_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Store entities
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('blck_admin_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('blck_admin_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('blck_admin_customers');
      return saved ? JSON.parse(saved) : initialCustomers;
    } catch {
      return initialCustomers;
    }
  });

  const [payments, setPayments] = useState(() => {
    try {
      const saved = localStorage.getItem('blck_admin_payments');
      return saved ? JSON.parse(saved) : initialPayments;
    } catch {
      return initialPayments;
    }
  });

  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('blck_admin_enquiries');
      return saved ? JSON.parse(saved) : initialEnquiries;
    } catch {
      return initialEnquiries;
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('blck_admin_settings');
      return saved ? JSON.parse(saved) : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  const [discounts, setDiscounts] = useState(() => {
    try {
      const saved = localStorage.getItem('blck_admin_discounts');
      return saved ? JSON.parse(saved) : initialDiscounts;
    } catch {
      return initialDiscounts;
    }
  });

  const [shipments, setShipments] = useState(() => {
    try {
      const saved = localStorage.getItem('blck_admin_shipments');
      return saved ? JSON.parse(saved) : initialShipments;
    } catch {
      return initialShipments;
    }
  });

  const [returns, setReturns] = useState(() => {
    try {
      const saved = localStorage.getItem('blck_admin_returns');
      return saved ? JSON.parse(saved) : initialReturns;
    } catch {
      return initialReturns;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('blck_admin_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('blck_admin_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('blck_admin_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('blck_admin_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('blck_admin_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('blck_admin_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('blck_admin_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('blck_admin_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('blck_admin_discounts', JSON.stringify(discounts));
  }, [discounts]);

  useEffect(() => {
    localStorage.setItem('blck_admin_shipments', JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem('blck_admin_returns', JSON.stringify(returns));
  }, [returns]);

  // Auth Functions
  const login = (email, password) => {
    const trimmedEmail = email ? email.trim() : '';
    const trimmedPass = password ? password.trim() : '';

    if (trimmedEmail && trimmedPass) {
      let displayName = 'Admin';
      if (trimmedEmail.includes('@')) {
        const rawName = trimmedEmail.split('@')[0].replace(/[._-]/g, ' ');
        displayName = rawName
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      }

      const adminData = {
        name: displayName,
        email: trimmedEmail,
        role: 'Super Admin',
        avatar: '/assets/blck-monogram.png',
        loggedInAt: new Date().toISOString(),
      };
      setUser(adminData);
      toast.success(`Welcome back, ${displayName}!`);
      return true;
    }
    toast.error('Invalid credentials. Please enter email and password.');
    return false;
  };

  const logout = async () => {
    const result = await Swal.fire({
      title: 'Sign Out?',
      text: 'Are you sure you want to exit the BLCK Admin Panel?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0f172a',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Sign Out',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
    });

    if (result.isConfirmed) {
      setUser(null);
      toast.success('Signed out successfully');
    }
  };

  // Product Actions
  const addProduct = (newProd) => {
    const item = {
      ...newProd,
      id: `PRD-00${products.length + 1}`,
      salesCount: 0,
      status: newProd.stock > 0 ? 'Active' : 'Out of Stock',
    };
    setProducts((prev) => [item, ...prev]);
    toast.success('Product created successfully!');
  };

  const updateProduct = (updatedProd) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProd.id ? { ...p, ...updatedProd } : p))
    );
    toast.success('Product updated successfully!');
  };

  const toggleProductVisibility = (id) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === 'Hidden' ? 'Active' : 'Hidden';
          toast.success(`Product is now ${nextStatus}`);
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete',
    });

    if (result.isConfirmed) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      Swal.fire('Deleted!', 'Product has been removed.', 'success');
    }
  };

  // Order Actions
  const updateOrderStatus = async (orderId, newStatus) => {
    const result = await Swal.fire({
      title: 'Update Order Status?',
      text: `Change order ${orderId} status to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0f172a',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Update',
    });

    if (result.isConfirmed) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
      );
      toast.success(`Order ${orderId} status updated to ${newStatus}`);
    }
  };

  // Enquiry Actions
  const updateEnquiryStatus = (enquiryId, status) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === enquiryId ? { ...e, status } : e))
    );
    toast.success(`Enquiry marked as ${status}`);
  };

  // Settings Action
  const updateStoreSettings = (newSettings) => {
    setSettings(newSettings);
    toast.success('Store settings saved successfully!');
  };

  // Discount Actions
  const addDiscount = (newDisc) => {
    const item = {
      ...newDisc,
      id: `DISC-0${discounts.length + 1}`,
      usedCount: 0,
      status: 'Active',
    };
    setDiscounts((prev) => [item, ...prev]);
    toast.success(`Promo code ${newDisc.code} created!`);
  };

  const deleteDiscount = async (id) => {
    const res = await Swal.fire({
      title: 'Delete Promo Code?',
      text: 'Customers will no longer be able to use this code.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Delete',
    });
    if (res.isConfirmed) {
      setDiscounts((prev) => prev.filter((d) => d.id !== id));
      toast.success('Promo code deleted');
    }
  };

  // Shipping Actions
  const createShippingLabel = (shipmentId) => {
    setShipments((prev) =>
      prev.map((s) => (s.id === shipmentId ? { ...s, labelStatus: 'Created', deliveryStatus: 'In Transit', lastSync: 'Just now' } : s))
    );
    toast.success('Shipping label generated & dispatched to courier!');
  };

  const syncCourierTracking = () => {
    setShipments((prev) =>
      prev.map((s) => ({ ...s, lastSync: 'Just now' }))
    );
    toast.success('Courier tracking synchronized via API!');
  };

  // Return & Refund Actions
  const updateReturnStatus = async (returnId, status) => {
    const isRefund = status === 'Refund Initiated';
    const res = await Swal.fire({
      title: isRefund ? 'Initiate Payment Refund?' : 'Update Return Request?',
      text: isRefund
        ? 'This will trigger the payment gateway API to refund the customer.'
        : `Change status of return ${returnId} to ${status}?`,
      icon: isRefund ? 'warning' : 'question',
      showCancelButton: true,
      confirmButtonColor: '#040d12',
      confirmButtonText: isRefund ? 'Yes, Process Refund' : 'Yes, Update',
    });

    if (res.isConfirmed) {
      setReturns((prev) =>
        prev.map((r) => (r.id === returnId ? { ...r, status } : r))
      );
      toast.success(isRefund ? 'Refund processed through payment provider!' : `Return marked as ${status}`);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        login,
        logout,
        products,
        addProduct,
        updateProduct,
        toggleProductVisibility,
        deleteProduct,
        orders,
        updateOrderStatus,
        customers,
        payments,
        enquiries,
        updateEnquiryStatus,
        settings,
        updateStoreSettings,
        discounts,
        addDiscount,
        deleteDiscount,
        shipments,
        createShippingLabel,
        syncCourierTracking,
        returns,
        updateReturnStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

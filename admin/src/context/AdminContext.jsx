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

  // Auth Functions
  const login = (email, password) => {
    if (
      (email === 'admin@blckbrand.com' && password === 'admin123') ||
      (email === 'admin' && password === 'admin')
    ) {
      const adminData = {
        name: 'BLCK Admin',
        email: email === 'admin' ? 'admin@blckbrand.com' : email,
        role: 'Super Admin',
        avatar: '/assets/blck-monogram.png',
        loggedInAt: new Date().toISOString(),
      };
      setUser(adminData);
      toast.success('Welcome back, Admin!');
      return true;
    }
    toast.error('Invalid credentials! Try: admin@blckbrand.com / admin123');
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

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext.jsx';
import AdminLayout from '../Layoute/AdminLayout.jsx';
import Login from '../Pages/Login.jsx';
import Dashboard from '../Pages/Dashboard.jsx';
import Orders from '../Pages/Orders.jsx';
import Products from '../Pages/Products.jsx';
import Customers from '../Pages/Customers.jsx';
import Payments from '../Pages/Payments.jsx';
import Enquiries from '../Pages/Enquiries.jsx';
import Settings from '../Pages/Settings.jsx';

function ProtectedRoute({ children }) {
  const { user } = useAdmin();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const { user } = useAdmin();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function MainRoutes() {
  return (
    <Routes>
      {/* Public Login Page */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected Admin Console with AdminLayout (Sidebar + Header + Outlet + Footer) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="payments" element={<Payments />} />
        <Route path="enquiries" element={<Enquiries />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback to Dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AdminProvider } from './context/AdminContext.jsx';
import MainRoutes from './Routes/MainRoutes.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: '#0f172a',
              color: '#fff',
              fontSize: '12px',
              fontFamily: 'monospace',
              borderRadius: '8px',
            },
          }}
        />
        <MainRoutes />
      </AdminProvider>
    </BrowserRouter>
  );
}

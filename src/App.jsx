import MainRoute from './routes/MainRoute.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { Toaster } from 'react-hot-toast';

// Keep all route declarations in src/routes/MainRoute.jsx.
export default function App() {
  return (
    <CartProvider>
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#111', color: '#fff', fontSize: '13px', borderRadius: '4px' } }} />
      <MainRoute />
    </CartProvider>
  );
}

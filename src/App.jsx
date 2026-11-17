import MainRoute from './routes/MainRoute.jsx';
import { CartProvider } from './context/CartContext.jsx';

// Keep all route declarations in src/routes/MainRoute.jsx.
export default function App() {
  return (
    <CartProvider>
      <MainRoute />
    </CartProvider>
  );
}

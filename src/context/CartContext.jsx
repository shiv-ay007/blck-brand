import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { products } from '../data/products.js';

const STORAGE_KEY = 'blck_frontend_demo_cart_v1';
const CartContext = createContext(null);
function readInitialCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(stored)) return [];
    return stored
      .filter((row) => products.some((product) => product.id === row.id))
      .map((row) => ({ id: row.id, qty: Math.min(10, Math.max(1, Number(row.qty) || 1)), size: 'One Size' }));
  } catch { return []; }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readInitialCart);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (id, size = 'One Size', qty = 1) => {
    const quantity = Math.min(10, Math.max(1, Number(qty) || 1));
    if (!products.some((product) => product.id === id)) return;
    setItems((existing) => {
      const current = existing.find((row) => row.id === id && row.size === size);
      if (current) return existing.map((row) => row.id === id && row.size === size ? { ...row, qty: Math.min(10, row.qty + quantity) } : row);
      return [...existing, { id, size, qty: quantity }];
    });
    toast.success('Added to your bag');
    setDrawerOpen(true);
  };
  const updateQty = (id, size, qty) => setItems((current) => current.map((row) => row.id === id && row.size === size ? { ...row, qty: Math.min(10, Math.max(1, Number(qty) || 1)) } : row));
  const removeItem = (id, size) => setItems((current) => current.filter((row) => !(row.id === id && row.size === size)));
  const clearCart = () => setItems([]);

  const lines = useMemo(() => items.map((row) => ({ ...row, product: products.find((product) => product.id === row.id) })).filter((row) => row.product), [items]);
  const itemCount = lines.reduce((total, line) => total + line.qty, 0);
  const subtotal = lines.reduce((total, line) => total + line.qty * line.product.samplePrice, 0);
  const value = { lines, itemCount, subtotal, addItem, updateQty, removeItem, clearCart, drawerOpen, setDrawerOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

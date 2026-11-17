import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, X } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { formatINR } from '../../utils/currency.js';

export default function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lines, itemCount, subtotal, updateQty, removeItem } = useCart();
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onEscape = (event) => { if (event.key === 'Escape') setDrawerOpen(false); };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [drawerOpen, setDrawerOpen]);
  if (!drawerOpen) return null;
  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDrawerOpen(false); }}>
      <aside className="cart-drawer" role="dialog" aria-label="Shopping bag" aria-modal="true">
        <div className="cart-drawer__header"><div><span className="eyebrow">THE GOOD STUFF</span><h2>YOUR BAG <span>({itemCount})</span></h2></div><button className="icon-button" onClick={() => setDrawerOpen(false)} aria-label="Close bag"><X/></button></div>
        {lines.length ? <div className="cart-drawer__items">{lines.map((line) => <div key={line.id + line.size} className="drawer-line"><img src={line.product.image} alt={line.product.name}/><div><Link to={`/product/${line.product.slug}`} onClick={() => setDrawerOpen(false)}>{line.product.name}</Link><small>{line.size} / {formatINR(line.product.samplePrice)}</small><div className="stepper"><button onClick={() => updateQty(line.id, line.size, line.qty - 1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{line.qty}</span><button onClick={() => updateQty(line.id, line.size, line.qty + 1)} aria-label="Increase quantity"><Plus size={13}/></button></div><button className="text-remove" onClick={() => removeItem(line.id, line.size)}>Remove</button></div></div>)}</div> : <div className="cart-drawer__empty"><img src="/assets/blck-monogram.png" alt="" /><p>NOTHING IN THE BAG. YET.</p><Link to="/shop" onClick={() => setDrawerOpen(false)} className="btn btn-dark">SHOP THE DROP <ArrowRight size={15}/></Link></div>}
        {lines.length > 0 && <div className="cart-drawer__footer"><div className="total-line"><span>SUBTOTAL</span><strong>{formatINR(subtotal)}</strong></div><p>Demo prices. Shipping and payment are not configured.</p><Link className="btn btn-dark full-width" to="/checkout" onClick={() => setDrawerOpen(false)}>GO TO CHECKOUT <ArrowRight size={16}/></Link><Link to="/cart" onClick={() => setDrawerOpen(false)} className="drawer-view-cart">VIEW BAG</Link></div>}
      </aside>
    </div>
  );
}

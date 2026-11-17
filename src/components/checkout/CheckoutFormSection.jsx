import { useState } from 'react';
import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { formatINR } from '../../utils/currency.js';

const initialForm = { firstName: '', lastName: '', email: '', phone: '', address: '', apartment: '', city: '', state: '', pincode: '', country: 'India' };
const formFields = [
  { name: 'firstName', label: 'First name', required: true }, { name: 'lastName', label: 'Last name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'phone', label: 'Phone number', type: 'tel', required: true },
  { name: 'address', label: 'Street address', required: true, wide: true }, { name: 'apartment', label: 'Apartment, suite etc. (optional)', wide: true },
  { name: 'city', label: 'City', required: true }, { name: 'state', label: 'State', required: true },
  { name: 'pincode', label: 'PIN code', required: true, inputMode: 'numeric' },
];

export default function CheckoutFormSection() {
  const { lines, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const handleChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    if (!lines.length) return;
    if (!/^\d{6}$/.test(form.pincode.trim())) { window.alert('Please enter a valid 6-digit PIN code.'); return; }
    // DEMO: no payment is captured, no order is sent to a server, and no address is persisted.
    const demoOrder = { id: `BLCK-DEMO-${Date.now().toString().slice(-7)}`, name: form.firstName.trim(), subtotal, count: lines.reduce((sum, line) => sum + line.qty, 0) };
    sessionStorage.setItem('blck_demo_last_order', JSON.stringify(demoOrder));
    clearCart();
    navigate('/order-confirmed', { replace: true });
  };
  return <section className="checkout-page shell simple-page"><div className="simple-page__head"><span className="eyebrow">ALMOST THERE</span><h1>CHECKOUT.</h1></div>
    {lines.length ? <div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><div className="demo-banner"><LockKeyhole size={20}/><div><strong>FRONTEND DEMONSTRATION ONLY</strong><p>No real order will be placed or payment collected. Connect a secure backend and payment gateway before launch.</p></div></div><h2>CONTACT & SHIPPING DETAILS</h2><div className="form-grid">{formFields.map((field) => <label key={field.name} className={field.wide ? 'full-span' : ''}><span>{field.label}{field.required && ' *'}</span><input required={field.required} type={field.type || 'text'} inputMode={field.inputMode} name={field.name} value={form[field.name]} onChange={handleChange} autoComplete="off" /></label>)}<label className="full-span"><span>Country *</span><select name="country" value={form.country} onChange={handleChange}><option>India</option></select></label></div><div className="checkout-payment"><h2>PAYMENT</h2><div className="checkout-payment__box"><LockKeyhole size={19}/><div><strong>Payments not yet enabled</strong><p>This preview safely simulates a checkout without requesting card details.</p></div></div></div><button className="btn btn-dark full-width" type="submit">PLACE DEMO ORDER <ArrowRight size={18}/></button><Link to="/cart" className="continue-link"><ArrowLeft size={14}/> RETURN TO BAG</Link></form><aside className="checkout-aside"><h2>YOUR ORDER</h2>{lines.map((line) => <div className="checkout-line" key={line.id + line.size}><div className="checkout-line__media"><img src={line.product.image} alt={line.product.name}/><span>{line.qty}</span></div><div><strong>{line.product.name}</strong><p>{line.size}</p></div><span>{formatINR(line.product.samplePrice * line.qty)}</span></div>)}<div className="summary-line"><span>SUBTOTAL</span><strong>{formatINR(subtotal)}</strong></div><div className="summary-line"><span>SHIPPING</span><span>NOT CALCULATED</span></div><div className="summary-line summary-line--total"><span>DEMO ITEMS TOTAL</span><strong>{formatINR(subtotal)}</strong></div></aside></div> : <div className="empty-state"><h2>YOUR BAG IS EMPTY.</h2><Link className="btn btn-dark" to="/shop">BACK TO SHOP <ArrowRight size={18}/></Link></div>}
  </section>;
}

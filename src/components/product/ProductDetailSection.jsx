import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Minus, Plus, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { getProductBySlug } from '../../data/products.js';
import { formatINR } from '../../utils/currency.js';
import { useCart } from '../../context/CartContext.jsx';

export default function ProductDetailSection() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState('product');

  if (!product) return (
    <div className="shell not-found simple-page">
      <h1>PRODUCT NOT FOUND.</h1>
      <Link to="/shop" className="btn btn-dark">BACK TO SHOP</Link>
    </div>
  );

  return (
    <section className="product-page shell">
      <div className="breadcrumbs">
        <Link to="/shop"><ArrowLeft size={14} /> SHOP</Link>
        <span>/</span>
        <span>{product.name.toUpperCase()}</span>
      </div>

      <div className="product-layout">
        <div className="product-gallery">
          <div className="product-gallery__main">
            <img
              src={activeImage === 'product' ? product.image : product.lifestyleImage}
              alt={activeImage === 'product' ? product.name : 'Model wearing BLCK socks'}
            />
          </div>
          <div className="product-gallery__thumbs">
            <button
              className={activeImage === 'product' ? 'selected' : ''}
              onClick={() => setActiveImage('product')}
            >
              <img src={product.image} alt="Product view" />
            </button>
            <button
              className={activeImage === 'lifestyle' ? 'selected' : ''}
              onClick={() => setActiveImage('lifestyle')}
            >
              <img src={product.lifestyleImage} alt="Styled view" />
            </button>
          </div>
        </div>

        <div className="product-info">
          <span className="eyebrow">BLCK / FIRST DROP / 001</span>
          <h1>{product.name}</h1>
          <span className="product-info__price">{formatINR(product.samplePrice)}</span>
          <p className="product-info__desc">{product.description}</p>

          <div className="product-divider" />

          <div className="product-info__size">
            <span>SIZE</span>
            <strong>{product.sizes[0]}</strong>
          </div>
          <div className="size-chip">{product.sizes[0]}</div>

          <div className="product-divider" />

          <div className="product-info__quantity">
            <span>QUANTITY</span>
            <div className="stepper stepper--large">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty(Math.min(10, qty + 1))}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            className="btn btn-dark full-width product-info__add"
            onClick={() => { addItem(product.id, product.sizes[0], qty); }}
          >
            ADD TO BAG — {formatINR(qty * product.samplePrice)} <ArrowRight size={18} />
          </button>

          <p className="demo-notice">
            Displayed price is for frontend demonstration. Final price and availability require client confirmation.
          </p>

          <div className="product-perks">
            <span><Truck size={18} /> SHIPPING DETAILS AT CHECKOUT</span>
            <span><RotateCcw size={18} /> RETURNS POLICY PENDING APPROVAL</span>
            <span><ShieldCheck size={18} /> ENCRYPTED PAYMENT TO BE INTEGRATED</span>
          </div>

          <details className="product-accordion" open>
            <summary>PRODUCT DETAILS <Plus size={16} /></summary>
            <ul>
              {product.details.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </details>

          <details className="product-accordion">
            <summary>SHIPPING & RETURNS <Plus size={16} /></summary>
            <p>
              Shipping rates, dispatch times and returns terms will be shared after the client has finalized the store policy.
            </p>
          </details>
        </div>
      </div>

      <div className="product-after">
        <span>WEAR IT YOUR WAY.</span>
        <img src="/assets/blck-wordmark.png" alt="BLCK" />
      </div>
    </section>
  );
}

import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatINR } from '../../utils/currency.js';
import { useCart } from '../../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-card__media" aria-label={`View ${product.name}`}>
        <span className="mini-tag">THE FIRST DROP</span>
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-card__view">VIEW PRODUCT <ArrowUpRight size={15} /></span>
      </Link>
      <div className="product-card__below">
        <div><Link to={`/product/${product.slug}`} className="product-card__name">{product.name}</Link><p>BLCK / {product.category}</p></div>
        <div className="product-card__right"><strong>{formatINR(product.samplePrice)}</strong><button type="button" onClick={() => addItem(product.id)} className="quick-add" aria-label={`Add ${product.name} to bag`}>+</button></div>
      </div>
    </article>
  );
}

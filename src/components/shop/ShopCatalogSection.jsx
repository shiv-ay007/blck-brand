import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../common/ProductCard.jsx';
import { products } from '../../data/products.js';

export default function ShopCatalogSection() {
  const [params, setParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('featured');
  const query = params.get('q') || '';
  const shown = useMemo(() => {
    const found = products.filter((product) => `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(query.toLowerCase().trim()));
    return found.sort((a, b) => sortBy === 'high' ? b.samplePrice - a.samplePrice : sortBy === 'low' ? a.samplePrice - b.samplePrice : a.name.localeCompare(b.name));
  }, [query, sortBy]);
  return <section className="shop-page"><div className="page-heading shell"><div><span className="eyebrow">THE BLCK COLLECTION</span><h1>ALL THE<br/><em>GOOD STUFF.</em></h1></div><p>Designed for those who move differently. Start with the first release.</p></div>
    <div className="shell shop-controls"><div className="shop-controls__group"><SlidersHorizontal size={16}/><span>ALL PRODUCTS</span><span className="shop-controls__count">({shown.length})</span></div><div className="shop-controls__group"><label htmlFor="sort-by">SORT BY</label><select id="sort-by" value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></div></div>
    {query && <div className="shell search-status">RESULTS FOR “{query}” <button onClick={() => setParams({})}>CLEAR <X size={14}/></button></div>}
    <div className="shell shop-grid">{shown.length ? shown.map((product) => <ProductCard key={product.id} product={product}/>) : <div className="shop-empty"><h2>NOTHING FOUND.</h2><p>Try a different search.</p><button className="btn btn-dark" onClick={() => setParams({})}>SHOW ALL PRODUCTS <ArrowUpRight size={16}/></button></div>}<div className="shop-grid__editorial"><img src="/assets/editorial-crop.webp" alt="BLCK campaign look"/><div><span>ALWAYS IN YOUR OWN LANE.</span><img src="/assets/blck-monogram.png" alt="BLCK mark"/></div></div></div>
    <div className="shop-footnote shell"><p>NEW CHAPTERS COMING.</p><span>EVERYTHING STARTS SOMEWHERE — BLCK 001</span></div>
  </section>;
}

import { Link } from 'react-router-dom';

export default function BrandLogo({ inverse = false, className = '' }) {
  return <Link to="/" className={`brand-logo ${inverse ? 'brand-logo--inverse' : ''} ${className}`} aria-label="BLCK home"><img src="/assets/blck-wordmark.png" alt="BLCK" /></Link>;
}

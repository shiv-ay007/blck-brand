import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="shell not-found simple-page">
      <span className="eyebrow">404 / NOTHING HERE</span>
      <h1>WRONG<br />TURN.</h1>
      <p>The page you're looking for isn't part of this drop.</p>
      <Link to="/" className="btn btn-dark">
        <ArrowLeft size={18} /> BACK TO HOME
      </Link>
    </div>
  );
}

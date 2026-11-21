import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatINR } from '../../utils/currency.js';

export default function ConfirmationSection() {
  let order = null;
  try {
    order = JSON.parse(sessionStorage.getItem('blck_demo_last_order') || 'null');
  } catch {
    order = null;
  }

  return (
    <section className="confirmation-page shell simple-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">
          <Check size={38} />
        </div>
        <span className="eyebrow">BLCK / ORDER PREVIEW</span>
        <h1>{order ? 'DEMO ORDER\nCOMPLETE.' : 'NO DEMO ORDER\nFOUND.'}</h1>
        {order ? (
          <>
            <p>
              Thanks, {order.name}. This is a frontend preview only. No actual purchase was made
              and no payment or order was sent to BLCK.
            </p>
            <div className="confirmation-details">
              <span>
                DEMO REFERENCE <strong>{order.id}</strong>
              </span>
              <span>
                ITEMS <strong>{order.count}</strong>
              </span>
              <span>
                DEMO TOTAL <strong>{formatINR(order.subtotal)}</strong>
              </span>
            </div>
          </>
        ) : (
          <p>Start with a product to see how the checkout confirmation screen works.</p>
        )}
        <Link to="/shop" className="btn btn-dark">
          BACK TO THE SHOP <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

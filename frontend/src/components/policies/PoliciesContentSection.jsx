import { NavLink, useParams } from 'react-router-dom';

const policies = [
  {
    slug: 'shipping',
    title: 'Shipping information',
    description:
      'Delivery destinations, service levels, charges, estimated dispatch times and shipment tracking need to be finalized by the BLCK team before the store accepts live orders.',
  },
  {
    slug: 'returns',
    title: 'Returns & exchanges',
    description:
      'Return eligibility, exchange conditions, reporting windows, refund methods and support process require formal confirmation before launch.',
  },
  {
    slug: 'privacy',
    title: 'Privacy policy',
    description:
      'A client-approved privacy notice is required, covering data collected, processing purposes, any payment/shipping processors, retention periods and customer rights.',
  },
  {
    slug: 'terms',
    title: 'Terms of service',
    description:
      'The final terms should define checkout conditions, availability, pricing, delivery responsibilities, liability limitations and governing law. Obtain legal review before publishing.',
  },
];

export default function PoliciesContentSection() {
  const { slug } = useParams();
  const selected = policies.find((policy) => policy.slug === slug);

  return (
    <section className="shell policies-page simple-page">
      <div className="simple-page__head">
        <span className="eyebrow">BLCK / INFORMATION DESK</span>
        <h1>{selected ? selected.title.toUpperCase() : 'POLICIES & HELP.'}</h1>
      </div>
      <div className="policies-layout">
        <nav aria-label="Policy pages">
          {policies.map((policy) => (
            <NavLink key={policy.slug} to={`/policies/${policy.slug}`}>
              {policy.title} ↗
            </NavLink>
          ))}
        </nav>
        <div className="policies-body">
          {selected ? (
            <>
              <span className="eyebrow">CUSTOMER INFORMATION</span>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
            </>
          ) : (
            <>
              <h2>THE IMPORTANT DETAILS.</h2>
              <p>
                Explore the individual information pages from the menu. Official policies are
                pending client review.
              </p>
            </>
          )}
          <div className="policy-alert">
            <strong>CLIENT APPROVAL REQUIRED</strong>
            <p>
              This is placeholder guidance for the frontend design, not a finalized company
              policy. Replace it with approved legal and operational text before accepting
              orders.
            </p>
          </div>
          <p>
            For questions, contact{' '}
            <a href="mailto:blckofficial2026@gmail.com">blckofficial2026@gmail.com</a> or
            WhatsApp{' '}
            <a href="https://wa.me/919899733351" target="_blank" rel="noreferrer">
              +91 98997 33351
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

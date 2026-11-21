export default function MarqueeSection() {
  return (
    <section className="marquee-section" aria-label="BLCK message">
      <div className="marquee-track" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index}>
            BLCK IS A STATE OF MIND <b>✳</b> NOT HERE TO FIT IN <b>✳</b>
          </span>
        ))}
      </div>
    </section>
  );
}

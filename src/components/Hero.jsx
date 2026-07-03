export default function Hero() {
  return (
    <section className="hero" aria-label="Apex Steel Pipes manufacturing overview">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="eyebrow">Steel pipe manufacturing since 1998</p>
        <h1>Apex Steel Pipes</h1>
        <p className="hero-copy">
          Precision welded and seamless steel pipe solutions for demanding
          infrastructure, fabrication, and industrial supply chains.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#products">
            View Products
          </a>
          <a className="button secondary" href="#contact">
            Talk to Sales
          </a>
        </div>
      </div>
      <div className="hero-metrics" aria-label="Company highlights">
        <div>
          <strong>28K</strong>
          <span>tons annual capacity</span>
        </div>
        <div>
          <strong>ISO</strong>
          <span>quality-led production</span>
        </div>
        <div>
          <strong>72h</strong>
          <span>standard quote response</span>
        </div>
      </div>
    </section>
  );
}

const products = [
  {
    id: "01",
    title: "ERW Steel Pipes",
    description:
      "Welded round, square, and rectangular pipes with consistent dimensional control for structural and fabrication use.",
  },
  {
    id: "02",
    title: "Galvanized Pipes",
    description:
      "Zinc-coated pipe for corrosion resistance in construction, irrigation, fencing, and outdoor utility installations.",
  },
  {
    id: "03",
    title: "Seamless Pipes",
    description:
      "High-strength pipe options for pressure applications, mechanical systems, and critical industrial assemblies.",
  },
  {
    id: "04",
    title: "Custom Sections",
    description:
      "Cut-to-length, special thickness, and project-specific profiles prepared for downstream manufacturing.",
  },
];

export default function Products() {
  return (
    <section className="section product-section" id="products">
      <div className="section-heading">
        <p className="eyebrow">Product range</p>
        <h2>Steel pipes and tubes for high-volume requirements.</h2>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <span className="card-icon">{product.id}</span>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

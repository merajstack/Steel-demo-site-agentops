const industries = [
  "Construction",
  "Energy",
  "Fabrication",
  "Water Systems",
  "Automotive",
  "Warehousing",
];

export default function Industries() {
  return (
    <section className="section industries" id="industries">
      <div className="section-heading">
        <p className="eyebrow">Industries served</p>
        <h2>Supplying pipe to teams that cannot afford rework.</h2>
      </div>
      <div className="industry-grid">
        {industries.map((industry) => (
          <span key={industry}>{industry}</span>
        ))}
      </div>
    </section>
  );
}

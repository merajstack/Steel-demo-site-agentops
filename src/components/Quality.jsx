const qualityItems = [
  {
    title: "Material traceability",
    description: "Heat numbers, grades, and mill certificates documented.",
  },
  {
    title: "Dimensional inspection",
    description:
      "Diameter, wall thickness, straightness, and edge finish checked.",
  },
  {
    title: "Finish options",
    description: "Black, galvanized, polished, painted, and oiled finishes.",
  },
];

export default function Quality() {
  return (
    <section className="quality-band" id="quality">
      <div className="quality-content">
        <div>
          <p className="eyebrow">Quality control</p>
          <h2>Controlled at every production stage.</h2>
        </div>
        <div className="quality-list">
          {qualityItems.map((item) => (
            <div key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

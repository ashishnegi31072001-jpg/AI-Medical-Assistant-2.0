function BiomarkerComparison({ current, previous }) {
  if (!previous) return null;

  const biomarkers = [
  {
    name: "Blood Sugar",
    current: Number(current?.summary?.bloodSugar?.value) || 0,
    previous: Number(previous?.summary?.bloodSugar?.value) || 0,
    better: "lower",
  },
  {
    name: "Hemoglobin",
    current: Number(current?.summary?.hemoglobin?.value) || 0,
    previous: Number(previous?.summary?.hemoglobin?.value) || 0,
    better: "higher",
  },
  {
    name: "Vitamin D",
    current: Number(current?.summary?.vitaminD?.value) || 0,
    previous: Number(previous?.summary?.vitaminD?.value) || 0,
    better: "higher",
  },
  {
    name: "Cholesterol",
    current: Number(current?.summary?.cholesterol?.value) || 0,
    previous: Number(previous?.summary?.cholesterol?.value) || 0,
    better: "lower",
  },
  {
    name: "HbA1c",
    current: Number(current?.summary?.hba1c?.value) || 0,
    previous: Number(previous?.summary?.hba1c?.value) || 0,
    better: "lower",
  },
];
  return (
    <div className="mt-6 rounded-xl bg-slate-900 p-5">
      <h3 className="mb-5 text-xl font-bold text-cyan-400">
        📈 Biomarker Comparison
      </h3>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="pb-3">Parameter</th>
            <th className="pb-3">Previous</th>
            <th className="pb-3">Current</th>
            <th className="pb-3">Trend</th>
          </tr>
        </thead>

        <tbody>
          {biomarkers.map((item) => (
            <tr
              key={item.name}
              className="border-b border-slate-800"
            >
              <td className="py-3">{item.name}</td>
              <td>{item.previous}</td>
              <td>{item.current}</td>
              <td>
  {item.better === "lower" ? (
    item.current < item.previous ? (
      <span className="text-green-400 font-bold">
        🟢 ↓ Better
      </span>
    ) : item.current > item.previous ? (
      <span className="text-red-400 font-bold">
        🔴 ↑ Worse
      </span>
    ) : (
      <span className="text-slate-400">
        ➖ Same
      </span>
    )
  ) : item.current > item.previous ? (
    <span className="text-green-400 font-bold">
      🟢 ↑ Better
    </span>
  ) : item.current < item.previous ? (
    <span className="text-red-400 font-bold">
      🔴 ↓ Worse
    </span>
  ) : (
    <span className="text-slate-400">
      ➖ Same
    </span>
  )}
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BiomarkerComparison;
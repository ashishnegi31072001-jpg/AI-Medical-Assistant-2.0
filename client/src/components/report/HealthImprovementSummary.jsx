function HealthImprovementSummary({ current, previous }) {
  if (!previous) return null;

  const biomarkers = [
    {
      better: "lower",
      current: Number(current?.summary?.bloodSugar?.value) || 0,
      previous: Number(previous?.summary?.bloodSugar?.value) || 0,
    },
    {
      better: "higher",
      current: Number(current?.summary?.hemoglobin?.value) || 0,
      previous: Number(previous?.summary?.hemoglobin?.value) || 0,
    },
    {
      better: "higher",
      current: Number(current?.summary?.vitaminD?.value) || 0,
      previous: Number(previous?.summary?.vitaminD?.value) || 0,
    },
    {
      better: "lower",
      current: Number(current?.summary?.cholesterol?.value) || 0,
      previous: Number(previous?.summary?.cholesterol?.value) || 0,
    },
    {
      better: "lower",
      current: Number(current?.summary?.hba1c?.value) || 0,
      previous: Number(previous?.summary?.hba1c?.value) || 0,
    },
  ];

  let improved = 0;
  let worsened = 0;
  let same = 0;

  biomarkers.forEach((item) => {
    if (item.better === "lower") {
      if (item.current < item.previous) improved++;
      else if (item.current > item.previous) worsened++;
      else same++;
    } else {
      if (item.current > item.previous) improved++;
      else if (item.current < item.previous) worsened++;
      else same++;
    }
  });

  const overall =
    improved >= 4
      ? "Excellent Improvement"
      : improved >= 2
      ? "Good Improvement"
      : improved === 1
      ? "Slight Improvement"
      : "Needs Attention";

  return (
    <div className="mt-6 rounded-2xl bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        📈 Health Improvement Summary
      </h2>

      <div className="grid grid-cols-3 gap-4">

        <div className="rounded-xl bg-green-700 p-5 text-center">
          <h3 className="text-4xl font-bold">{improved}</h3>
          <p>Improved</p>
        </div>

        <div className="rounded-xl bg-red-700 p-5 text-center">
          <h3 className="text-4xl font-bold">{worsened}</h3>
          <p>Worsened</p>
        </div>

        <div className="rounded-xl bg-slate-700 p-5 text-center">
          <h3 className="text-4xl font-bold">{same}</h3>
          <p>Same</p>
        </div>

      </div>

      <div className="mt-6 rounded-xl bg-cyan-700 p-5 text-center">
        <h2 className="text-2xl font-bold">
          🏆 {overall}
        </h2>
      </div>
    </div>
  );
}

export default HealthImprovementSummary;
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function BiomarkerTrendChart({ reports }) {
  if (!reports || reports.length === 0) return null;

  const data = [...reports]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((report, index) => ({
      report: `R${index + 1}`,
      bloodSugar:
        Number(report?.aiAnalysis?.summary?.bloodSugar?.value) || 0,
      hemoglobin:
        Number(report?.aiAnalysis?.summary?.hemoglobin?.value) || 0,
      vitaminD:
        Number(report?.aiAnalysis?.summary?.vitaminD?.value) || 0,
      cholesterol:
        Number(report?.aiAnalysis?.summary?.cholesterol?.value) || 0,
      hba1c:
        Number(report?.aiAnalysis?.summary?.hba1c?.value) || 0,
    }));

  return (
    <div className="mt-6 rounded-2xl bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        📈 Biomarker Trends
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="report" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="bloodSugar"
            stroke="#ef4444"
            name="Blood Sugar"
          />

          <Line
            type="monotone"
            dataKey="hemoglobin"
            stroke="#22c55e"
            name="Hemoglobin"
          />

          <Line
            type="monotone"
            dataKey="vitaminD"
            stroke="#3b82f6"
            name="Vitamin D"
          />

          <Line
            type="monotone"
            dataKey="cholesterol"
            stroke="#eab308"
            name="Cholesterol"
          />

          <Line
            type="monotone"
            dataKey="hba1c"
            stroke="#a855f7"
            name="HbA1c"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BiomarkerTrendChart;
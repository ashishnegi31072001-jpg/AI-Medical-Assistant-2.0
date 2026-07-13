import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function HealthTrendChart({ reports }) {
  const chartData = reports
    .slice()
    .reverse()
    .map((report) => ({
      date: new Date(report.createdAt).toLocaleDateString(),

      healthScore:
        report.aiAnalysis?.healthScore ?? 0,
    }));

  return (
    <div className="mt-10 rounded-2xl bg-slate-900 p-8 shadow-lg">

      <h2 className="mb-6 text-3xl font-bold text-white">
        📈 Health Score Trend
      </h2>

      <div style={{ width: "100%", height: 350 }}>

        <ResponsiveContainer>

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="healthScore"
              stroke="#22c55e"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default HealthTrendChart;
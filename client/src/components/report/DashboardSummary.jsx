function DashboardSummary({ reports }) {
  const totalReports = reports.length;

  const avgScore =
    totalReports > 0
      ? Math.round(
          reports.reduce(
            (sum, report) =>
              sum + (report.aiAnalysis?.healthScore || 0),
            0
          ) / totalReports
        )
      : 0;

  const highRisk = reports.filter(
    (report) =>
      (report.aiAnalysis?.healthScore || 0) < 60
  ).length;

  const healthy = reports.filter(
    (report) =>
      (report.aiAnalysis?.healthScore || 0) >= 80
  ).length;

  const Card = ({ title, value, color }) => (
    <div className={`rounded-2xl ${color} p-6 shadow-lg`}>
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-4 text-5xl font-bold text-white">
        {value}
      </p>
    </div>
  );

  return (
    <div className="mb-10">

      <h2 className="mb-6 text-3xl font-bold text-white">
        📊 Dashboard Summary
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card
          title="Reports"
          value={totalReports}
          color="bg-blue-600"
        />

        <Card
          title="Average Score"
          value={`${avgScore}%`}
          color="bg-green-600"
        />

        <Card
          title="High Risk"
          value={highRisk}
          color="bg-red-600"
        />

        <Card
          title="Healthy"
          value={healthy}
          color="bg-emerald-600"
        />

      </div>

    </div>
  );
}

export default DashboardSummary;
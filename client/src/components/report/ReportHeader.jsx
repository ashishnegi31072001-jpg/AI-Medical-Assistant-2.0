function ReportHeader({
  filename,
  createdAt,
  healthScore,
}) {
  return (
    <div className="mb-8 rounded-2xl border border-slate-700 bg-slate-900 p-6">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="flex items-center gap-3 text-3xl font-bold text-white">
            📄 {filename}
          </h2>

          <p className="mt-2 text-slate-400">
            Uploaded on{" "}
            {new Date(createdAt).toLocaleString()}
          </p>

        </div>

        <div className="flex gap-3">

          <span className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold">
            🤖 AI READY
          </span>

          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold">
            ❤️ {healthScore}/100
          </span>

        </div>

      </div>

    </div>
  );
}

export default ReportHeader;
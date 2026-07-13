import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  getSymptomHistory,
  deleteSymptom,
} from "../../services/symptomService";

function SymptomHistory() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);

      const data = await getSymptomHistory();

      if (data.success) {
        setReports(data.reports);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSymptom(id);

      setReports((prev) =>
        prev.filter((report) => report._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete report.");
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-slate-900 p-8">
        <h2 className="mb-6 text-2xl font-bold">
          Previous Reports
        </h2>

        <div className="text-slate-400 animate-pulse">
          Loading reports...
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-900 p-8 h-[78vh] overflow-y-auto">

      <h2 className="mb-6 text-4xl font-bold">
        Previous Reports
      </h2>

      {reports.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-700">
          <p className="text-slate-400 text-lg">
            No reports found.
          </p>
        </div>
      ) : (
        <div className="space-y-6">

          {reports.map((report) => (
            <div
              key={report._id}
              className="rounded-xl bg-slate-800 p-5 shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between">

                <h3 className="text-xl font-bold capitalize">
                  {report.symptoms}
                </h3>

                <span className="text-xs text-slate-400">
                  {new Date(report.createdAt).toLocaleString()}
                </span>

              </div>

              {/* Details */}
              <div className="mt-3 flex flex-wrap gap-4 text-sm">

                <span className="rounded-lg bg-slate-700 px-3 py-1">
                  Severity:
                  <span className="ml-2 font-semibold">
                    {report.severity}
                  </span>
                </span>

                <span className="rounded-lg bg-slate-700 px-3 py-1">
                  Duration:
                  <span className="ml-2 font-semibold">
                    {report.duration}
                  </span>
                </span>

              </div>

              {/* Notes */}
              {report.notes && (
                <div className="mt-4 rounded-lg bg-slate-700 p-3">
                  <p className="font-semibold mb-1">
                    Notes
                  </p>

                  <p className="text-slate-300">
                    {report.notes}
                  </p>
                </div>
              )}

              {/* AI Response */}
              <div className="mt-5 rounded-xl bg-slate-900 p-5">

                <h4 className="mb-3 text-lg font-semibold text-blue-400">
                  🤖 AI Analysis
                </h4>

                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                  >
                    {report.aiResponse}
                  </ReactMarkdown>
                </div>

              </div>

              {/* Delete Button */}
              <div className="mt-5 flex justify-end">

                <button
                  onClick={() =>
                    handleDelete(report._id)
                  }
                  className="rounded-lg bg-red-600 px-5 py-2 font-medium transition hover:bg-red-700"
                >
                  🗑 Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default SymptomHistory;
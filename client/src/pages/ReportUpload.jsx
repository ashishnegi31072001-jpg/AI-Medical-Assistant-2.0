import { useState } from "react";
import axios from "axios";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import ReportHistory from "../components/report/ReportHistory";

function ReportUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("report", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/report/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(response.data);

      // Clear selected file after upload
      setFile(null);

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Upload Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <div className="flex-1 overflow-y-auto p-10">

          <h1 className="mb-8 text-4xl font-bold">
            📄 AI Medical Report Analysis
          </h1>

          {/* Upload Card */}
          <div className="rounded-2xl bg-slate-900 p-8 shadow-lg">

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-6 block w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            />

            {file && (
              <div className="mb-5 text-slate-300">
                <strong>Selected File:</strong> {file.name}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {loading ? "Analyzing..." : "Upload & Analyze"}
            </button>

          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-8 rounded-xl bg-slate-900 p-6 text-center text-xl animate-pulse">
              🤖 AI is reading your medical report...
            </div>
          )}

          {/* AI Analysis */}
          {result && (
            <div className="mt-8 rounded-2xl bg-slate-900 p-8 shadow-lg">

              <h2 className="mb-6 text-3xl font-bold text-blue-400">
                🤖 AI Medical Analysis
              </h2>

              <div className="mb-6 rounded-lg bg-slate-800 p-4">
                <p>
                  <strong>Uploaded File:</strong> {result.filename}
                </p>
              </div>

              <div className="rounded-lg bg-slate-800 p-6 whitespace-pre-wrap leading-8 text-slate-200">
                {result.analysis}
              </div>

            </div>
          )}

          {/* Previous Reports */}
          <div className="mt-10">
            <ReportHistory refresh={result} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ReportUpload;
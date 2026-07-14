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

          {/* ================= HEADER ================= */}

          <div className="mb-8">
            <h1 className="flex items-center gap-3 text-5xl font-bold">
              📄 AI Medical Report Analysis
            </h1>

            <p className="mt-3 text-lg text-slate-400">
              Upload your medical report in PDF format.
              Our AI will analyze your report and generate
              a complete health assessment.
            </p>
          </div>

          {/* ================= Upload Card ================= */}

          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-10 shadow-2xl">

            <div className="mb-6">
              <label className="mb-3 block text-lg font-semibold">
                Select Medical Report
              </label>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="
                w-full
                rounded-xl
                border
                border-slate-600
                bg-slate-800
                p-4
                text-white
                file:mr-4
                file:rounded-lg
                file:border-0
                file:bg-blue-600
                file:px-5
                file:py-2
                file:text-white
                file:cursor-pointer
                hover:file:bg-blue-700
                "
              />
            </div>

            {file && (
              <div className="mb-6 rounded-xl bg-slate-800 p-4">
                <p className="text-green-400">
                  ✅ Selected File
                </p>

                <p className="mt-1 text-slate-300">
                  {file.name}
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={loading}
              className="
              w-full
              rounded-xl
              bg-blue-600
              py-4
              text-xl
              font-bold
              transition-all
              duration-300
              hover:bg-blue-700
              hover:scale-[1.02]
              disabled:cursor-not-allowed
              disabled:bg-blue-400
              "
            >
              {loading
                ? "🤖 AI is Analyzing..."
                : "🚀 Upload & Analyze"}
            </button>
          </div>

          {/* ================= Loading ================= */}

          {loading && (
            <div className="mt-8 rounded-2xl border border-blue-700 bg-slate-900 p-8 text-center shadow-lg">

              <div className="text-6xl animate-bounce">
                🤖
              </div>

              <h2 className="mt-4 text-2xl font-bold">
                AI is reading your report...
              </h2>

              <p className="mt-2 text-slate-400">
                This usually takes 10–30 seconds.
              </p>

            </div>
          )}

          {/* ================= Current Upload ================= */}

          {result && (
            <div className="mt-8 rounded-3xl border border-green-700 bg-slate-900 p-8 shadow-xl">

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-bold text-green-400">
                  ✅ Report Uploaded Successfully
                </h2>

                <span className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold">
                  AI READY
                </span>

              </div>

              <div className="mt-6 rounded-xl bg-slate-800 p-5">

                <p className="text-lg">
                  <strong>📄 File:</strong> {result.filename}
                </p>

              </div>

            </div>
          )}

          {/* ================= Previous Reports ================= */}

          <div className="mt-12">
            <ReportHistory refresh={result} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ReportUpload;
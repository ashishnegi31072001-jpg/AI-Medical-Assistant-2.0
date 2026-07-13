import { useEffect, useState } from "react";
import axios from "axios";

import {
  getReports,
  deleteReport,
} from "../../services/reportService";
import HealthCard from "./HealthCard";
import HealthTrendChart from "./HealthTrendChart";

function ReportHistory({ refresh }) {
  const [reports, setReports] = useState([]);

 useEffect(() => {
  loadReports();
}, [refresh]);

  const loadReports = async () => {
    try {
      const data = await getReports();

      if (data.success) {
        setReports(data.reports);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report?")) return;

    try {
      await deleteReport(id);
      loadReports();
    } catch (error) {
      console.error(error);
      alert("Failed to delete report.");
    }
  };

  const handleDownload = async (report) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/report/download/${report._id}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = report.filename;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Download failed.");
    }
  };


 

  return (
    <div className="mt-10 rounded-2xl bg-slate-900 p-8">

      <h2 className="mb-6 text-3xl font-bold">
        📄 Previous Medical Reports
      </h2>

      {reports.length === 0 ? (

        <p className="text-slate-400">
          No reports uploaded yet.
        </p>

      ) : (

        <div className="space-y-6">

          {reports.map((report) => (

            <div
              key={report._id}
              className="rounded-xl bg-slate-800 p-6 shadow-lg"
            >

              <h3 className="text-xl font-bold">
                📄 {report.filename}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Uploaded{" "}
                {new Date(report.createdAt).toLocaleString()}
              </p>

              <div className="mt-6 rounded-xl bg-slate-900 p-5">

               <h4 className="mb-4 text-xl font-bold text-blue-400">
  🤖 AI Analysis
</h4>

{typeof report.aiAnalysis === "string" ? (

  <pre className="whitespace-pre-wrap leading-7">
    {report.aiAnalysis}
  </pre>

) : (

  <>

    {/* Health Cards */}

    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

      <HealthCard
        title="Health Score"
        value={`${report.aiAnalysis?.healthScore ?? "N/A"}/100`}
        status="Overall"
        color="bg-green-700"
      />
      <HealthCard
  title="Risk Level"
  value={report.aiAnalysis?.riskLevel ?? "Unknown"}
  status="Assessment"
  color={
    report.aiAnalysis?.riskLevel === "Healthy"
      ? "bg-green-700"
      : report.aiAnalysis?.riskLevel === "Low Risk"
      ? "bg-yellow-600"
      : report.aiAnalysis?.riskLevel === "Moderate Risk"
      ? "bg-orange-600"
      : "bg-red-700"
  }
/>

      <HealthCard
        title="Blood Sugar"
        value={
          report.aiAnalysis?.summary?.bloodSugar?.value ??
          "N/A"
        }
        status={
          report.aiAnalysis?.summary?.bloodSugar?.status ??
          "Unknown"
        }
        color="bg-red-700"
      />

      <HealthCard
        title="Hemoglobin"
        value={
          report.aiAnalysis?.summary?.hemoglobin?.value ??
          "N/A"
        }
        status={
          report.aiAnalysis?.summary?.hemoglobin?.status ??
          "Unknown"
        }
        color="bg-yellow-700"
      />

      <HealthCard
        title="Vitamin D"
        value={
          report.aiAnalysis?.summary?.vitaminD?.value ??
          "N/A"
        }
        status={
          report.aiAnalysis?.summary?.vitaminD?.status ??
          "Unknown"
        }
        color="bg-orange-700"
      />

      <HealthCard
        title="Cholesterol"
        value={
          report.aiAnalysis?.summary?.cholesterol?.value ??
          "N/A"
        }
        status={
          report.aiAnalysis?.summary?.cholesterol?.status ??
          "Unknown"
        }
        color="bg-blue-700"
      />

      <HealthCard
        title="HbA1c"
        value={
          report.aiAnalysis?.summary?.hba1c?.value ??
          "N/A"
        }
        status={
          report.aiAnalysis?.summary?.hba1c?.status ??
          "Unknown"
        }
        color="bg-purple-700"
      />

    </div>

   <div className="mt-8 rounded-xl bg-slate-800 p-5">
  <h3 className="mb-3 text-xl font-bold text-red-400">
    🩺 Possible Diseases
  </h3>

  {report.aiAnalysis?.possibleDiseases?.length > 0 ? (
    <ul className="list-disc pl-6 space-y-2">
      {report.aiAnalysis.possibleDiseases.map((disease, index) => (
       <li key={index}>
  {typeof disease === "object"
    ? disease.name || JSON.stringify(disease)
    : disease}
</li>
      ))}
    </ul>
  ) : (
    <p className="text-slate-400">
      No disease detected.
    </p>
  )}
</div> 


<div className="mt-6 rounded-xl bg-slate-800 p-5">
  <h3 className="mb-3 text-xl font-bold text-green-400">
    💊 Recommendations
  </h3>

  <ul className="list-disc pl-6 space-y-2">
  {report.aiAnalysis?.recommendations?.map((item, index) => (
    <li key={index}>
      {typeof item === "object"
        ? item.advice || JSON.stringify(item)
        : item}
    </li>
  ))}
</ul>
</div>
<div className="mt-6 rounded-xl bg-slate-800 p-5">
  <h3 className="mb-3 text-xl font-bold text-cyan-400">
    🥗 Lifestyle Advice
  </h3>

  <ul className="list-disc pl-6 space-y-2">
    {report.aiAnalysis?.lifestyleAdvice?.map((item, index) => (
     <li key={index}>
  {typeof item === "object"
    ? item.advice || JSON.stringify(item)
    : item}
</li>
    ))}
  </ul>
</div>
<div className="mt-6 rounded-xl bg-slate-800 p-5">
  <h3 className="mb-3 text-xl font-bold text-yellow-400">
    ⚠ Warning Signs
  </h3>

  <ul className="list-disc pl-6 space-y-2">
    {report.aiAnalysis?.warningSigns?.map((item, index) => (
      <li key={index}>
  {typeof item === "object"
    ? item.warning || item.advice || JSON.stringify(item)
    : item}
</li>
    ))}
  </ul>
</div>
<div className="mt-6 rounded-xl bg-slate-800 p-4 italic text-slate-400">
  {report.aiAnalysis?.disclaimer}
</div>

    
      

  </>

)}

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  onClick={() => handleDownload(report)}
                  className="rounded-lg bg-green-600 px-5 py-2 font-semibold hover:bg-green-700"
                >
                  📥 Download PDF
                </button>

                <button
                  onClick={() => handleDelete(report._id)}
                  className="rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-700"
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))}

        </div>      

      )}
      {reports.length > 1 && (
  <HealthTrendChart reports={reports} />
)}

    </div>
  );
}

export default ReportHistory;
import { useEffect, useState } from "react";
import axios from "axios";

import {
  getReports,
  deleteReport,
} from "../../services/reportService";
import HealthCard from "./HealthCard";
import HealthTrendChart from "./HealthTrendChart";
import ReportHeader from "./ReportHeader";
import SectionCard from "./SectionCard";
import ActionButtons from "./ActionButtons";
import HealthScoreGauge from "./HealthScoreGauge";
import DashboardSummary from "./DashboardSummary";

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

     <DashboardSummary reports={reports} />

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

             <ReportHeader
    filename={report.filename}
    createdAt={report.createdAt}
    healthScore={report.aiAnalysis?.healthScore}
/>

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

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      <div className="rounded-2xl bg-slate-800 p-6">
  <HealthScoreGauge
    score={report.aiAnalysis?.healthScore || 0}
  />
</div>
      <HealthCard
  title="Risk Level"
  value={report.aiAnalysis?.riskLevel ?? "Unknown"}
  status="Assessment"
 color={
  report.aiAnalysis?.riskLevel === "Healthy"
    ? "bg-green-600"
    : report.aiAnalysis?.riskLevel === "Low Risk"
    ? "bg-yellow-500"
    : report.aiAnalysis?.riskLevel === "Moderate Risk"
    ? "bg-orange-500"
    : "bg-red-600"
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

  <SectionCard
  title="Possible Diseases"
  icon="🩺"
  color="text-red-400"
>
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
</SectionCard>


<SectionCard
  title="Recommendations"
  icon="💊"
  color="text-green-400"
>
  {report.aiAnalysis?.recommendations?.length > 0 ? (
    <ul className="space-y-3">
      {report.aiAnalysis.recommendations.map((item, index) => (
        <li
          key={index}
          className="rounded-lg bg-slate-700 p-3"
        >
          ✅ {typeof item === "object"
            ? item.advice || JSON.stringify(item)
            : item}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-slate-400">
      No recommendations available.
    </p>
  )}
</SectionCard>
<SectionCard
  title="Lifestyle Advice"
  icon="🥗"
  color="text-cyan-400"
>
  {report.aiAnalysis?.lifestyleAdvice?.length > 0 ? (
    <ul className="space-y-3">
      {report.aiAnalysis.lifestyleAdvice.map((item, index) => (
        <li
          key={index}
          className="rounded-lg bg-slate-700 p-3"
        >
          🌿 {typeof item === "object"
            ? item.advice || JSON.stringify(item)
            : item}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-slate-400">
      No lifestyle advice available.
    </p>
  )}
</SectionCard>
<SectionCard
  title="Warning Signs"
  icon="⚠"
  color="text-yellow-400"
>
  {report.aiAnalysis?.warningSigns?.length > 0 ? (
    <ul className="space-y-3">
      {report.aiAnalysis.warningSigns.map((item, index) => (
        <li
          key={index}
          className="rounded-lg bg-slate-700 p-3"
        >
          🚨 {typeof item === "object"
            ? item.warning || item.advice || JSON.stringify(item)
            : item}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-slate-400">
      No warning signs detected.
    </p>
  )}
</SectionCard>
<SectionCard
  title="Medical Disclaimer"
  icon="📄"
  color="text-slate-300"
>
  <p className="italic text-slate-300 leading-7">
    {report.aiAnalysis?.disclaimer}
  </p>
</SectionCard>

    
      

  </>

)}

              </div>

             <ActionButtons
  onDownload={() => handleDownload(report)}
  onDelete={() => handleDelete(report._id)}
/>
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
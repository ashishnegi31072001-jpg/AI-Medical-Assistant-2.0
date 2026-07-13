import { useState } from "react";
import { analyzeSymptoms } from "../../services/symptomService";

function SymptomForm() {
  const [formData, setFormData] = useState({
    symptoms: "",
    severity: "Moderate",
    duration: "1 Day",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await analyzeSymptoms(formData);

      setResult(response.report.aiResponse);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze symptoms.");
    }

    setLoading(false);
  };

  return (
    <div className="rounded-2xl bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        Analyze Symptoms
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="mb-2 block">
            Symptoms
          </label>

          <input
            type="text"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Headache, Fever..."
            className="w-full rounded-xl bg-slate-800 p-3 outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block">
            Severity
          </label>

          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3"
          >
            <option>Mild</option>
            <option>Moderate</option>
            <option>Severe</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block">
            Duration
          </label>

          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="2 Days"
            className="w-full rounded-xl bg-slate-800 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Additional Notes
          </label>

          <textarea
            rows="4"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Analyze Symptoms"}
        </button>

      </form>

      {result && (
        <div className="mt-8 rounded-xl bg-slate-800 p-5">
          <h3 className="mb-3 text-xl font-bold">
            AI Analysis
          </h3>

          <pre className="whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      )}

    </div>
  );
}

export default SymptomForm;
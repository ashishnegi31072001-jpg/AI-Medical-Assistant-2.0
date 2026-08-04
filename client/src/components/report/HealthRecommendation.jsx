import { useState } from "react";
import axios from "axios";

function HealthRecommendation({ reportId }) {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/recommendation/generate",
        {
          reportId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecommendation(response.data.recommendations);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to generate recommendations."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-2xl bg-slate-900 p-6">

      <h2 className="mb-5 text-2xl font-bold text-emerald-400">
        🧠 AI Personalized Health Plan
      </h2>

      <button
        onClick={generatePlan}
        disabled={loading}
        className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading
          ? "Generating..."
          : "Generate Health Plan"}
      </button>

      {recommendation && (
        <div className="mt-8 space-y-6">

          <div className="rounded-xl bg-slate-800 p-5">
            <h3 className="font-bold text-xl text-cyan-400">
              🎯 Overall Goal
            </h3>

            <p className="mt-3">
              {recommendation.overallGoal}
            </p>
          </div>

          <Section
            title="🥗 Diet Plan"
            items={recommendation.dietPlan}
          />

          <Section
            title="🏃 Exercise Plan"
            items={recommendation.exercisePlan}
          />

          <Section
            title="😴 Sleep Advice"
            items={recommendation.sleepAdvice}
          />

          <Section
            title="🩺 Follow-up Tests"
            items={recommendation.followUpTests}
          />

          <Section
            title="💧 Daily Habits"
            items={recommendation.dailyHabits}
          />

        </div>
      )}
    </div>
  );
}

function Section({ title, items }) {
  return (
    <div className="rounded-xl bg-slate-800 p-5">

      <h3 className="mb-4 text-xl font-bold text-blue-400">
        {title}
      </h3>

      {items?.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              ✅ {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}

    </div>
  );
}

export default HealthRecommendation;
import { useState } from "react";
import axios from "axios";

function WorkoutPlanner({ reportId }) {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateWorkout = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/workout/generate",
        {
          reportId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWorkoutPlan(response.data.workoutPlan);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to generate workout plan."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-2xl bg-slate-900 p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-orange-400">
        🏋 AI Workout Planner
      </h2>

      <button
        onClick={generateWorkout}
        disabled={loading}
        className="rounded-xl bg-orange-600 px-6 py-3 font-semibold hover:bg-orange-700 disabled:opacity-50"
      >
        {loading
          ? "Generating..."
          : "Generate Workout Plan"}
      </button>

      {workoutPlan && (
        <div className="mt-8 space-y-6">

          <div className="rounded-xl bg-slate-800 p-5">
            <h3 className="text-xl font-bold text-green-400">
              🎯 Fitness Goal
            </h3>

            <p className="mt-2">
              {workoutPlan.fitnessGoal}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {workoutPlan.weeklyPlan?.map((day, index) => (

              <div
                key={index}
                className="rounded-xl bg-slate-800 p-5"
              >
                <h3 className="text-lg font-bold text-cyan-400">
                  {day.day}
                </h3>

                <p className="mt-3">
                  🏋 {day.workout}
                </p>

                <p>
                  ⏱ {day.duration}
                </p>

                <p>
                  🔥 {day.intensity}
                </p>

              </div>

            ))}

          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <h3 className="text-xl font-bold text-blue-400">
              🚶 Daily Steps
            </h3>

            <p className="mt-2">
              {workoutPlan.dailySteps}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <h3 className="text-xl font-bold text-red-400">
              ❤️ Cardio
            </h3>

            <p className="mt-2">
              {workoutPlan.cardioRecommendation}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <h3 className="text-xl font-bold text-purple-400">
              💪 Strength Training
            </h3>

            <p className="mt-2">
              {workoutPlan.strengthTraining}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <h3 className="text-xl font-bold text-pink-400">
              🧘 Stretching
            </h3>

            <p className="mt-2">
              {workoutPlan.stretching}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <h3 className="text-xl font-bold text-yellow-400">
              ⚠ Precautions
            </h3>

            <ul className="mt-3 space-y-2">
              {workoutPlan.precautions?.map((item, index) => (
                <li key={index}>
                 {typeof item === "object" ? (
  <div className="rounded-lg bg-slate-700 p-3">
    {Object.entries(item).map(([key, value]) => (
      <p key={key}>
        <strong>{key}:</strong> {String(value)}
      </p>
    ))}
  </div>
) : (
  <>⚠ {item}</>
)}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-green-900 p-5">
            <h3 className="text-xl font-bold">
              💬 Motivation
            </h3>

            <p className="mt-2 italic">
              {workoutPlan.motivation}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}

export default WorkoutPlanner;
import { useState } from "react";
import axios from "axios";

function DietPlanner({ reportId }) {
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateDiet = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/diet/generate",
        {
          reportId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDietPlan(response.data.dietPlan);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to generate diet plan."
      );

    } finally {
      setLoading(false);
    }
  };

  const MealCard = ({ title, items }) => (
    <div className="rounded-xl bg-slate-800 p-5">
      <h3 className="mb-3 text-xl font-bold text-green-400">
        {title}
      </h3>

      {items?.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
  <li key={index}>
    {typeof item === "object" ? (
      <div className="rounded-lg bg-slate-700 p-3">
        {item.foodGroup && (
          <p>
            <strong>Food Group:</strong> {item.foodGroup}
          </p>
        )}

        {item.dailyLimit && (
          <p>
            <strong>Daily Limit:</strong> {item.dailyLimit}
          </p>
        )}

        {item.recommendation && (
          <p>
            <strong>Recommendation:</strong> {item.recommendation}
          </p>
        )}
      </div>
    ) : (
      <>🥗 {item}</>
    )}
  </li>
))}
        </ul>
      ) : (
        <p>No suggestions available.</p>
      )}
    </div>
  );

  return (
    <div className="mt-8 rounded-2xl bg-slate-900 p-6">

      <h2 className="mb-5 text-2xl font-bold text-green-400">
        🥗 AI Diet Planner
      </h2>

      <button
        onClick={generateDiet}
        disabled={loading}
        className="rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {loading
          ? "Generating..."
          : "Generate Diet Plan"}
      </button>

      {dietPlan && (
        <div className="mt-8 grid gap-6">

          <MealCard
            title="🍳 Breakfast"
            items={dietPlan.breakfast}
          />

          <MealCard
            title="🍎 Mid Morning"
            items={dietPlan.midMorning}
          />

          <MealCard
            title="🍛 Lunch"
            items={dietPlan.lunch}
          />

          <MealCard
            title="☕ Evening Snack"
            items={dietPlan.eveningSnack}
          />

          <MealCard
            title="🌙 Dinner"
            items={dietPlan.dinner}
          />

          <div className="rounded-xl bg-blue-900 p-5">
            <h3 className="text-xl font-bold text-blue-300">
              💧 Water Intake
            </h3>

            <p className="mt-2">
              {dietPlan.waterIntake}
            </p>
          </div>

          <MealCard
            title="🚫 Foods To Avoid"
            items={dietPlan.foodsToAvoid}
          />

          <MealCard
            title="💡 Nutrition Tips"
            items={dietPlan.nutritionTips}
          />

        </div>
      )}

    </div>
  );
}

export default DietPlanner;
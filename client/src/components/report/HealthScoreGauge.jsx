import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function HealthScoreGauge({ score = 0 }) {
  const getStatus = () => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    if (score >= 40) return "Poor";
    return "Critical";
  };

  const getColor = () => {
    if (score >= 90) return "#22c55e";
    if (score >= 75) return "#3b82f6";
    if (score >= 60) return "#eab308";
    if (score >= 40) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="h-40 w-40">
        <CircularProgressbar
          value={score}
          text={`${score}`}
          styles={buildStyles({
            pathColor: getColor(),
            textColor: "#ffffff",
            trailColor: "#334155",
          })}
        />
      </div>

      <h3 className="mt-4 text-2xl font-bold">
        ❤️ Health Score
      </h3>

      <span
        className="mt-2 rounded-full px-4 py-2 font-semibold text-white"
        style={{ backgroundColor: getColor() }}
      >
        {getStatus()}
      </span>
    </div>
  );
}

export default HealthScoreGauge;
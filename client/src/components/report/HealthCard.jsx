function HealthCard({
  title,
  value,
  status,
  color = "bg-blue-600",
}) {
  // Select icon based on card title
  const getIcon = () => {
    switch (title) {
      case "Health Score":
        return "❤️";
      case "Risk Level":
        return "⚠️";
      case "Blood Sugar":
        return "🩸";
      case "Hemoglobin":
        return "🧪";
      case "Vitamin D":
        return "☀️";
      case "Cholesterol":
        return "🫀";
      case "HbA1c":
        return "📊";
      default:
        return "📋";
    }
  };

  return (
    <div
      className={`card-hover ${color} rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        <span className="text-3xl">{getIcon()}</span>
      </div>

      {/* Main Value */}
      <div className="mt-6 text-4xl font-bold text-white break-words">
        {value || "N/A"}
      </div>

      {/* Status */}
      <div className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
        {status || "Unknown"}
      </div>
    </div>
  );
}

export default HealthCard;
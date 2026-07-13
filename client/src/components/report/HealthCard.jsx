function HealthCard({
  title,
  value,
  status,
  color,
}) {
  return (
    <div
      className={`${color} rounded-xl p-5 shadow-lg`}
    >
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-bold text-white">
        {value}
      </p>

      <p className="mt-2 text-white/80">
        {status}
      </p>
    </div>
  );
}

export default HealthCard;
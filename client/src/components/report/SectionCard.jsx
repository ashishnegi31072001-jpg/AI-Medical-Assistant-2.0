function SectionCard({ title, icon, color, children }) {
  return (
    <div className="mt-6 rounded-xl bg-slate-800 p-5 shadow-lg">
      <h3
        className={`mb-4 text-xl font-bold ${color}`}
      >
        {icon} {title}
      </h3>

      {children}
    </div>
  );
}

export default SectionCard;
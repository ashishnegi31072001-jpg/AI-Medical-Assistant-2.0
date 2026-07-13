function Card({ children }) {
  return (
    <div
      className="
      w-full
      max-w-lg
      rounded-3xl
      border
      border-slate-800
      bg-slate-900/80
      backdrop-blur-xl
      shadow-2xl
      p-10
      "
    >
      {children}
    </div>
  );
}

export default Card;
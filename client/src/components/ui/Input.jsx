function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  rightElement,
}) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4 transition-all duration-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
        {icon && <div className="mr-3 text-slate-400">{icon}</div>}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 bg-transparent py-3 text-white outline-none placeholder:text-slate-500"
        />

        {rightElement}
      </div>
    </div>
  );
}

export default Input;
function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  rightElement,
}) {
  return (
    <div className="mb-6">

      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <div
        className="
        flex
        items-center
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        px-4
        transition
        duration-300
        focus-within:border-blue-500
        focus-within:ring-2
        focus-within:ring-blue-500/20
        "
      >

        {icon && (
          <div className="mr-3 text-slate-400">
            {icon}
          </div>
        )}

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
          w-full
          bg-transparent
          py-3
          text-white
          outline-none
          placeholder:text-slate-500
          "
        />

        {rightElement}

      </div>

    </div>
  );
}

export default Input;
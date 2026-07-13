function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
      w-full
      rounded-xl
      bg-blue-600
      py-3.5
      text-lg
      font-semibold
      text-white
      transition-all
      duration-300
      hover:bg-blue-700
      hover:scale-[1.02]
      active:scale-95
      disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}

export default Button;
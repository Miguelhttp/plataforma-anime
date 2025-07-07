import clsx from "clsx"; // Instale com: pnpm add clsx (ou npm/yarn)

export function Button({
  children,
  onClick,
  variant = "primary", // primary | secondary | outline
  type = "button",
  className = "",
  ...props
}) {
  const baseStyle =
    "px-4 py-2 rounded-xl font-medium transition-transform duration-200 active:scale-95";

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-800 text-white",
    outline:
      "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyle, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

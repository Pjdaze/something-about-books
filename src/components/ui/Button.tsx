interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className = "", ...props }: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 font-semibold rounded-lg transition duration-150 ease-in-out";

  const primaryStyles =
    "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300";

  const disabledStyles = "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      className={`${baseStyles} ${primaryStyles} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

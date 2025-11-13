interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const getSizeStyles = (size: SpinnerProps["size"]): string => {
  switch (size) {
    case "sm":
      return "w-4 h-4 border-2";
    case "lg":
      return "w-8 h-8 border-4";
    case "md":
    default:
      return "w-6 h-6 border-3";
  }
};

export const Spinner = ({ size = "md", className = "" }: SpinnerProps) => {
  return (
    <div
      className={`
        ${getSizeStyles(size)} 
        border-t-blue-500 border-gray-200 
        rounded-full animate-spin 
        ${className}
      `}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

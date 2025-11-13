import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className = "", ...props }: InputProps) => {
  // Enhanced baseStyles to include dark mode colors for a modern look.
  const baseStyles =
    "w-full px-4 py-2 rounded-lg transition-colors duration-200 " +
    // Light Mode Defaults
    "border border-gray-300 text-gray-700 " +
    // Dark Mode Overrides
    "dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100 dark:placeholder-gray-400 " +
    // Focus Styles (using Cyan accent for dark mode contrast)
    "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400";

  return <input className={`${baseStyles} ${className}`} {...props} />;
};

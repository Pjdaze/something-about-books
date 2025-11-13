import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className = "", ...props }: InputProps) => {
  const baseStyles =
    "w-full px-4 py-2 rounded-lg transition-colors duration-200 " +
    "border border-gray-300 text-gray-700 " +
    "dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100 dark:placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400";

  return <input className={`${baseStyles} ${className}`} {...props} />;
};

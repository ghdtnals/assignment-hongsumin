"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isSubmitting?: boolean;
  variant?: "primary" | "dark" | "outline";
  fullWidth?: boolean;
}

const Button = ({
  label,
  isSubmitting,
  variant = "primary",
  fullWidth = true,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-xl font-bold transition-all flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed hover:cursor-pointer";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg py-4",
    dark: "bg-[#1a1a1a] text-white hover:bg-black py-3 px-6 text-sm",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 py-3 px-6 text-sm",
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      disabled={isSubmitting || props.disabled}
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {isSubmitting ? (
        <span className="flex items-center gap-2">{label} 중...</span>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;

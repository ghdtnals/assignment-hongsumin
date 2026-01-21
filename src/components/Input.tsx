"use client";

import { useState, ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import EyeOpenIcon from "@/src/assets/icons/eye-open.svg";
import EyeClosedIcon from "@/src/assets/icons/eye-closed.svg";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isPassword?: boolean;
}

const Input = forwardRef(
  (
    { label, error, isPassword, type, ...props }: FormInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full">
        <label className="block text-sm font-bold text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            {...props}
            className={`w-full p-3 border rounded-xl outline-none transition-all text-sm ${
              error
                ? "border-red-500 bg-red-50"
                : "border-gray-200 focus:border-blue-500"
            } ${props.disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""}`}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
            >
              <img
                src={showPassword ? EyeOpenIcon.src : EyeClosedIcon.src}
                alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                className="w-5 h-5 opacity-60"
              />
            </button>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>
        )}
      </div>
    );
  },
);

export default Input;

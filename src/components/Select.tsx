"use client";

import { useState, useRef, useEffect } from "react";

import arrowUp from "@/src/assets/icons/arrow-up.svg";
import arrowDown from "@/src/assets/icons/arrow-down.svg";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  selectedOption: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

const Select = ({
  options,
  selectedOption,
  onSelect,
  placeholder,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find(
    (option) => option.value === selectedOption,
  )?.label;

  const handleSelect = (value: string) => {
    if (value === selectedOption) {
      setOpen(false);
      return;
    }
    onSelect(value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={selectRef} className="relative z-20 w-48 text-gray-700">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between w-full px-4 py-2.5 font-medium text-sm text-gray-700 bg-white rounded-xl shadow-sm transition-all hover:cursor-pointer hover:border-blue-500 ${
          open ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-300"
        }`}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <img
          src={open ? arrowUp.src : arrowDown.src}
          alt="Arrow"
          className="ml-2 h-3 w-3 opacity-60 transition-transform"
        />
      </button>

      <div
        role="listbox"
        className={`absolute left-0 z-50 w-full mt-2 overflow-hidden bg-white border border-gray-200 rounded-xl shadow-xl transition-all duration-200 ease-in-out ${
          open
            ? "translate-y-0 opacity-100 scale-100"
            : "pointer-events-none -translate-y-2 opacity-0 scale-95"
        }`}
      >
        <div className="max-h-60 overflow-y-auto py-1">
          {options.map((option) => {
            const isSelected = selectedOption === option.value;
            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={isSelected}
                className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                  isSelected
                    ? "bg-blue-50 font-bold text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
                }`}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Select;

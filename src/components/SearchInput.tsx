"use client";

import SearchIcon from "@/src/assets/icons/search.svg";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "검색어를 입력하세요...",
}: SearchInputProps) => {
  return (
    <div className="relative w-64">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <img
          src={SearchIcon.src}
          alt="Search Icon"
          className="w-4 h-4 text-gray-400"
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-all text-sm"
      />
    </div>
  );
};

export default SearchInput;

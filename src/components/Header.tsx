"use client";

import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-[#1a1a1a] text-white flex items-center justify-between px-8 z-50 border-b border-gray-800 shadow-md">
      <Link
        href="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <h1 className="text-xl font-bold tracking-tight">Tilda Assignment</h1>
      </Link>
    </header>
  );
};

export default Header;

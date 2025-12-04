"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface BackButtonProps {
  label?: string;
  iconSize?: number;
  className?: string;
}

export default function BackButton({
  label = "",
  iconSize = 18,
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`
        flex items-center gap-2 
        px-3 py-2 
        rounded-lg 
        bg-white 
        border border-gray-200 
        text-gray-700 
        hover:bg-emerald-50 
        hover:border-emerald-200
        hover:text-emerald-700
        hover:-translate-y-[2px]
        hover:shadow-md
        transition-all duration-200
        cursor-pointer
        ${className}
      `}
    >
      <ArrowLeft size={iconSize} />
      <span className="font-medium">{label}</span>
    </button>
  );
}

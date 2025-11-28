// src/app/403/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white text-center px-6">
      {/* Icon */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-6 shadow-inner">
        <ShieldAlert className="w-10 h-10 text-emerald-700" />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold text-emerald-800 mb-2">403</h1>
      <p className="text-lg text-gray-700 mb-6">
        You don’t have permission to access this page.
      </p>

      {/* Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </button>

      {/* Footer tip */}
      <p className="text-sm text-gray-500 mt-8">
        If you believe this is a mistake, please contact your system
        administrator.
      </p>
    </div>
  );
}
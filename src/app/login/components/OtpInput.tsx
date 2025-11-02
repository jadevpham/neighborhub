"use client";
import React from "react";
import { OtpInputProps } from "@/types/common";

export default function OtpInput({
  otp,
  setOtp,
  handleVerify,
  isPending,
}: OtpInputProps) {
  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <p className="text-sm text-gray-600">
        We sent a 6-digit OTP code to your email. Please enter it below.
      </p>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="w-full text-center tracking-widest text-xl rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        disabled={isPending}
        className="h-11 w-full rounded-lg bg-emerald-600 text-white font-medium hover:brightness-110 disabled:opacity-60"
      >
        {isPending ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  );
}

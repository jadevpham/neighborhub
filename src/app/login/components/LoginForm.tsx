"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authAPI } from "../../../services/authAPI";
import OtpInput from "./OtpInput";
import { useLoginMutation, useVerify2FAMutation } from "../../../hooks/useAuth";
export default function LoginForm() {
  // Dùng để chuyển trang chuyển router
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"login" | "otp">("login");

  const [challengeId, setChallengeId] = useState("");

  const loginMutation = useLoginMutation();
  const verify2FAMutation = useVerify2FAMutation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          setChallengeId(res.challenge_Id);
          setStep("otp");
        },
        onError: (err: any) => {
          alert(err.message || "Login failed");
        },
      }
    );
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    verify2FAMutation.mutate(
      {
        challengeId,
        otp,
      },
      {
        onSuccess: () => {
          alert("Login success!");
          router.replace("/dashboard");
        },
        onError: (err: any) => {
          console.error("Verify 2FA error:", err.response?.data);
          alert(err.response?.data?.message || "OTP verification failed");
        },
      }
    );
  };

  return (
    <main className="relative min-h-screen flex overflow-hidden">
      {/* Background image full screen */}
      <img
        src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2200&auto=format&fit=crop"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/60 to-transparent" />

      {/* Login section */}
      {/* === LOGIN CARD styled như mock === */}
      <div className="relative mx-auto mt-12 w-full max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(16,24,40,0.25)] ring-1 ring-black/10">
          {/* Nền card mờ để thấy ảnh phía sau */}
          <div className="absolute inset-0 bg-emerald-900/15 backdrop-blur-sm" />

          {/* Mảng trắng bo cong (chiếm ~70% bên trái) */}
          <svg
            className="absolute inset-0 left-0 w-[100%] h-full"
            viewBox="0 0 800 600"
            preserveAspectRatio="none"
          >
            <defs>
              {/* pattern định nghĩa vùng chứa ảnh */}
              <pattern
                id="bgPattern"
                patternUnits="userSpaceOnUse"
                width="800"
                height="600"
              >
                <image
                  href="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2200&auto=format&fit=crop"
                  width="800"
                  height="600"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>

            {/* path chính với fill = pattern */}
            <path
              d="M0,0 C150,120 300,-20 480,220 C650,460 650,250 800,400 L800,600 L0,600 Z"
              fill="url(#bgPattern)"
            />
          </svg>

          {/* Link góc phải trong card */}
          <div className="absolute right-8 top-6 z-20 flex items-center gap-3 text-sm text-slate-700/80">
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <span>|</span>
            <a href="#" className="hover:text-slate-900">
              Sign Up
            </a>
          </div>

          {/* Lưới 2 cột: trái (form) / phải (để lộ ảnh nền) */}
          <div className="z-10">
            {/* Cột trái: nội dung form trên nền trắng cong */}
            <div className="relative px-8 py-10 md:px-9 md:py-14">
              {/* logo (tùy chọn) */}
              <div className="mb-8">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    🌿
                  </div>
                  <span className="text-sm text-emerald-600">Neighbor Hub</span>
                </div>
              </div>

              {/* Heading */}
              <p className="text-xl text-slate-600">Hello there,</p>
              <h1 className="mb-8 text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
                Welcome to{" "}
                <span className="text-emerald-700">Neighbor Hub</span>
              </h1>

              {/* FORM Login */}
              {step === "login" ? (
                <form onSubmit={handleLogin} className="space-y-7 max-w-md">
                  {/* Email */}
                  <div>
                    <label className="block text-[11px] tracking-[.22em] text-slate-700/80 mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email} /* dùng state sẵn có của bạn */
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent px-0 py-3 border-0 border-b
                         border-slate-300 text-slate-900 placeholder-slate-400
                         focus:border-emerald-600 focus:ring-0 transition"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-[11px] tracking-[.22em] text-slate-700/80">
                        PASSWORD
                      </label>
                      <a
                        href="#"
                        className="text-xs text-slate-500 hover:text-emerald-600"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Set a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent px-0 py-3 pr-10 border-0 border-b
                           border-slate-300 text-slate-900 placeholder-slate-400
                           focus:border-emerald-600 focus:ring-0 transition"
                      />
                    </div>
                  </div>

                  {/* Nút LOGIN gradient vàng */}
                  <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="h-12 w-44 rounded-full text-emerald-600 font-medium
                       bg-gradient-to-r from-white/90 via-white/80 to-transparent
                       shadow-md hover:shadow-lg hover:brightness-105 transition
                       disabled:opacity-70"
                  >
                    {loginMutation.isPending ? "Waiting..." : "LOGIN"}
                  </button>

                  {/* Lỗi (nếu có) */}
                  {loginMutation.error && (
                    <p className="text-red-500 text-sm">
                      {(loginMutation.error as Error).message}
                    </p>
                  )}
                </form>
              ) : (
                <OtpInput
                  otp={otp}
                  setOtp={setOtp}
                  handleVerify={handleVerify}
                  isPending={verify2FAMutation.isPending}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

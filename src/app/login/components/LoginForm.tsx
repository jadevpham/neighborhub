// // src/components/LoginForm.tsx
// "use client";

// import { useState } from "react";
// import { useLoginMutation } from "@/hooks/useAuth";

// export default function LoginForm() {
//   const { mutate, isPending, error } = useLoginMutation();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     mutate({ username, password });
//   }

//   return (
//     <main className="relative min-h-dvh overflow-hidden">
//     {/* Global background image */}
//     <div className="fixed inset-0 -z-10">
//       <img
//         src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=2200&auto=format&fit=crop"
//         alt="Background palm trees"
//         className="h-full w-full object-cover"
//       /> </div>
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-20 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.37)] space-y-4"    >
//       <h1 className="text-2xl font-bold text-center">Login</h1>

//       <input
//         type="username"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
//       />

//       <input
//         type="password"
//         placeholder="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
//       />

//       <button
//         type="submit"
//         disabled={isPending}
//         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//       >
//         {isPending ? "Waiting..." : "Login"}
//       </button>

//       {error && <p className="text-red-500 text-center">{(error as Error).message}</p>}
//     </form>

//     </main>
//   );
// }

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [otp, setOtp] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [step, setStep] = useState<"login" | "2fa">("login");

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      if (data.requires_2fa) {
        setChallengeId(data.challenge_id ?? "chal_temp");
        setStep("2fa");
      } else {
        alert("✅ Login successful (no 2FA)");
      }
    },
    onError: (err: any) => alert(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    setTimeout(() => {
      setIsPending(false);
      if (username === "admin" && password === "123") {
        alert("Login successful!");
      } else {
        setError(new Error("Invalid credentials"));
      }
    }, 1200);
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
          {/* <div className="absolute inset-y-0 left-0 w-[50%] bg-white rounded-tr-[140px] rounded-br-[140px]" /> */}
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

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-7 max-w-md">
                {/* Email */}
                <div>
                  <label className="block text-[11px] tracking-[.22em] text-slate-700/80 mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={username} /* dùng state sẵn có của bạn */
                    onChange={(e) => setUsername(e.target.value)}
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
                    {/* <span className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden>👁️</span> */}
                  </div>
                </div>

                {/* Nút LOGIN gradient vàng */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="h-12 w-44 rounded-full text-emerald-600 font-medium
                       bg-gradient-to-r from-white/90 via-white/80 to-transparent
                       shadow-md hover:shadow-lg hover:brightness-105 transition
                       disabled:opacity-70"
                >
                  {isPending ? "Waiting..." : "LOGIN"}
                </button>

                {/* Lỗi (nếu có) */}
                {error && (
                  <p className="text-red-500 text-sm">
                    {(error as Error).message}
                  </p>
                )}
              </form>
            </div>

            {/* Cột phải: trong suốt để nhìn thấy ảnh nền + đổ bóng nhẹ ở mép */}
            {/* <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-l from-emerald-900/15 to-transparent" />
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}

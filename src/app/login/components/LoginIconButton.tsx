// components/LoginIconButton.tsx
"use client";
import { useRouter } from "next/navigation";

export default function LoginIconButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/login")}
      className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-neutral-900 shadow cursor-pointer hover:bg-white"
    >
      👤
    </button>
  );
}

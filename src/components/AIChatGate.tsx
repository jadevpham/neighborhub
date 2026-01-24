"use client";

import AIFloatingChat from "./AIFloatingChat";
import { useMeQuery } from "@/hooks/useAuth";

const ALLOWED_ROLES = ["partner", "site_admin", "management_board"];

export default function AIChatGate() {
  const { data, isLoading, error } = useMeQuery();

  if (isLoading || error || !data?.user) return null;
  if (!ALLOWED_ROLES.includes(data.user.role)) return null;

  return <AIFloatingChat />;
}

export async function sendAIMessage(payload: { message: string }) {
  const res = await fetch("/api/ai/chat", {
    method: "POST",
    credentials: "include", // 🔥 để browser gửi cookie
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}

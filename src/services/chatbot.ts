import { openai } from "@/lib/openai";
import { buildAIContext } from "@/utils/buildAIContext";

export async function sendAIMessage({
  message,
  contextData,
}: {
  message: string;
  contextData: any;
}) {

  const context = buildAIContext(contextData) || "System has data but no matching records.";


  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are NeighborHub AI assistant.
Answer ONLY using provided data.
If data is missing, say you don't have enough information.
`,
      },
      {
        role: "system",
        content: context,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return {
    answer: res.choices[0].message.content ?? "",
  };
}

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY!,
  dangerouslyAllowBrowser: true,
});

export async function askNeighborHubAI(
  message: string,
  context: {
    facilities?: any[];
    residents?: any[];
    events?: any[];
    news?: any[];
    feedbacks?: any[];
    referendums?: any[];
    users?: any[];
    sites?: any[];
    zones?: any[];
  }
) {
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: `
Bạn là AI Assistant cho hệ thống NeighborHub.

Nhiệm vụ:
- Hiểu câu hỏi tự nhiên của người dùng
- Phân tích dữ liệu hệ thống
- Trả lời như một trợ lý quản lý khu dân cư

Quy tắc:
- Trả lời bằng tiếng Việt
- Nếu dữ liệu không có → nói rõ
- Nếu có giới hạn quyền → nói rõ
- Trả lời tự nhiên, dễ hiểu
`,
      },
      {
        role: "user",
        content: `
Câu hỏi:
${message}

Dữ liệu hệ thống (JSON):
${JSON.stringify(context, null, 2)}
`,
      },
    ],
  });

  return response.output_text ?? "Hiện tại tôi chưa có câu trả lời phù hợp.";
}

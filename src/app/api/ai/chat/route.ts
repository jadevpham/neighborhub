import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { cookies } from "next/headers";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://neighbor.business365.vn/api/v1";

// BE fetch: forward cookie từ browser -> Next route -> BE
async function beFetch(url: string, cookieHeader: string) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.warn("[AI BE FETCH FAIL]", url, res.status, text);
    return null;
  }

  return res.json();
}

/**
 * ✅ Tools shape đúng theo types mà bạn đang thấy trong responses.d.mts:
 * FunctionTool requires: { type, name, parameters, strict, description? }
 *
 * ❗ KHÔNG dùng OpenAI.Tool vì lib bạn đang dùng không export type đó.
 * ✅ Dùng `as const` + `as any` để TS không cắn.
 */
const tools = [
  {
    type: "function" as const,
    function: {
      name: "getFacilities",
      description: "Lấy danh sách tiện ích (facility) trong khu dân cư",
      parameters: {
        type: "object",
        properties: {
          page: {
            type: "number",
            description: "Trang hiện tại",
          },
          limit: {
            type: "number",
            description: "Số lượng tiện ích cần lấy",
          },
        },
        required: ["page", "limit"], // 🔥 BẮT BUỘC
      },
    },
    strict: true, // 🔥 BẮT BUỘC
  },
  {
    type: "function" as const,
    function: {
      name: "getResidents",
      description: "Lấy danh sách cư dân",
      parameters: {
        type: "object",
        properties: {
          page: {
            type: "number",
            description: "Trang hiện tại",
          },
          limit: {
            type: "number",
            description: "Số lượng cư dân",
          },
        },
        required: ["page", "limit"],
      },
    },
    strict: true,
  },
];


/** Extract tool_call robust: tool_call có thể nằm trực tiếp trong output hoặc trong message.content */
function extractToolCall(resp: any): { name: string; arguments?: any } | null {
  const out: any[] = resp?.output ?? [];

  for (const item of out) {
    // Case A: tool_call là output item
    if (item?.type === "tool_call" && item?.name) {
      return { name: item.name, arguments: item.arguments };
    }

    // Case B: tool_call nằm trong message.content
    if (item?.type === "message" && Array.isArray(item?.content)) {
      const call = item.content.find((c: any) => c?.type === "tool_call" && c?.name);
      if (call) return { name: call.name, arguments: call.arguments };
    }
  }

  return null;
}

/** arguments đôi khi là string JSON -> parse */
function parseArgs(args: any): any {
  if (!args) return {};
  if (typeof args === "string") {
    try {
      return JSON.parse(args);
    } catch {
      return {};
    }
  }
  return args;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    // ✅ Next 15+: cookies() có thể là Promise -> await cho chắc
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader) {
      return NextResponse.json({
        answer: "Bạn chưa đăng nhập hoặc phiên đã hết hạn.",
      });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    // 1) Router: để model quyết định gọi tool nào
    const decision = await openai.responses.create({
      model: "gpt-4.1-mini",
      tools: tools as any, // ✅ tránh TS mismatch do type export khác nhau trong lib bạn
      input: [
        {
          role: "system",
          content:
            "Bạn là AI Router cho NeighborHub. Hãy chọn đúng tool nếu cần dữ liệu. Nếu không cần gọi API thì không gọi tool.",
        },
        { role: "user", content: message },
      ],
    });

    const call = extractToolCall(decision);
    const context: any = {};

    // 2) Nếu có tool call -> gọi BE thật lấy data
    if (call?.name) {
      const args = parseArgs(call.arguments);
      const page = Number(args.page ?? 1);
      const limit = Number(args.limit ?? 5);

      if (call.name === "getFacilities") {
        // tùy BE bạn: có params page/limit thì truyền
        const res = await beFetch(`${API_BASE}/facilities?page=${page}&limit=${limit}`, cookieHeader);

        // Bạn từng gặp case data lồng data: res.data.data
        context.facilities = res?.data?.data ?? res?.data ?? [];
      }

      if (call.name === "getResidents") {
        const res = await beFetch(`${API_BASE}/residents?page=${page}&limit=${limit}`, cookieHeader);
        context.residents = res?.data ?? [];
      }
    }

    // 3) Final answer: dùng context vừa fetch để trả lời
    const final = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: `Bạn là AI Assistant cho NeighborHub.
Dữ liệu hệ thống (JSON):
${JSON.stringify(context, null, 2)}

Quy tắc:
- Trả lời tiếng Việt
- Nếu dữ liệu trống -> nói rõ "chưa có dữ liệu" hoặc "bị giới hạn quyền"
- Trả lời ngắn gọn, đúng ngữ cảnh quản lý khu dân cư`,
        },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({
      answer: final.output_text ?? "AI chưa có câu trả lời phù hợp.",
      debug: {
        tool: call?.name ?? null,
      },
    });
  } catch (err) {
    console.error("[AI CHAT ERROR]", err);
    return NextResponse.json({ error: "AI service error" }, { status: 500 });
  }
}

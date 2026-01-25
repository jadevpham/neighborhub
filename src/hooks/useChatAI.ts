import { openai } from "@/lib/openai";
import { buildAIContext } from "@/utils/buildAIContext";

export async function askAI({
    question,
    events,
    facilities,
    news,
    feedbacks,
    referendums,
    users,
    sites,
    zones,
}: {
    question: string;
    events?: any[];
    facilities?: any[];
    news?: any[];
    feedbacks?: any[];
    referendums?: any[];
    users?: any[];
    sites?: any[];
    zones?: any;
}) {

    const context = buildAIContext({
        events: events ?? [],
        facilities: facilities ?? [],
        news: news ?? [],
        feedbacks: feedbacks ?? [],
        referendums: referendums ?? [],
        users: users ?? [],
        sites: sites ?? [],
        zones: zones ?? [],
    });

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
You are an AI assistant for a community management system.
Answer ONLY based on the provided data.
If data is missing, say you don't have enough information.
`,
            },
            {
                role: "system",
                content: context,
            },
            {
                role: "user",
                content: question,
            },
        ],
    });

    return completion.choices[0].message.content;
}

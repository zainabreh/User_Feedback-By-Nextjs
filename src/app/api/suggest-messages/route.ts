import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST() {
  const prompt = `Create a list of three open-ended and engaging questions formatted as a single string.
Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Quooh.me, and should be suitable for a diverse audience.
Avoid personal and sensitive topics, focusing instead on universal themes that encourage friendly interaction.
For example, your output should be structured like this:
"What's a hobby you've recently started?||If you could travel anywhere in the world, where would you go and why?||What's a book or movie that has inspired you recently?||If you could have dinner with any historical figure, who would it be?"
Ensure the questions are intriguing, thought-provoking, foster curiosity, and contribute to a positive and welcoming conversational environment.`;

  const result = await streamText({
    model: openai("gpt-4o"),
    messages: [
      { role: "user", content: prompt }
    ],
  });

  return result.toUIMessageStreamResponse();
}

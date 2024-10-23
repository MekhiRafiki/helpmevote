import { google } from '@ai-sdk/google'
import { streamText, convertToCoreMessages } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, currentGoal } = await req.json();

  const result = await streamText({
    system: `You are a helpful assistant guiding the user through their current goal: ${currentGoal}. Provide relevant information and ask appropriate questions to help them achieve this goal.`,
    model: google('gemini-1.5-flash'),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
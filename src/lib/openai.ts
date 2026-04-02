import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ConversationAnalysis {
  summary: string;
  insights: string[];
  tags: string[];
}

export async function analyzeConversation(rawText: string): Promise<ConversationAnalysis> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are an AI that analyzes conversations from ChatGPT, Claude, or other AI tools. 
Extract structured information from the conversation.
Return ONLY valid JSON with this exact structure:
{
  "summary": "A 2-sentence summary of what this conversation was about",
  "insights": ["Insight 1", "Insight 2", "Insight 3"],
  "tags": ["tag1", "tag2", "tag3"]
}
Be specific and practical in your insights. Focus on actionable takeaways.`,
      },
      {
        role: 'user',
        content: `Analyze this AI conversation:\n\n${rawText}`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
  });

  const content = response.choices[0].message.content || '{}';
  const parsed = JSON.parse(content);

  return {
    summary: parsed.summary || '',
    insights: parsed.insights || [],
    tags: parsed.tags || [],
  };
}

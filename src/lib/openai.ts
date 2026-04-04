import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
const isDemoMode = !apiKey || apiKey === 'your-openai-api-key-here';

const openai = isDemoMode ? null : new OpenAI({
  apiKey: apiKey,
});

export interface ConversationAnalysis {
  summary: string;
  insights: string[];
  tags: string[];
}

// Mock data for demo mode
function getMockAnalysis(text: string): ConversationAnalysis {
  // Generate realistic mock data based on the input text
  const wordCount = text.split(/\s+/).length;
  const charCount = text.length;
  
  // Generate a mock summary based on text length/keywords
  const hasAI = /chatgpt|claude|gpt|openai|anthropic|llm|ai/i.test(text);
  const hasCoding = /code|function|api|react|next|typescript|javascript|python/i.test(text);
  const hasProduct = /product|user|feature|launch|startup/i.test(text);
  
  let summary = 'This conversation explores key concepts and insights that can be applied to improve workflows and decision-making.';
  let insights = [
    'Consider implementing the discussed approach to streamline repetitive tasks',
    'The key takeaway is to focus on actionable steps rather than theoretical frameworks',
    'Prioritize the most impactful changes first for maximum efficiency gains',
  ];
  let tags = ['productivity', 'insights', 'ai'];
  
  if (hasAI) {
    summary = 'This ChatGPT/Claude conversation covers AI tools usage, prompt engineering techniques, and practical applications of LLMs in daily workflows.';
    insights = [
      'Effective prompting significantly improves AI output quality',
      'AI can automate repetitive knowledge work tasks',
      'Context window management is crucial for long conversations',
    ];
    tags = ['ai', 'chatgpt', 'prompting', 'llm'];
  }
  
  if (hasCoding) {
    summary = 'This conversation discusses coding approaches, technical architecture decisions, and implementation strategies for software projects.';
    insights = [
      'Start with simple, working code before optimizing',
      'API design should prioritize developer experience',
      'Type safety reduces bugs and improves maintainability',
    ];
    tags = ['coding', 'development', 'architecture'];
  }
  
  if (hasProduct) {
    summary = 'This conversation covers product strategy, user needs analysis, and go-to-market considerations for a new software product.';
    insights = [
      'Focus on a single, specific user pain point first',
      'Early user feedback is more valuable than extensive planning',
      'Build in public to validate assumptions early',
    ];
    tags = ['product', 'startup', 'strategy'];
  }
  
  // Add some variety based on text length
  if (wordCount > 500) {
    insights.push('The extensive discussion suggests multiple angles to explore');
    tags.push('deep-dive');
  }
  
  return { summary, insights, tags: tags.slice(0, 5) };
}

export async function analyzeConversation(rawText: string): Promise<ConversationAnalysis> {
  // Demo mode: return mock data without calling OpenAI
  if (isDemoMode) {
    // Simulate a small delay for realism
    await new Promise(resolve => setTimeout(resolve, 500));
    return getMockAnalysis(rawText);
  }

  const response = await openai!.chat.completions.create({
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

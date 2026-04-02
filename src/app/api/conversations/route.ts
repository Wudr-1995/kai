import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { analyzeConversation } from '@/lib/openai';

export async function GET(request: Request) {
  const auth = await getAuthUser();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const aiSource = searchParams.get('source') || '';

  const where: Record<string, unknown> = { userId: auth.userId };

  if (query) {
    where.OR = [
      { title: { contains: query } },
      { rawText: { contains: query } },
      { summary: { contains: query } },
    ];
  }

  if (aiSource) {
    where.aiSource = aiSource;
  }

  const conversations = await prisma.conversation.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      summary: true,
      insights: true,
      tags: true,
      aiSource: true,
      notes: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ conversations });
}

export async function POST(request: Request) {
  const auth = await getAuthUser();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { rawText, aiSource, title } = await request.json();

    if (!rawText || !rawText.trim()) {
      return NextResponse.json({ error: 'Conversation text is required' }, { status: 400 });
    }

    // Analyze with AI
    let analysis = { summary: '', insights: [] as string[], tags: [] as string[] };
    try {
      analysis = await analyzeConversation(rawText);
    } catch (aiError) {
      console.error('AI analysis failed:', aiError);
      // Continue without AI analysis
    }

    const conversation = await prisma.conversation.create({
      data: {
        title: title || analysis.summary.slice(0, 60) || 'Untitled Conversation',
        rawText,
        summary: analysis.summary || null,
        insights: JSON.stringify(analysis.insights) || null,
        tags: JSON.stringify(analysis.tags) || null,
        aiSource: aiSource || 'other',
        userId: auth.userId,
      },
    });

    return NextResponse.json({ conversation }, { status: 201 });
  } catch (error) {
    console.error('Create conversation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

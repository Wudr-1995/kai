import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const conversation = await prisma.conversation.findFirst({
    where: { id, userId: auth.userId },
  });

  if (!conversation) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ conversation });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const updates = await request.json();

  // Only allow updating notes
  const conversation = await prisma.conversation.findFirst({
    where: { id, userId: auth.userId },
  });

  if (!conversation) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updated = await prisma.conversation.update({
    where: { id },
    data: { notes: updates.notes },
  });

  return NextResponse.json({ conversation: updated });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await getAuthUser();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const conversation = await prisma.conversation.findFirst({
    where: { id, userId: auth.userId },
  });

  if (!conversation) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.conversation.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

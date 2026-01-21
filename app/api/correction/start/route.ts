import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/actions/cleint';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { aiModel } from '@/lib/gemeni';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { codeSnippet } = body;

    if (!codeSnippet || typeof codeSnippet !== 'string') {
      return NextResponse.json(
        { error: 'Code snippet is required' },
        { status: 400 }
      );
    }

    const login = (session.user as any)?.login || session.user?.email || 'unknown';

    // Create a new defense session
    const defenseSession = await prisma.defenseSession.create({
      data: {
        codeSnippet,
      },
    });

    // Generate initial question from the corrector
    const initialPrompt = `Here is the Python code submitted by a student:\n\n\`\`\`python\n${codeSnippet}\n\`\`\`\n\nStart the correction immediately. Ask a tough, technical question about this code without any politeness. Test if they understand what they wrote or if they just copy-pasted it. Be direct and challenging.`;

    const result = await aiModel.generateContent(initialPrompt);
    const initialQuestion = result.response.text();

    // Save the initial AI question
    const initialMessage = await prisma.message.create({
      data: {
        role: 'assistant',
        login,
        content: initialQuestion,
        sessionId: defenseSession.id,
      },
    });

    return NextResponse.json({
      sessionId: defenseSession.id,
      initialMessage: {
        id: initialMessage.id,
        role: 'assistant',
        content: initialQuestion,
        createdAt: initialMessage.createdAt,
      },
    });
  } catch (err) {
    console.error('Start correction error:', err);
    return NextResponse.json(
      { error: 'Failed to start correction' },
      { status: 500 }
    );
  }
}

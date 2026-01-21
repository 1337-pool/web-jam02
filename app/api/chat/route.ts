import { NextRequest, NextResponse } from 'next/server';
import { aiModel } from '@/lib/gemeni';
import { prisma } from '@/app/actions/cleint';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { sessionId, message, codeSnippet } = body;

    if (!sessionId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const login = (session.user as any)?.login || session.user?.email || 'unknown';

    // Save user message
    const userMessage = await prisma.message.create({
      data: {
        role: 'user',
        login,
        content: message,
        sessionId,
      },
    });

    // Get conversation history (excluding the user message we just created)
    const previousMessages = await prisma.message.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });

    // Build conversation history for Gemini
    const history = previousMessages
      .filter((m) => m.id !== userMessage.id) // Exclude the current user message
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

    // Generate AI response
    let result;
    if (history.length === 0) {
      // First message in conversation - use generateContent
      const prompt = `Here is the Python code submitted by a student:\n\n\`\`\`python\n${codeSnippet}\n\`\`\`\n\nStudent's response: ${message}\n\nEvaluate their answer. Be direct and harsh.`;
      result = await aiModel.generateContent(prompt);
    } else {
      // Continue conversation with chat history
      const chat = aiModel.startChat({ history });
      result = await chat.sendMessage(message);
    }
    const responseText = result.response.text();

    // Save AI response
    const aiMessage = await prisma.message.create({
      data: {
        role: 'assistant',
        login,
        content: responseText,
        sessionId,
      },
    });

    return NextResponse.json({
      message: {
        id: aiMessage.id,
        role: 'assistant',
        content: responseText,
        createdAt: aiMessage.createdAt,
      },
    });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}

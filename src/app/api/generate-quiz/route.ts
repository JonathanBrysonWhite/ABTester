import { NextRequest, NextResponse } from 'next/server';
import { encryptQuiz } from '@/lib/crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, snippets } = body;

    if (!email || !snippets) {
      return NextResponse.json({ error: 'Missing email or snippets' }, { status: 400 });
    }

    const payload = { email, snippets: snippets };
    const encrypted = encryptQuiz(payload);
    const quizLink = `${encrypted}`;

    return NextResponse.json({ quizLink });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}

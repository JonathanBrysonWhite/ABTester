import { NextRequest, NextResponse } from 'next/server';
import { decryptQuiz } from '@/lib/crypto';

export async function POST(req: NextRequest) {
  try {
    const { payload } = await req.json();
    if (!payload) {
      return NextResponse.json({ error: 'Missing payload' }, { status: 400 });
    }

    const quizPayload = decryptQuiz(payload);

    return NextResponse.json({ quizPayload });
  } catch (e) {
    console.error('Failed to decrypt payload:', e);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

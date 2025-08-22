import { NextRequest, NextResponse } from 'next/server';
import { generateCode } from '@/lib/code';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, snippets } = body;

    if (!email || !snippets) {
      return NextResponse.json({ error: 'Missing email or snippets' }, { status: 400 });
    }
    console.log('Received payload:', { email, snippets });
    const payload = { email, snippets: snippets };
    const code = await generateCode(payload);
    if (!code) {
      return NextResponse.json({ error: 'Failed to generate code' }, { status: 400 });
    }
    
    const quizLink = `${encodeURIComponent(code)}`;
    return NextResponse.json({ quizLink });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}

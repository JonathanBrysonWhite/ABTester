import { NextRequest, NextResponse } from 'next/server';
import { isBase64 } from '@/lib/utils';
import { getQuizPayload } from '@/lib/dblayer';

export async function POST(req: NextRequest) {
  try {
    const { payload } = await req.json();
    if (!payload) {
      return NextResponse.json({ error: 'Missing payload' }, { status: 400 });
    }
    if (typeof payload !== 'string' || !isBase64(payload)) {
      return NextResponse.json({ error: 'Invalid payload format' }, { status: 400});
    }

    const quizPayload = await getQuizPayload(payload);
    console.log('Decrypted payload:', quizPayload);
    return NextResponse.json({ quizPayload });
  } catch (e) {
    console.error('Failed to decrypt payload:', e);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

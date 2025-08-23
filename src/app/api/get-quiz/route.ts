import { NextRequest, NextResponse } from 'next/server';
import { isBase64 } from '@/utils/utils';
import { getQuizPayload } from '@/lib/dal/dblayer';
import { rateLimit } from '@/utils/rateLimiter';
import { defaultRateLimitConfig } from '@/utils/utils';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || 'global';
    const { allowed } = await rateLimit(ip, defaultRateLimitConfig);
    if (!allowed) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429})
    }
  
    const { payload } = await req.json();
    if (!payload) {
      return NextResponse.json({ error: 'Missing payload' }, { status: 400 });
    }
    if (typeof payload !== 'string' || !isBase64(payload)) {
      return NextResponse.json({ error: 'Invalid payload format' }, { status: 400 });
    }

    const quizPayload = await getQuizPayload(payload);
    return NextResponse.json({ quizPayload });
  } catch (e) {
    console.error('Failed to decrypt payload:', e);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

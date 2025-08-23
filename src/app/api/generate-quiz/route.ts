import { NextRequest, NextResponse } from 'next/server';
import { generateCode } from '@/lib/code';
import { rateLimit } from '@/utils/rateLimiter';
import { defaultRateLimitConfig } from '@/utils/utils';
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || 'global';
    const { allowed } = await rateLimit(ip, defaultRateLimitConfig)
    
    if (!allowed) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429})
    }
    
    const body = await req.json();
    const { email, snippets } = body;

    if (!email || !snippets) {
      return NextResponse.json({ error: 'Missing email or snippets' }, { status: 400 });
    }

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

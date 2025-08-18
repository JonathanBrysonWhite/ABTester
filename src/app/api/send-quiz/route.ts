import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { email, clientName, responses, snippetPairs } = await req.json();

    if (!email || !clientName || !responses || !snippetPairs) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const message = {
      to: email,
      from: 'no-reply@yourdomain.com',
      subject: `Quiz results from ${clientName}`,
      text: `Client Name: ${clientName}\nResponses: ${JSON.stringify(responses)}\nSnippets: ${JSON.stringify(snippetPairs)}`,
    };

    await sgMail.send(message);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const webhook = process.env.N8N_WEBHOOK_URL;
    if (!webhook) {
      return NextResponse.json({ ok: false, message: 'N8N webhook not configured' }, { status: 500 });
    }

    // forward to n8n
    await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}



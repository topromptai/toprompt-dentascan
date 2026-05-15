import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('[Contact Form - Design Preview]', body);
  return NextResponse.json({ success: true, message: 'Message received. We will get back to you soon.' });
}

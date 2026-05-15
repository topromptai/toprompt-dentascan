import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Design preview — return mock user data (no DB)
  return NextResponse.json({
    success: true,
    data: { _id: '1', username: 'Demo User', email: 'demo@example.com' },
  });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, data: { _id: '1', ...body } });
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Analysis from '@/lib/models/Analysis';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    let payload: { userId: string; email: string };
    try {
      payload = verifyToken(token);
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    const analyses = await Analysis.find({ userId: payload.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: analyses });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

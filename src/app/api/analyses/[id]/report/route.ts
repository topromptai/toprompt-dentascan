import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Analysis from '@/lib/models/analysis';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const analysis = await Analysis.findById(params.id).lean();
    if (!analysis) return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
    const report = {
      reportId: params.id,
      generatedAt: new Date().toISOString(),
      ...analysis,
    };
    return new NextResponse(JSON.stringify(report, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="dentascan-report-${params.id}.json"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

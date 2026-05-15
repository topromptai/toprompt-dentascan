import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Analysis from '@/lib/models/Analysis';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/auth';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Auth check
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

    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ success: false, error: 'imageUrl is required' }, { status: 400 });
    }

    // Call OpenAI vision to analyze the car damage
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert automotive damage assessor. Analyze the provided car image and identify all visible damage areas. Respond ONLY with valid JSON matching this schema: { "damageAreas": [ { "area": string, "severity": "critical"|"high"|"medium"|"low", "description": string } ], "overallSeverity": string }. overallSeverity should be one of: critical, high, medium, low, none.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: imageUrl, detail: 'high' },
            },
            {
              type: 'text',
              text: 'Please analyze this vehicle image for damage. Identify each damaged area, its severity, and provide a brief description.',
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const rawContent = completion.choices[0]?.message?.content || '{}';
    let parsed: { damageAreas: any[]; overallSeverity: string };
    try {
      // Strip markdown code fences if present
      const cleaned = rawContent.replace(/```json\n?|```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { damageAreas: [], overallSeverity: 'unknown' };
    }

    const analysis = await Analysis.create({
      userId: payload.userId,
      imageUrl,
      damageAreas: parsed.damageAreas || [],
      overallSeverity: parsed.overallSeverity || 'unknown',
      analysisTimestamp: new Date(),
    });

    // Link analysis to user
    await User.findByIdAndUpdate(payload.userId, {
      $push: { analysisIds: analysis._id },
    });

    return NextResponse.json({ success: true, data: analysis }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

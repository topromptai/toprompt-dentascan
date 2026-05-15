import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Analysis from '@/lib/models/analysis';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { imageUrl, imageBase64, userId, vehicleType } = body;

    if (!imageUrl && !imageBase64) {
      return NextResponse.json({ error: 'imageUrl or imageBase64 is required' }, { status: 400 });
    }

    const imageContent = imageUrl
      ? { type: 'image_url' as const, image_url: { url: imageUrl } }
      : { type: 'image_url' as const, image_url: { url: `data:image/jpeg;base64,${imageBase64}` } };

    const prompt = `You are a forensic vehicle damage analyst. Analyze this vehicle image and return a JSON object with the following structure:
{
  "overallSeverity": "critical" | "high" | "medium" | "low",
  "vehicleType": "string (e.g. Sedan, SUV, Truck)",
  "summary": "string (2-3 sentence forensic summary)",
  "confidence": number (0-1),
  "damagedParts": [
    {
      "name": "string (part name, lowercase, e.g. 'hood', 'front bumper', 'driver door')",
      "severity": "critical" | "high" | "medium" | "low",
      "description": "string (detailed damage description)",
      "repairEstimate": "string (e.g. '$500-$1200')",
      "zone": "string (front/rear/left/right/roof)"
    }
  ]
}
Return ONLY valid JSON, no markdown.`;

    const startTime = Date.now();
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            imageContent,
          ],
        },
      ],
      max_tokens: 1500,
    });
    const scanDuration = ((Date.now() - startTime) / 1000).toFixed(1);

    let aiResult: any = {};
    try {
      const raw = response.choices[0]?.message?.content || '{}';
      aiResult = JSON.parse(raw);
    } catch {
      aiResult = { overallSeverity: 'medium', damagedParts: [], summary: 'Analysis complete.', confidence: 0.5 };
    }

    const analysis = await Analysis.create({
      userId: userId || null,
      imageUrl: imageUrl || null,
      vehicleType: aiResult.vehicleType || vehicleType || 'Unknown',
      overallSeverity: aiResult.overallSeverity || 'medium',
      damagedParts: aiResult.damagedParts || [],
      summary: aiResult.summary || '',
      confidence: aiResult.confidence || 0,
      scanDuration: parseFloat(scanDuration),
    });

    return NextResponse.json(analysis, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

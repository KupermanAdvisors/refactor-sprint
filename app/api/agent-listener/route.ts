import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json();

    if (!transcript || transcript.trim() === '') {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a Revenue Architect analyzing executive kickoff calls for The Refactor Sprint.

Your job is to identify strategic contradictions, misalignments, and critical pain points between different stakeholders (CEO, Sales VP, CMO, etc.).

Output format (use ASCII art for emphasis):

STRATEGIC CONTRADICTIONS DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CEO Position:
[Bullet points of CEO's stated goals, concerns, priorities]

Sales Leadership Position:
[Bullet points of Sales VP's stated goals, concerns, priorities]

⚠ CRITICAL MISALIGNMENTS:
[Specific contradictions between stakeholders]

ROOT CAUSE HYPOTHESIS:
[Your architectural diagnosis of what's actually broken]

IMMEDIATE ACTION REQUIRED:
[1-2 critical fixes needed before scaling]`
        },
        {
          role: 'user',
          content: `Analyze this kickoff call transcript and identify strategic contradictions:\n\n${transcript}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const analysis = completion.choices[0]?.message?.content || 'No analysis generated';

    return NextResponse.json({ analysis });
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process transcript' },
      { status: 500 }
    );
  }
}

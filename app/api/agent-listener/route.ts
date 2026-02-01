import { NextResponse } from 'next/server';
import OpenAI from 'openai';

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  return new OpenAI({ apiKey });
}

export async function POST(request: Request) {
  try {
    const { transcript, telemetry } = await request.json();

    if (!transcript || transcript.trim() === '') {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    const openai = getOpenAIClient();

    // Build dynamic telemetry context
    let telemetryContext = '';
    let diagnosticFlags = [];

    if (telemetry) {
      telemetryContext = `\n\nMEETING TELEMETRY DATA (from Fireflies.ai):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Sentiment: ${telemetry.sentimentPositive}% Positive, ${telemetry.sentimentNegative}% Negative
- Talk Time: CEO ${telemetry.talkTimeCEO}%, Sales VP ${telemetry.talkTimeSalesVP}%
- Key Topics Mentioned: ${telemetry.keyTopics.join(', ')}

DIAGNOSTIC FLAGS TO CHECK:
`;

      // Dominant Founder Bias
      if (telemetry.talkTimeCEO > 70) {
        diagnosticFlags.push('⚠️ DOMINANT FOUNDER BIAS: CEO talk time exceeds 70%. This suggests they may be dictating strategy without listening to market feedback from Sales/Marketing.');
      }

      // Negative Sentiment Correlation
      if (telemetry.sentimentNegative > 30) {
        diagnosticFlags.push('⚠️ HIGH NEGATIVE SENTIMENT: Over 30% negative sentiment detected. Analyze transcript to identify which stakeholder expressed negativity and what topics triggered it. This often reveals hidden friction.');
      }

      // Product-Obsessed vs Market-Blind
      const internalKeywords = ['product', 'feature', 'roadmap', 'engineering', 'tech', 'platform'];
      const externalKeywords = ['customer', 'pain', 'buyer', 'market', 'competition', 'revenue'];
      
      const internalCount = telemetry.keyTopics.filter((topic: string) => 
        internalKeywords.some(kw => topic.toLowerCase().includes(kw))
      ).length;
      
      const externalCount = telemetry.keyTopics.filter((topic: string) => 
        externalKeywords.some(kw => topic.toLowerCase().includes(kw))
      ).length;

      if (internalCount > externalCount) {
        diagnosticFlags.push('⚠️ PRODUCT-OBSESSED / MARKET-BLIND: Key topics skew heavily toward internal features vs external customer pain. This company is building in a vacuum.');
      }

      // Imbalanced Talk Time
      if (Math.abs(telemetry.talkTimeCEO - telemetry.talkTimeSalesVP) > 50) {
        diagnosticFlags.push('⚠️ IMBALANCED CONVERSATION: Talk time gap exceeds 50%. One voice is dominating - investigate if critical perspectives are being silenced.');
      }

      telemetryContext += diagnosticFlags.join('\n');
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a Revenue Architect analyzing executive kickoff calls for The Refactor Sprint.

Your job is to identify strategic contradictions, misalignments, and critical pain points between different stakeholders (CEO, Sales VP, CMO, etc.).

${telemetry ? 'You have access to MEETING TELEMETRY data from Fireflies.ai. Use this quantitative data to validate or challenge what stakeholders SAY vs what the data SHOWS.' : ''}

${telemetry ? 'CRITICAL ANALYSIS RULES:\n1. If CEO Talk Time > 70%, flag "Dominant Founder Bias" and explain why this prevents market validation.\n2. If Negative Sentiment correlates with Sales VP speaking time, highlight those specific quotes as "Critical Friction" - these are the unspoken truths.\n3. Compare Internal Keywords (product, feature) vs External Keywords (customer, pain). If Internal > External, diagnose as "Product-Obsessed / Market-Blind".\n4. Cross-reference telemetry flags with actual transcript quotes to provide evidence-based diagnosis.\n' : ''}

Output format (use ASCII art for emphasis):

STRATEGIC CONTRADICTIONS DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${telemetry ? '🚨 TELEMETRY-BASED DIAGNOSTIC FLAGS:\n[List all warning flags detected from meeting data]\n\n' : ''}CEO Position:
[Bullet points of CEO's stated goals, concerns, priorities]

Sales Leadership Position:
[Bullet points of Sales VP's stated goals, concerns, priorities]

⚠ CRITICAL MISALIGNMENTS:
[Specific contradictions between stakeholders - cite exact quotes if available]

${telemetry ? '📊 DATA VS NARRATIVE GAP:\n[Compare what the telemetry shows vs what stakeholders claim]\n\n' : ''}ROOT CAUSE HYPOTHESIS:
[Your architectural diagnosis of what's actually broken]

IMMEDIATE ACTION REQUIRED:
[1-2 critical fixes needed before scaling]`
        },
        {
          role: 'user',
          content: `Analyze this kickoff call transcript and identify strategic contradictions:${telemetryContext}\n\nTRANSCRIPT:\n${transcript}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
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

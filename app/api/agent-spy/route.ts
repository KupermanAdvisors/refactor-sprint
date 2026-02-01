import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import axios from 'axios';
import * as cheerio from 'cheerio';

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  return new OpenAI({ apiKey });
}

interface CompetitorData {
  url: string;
  content: string;
  error?: string;
}

async function scrapeCompetitorWebsite(url: string): Promise<CompetitorData> {
  try {
    // Add protocol if missing
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    
    const response = await axios.get(fullUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const $ = cheerio.load(response.data);

    // Remove scripts, styles, and other noise
    $('script, style, nav, footer, iframe').remove();

    // Extract key content areas
    const title = $('title').text();
    const h1 = $('h1').first().text();
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    
    // Get headline and value prop text (first few paragraphs)
    const paragraphs = $('p').map((_, el) => $(el).text()).get().slice(0, 5).join(' ');
    
    // Get pricing indicators (if visible)
    const pricingText = $('*:contains("$")').map((_, el) => $(el).text()).get().join(' ').slice(0, 500);

    const content = `
URL: ${fullUrl}
Title: ${title}
Headline: ${h1}
Meta Description: ${metaDescription}
Key Content: ${paragraphs}
Pricing Indicators: ${pricingText}
    `.trim();

    return { url: fullUrl, content };
  } catch (error: any) {
    console.error(`Error scraping ${url}:`, error.message);
    return { 
      url, 
      content: '', 
      error: `Failed to scrape: ${error.message}` 
    };
  }
}

export async function POST(request: Request) {
  try {
    const { competitors } = await request.json();

    if (!competitors || !Array.isArray(competitors) || competitors.length === 0) {
      return NextResponse.json(
        { error: 'At least one competitor URL is required' },
        { status: 400 }
      );
    }

    // Filter out empty URLs
    const validCompetitors = competitors.filter((url: string) => url && url.trim() !== '');

    if (validCompetitors.length === 0) {
      return NextResponse.json(
        { error: 'No valid competitor URLs provided' },
        { status: 400 }
      );
    }

    // Scrape all competitor sites in parallel
    const scrapedData = await Promise.all(
      validCompetitors.map((url: string) => scrapeCompetitorWebsite(url))
    );

    // Build context for AI
    const competitorContext = scrapedData
      .map((data, i) => {
        if (data.error) {
          return `Competitor ${i + 1} (${data.url}): [Unable to access website - may be blocked or unavailable. Analyze based on URL/domain name if possible.]`;
        }
        return `Competitor ${i + 1}:\n${data.content}\n---`;
      })
      .join('\n\n');

    // Analyze with OpenAI
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a competitive intelligence analyst for The Refactor Sprint.

Analyze competitor websites and extract:
1. Core positioning (how they describe themselves)
2. Price point indicators (if visible)
3. Key messaging (value propositions)
4. Target customer (SMB vs Enterprise)
5. Gap analysis (what they're missing)

Output format (ASCII art, cyberpunk terminal style):

COMPETITIVE INTELLIGENCE SCAN COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[For each competitor, output:]
Competitor N: [Company name if found, or URL]
  → Positioning: [One-line summary]
  → Price Point: [Range or "Not disclosed"]
  → Key Message: [Primary value prop]
  → Target: [SMB/Mid-Market/Enterprise]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GAP ANALYSIS:
• [Key insight about what all competitors do]
• [Key insight about what they're missing]
• [Strategic opportunity for client]

RECOMMENDATION:
[One-line positioning strategy to differentiate]`
        },
        {
          role: 'user',
          content: `Analyze these competitor websites:\n\n${competitorContext}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const analysis = completion.choices[0]?.message?.content || 'No analysis generated';

    return NextResponse.json({ 
      analysis,
      scrapedCount: scrapedData.filter(d => !d.error).length,
      errors: scrapedData.filter(d => d.error).map(d => d.error)
    });
  } catch (error: any) {
    console.error('Agent 2 Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process competitor intel' },
      { status: 500 }
    );
  }
}

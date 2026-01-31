import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import Papa from 'papaparse';

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  return new OpenAI({ apiKey });
}

interface CSVRow {
  [key: string]: string;
}

function analyzeCSVData(data: CSVRow[]): string {
  // Basic statistical analysis
  const totalRows = data.length;
  const columns = Object.keys(data[0] || {});
  
  // Try to identify common CRM fields
  const statusField = columns.find(col => 
    col.toLowerCase().includes('status') || 
    col.toLowerCase().includes('stage') ||
    col.toLowerCase().includes('outcome')
  );
  
  const amountField = columns.find(col => 
    col.toLowerCase().includes('amount') || 
    col.toLowerCase().includes('value') ||
    col.toLowerCase().includes('revenue') ||
    col.toLowerCase().includes('price')
  );
  
  const dateField = columns.find(col => 
    col.toLowerCase().includes('date') || 
    col.toLowerCase().includes('created') ||
    col.toLowerCase().includes('closed')
  );

  const reasonField = columns.find(col =>
    col.toLowerCase().includes('reason') ||
    col.toLowerCase().includes('lost') ||
    col.toLowerCase().includes('note')
  );

  let stats = `
CSV STRUCTURE ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Records: ${totalRows}
Columns: ${columns.length}
Column Names: ${columns.join(', ')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

  // Calculate win rate if status field exists
  if (statusField) {
    const statusCounts: { [key: string]: number } = {};
    data.forEach(row => {
      const status = row[statusField]?.toLowerCase() || 'unknown';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const wonCount = Object.entries(statusCounts).reduce((sum, [status, count]) => {
      if (status.includes('won') || status.includes('closed won') || status.includes('success')) {
        return sum + count;
      }
      return sum;
    }, 0);

    const lostCount = Object.entries(statusCounts).reduce((sum, [status, count]) => {
      if (status.includes('lost') || status.includes('closed lost') || status.includes('failed')) {
        return sum + count;
      }
      return sum;
    }, 0);

    const winRate = wonCount / (wonCount + lostCount || 1) * 100;

    stats += `
STATUS BREAKDOWN:
${Object.entries(statusCounts).map(([status, count]) => `  ${status}: ${count} (${(count/totalRows*100).toFixed(1)}%)`).join('\n')}

Win Rate: ${winRate.toFixed(1)}% (${wonCount} won / ${wonCount + lostCount} closed)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
  }

  // Calculate deal size if amount field exists
  if (amountField) {
    const amounts = data
      .map(row => {
        const val = row[amountField]?.replace(/[$,]/g, '');
        return parseFloat(val);
      })
      .filter(n => !isNaN(n) && n > 0);

    if (amounts.length > 0) {
      const avgAmount = amounts.reduce((a, b) => a + b, 0) / amounts.length;
      const maxAmount = Math.max(...amounts);
      const minAmount = Math.min(...amounts);

      stats += `
DEAL SIZE ANALYSIS:
  Average: $${avgAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
  Largest: $${maxAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
  Smallest: $${minAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
    }
  }

  // Sample lost reasons if available
  if (reasonField) {
    const reasons = data
      .map(row => row[reasonField])
      .filter(r => r && r.trim() !== '')
      .slice(0, 10);

    if (reasons.length > 0) {
      stats += `
SAMPLE LOST REASONS:
${reasons.map((r, i) => `  ${i + 1}. ${r}`).join('\n')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
    }
  }

  return stats;
}

export async function POST(request: Request) {
  try {
    const { csvContent, fileName } = await request.json();

    if (!csvContent || typeof csvContent !== 'string') {
      return NextResponse.json(
        { error: 'CSV content is required' },
        { status: 400 }
      );
    }

    // Parse CSV
    const parseResult = Papa.parse<CSVRow>(csvContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
    });

    if (parseResult.errors.length > 0) {
      console.error('CSV Parse Errors:', parseResult.errors);
      return NextResponse.json(
        { error: 'Failed to parse CSV file' },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    if (data.length === 0) {
      return NextResponse.json(
        { error: 'CSV file is empty or improperly formatted' },
        { status: 400 }
      );
    }

    // Generate statistical analysis
    const statsReport = analyzeCSVData(data);

    // Build AI context (sample first 20 rows to avoid token limits)
    const sampleData = data.slice(0, 20);
    const csvSample = Papa.unparse(sampleData);

    // Analyze with OpenAI
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a CRM Forensics Analyst for The Refactor Sprint.

You analyze CRM export data (deals/opportunities) to identify:
1. Why deals are won vs lost
2. Sales cycle bottlenecks
3. Pricing/discount patterns
4. Deal size patterns
5. Critical GTM issues

Output format (ASCII art, terminal style):

CRM AUTOPSY COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File Analyzed: [filename]

KEY METRICS:
┌────────────────────────────────────┐
│ Win Rate:           XX.X%          │
│ Avg Deal Size:      $XX,XXX        │
│ Sales Cycle:        XXX days       │
│ Churn Source:       [Primary]      │
└────────────────────────────────────┘

CRITICAL FINDINGS:
⚠ [Finding 1 with data evidence]
⚠ [Finding 2 with data evidence]
⚠ [Finding 3 with data evidence]

ROOT CAUSE HYPOTHESIS:
[Your diagnosis of what's actually broken]

RECOMMENDATION:
[1-2 specific fixes to improve conversion]`
        },
        {
          role: 'user',
          content: `Here is the statistical summary and sample data from the CRM export:

FILENAME: ${fileName || 'Unknown'}

${statsReport}

SAMPLE DATA (first 20 rows):
${csvSample}

Analyze this data and provide forensic insights.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const analysis = completion.choices[0]?.message?.content || 'No analysis generated';

    return NextResponse.json({ 
      analysis,
      rowsAnalyzed: data.length,
      columnsFound: Object.keys(data[0] || {}).length
    });
  } catch (error: any) {
    console.error('Agent 3 Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process CSV forensics' },
      { status: 500 }
    );
  }
}

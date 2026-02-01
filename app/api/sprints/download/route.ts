import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import JSZip from 'jszip';

// Generate print-ready HTML document
function generateExecutiveBrief(sprint: any): string {
  const createdDate = new Date(sprint.created_at).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${sprint.client_name} - Refactor Sprint Executive Brief</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: white;
      padding: 0;
    }

    .container {
      max-width: 8.5in;
      margin: 0 auto;
      padding: 0.75in;
    }

    /* Print Styles */
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      
      .container {
        padding: 0.5in;
      }

      .page-break {
        page-break-before: always;
      }

      .no-break {
        page-break-inside: avoid;
      }
    }

    /* Cover Page */
    .cover-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-bottom: 2px solid #e2e8f0;
    }

    .cover-title {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 24px;
      color: #0f172a;
    }

    .cover-subtitle {
      font-size: 24px;
      color: #64748b;
      margin-bottom: 16px;
    }

    .cover-date {
      font-size: 14px;
      color: #94a3b8;
      margin-top: 32px;
    }

    /* Section Styles */
    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #0f172a;
      margin: 48px 0 24px 0;
      padding-bottom: 12px;
      border-bottom: 3px solid #2563eb;
    }

    h2 {
      font-size: 24px;
      font-weight: bold;
      color: #1e293b;
      margin: 32px 0 16px 0;
    }

    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #334155;
      margin: 24px 0 12px 0;
    }

    p {
      margin-bottom: 12px;
      line-height: 1.8;
    }

    /* Executive Summary Box */
    .summary-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    .summary-item {
      padding: 16px;
      background: white;
      border-radius: 4px;
    }

    .summary-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .summary-value {
      font-size: 28px;
      font-weight: bold;
      color: #0f172a;
    }

    /* Strategic Contradiction */
    .contradiction-box {
      background: #fef2f2;
      border-left: 4px solid #dc2626;
      padding: 20px;
      margin: 24px 0;
    }

    .contradiction-box h3 {
      color: #991b1b;
      margin-top: 0;
    }

    /* Strategic Shift - PROMINENT */
    .shift-box {
      background: #2563eb;
      color: white;
      padding: 32px;
      border-radius: 8px;
      margin: 32px 0;
      box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
    }

    .shift-box h3 {
      color: #dbeafe;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }

    .shift-box .shift-content {
      font-size: 22px;
      font-weight: bold;
      line-height: 1.6;
    }

    /* Evidence Cards */
    .evidence-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin: 24px 0;
    }

    .evidence-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 16px;
      text-align: center;
    }

    .evidence-title {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: bold;
      color: #475569;
      margin-top: 8px;
    }

    .evidence-desc {
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
    }

    /* Action Items */
    .action-list {
      list-style: none;
      margin: 24px 0;
    }

    .action-item {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 12px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .action-number {
      font-size: 20px;
      font-weight: bold;
      color: #2563eb;
      min-width: 32px;
    }

    .action-text {
      font-size: 15px;
      color: #334155;
      line-height: 1.6;
      font-weight: 600;
    }

    /* Agent Data */
    .agent-section {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
    }

    .agent-section h3 {
      color: #2563eb;
      margin-top: 0;
    }

    .agent-content {
      font-size: 13px;
      color: #475569;
      white-space: pre-wrap;
      line-height: 1.7;
      font-family: 'Courier New', monospace;
    }

    /* Footer */
    .footer {
      margin-top: 64px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      color: #94a3b8;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <!-- Cover Page -->
  <div class="cover-page page-break">
    <div class="cover-title">${sprint.client_name}</div>
    <div class="cover-subtitle">72-Hour Revenue Engine Diagnostic</div>
    <div class="cover-subtitle" style="color: #2563eb; font-weight: 600;">Executive Brief</div>
    <div class="cover-date">Generated ${createdDate}</div>
  </div>

  <div class="container">
    <!-- Executive Summary -->
    ${sprint.annual_revenue || sprint.burn_rate || sprint.hypothesis ? `
    <div class="no-break">
      <h1>Executive Summary</h1>
      <div class="summary-box">
        ${sprint.annual_revenue || sprint.burn_rate ? `
        <div class="summary-grid">
          ${sprint.annual_revenue ? `
          <div class="summary-item">
            <div class="summary-label">Annual Revenue</div>
            <div class="summary-value">${sprint.annual_revenue}</div>
          </div>
          ` : ''}
          ${sprint.burn_rate ? `
          <div class="summary-item">
            <div class="summary-label">Burn Rate</div>
            <div class="summary-value">${sprint.burn_rate}</div>
          </div>
          ` : ''}
        </div>
        ` : ''}
        ${sprint.hypothesis ? `
        <div style="padding-top: ${sprint.annual_revenue || sprint.burn_rate ? '16px' : '0'}; border-top: ${sprint.annual_revenue || sprint.burn_rate ? '1px solid #e2e8f0' : 'none'};">
          <div class="summary-label">Critical Error Hypothesis</div>
          <p style="margin-top: 12px; font-size: 15px; color: #475569;">${sprint.hypothesis}</p>
        </div>
        ` : ''}
      </div>
    </div>
    ` : ''}

    <!-- Strategic Analysis -->
    ${sprint.growth_thesis ? `
    <div class="page-break">
      <h1>Strategic Analysis</h1>
      
      <div class="contradiction-box no-break">
        <h3>The Strategic Contradiction</h3>
        <p>${sprint.growth_thesis.split('\n\n')[0] || sprint.growth_thesis}</p>
      </div>

      ${sprint.agent_1_output || sprint.agent_2_output || sprint.agent_3_output ? `
      <div class="evidence-grid no-break">
        ${sprint.agent_1_output ? `
        <div class="evidence-card">
          <div style="font-size: 24px;">🗣️</div>
          <div class="evidence-title">Transcript Analysis</div>
          <div class="evidence-desc">Stakeholder alignment</div>
        </div>
        ` : ''}
        ${sprint.agent_2_output ? `
        <div class="evidence-card">
          <div style="font-size: 24px;">📊</div>
          <div class="evidence-title">Competitive Intel</div>
          <div class="evidence-desc">Market positioning</div>
        </div>
        ` : ''}
        ${sprint.agent_3_output ? `
        <div class="evidence-card">
          <div style="font-size: 24px;">🔎</div>
          <div class="evidence-title">CRM Forensics</div>
          <div class="evidence-desc">Revenue patterns</div>
        </div>
        ` : ''}
      </div>
      ` : ''}

      <div class="shift-box no-break">
        <h3>Recommended Strategic Shift</h3>
        <div class="shift-content">
          ${sprint.growth_thesis.split('\n\n').slice(-1)[0] || sprint.growth_thesis}
        </div>
      </div>
    </div>
    ` : ''}

    <!-- Prioritized Action Plan -->
    ${sprint.roadmap_items && sprint.roadmap_items.length > 0 ? `
    <div class="page-break">
      <h1>Prioritized Action Plan</h1>
      <ul class="action-list">
        ${sprint.roadmap_items.map((item: string, i: number) => `
        <li class="action-item no-break">
          <div class="action-number">${i + 1}</div>
          <div class="action-text">${item}</div>
        </li>
        `).join('')}
      </ul>
    </div>
    ` : ''}

    <!-- Raw Input Data -->
    ${sprint.agent_1_transcript || sprint.agent_2_competitors || sprint.agent_3_csv_filename ? `
    <div class="page-break">
      <h1>Raw Input Data</h1>
      <p style="color: #64748b; margin-bottom: 24px; font-size: 14px;">
        Original data provided for analysis
      </p>
      
      ${sprint.agent_1_transcript ? `
      <div class="agent-section no-break">
        <h3>Original Kickoff Call Transcript</h3>
        <div class="agent-content">${sprint.agent_1_transcript}</div>
      </div>
      ` : ''}

      ${sprint.agent_2_competitors && Array.isArray(sprint.agent_2_competitors) && sprint.agent_2_competitors.length > 0 ? `
      <div class="agent-section no-break">
        <h3>Competitor URLs Analyzed</h3>
        <ul style="list-style: none; padding: 0; margin-top: 12px;">
          ${sprint.agent_2_competitors.map((url: string, i: number) => `
            <li style="padding: 8px 0; color: #475569;">
              <strong>Competitor ${i + 1}:</strong> ${url}
            </li>
          `).join('')}
        </ul>
      </div>
      ` : ''}

      ${sprint.agent_3_csv_filename ? `
      <div class="agent-section no-break">
        <h3>CRM Data File</h3>
        <p style="margin-top: 12px; color: #475569;">
          <strong>Filename:</strong> ${sprint.agent_3_csv_filename}
        </p>
        ${sprint.agent_3_csv_content ? `
        <details style="margin-top: 12px;">
          <summary style="cursor: pointer; color: #2563eb; font-weight: 600;">View CSV Data (Click to expand)</summary>
          <pre class="agent-content" style="margin-top: 12px; max-height: 400px; overflow-y: auto;">${sprint.agent_3_csv_content.slice(0, 5000)}${sprint.agent_3_csv_content.length > 5000 ? '\n\n... (truncated for length)' : ''}</pre>
        </details>
        ` : ''}
      </div>
      ` : ''}
    </div>
    ` : ''}

    <!-- Supporting Agent Data -->
    ${sprint.agent_1_output || sprint.agent_2_output || sprint.agent_3_output ? `
    <div class="page-break">
      <h1>AI Analysis Outputs</h1>
      
      ${sprint.agent_1_output ? `
      <div class="agent-section no-break">
        <h3>The Listener: Stakeholder Analysis</h3>
        <div class="agent-content">${sprint.agent_1_output}</div>
      </div>
      ` : ''}

      ${sprint.agent_2_output ? `
      <div class="agent-section no-break">
        <h3>The Spy: Competitive Intelligence</h3>
        <div class="agent-content">${sprint.agent_2_output}</div>
      </div>
      ` : ''}

      ${sprint.agent_3_output ? `
      <div class="agent-section no-break">
        <h3>The Analyst: CRM Forensics</h3>
        <div class="agent-content">${sprint.agent_3_output}</div>
      </div>
      ` : ''}
    </div>
    ` : ''}

    <!-- Footer -->
    <div class="footer">
      <p>The Refactor Sprint | refactorsprint.com</p>
      <p>This document expires 30 days from creation date</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const { sprintId } = await request.json();

    if (!sprintId) {
      return NextResponse.json(
        { error: 'Sprint ID is required' },
        { status: 400 }
      );
    }

    // Get sprint data
    const { data: sprint, error } = await supabaseAdmin
      .from('sprints')
      .select('*')
      .eq('id', sprintId)
      .single();

    if (error || !sprint) {
      return NextResponse.json(
        { error: 'Sprint not found' },
        { status: 404 }
      );
    }

    // Create ZIP
    const zip = new JSZip();

    // Add print-ready HTML executive brief (FIRST FILE)
    const executiveBrief = generateExecutiveBrief(sprint);
    zip.file('00-EXECUTIVE-BRIEF.html', executiveBrief);

    // Add client vitals
    zip.file('01-client-vitals.txt', `
REFACTOR SPRINT - CLIENT VITALS
Generated: ${new Date(sprint.created_at).toLocaleString()}

Client Name: ${sprint.client_name}
Annual Revenue: ${sprint.annual_revenue || 'N/A'}
Burn Rate: ${sprint.burn_rate || 'N/A'}

Critical Error Hypothesis:
${sprint.hypothesis || 'N/A'}
    `.trim());

    // Add agent outputs
    if (sprint.agent_1_transcript) {
      zip.file('02-agent-1-transcript.txt', sprint.agent_1_transcript);
    }
    if (sprint.agent_1_output) {
      zip.file('03-agent-1-analysis.txt', sprint.agent_1_output);
    }
    if (sprint.agent_2_output) {
      zip.file('04-agent-2-competitor-intel.txt', sprint.agent_2_output);
    }
    if (sprint.agent_3_csv_content) {
      zip.file(`05-agent-3-data-${sprint.agent_3_csv_filename || 'data.csv'}`, sprint.agent_3_csv_content);
    }
    if (sprint.agent_3_output) {
      zip.file('06-agent-3-crm-forensics.txt', sprint.agent_3_output);
    }

    // Add growth thesis
    if (sprint.growth_thesis) {
      zip.file('07-growth-thesis.txt', sprint.growth_thesis);
    }

    // Add roadmap
    if (sprint.roadmap_items && Array.isArray(sprint.roadmap_items) && sprint.roadmap_items.length > 0) {
      const roadmapText = sprint.roadmap_items
        .map((item: string, i: number) => `${i + 1}. ${item}`)
        .join('\n');
      zip.file('08-remediation-roadmap.txt', roadmapText);
    }

    // Add full blueprint
    const blueprint = `
# REFACTOR SPRINT BLUEPRINT
**Client:** ${sprint.client_name}
**Generated:** ${new Date(sprint.created_at).toLocaleDateString()}

---

## GROWTH THESIS
${sprint.growth_thesis || '[No thesis generated]'}

---

## MUST FIX (Priority Order)
${sprint.roadmap_items && Array.isArray(sprint.roadmap_items) 
  ? sprint.roadmap_items.map((item: string, i: number) => `${i + 1}. ${item}`).join('\n') 
  : '[No items added]'}

---

## AGENT OUTPUTS

### The Listener (Kickoff Analysis)
${sprint.agent_1_output || '[No analysis run]'}

### The Spy (Market Intel)
${sprint.agent_2_output || '[No intel gathered]'}

### The Analyst (CRM Forensics)
${sprint.agent_3_output || '[No forensics run]'}
    `.trim();

    zip.file('00-BLUEPRINT.md', blueprint);

    // Add print-ready HTML (also include at end for easy access)
    zip.file('EXECUTIVE-BRIEF-PRINT.html', executiveBrief);

    // Generate ZIP as base64 and convert to Buffer
    const zipBase64 = await zip.generateAsync({ type: 'base64' });
    const zipBuffer = Buffer.from(zipBase64, 'base64');

    // Return as downloadable file
    return new Response(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${sprint.client_name.replace(/[^a-z0-9]/gi, '-')}-sprint.zip"`,
      },
    });
  } catch (error: any) {
    console.error('Download sprint error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to download sprint' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import JSZip from 'jszip';

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

    // Generate ZIP
    const zipBuffer = await zip.generateAsync({ type: 'uint8array' });

    // Return as downloadable file
    return new NextResponse(zipBuffer, {
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

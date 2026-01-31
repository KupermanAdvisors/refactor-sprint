import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const { sprintId } = await request.json();

    if (!sprintId) {
      return NextResponse.json(
        { error: 'Sprint ID is required' },
        { status: 400 }
      );
    }

    // Get full sprint data
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

    // Return all data needed to restore state
    return NextResponse.json({
      success: true,
      sprint: {
        id: sprint.id,
        clientName: sprint.client_name,
        sprintName: sprint.sprint_name,
        annualRevenue: sprint.annual_revenue,
        burnRate: sprint.burn_rate,
        hypothesis: sprint.hypothesis,
        agent1Transcript: sprint.agent_1_transcript,
        agent1Output: sprint.agent_1_output,
        agent2Competitors: sprint.agent_2_competitors || [],
        agent2Output: sprint.agent_2_output,
        agent3CsvFilename: sprint.agent_3_csv_filename,
        agent3CsvContent: sprint.agent_3_csv_content,
        agent3Output: sprint.agent_3_output,
        growthThesis: sprint.growth_thesis,
        roadmapItems: sprint.roadmap_items || [],
        uploadedFiles: sprint.uploaded_files || [],
      },
    });
  } catch (error: any) {
    console.error('Load sprint error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to load sprint' },
      { status: 500 }
    );
  }
}

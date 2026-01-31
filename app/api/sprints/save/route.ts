import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

// Helper to sanitize client name for slug
function sanitizeForSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric
    .trim();
}

// Helper to generate password
function generatePassword(clientName: string, date: Date): string {
  const sanitized = sanitizeForSlug(clientName);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${sanitized}${month}${day}${year}`;
}

// Helper to generate slug (includes sprint name for uniqueness)
function generateSlug(clientName: string, sprintName: string, date: Date): string {
  const sanitizedClient = sanitizeForSlug(clientName);
  const sanitizedSprint = sprintName ? sanitizeForSlug(sprintName) : 'sprint';
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${sanitizedClient}${sanitizedSprint}${month}${day}${year}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      clientName,
      sprintName,
      annualRevenue,
      burnRate,
      hypothesis,
      agent1Transcript,
      agent1Output,
      agent2Competitors,
      agent2Output,
      agent3CsvFilename,
      agent3CsvContent,
      agent3Output,
      growthThesis,
      roadmapItems,
      uploadedFiles,
    } = body;

    if (!clientName) {
      return NextResponse.json(
        { error: 'Client name is required' },
        { status: 400 }
      );
    }

    const now = new Date();
    const slug = generateSlug(clientName, sprintName || 'sprint', now);
    const password = generatePassword(clientName, now);

    // Check if sprint with this exact slug already exists (same client + sprint name + date)
    const { data: existing } = await supabaseAdmin
      .from('sprints')
      .select('id')
      .eq('presentation_slug', slug)
      .single();

    let result;

    if (existing) {
      // Update existing sprint
      const { data, error } = await supabaseAdmin
        .from('sprints')
        .update({
          updated_at: now.toISOString(),
          sprint_name: sprintName || 'Untitled Sprint',
          annual_revenue: annualRevenue,
          burn_rate: burnRate,
          hypothesis,
          agent_1_transcript: agent1Transcript,
          agent_1_output: agent1Output,
          agent_2_competitors: agent2Competitors,
          agent_2_output: agent2Output,
          agent_3_csv_filename: agent3CsvFilename,
          agent_3_csv_content: agent3CsvContent,
          agent_3_output: agent3Output,
          growth_thesis: growthThesis,
          roadmap_items: roadmapItems,
          uploaded_files: uploadedFiles,
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new sprint
      const { data, error } = await supabaseAdmin
        .from('sprints')
        .insert({
          client_name: clientName,
          sprint_name: sprintName || 'Untitled Sprint',
          annual_revenue: annualRevenue,
          burn_rate: burnRate,
          hypothesis,
          agent_1_transcript: agent1Transcript,
          agent_1_output: agent1Output,
          agent_2_competitors: agent2Competitors,
          agent_2_output: agent2Output,
          agent_3_csv_filename: agent3CsvFilename,
          agent_3_csv_content: agent3CsvContent,
          agent_3_output: agent3Output,
          growth_thesis: growthThesis,
          roadmap_items: roadmapItems,
          uploaded_files: uploadedFiles,
          presentation_slug: slug,
          presentation_password: password,
          status: 'completed',
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({
      success: true,
      sprint: result,
      presentationUrl: `/presentation/${slug}`,
      password,
    });
  } catch (error: any) {
    console.error('Save sprint error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save sprint' },
      { status: 500 }
    );
  }
}

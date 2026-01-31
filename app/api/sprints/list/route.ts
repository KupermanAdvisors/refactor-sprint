import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('sprints')
      .select('id, client_name, sprint_name, created_at, updated_at, status, presentation_slug')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      sprints: data || [],
    });
  } catch (error: any) {
    console.error('List sprints error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to list sprints' },
      { status: 500 }
    );
  }
}

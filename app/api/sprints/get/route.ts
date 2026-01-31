import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const { slug, password } = await request.json();

    if (!slug || !password) {
      return NextResponse.json(
        { error: 'Slug and password are required' },
        { status: 400 }
      );
    }

    // Get sprint by slug
    const { data: sprint, error } = await supabaseAdmin
      .from('sprints')
      .select('*')
      .eq('presentation_slug', slug)
      .single();

    if (error || !sprint) {
      return NextResponse.json(
        { error: 'Sprint not found' },
        { status: 404 }
      );
    }

    // Check if expired
    const now = new Date();
    const expiresAt = new Date(sprint.expires_at);
    if (now > expiresAt) {
      return NextResponse.json(
        { error: 'This presentation has expired (30-day limit)' },
        { status: 410 }
      );
    }

    // Verify password
    if (sprint.presentation_password !== password) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      );
    }

    // Return sprint data (password verified)
    return NextResponse.json({
      success: true,
      sprint,
    });
  } catch (error: any) {
    console.error('Get sprint error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get sprint' },
      { status: 500 }
    );
  }
}

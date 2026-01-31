import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    // Test database connection
    const { data, error } = await supabaseAdmin
      .from('sprints')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Supabase connection error:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: error.message,
          hint: 'Check that the sprints table exists and environment variables are correct'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful!',
      tableExists: true,
    });
  } catch (error: any) {
    console.error('Test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        hint: 'Check environment variables in Vercel'
      },
      { status: 500 }
    );
  }
}

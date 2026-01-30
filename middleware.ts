import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Check if the request is for kupermanadvisors.com (with or without www)
  if (hostname.includes('kupermanadvisors.com')) {
    const url = request.nextUrl.clone();
    
    // If already on /ka path, let it through
    if (url.pathname.startsWith('/ka')) {
      return NextResponse.next();
    }
    
    // If on root or any other path, rewrite to /ka
    if (url.pathname === '/') {
      url.pathname = '/ka';
      return NextResponse.rewrite(url);
    }
    
    // For other paths like /book or /contact, keep them as is
    // (they work the same on both domains)
    return NextResponse.next();
  }
  
  // For refactorsprint.com, let everything through normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

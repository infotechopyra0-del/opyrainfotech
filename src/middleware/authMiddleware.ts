import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this';

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  const pathname = request.nextUrl.pathname;

  // If trying to access /admin pages or admin API routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // If user hits /admin root, redirect based on auth
    if (pathname === '/admin') {
      if (token) {
        try {
          jwt.verify(token, JWT_SECRET);
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } catch (e) {
          return NextResponse.redirect(new URL('/admin/login', request.url));
        }
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Allow access to login page without token
    if (pathname === '/admin/login') {
      // If already logged in, redirect to dashboard
      if (token) {
        try {
          jwt.verify(token, JWT_SECRET);
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        } catch (error) {
          // Invalid token, allow access to login
          return NextResponse.next();
        }
      }
      return NextResponse.next();
    }

    // For all other admin routes, check token
    if (!token) {
      // If API route, return JSON unauthorized response
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // Invalid token, redirect to home
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('admin-token');
      return response;
    }
  }

  return NextResponse.next();
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Check if user has auth token
  const token = request.cookies.get('admin-token')?.value || ''
  
  // Define public and protected paths
  const isPublicPath = path === '/admin/login'
  const isAdminPath = path.startsWith('/admin')
  const isAdminApi = path.startsWith('/api/admin')
  
  // Redirect logic
  // Handle dashboard pages (browser navigations)
  if (isAdminPath && !isAdminApi) {
    // If trying to access /admin (root), redirect based on auth status
    if (path === '/admin') {
      if (token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      } else {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }

    // If trying to access login page but already logged in
    if (isPublicPath && token) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    // If trying to access protected routes without login
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Exclude auth endpoints from API protection so login/logout/verify can be called
  const isAuthApi = path === '/api/admin/login' || path === '/api/admin/logout' || path === '/api/admin/verify'

  // Handle admin API routes: return 401 JSON for unauthenticated requests
  if (isAdminApi && !isAuthApi) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    // allow through if token exists (further verification can be done inside API handlers)
  }
  
  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admin',
    '/api/admin/:path*',
  ]
}
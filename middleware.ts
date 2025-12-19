import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('admin-token')?.value
  if (path.startsWith('/api')) {
    const isAdminApi = path.startsWith('/api/admin')
    const isAuthApi =
      path === '/api/admin/login' ||
      path === '/api/admin/logout' ||
      path === '/api/admin/verify'

    if (isAdminApi && !isAuthApi && !token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.next()
  }

  const isAdminPath = path.startsWith('/admin')
  const isLoginPage = path === '/admin/login'

  if (path === '/admin') {
    return token
      ? NextResponse.redirect(new URL('/admin/dashboard', request.url))
      : NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Logged-in user visiting login page
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // Protected admin pages
  if (isAdminPath && !isLoginPage && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/:path*',
  ],
}

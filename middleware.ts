import { NextRequest } from 'next/server';
import { authMiddleware } from './src/middleware/authMiddleware';

export function middleware(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
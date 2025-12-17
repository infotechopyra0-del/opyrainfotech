import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yugsdhjbdbhjdzcbhjkzdhgukdzhgkdfbhjdbhjb';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    return NextResponse.json(
      { 
        authenticated: true,
        admin: {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role
        }
      },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}
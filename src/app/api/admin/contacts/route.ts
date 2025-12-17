import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this';

async function requireAuth(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token) {
    return false;
  }
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (e) {
    return false;
  }
}

export async function GET(request: NextRequest) {
  // protect admin GET
  if (!(await requireAuth(request))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error('Error fetching admin contacts:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch contacts', message: (error instanceof Error) ? error.message : 'Unknown' }, { status: 500 });
  }
}

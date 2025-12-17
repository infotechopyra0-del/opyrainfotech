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

export async function DELETE(request: NextRequest) {
  if (!(await requireAuth(request))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const url = new URL(request.url);
    const parts = url.pathname.split('/');
    const id = parts[parts.length - 1];

    const res = await Contact.findByIdAndDelete(id);
    if (!res) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete', message: (error instanceof Error) ? error.message : 'Unknown' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await requireAuth(request))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const url = new URL(request.url);
    const parts = url.pathname.split('/');
    const id = parts[parts.length - 1];

    const body = await request.json();
    const { status } = body;
    if (!status) {
      return NextResponse.json({ success: false, error: 'Missing status' }, { status: 400 });
    }

    const updated = await Contact.findByIdAndUpdate(id, { status }, { new: true }).lean();
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, contact: updated }, { status: 200 });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ success: false, error: 'Failed to update', message: (error instanceof Error) ? error.message : 'Unknown' }, { status: 500 });
  }
}

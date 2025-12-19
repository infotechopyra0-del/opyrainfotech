import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AdditionalService from '@/models/AdditionalService';

export async function GET() {
  try {
    await connectDB();
    const services = await AdditionalService.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    if (!body.title || !body.description || !body.image) {
      return NextResponse.json({ success: false, error: 'Missing required fields: title, description, image' }, { status: 400 });
    }

    const service = await AdditionalService.create(body);
    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create' }, { status: 500 });
  }
}
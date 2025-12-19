import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AdditionalService from '@/models/AdditionalService';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const id = (await params).id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid service ID' }, { status: 400 });
    }

    const service = await AdditionalService.findById(id).lean();
    if (!service) return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch service' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const id = (await params).id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid service ID' }, { status: 400 });
    }

    const body = await request.json();

    if (body.image && typeof body.image === 'string' && body.image.startsWith('data:')) {
      return NextResponse.json({ success: false, error: 'Please upload image to Cloudinary first. Base64 images are not allowed.' }, { status: 400 });
    }

    const service = await AdditionalService.findByIdAndUpdate(id, { ...body, updatedAt: new Date() }, { new: true, runValidators: true });
    if (!service) return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });

    return NextResponse.json({ success: true, service });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update service', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const id = (await params).id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid service ID' }, { status: 400 });
    }

    const service = await AdditionalService.findByIdAndDelete(id);
    if (!service) return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete service' }, { status: 500 });
  }
}

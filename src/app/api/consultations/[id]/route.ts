import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Consultation from '@/models/Consultation';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

// GET - Fetch single consultation by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid consultation ID' },
        { status: 400 }
      );
    }
    
    const consultation = await Consultation.findById(id);
    
    if (!consultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(consultation, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch consultation', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// PUT - Update consultation
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid consultation ID' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Update consultation
    const updatedConsultation = await Consultation.findByIdAndUpdate(
      id,
      {
        ...body,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedConsultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedConsultation, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to update consultation', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete consultation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid consultation ID' },
        { status: 400 }
      );
    }
    
    const deletedConsultation = await Consultation.findByIdAndDelete(id);
    
    if (!deletedConsultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Consultation deleted successfully', consultation: deletedConsultation },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to delete consultation', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
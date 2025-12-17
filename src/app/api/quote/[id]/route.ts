import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Quote from '@/models/Quote';
import mongoose from 'mongoose';

// GET - Fetch single quote by ID
export async function GET(request: NextRequest, context: any) {
  const { params } = context;
  const resolvedParams = await Promise.resolve(params || {});
  const id = resolvedParams?.id;
  try {
    await connectDB();
    if (!id || !mongoose.Types.ObjectId.isValid(String(id))) {
      return NextResponse.json({ error: 'Invalid quote ID' }, { status: 400 });
    }

    const quote = await Quote.findById(id);
    
    if (!quote) {
      return NextResponse.json(
        { error: 'Quote not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(quote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}

// PUT - Update quote
export async function PUT(request: NextRequest, context: any) {
  const { params } = context;
  const resolvedParams = await Promise.resolve(params || {});
  const id = resolvedParams?.id;
  try {
    await connectDB();
    if (!id || !mongoose.Types.ObjectId.isValid(String(id))) {
      return NextResponse.json({ error: 'Invalid quote ID' }, { status: 400 });
    }

    const body = await request.json();
    
    // Update lastContactedDate if status is being changed
    if (body.status) {
      body.lastContactedDate = new Date();
    }
    
    const quote = await Quote.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!quote) {
      return NextResponse.json(
        { error: 'Quote not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(quote);
  } catch (error: any) {
    console.error('Error updating quote:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update quote' },
      { status: 500 }
    );
  }
}

// DELETE - Delete quote
export async function DELETE(request: NextRequest, context: any) {
  const { params } = context;
  const resolvedParams = await Promise.resolve(params || {});
  const id = resolvedParams?.id;
  try {
    await connectDB();
    if (!id || !mongoose.Types.ObjectId.isValid(String(id))) {
      return NextResponse.json({ error: 'Invalid quote ID' }, { status: 400 });
    }

    const quote = await Quote.findByIdAndDelete(id);
    
    if (!quote) {
      return NextResponse.json(
        { error: 'Quote not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Quote deleted successfully',
      deletedQuote: quote 
    });
  } catch (error) {
    console.error('Error deleting quote:', error);
    return NextResponse.json(
      { error: 'Failed to delete quote' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Quote from '@/models/Quote';
import mongoose from 'mongoose';

// GET - Fetch single quote by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid quote ID' 
        }, 
        { status: 400 }
      );
    }

    const quote = await Quote.findById(id);
    if (!quote) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Quote not found' 
        }, 
        { status: 404 }
      );
    }

    return NextResponse.json(quote, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch quote' 
      }, 
      { status: 500 }
    );
  }
}

// PUT - Update quote
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid quote ID' 
        }, 
        { status: 400 }
      );
    }

    const body = await request.json();

    const quote = await Quote.findById(id);
    if (!quote) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Quote not found' 
        }, 
        { status: 404 }
      );
    }

    // Update allowed fields
    const allowedUpdates = [
      'status', 
      'priority', 
      'adminNotes', 
      'quotedAmount'
    ];

    allowedUpdates.forEach(field => {
      if (body[field] !== undefined) {
        quote[field] = body[field];
      }
    });

    await quote.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Quote updated successfully',
        quote
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update quote',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

// DELETE - Delete quote
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid quote ID' 
        }, 
        { status: 400 }
      );
    }

    const quote = await Quote.findById(id);
    if (!quote) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Quote not found' 
        }, 
        { status: 404 }
      );
    }

    await Quote.findByIdAndDelete(id);

    return NextResponse.json(
      { 
        success: true,
        message: 'Quote deleted successfully' 
      }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete quote' 
      }, 
      { status: 500 }
    );
  }
}

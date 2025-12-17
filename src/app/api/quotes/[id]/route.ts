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
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    return NextResponse.json(quote, { status: 200 });
  } catch (error) {
    console.error('Error fetching quote:', error);
    return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 });
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

    const quote = await Quote.findById(id);
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    // Update allowed fields
    const allowed = [
      'status', 'adminNotes', 'quotedAmount', 'quotedTimeline', 'quoteDetails', 'priority', 'followUpDate', 'lastContactedDate'
    ];
    for (const key of Object.keys(body)) {
      if (allowed.includes(key)) {
        // @ts-ignore
        quote[key] = body[key];
      }
    }

    await quote.save();

    return NextResponse.json({ success: true, message: 'Quote updated', quote }, { status: 200 });
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 });
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

    const quote = await Quote.findById(id);
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    await Quote.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Quote deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting quote:', error);
    return NextResponse.json({ error: 'Failed to delete quote' }, { status: 500 });
  }
}

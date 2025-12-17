import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Quote from '@/models/Quote';

// GET - Fetch all quotes
export async function GET() {
  try {
    await connectDB();
    const quotes = await Quote.find({}).sort({ createdAt: -1 });
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}

// POST - Create new quote
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Add IP address and user agent for tracking (optional)
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    const quoteData = {
      ...body,
      ipAddress,
      userAgent,
      status: body.status || 'pending',
      priority: body.priority || 'medium',
    };
    
    const quote = await Quote.create(quoteData);
    
    return NextResponse.json(quote, { status: 201 });
  } catch (error: any) {
    console.error('Error creating quote:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}
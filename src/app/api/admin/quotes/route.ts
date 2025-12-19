import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Quote, { IQuote} from '@/models/Quote';

// GET - Fetch all quotes
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');

    // Build query
    const query: any = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (priority && priority !== 'all') {
      query.priority = priority;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const quotes: IQuote[] = await Quote.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(quotes, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch quotes', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// POST - Create new quote
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { 
      name, email, phone, company, services, budget, 
      timeline, description, additional_info 
    } = body;

    // Validation
    if (!name || !email || !phone || !services || !budget || !timeline || !description) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields' 
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(services) || services.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'At least one service must be selected' 
        },
        { status: 400 }
      );
    }

    // Create new quote
    const quote: IQuote = await Quote.create({
      name,
      email,
      phone,
      company: company || '',
      services,
      budget,
      timeline,
      description,
      additional_info: additional_info || '',
      status: 'pending',
      priority: 'medium'
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Quote request submitted successfully',
        quote: {
          id: quote._id,
          name: quote.name,
          email: quote.email
        }
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create quote', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

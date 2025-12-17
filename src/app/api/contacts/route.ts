import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact, { IContact } from '@/models/Contact';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields',
          message: 'Please fill in all required fields'
        },
        { status: 400 }
      );
    }
    const contact: IContact = await Contact.create({
      name,
      email,
      phone,
      company: company || '',
      message,
      status: 'pending'
    });
    return NextResponse.json(
      { 
        success: true,
        message: 'Contact created successfully', 
        contact: {
          id: contact._id,
          name: contact.name,
          email: contact.email
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { 
        success: false,  // ← Add this
        error: 'Failed to create contact', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// Keep GET method as is
export async function GET(request: NextRequest) {
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
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts: IContact[] = await Contact.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(contacts, { status: 200 });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch contacts', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
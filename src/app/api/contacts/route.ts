import { NextRequest, NextResponse } from 'next/server';
import  connectDB  from '@/lib/mongodb';
import Contact from '@/models/Contact';

export const dynamic = 'force-dynamic';

// GET - Fetch all contacts
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(contacts, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch contacts', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// POST - Create new contact
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, message' },
        { status: 400 }
      );
    }
    
    // Create new contact
    const contact = await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company || '',
      message: body.message,
      status: body.status || 'pending',
    });
    
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to create contact', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
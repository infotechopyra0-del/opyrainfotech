import { NextRequest, NextResponse } from 'next/server';
import connectDB  from '@/lib/mongodb';
import Contact from '@/models/Contact';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid contact ID' },
        { status: 400 }
      );
    }
    
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch contact', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid contact ID' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
  
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      {
        status: body.status,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedContact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedContact, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to update contact', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid contact ID' },
        { status: 400 }
      );
    }
    
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Contact deleted successfully', contact: deletedContact },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to delete contact', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
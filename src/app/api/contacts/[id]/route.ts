import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact, { IContact } from '@/models/Contact';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET - Fetch single contact
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const contact: IContact | null = await Contact.findById(params.id);

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(contact, { status: 200 });

  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch contact', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// PUT - Update contact
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const body = await request.json();

    const contact: IContact | null = await Contact.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Contact updated successfully', contact },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update contact', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete contact
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const contact: IContact | null = await Contact.findByIdAndDelete(params.id);

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Contact deleted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete contact', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
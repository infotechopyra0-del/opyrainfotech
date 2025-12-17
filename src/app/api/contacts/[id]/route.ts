import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact, { IContact } from '@/models/Contact';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET - Fetch single contact
export async function GET(request: NextRequest, context: any) {
  const { params } = context;
  const resolvedParams = await Promise.resolve(params || {});
  const id = resolvedParams?.id;
  try {
    await connectDB();

    if (!id) {
      return NextResponse.json({ error: 'Missing contact id' }, { status: 400 });
    }

    const contact: IContact | null = await Contact.findById(String(id));

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json(contact, { status: 200 });

  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json({ error: 'Failed to fetch contact', message: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

// PUT - Update contact
export async function PUT(request: NextRequest, context: any) {
  const { params } = context;
  const resolvedParams = await Promise.resolve(params || {});
  const id = resolvedParams?.id;
  try {
    await connectDB();

    if (!id) {
      return NextResponse.json({ error: 'Missing contact id' }, { status: 400 });
    }

    const body = await request.json();

    const contact: IContact | null = await Contact.findByIdAndUpdate(String(id), { $set: body }, { new: true, runValidators: true });

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Contact updated successfully', contact }, { status: 200 });

  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: 'Failed to update contact', message: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

// DELETE - Delete contact
export async function DELETE(request: NextRequest, context: any) {
  const { params } = context;
  const resolvedParams = await Promise.resolve(params || {});
  const id = resolvedParams?.id;
  try {
    await connectDB();

    if (!id) {
      return NextResponse.json({ error: 'Missing contact id' }, { status: 400 });
    }

    const contact: IContact | null = await Contact.findByIdAndDelete(String(id));

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Contact deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ error: 'Failed to delete contact', message: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
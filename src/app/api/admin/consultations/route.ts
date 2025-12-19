import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Consultation from '@/models/Consultation';

export const dynamic = 'force-dynamic';

// GET - Fetch all consultations
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const consultations = await Consultation.find({})
      .sort({ createdAt: -1 })
      .lean();  
    return NextResponse.json(consultations, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch consultations', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();    
  
    if (!body.name || !body.email || !body.phone || !body.preferredDate || !body.preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const consultation = await Consultation.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company || '',
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      projectType: body.projectType,
      message: body.message,
      status: body.status || 'pending',
      priority: body.priority || 'medium',
      adminNotes: body.adminNotes || '',
      scheduledDate: body.scheduledDate || null,
      meetingLink: body.meetingLink || '',
    });    
    return NextResponse.json(consultation, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to create consultation', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
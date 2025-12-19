import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import Service from '@/models/Service';
import SoftwareService from '@/models/SoftwareService';
import AdditionalService from '@/models/AdditionalService';
import Quote from '@/models/Quote';
import Contact from '@/models/Contact';
import Consultation from '@/models/Consultation';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const [
      totalProjects,
      totalServices,
      totalSoftwareServices,
      totalAdditionalServices,
      totalQuotes,
      totalContacts,
      totalConsultations,
    ] = await Promise.all([
      Project.countDocuments().catch(() => 0),
      Service.countDocuments().catch(() => 0),
      SoftwareService.countDocuments().catch(() => 0),
      AdditionalService.countDocuments().catch(() => 0),
      Quote.countDocuments().catch(() => 0),
      Contact.countDocuments().catch(() => 0),
      Consultation.countDocuments().catch(() => 0),
    ]);

    const stats = {
      totalProjects,
      totalServices,
      totalSoftwareServices,
      totalAdditionalServices,
      totalQuotes,
      totalContacts,
      totalConsultations,
    };

    return NextResponse.json(stats, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to fetch dashboard stats',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
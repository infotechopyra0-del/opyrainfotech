import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import Service from '@/models/Service';
import SoftwareService from '@/models/SoftwareService';
import AdditionalService from '@/models/AdditionalService';
import Quote from '@/models/Quote';
import Contact from '@/models/Contact';
import Consultation from '@/models/Consultation';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const [totalProjects, totalServices, totalSoftwareServices, totalAdditionalServices, totalQuotes, totalContacts, totalConsultations] = await Promise.all([
      Project.countDocuments(),
      Service.countDocuments(),
      SoftwareService.countDocuments(),
      AdditionalService.countDocuments(),
      Quote.countDocuments(),
      Contact.countDocuments(),
      Consultation.countDocuments(),
    ]);

    return NextResponse.json({
      totalProjects,
      totalServices,
      totalSoftwareServices,
      totalAdditionalServices,
      totalQuotes,
      totalContacts,
      totalConsultations,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch dashboard stats', details: error instanceof Error ? error.message : 'Unknown' }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import SoftwareService from "@/models/SoftwareService";
import connectDB from '@/lib/mongodb';

export async function GET() {
    await connectDB();
  try {
    const softwareServices = await SoftwareService.find({
      isActive: true,
    }).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: softwareServices,
    });
  } catch (error) {
    console.error("Error fetching software services:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch software services",
      },
      { status: 500 }
    );
  }
}
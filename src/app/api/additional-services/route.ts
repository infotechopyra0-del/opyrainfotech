import { NextResponse } from "next/server";
import AdditionalService from "@/models/AdditionalService";
import connectDB from '@/lib/mongodb';

export async function GET() {
    await connectDB();
  try {
    const additionalServices = await AdditionalService.find({
      isActive: true,
    }).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: additionalServices,
    });
  } catch (error) {
    console.error("Error fetching additional services:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch additional services",
      },
      { status: 500 }
    );
  }
}
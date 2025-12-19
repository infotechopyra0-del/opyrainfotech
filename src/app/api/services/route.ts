import { NextResponse } from "next/server";
import Service from "@/models/Service";
import connectDB from '@/lib/mongodb';

export async function GET() {
    await connectDB();
  try {
    const services = await Service.find({
      isActive: true,
    }).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}
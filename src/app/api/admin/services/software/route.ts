import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SoftwareService from "@/models/SoftwareService";

export async function GET() {
  try {
    await connectDB();
    const services = await SoftwareService.find({}).sort({
      order: 1,
      createdAt: -1,
    });
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.image ||
      !body.points?.length
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const service = await SoftwareService.create({
      title: body.title,
      description: body.description,
      image: body.image,
      points: body.points,
      order: body.order ?? 0,
    });

    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create" },
      { status: 500 }
    );
  }
}

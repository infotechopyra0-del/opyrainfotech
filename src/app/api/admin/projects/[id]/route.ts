import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to delete image from Cloudinary
const deleteCloudinaryImage = async (public_id?: string) => {
  if (!public_id) return;
  try {
    await cloudinary.v2.uploader.destroy(public_id);
  } catch (err) {
  }
};

// GET - Fetch single project by ID
export async function GET(request: NextRequest, context: any) {
  const { params } = context;
  const resolvedParams = await Promise.resolve(params || {});
  const id = resolvedParams?.id;
  try {
    await connectDB();

    if (!id || !mongoose.Types.ObjectId.isValid(String(id))) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

// PUT - Update project
export async function PUT(request: NextRequest, context: any) {
  const { params } = context;
  const resolvedParams = await Promise.resolve(params || {});
  const id = resolvedParams?.id;
  try {
    await connectDB();
    if (!id || !mongoose.Types.ObjectId.isValid(String(id))) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'category', 'description', 'technologies', 'features', 'image'];
    for (const field of requiredFields) {
      if (!body[field] || (Array.isArray(body[field]) && body[field].length === 0)) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // If image is replaced, delete old image from Cloudinary
    if (body.image?.public_id && body.image.public_id !== project.image.public_id) {
      await deleteCloudinaryImage(project.image.public_id);
    }

    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title: body.title,
        category: body.category,
        description: body.description,
        image: body.image,
        technologies: body.technologies,
        features: body.features,
        status: body.status,
        featured: body.featured,
        order: body.order,
        completionDate: body.completionDate,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, message: 'Project updated successfully', project: updatedProject }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest, context: any) {
  const { params } = context;
  const resolvedParams = await Promise.resolve(params || {});
  const id = resolvedParams?.id;
  try {
    await connectDB();
    if (!id || !mongoose.Types.ObjectId.isValid(String(id))) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Delete image from Cloudinary
    await deleteCloudinaryImage(project.image.public_id);

    // Delete project from DB
    await Project.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

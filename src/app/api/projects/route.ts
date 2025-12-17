import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

// GET - Fetch all projects
export async function GET() {
  try {
    await connectDB();
    
    const projects = await Project.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();
    
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch projects' 
      },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.category || !body.description) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields: title, category, description' 
        },
        { status: 400 }
      );
    }
    
    if (!body.technologies || body.technologies.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'At least one technology is required' 
        },
        { status: 400 }
      );
    }
    
    if (!body.features || body.features.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'At least one feature is required' 
        },
        { status: 400 }
      );
    }

    // Validate and format image
    let imageData;
    if (typeof body.image === 'string') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Please upload image to Cloudinary first' 
        },
        { status: 400 }
      );
    } else if (body.image && typeof body.image === 'object') {
      if (!body.image.url || !body.image.public_id) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Image must have both url and public_id from Cloudinary' 
          },
          { status: 400 }
        );
      }
      imageData = {
        url: body.image.url,
        public_id: body.image.public_id
      };
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: 'Image is required' 
        },
        { status: 400 }
      );
    }
    
    // Create new project
    const project = await Project.create({
      title: body.title,
      category: body.category,
      description: body.description,
      image: imageData,
      technologies: body.technologies,
      features: body.features,
      status: body.status || 'completed',
      featured: body.featured || false,
      order: body.order || 0,
      completionDate: body.completionDate || new Date().toISOString(),
    });
    
    return NextResponse.json(
      {
        success: true,
        message: 'Project created successfully',
        project
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create project',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
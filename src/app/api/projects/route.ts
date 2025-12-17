import { NextRequest, NextResponse } from 'next/server';
import  connectDB  from '@/lib/mongodb';
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
      { error: 'Failed to fetch projects' },
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
        { error: 'Missing required fields: title, category, description' },
        { status: 400 }
      );
    }
    
    if (!body.technologies || body.technologies.length === 0) {
      return NextResponse.json(
        { error: 'At least one technology is required' },
        { status: 400 }
      );
    }
    
    if (!body.features || body.features.length === 0) {
      return NextResponse.json(
        { error: 'At least one feature is required' },
        { status: 400 }
      );
    }
    
    // Create new project
    const project = await Project.create({
      title: body.title,
      category: body.category,
      description: body.description,
      image: body.image,
      technologies: body.technologies,
      features: body.features,
      clientName: body.clientName || '',
      projectUrl: body.projectUrl || '',
      status: body.status || 'completed',
      featured: body.featured || false,
      order: body.order || 0,
      completionDate: body.completionDate || new Date().toISOString(),
    });
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

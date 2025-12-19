import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export const dynamic = 'force-dynamic';

// Helper function to sanitize large base64 images
function sanitizeImage(imageStr: string): string | null {
  if (!imageStr || typeof imageStr !== 'string') return null;
  
  // If it's a data URI and too large (>100KB base64 ~ 75KB actual)
  if (imageStr.startsWith('data:') && imageStr.length > 100000) {
    return null;
  }
  
  return imageStr;
}

export async function GET() {
  try {
    await connectDB();
    
    // Use lean() for better performance and less memory
    const services = await Service.find({})
      .sort({ order: 1, createdAt: -1 })
      .select('-__v') // Exclude version key
      .lean()
      .exec();

    // Sanitize images to prevent memory issues
    const sanitized = services.map((s: any) => {
      const sanitizedImage = sanitizeImage(s.image);
      
      if (sanitizedImage === null && s.image) {
        return {
          ...s,
          image: '', // Return empty instead of null
          _imageWarning: 'Image too large - please re-upload to Cloudinary'
        };
      }
      
      return { ...s, image: sanitizedImage || '' };
    });

    return NextResponse.json(sanitized, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch services',
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
    // Validate required fields
    if (!body.title || !body.description || !body.image) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, description, image' }, 
        { status: 400 }
      );
    }

    if (!body.features || !Array.isArray(body.features) || body.features.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one feature is required' }, 
        { status: 400 }
      );
    }

    // Check if image is a data URI (should be Cloudinary URL)
    if (body.image.startsWith('data:')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please upload image to Cloudinary first. Base64 images are not allowed due to size constraints.' 
        }, 
        { status: 400 }
      );
    }

    const service = await Service.create(body);
    
    return NextResponse.json(
      { success: true, service }, 
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create service',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
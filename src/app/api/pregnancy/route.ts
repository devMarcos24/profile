import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyJWT } from '@/lib/jwt';

interface User {
  id: string;
  email: string;
}

interface ValidationResult {
  user?: User;
  error?: string;
  status?: number;
}

const prisma = new PrismaClient();

// Helper function to validate JWT from Authorization header
async function validateJWT(request: NextRequest): Promise<ValidationResult> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'No token provided', status: 401 };
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return { error: 'No token provided', status: 401 };
  }

  const { payload, error } = await verifyJWT(token);

  if (error || !payload) {
    return { error: error || 'Invalid token', status: 401 };
  }

  if (!payload.id || !payload.email) {
    return { error: 'Invalid token payload', status: 401 };
  }

  return {
    user: {
      id: payload.id,
      email: payload.email
    }
  };
}

// GET /api/pregnancy - Get user's pregnancy info
export async function GET(request: NextRequest) {
  try {
    const result = await validateJWT(request);

    if (result.error || !result.user) {
      return NextResponse.json(
        { error: result.error || 'Unauthorized' },
        { status: result.status || 401 }
      );
    }

    const pregnancyInfo = await prisma.pregnancyInfo.findFirst({
      where: { userId: result.user.id },
    });

    return NextResponse.json(pregnancyInfo || {})
  } catch (error) {
    console.error('Error fetching pregnancy info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pregnancy information' },
      { status: 500 }
    );
  }
}

// POST /api/pregnancy - Create or update pregnancy info
export async function POST(request: NextRequest) {
  try {
    const result = await validateJWT(request);
    if (result.error || !result.user) {
      return NextResponse.json(
        { error: result.error || 'Unauthorized' },
        { status: result.status || 401 }
      );
    }

    const { startDate } = await request.json();

    if (!startDate) {
      return NextResponse.json(
        { error: 'Start date is required' },
        { status: 400 }
      );
    }

    // Create or update pregnancy info
    const pregnancy = await prisma.pregnancyInfo.upsert({
      where: { userId: result.user.id },
      update: {
        startDate: new Date(startDate),
      },
      create: {
        userId: result.user.id,
        startDate: new Date(startDate),
      },
    });

    return NextResponse.json(pregnancy, { status: 201 });
  } catch (error) {
    console.error('Error saving pregnancy info:', error);
    return NextResponse.json(
      { error: 'Failed to save pregnancy information' },
      { status: 500 }
    )
  }
}

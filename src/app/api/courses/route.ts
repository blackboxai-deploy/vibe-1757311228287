import { NextRequest, NextResponse } from 'next/server';

// Mock course data
const mockCourses = [
  {
    id: '1',
    title: 'Complete JEE Main & Advanced Physics',
    description: 'Master Physics concepts for JEE with comprehensive video lectures and practice problems.',
    thumbnail: 'https://placehold.co/400x300?text=JEE+Physics+Course+API+Response',
    instructor: 'Dr. Rajesh Kumar',
    price: 4999,
    originalPrice: 7999,
    duration: '120 hours',
    lessons: 150,
    category: 'JEE',
    level: 'intermediate',
    rating: 4.8,
    reviews: 1250,
    tags: ['Physics', 'JEE Main', 'JEE Advanced'],
    features: ['HD Video Lectures', 'PDF Notes', 'Practice Tests', 'Doubt Support'],
    isPurchased: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'NEET Biology Complete Course',
    description: 'Comprehensive Biology preparation for NEET with animated lectures and practice questions.',
    thumbnail: 'https://placehold.co/400x300?text=NEET+Biology+Course+API+Response',
    instructor: 'Dr. Priya Sharma',
    price: 3999,
    originalPrice: 5999,
    duration: '95 hours',
    lessons: 120,
    category: 'NEET',
    level: 'beginner',
    rating: 4.7,
    reviews: 980,
    tags: ['Biology', 'NEET', 'Botany', 'Zoology'],
    features: ['Animated Videos', 'Practice MCQs', 'Previous Year Questions'],
    isPurchased: false,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '3',
    title: 'UPSC History Foundation',
    description: 'Complete Indian History for UPSC Prelims and Mains with expert analysis.',
    thumbnail: 'https://placehold.co/400x300?text=UPSC+History+Foundation+API+Response',
    instructor: 'Prof. Anand Singh',
    price: 2999,
    originalPrice: 4499,
    duration: '80 hours',
    lessons: 100,
    category: 'UPSC',
    level: 'intermediate',
    rating: 4.9,
    reviews: 1500,
    tags: ['History', 'UPSC', 'Ancient India', 'Medieval India'],
    features: ['Expert Analysis', 'Current Affairs Links', 'Answer Writing'],
    isPurchased: false,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z'
  }
];

// GET /api/courses - Fetch all courses with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredCourses = [...mockCourses];

    // Filter by category
    if (category && category !== 'All') {
      filteredCourses = filteredCourses.filter(course => 
        course.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedCourses,
      pagination: {
        page,
        limit,
        total: filteredCourses.length,
        totalPages: Math.ceil(filteredCourses.length / limit),
        hasNext: endIndex < filteredCourses.length,
        hasPrev: page > 1
      },
      filters: {
        category,
        search,
        appliedFilters: {
          category: category || null,
          search: search || null
        }
      }
    });

  } catch (error) {
    console.error('Courses API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch courses',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST /api/courses - Create a new course (Admin only)
export async function POST(request: NextRequest) {
  try {
    const courseData = await request.json();

    // Basic validation
    const requiredFields = ['title', 'instructor', 'price', 'category'];
    const missingFields = requiredFields.filter(field => !courseData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Create new course
    const newCourse = {
      id: `course_${Date.now()}`,
      ...courseData,
      rating: 0,
      reviews: 0,
      isPurchased: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In real implementation:
    // 1. Validate admin permissions
    // 2. Sanitize and validate all input data
    // 3. Save to database
    // 4. Process any uploaded files (videos, thumbnails)
    // 5. Send notifications to users about new course

    console.log('New course created:', newCourse);
    mockCourses.push(newCourse);

    return NextResponse.json({
      success: true,
      course: newCourse,
      message: 'Course created successfully'
    });

  } catch (error) {
    console.error('Course creation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create course',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
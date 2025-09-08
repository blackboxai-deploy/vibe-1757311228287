import { NextRequest, NextResponse } from 'next/server';

// Mock individual course data with detailed information
const getCourseById = (id: string) => {
  const courses = {
    '1': {
      id: '1',
      title: 'Complete JEE Main & Advanced Physics',
      description: 'Master Physics concepts for JEE with comprehensive video lectures and practice problems. This course covers all important topics including Mechanics, Thermodynamics, Waves, Optics, and Modern Physics with detailed problem-solving sessions.',
      thumbnail: 'https://placehold.co/800x450?text=JEE+Physics+Course+Detailed+View',
      instructor: 'Dr. Rajesh Kumar',
      instructorBio: 'IIT Delhi graduate with 15+ years of teaching experience. Expert in JEE Physics preparation.',
      instructorImage: 'https://placehold.co/150x150?text=Dr+Rajesh+Kumar+Profile',
      price: 4999,
      originalPrice: 7999,
      duration: '120 hours',
      lessons: 150,
      category: 'JEE',
      level: 'intermediate',
      rating: 4.8,
      reviews: 1250,
      tags: ['Physics', 'JEE Main', 'JEE Advanced', 'Mechanics', 'Thermodynamics'],
      features: [
        '150+ HD Video Lectures',
        'Downloadable Content',
        'PDF Study Notes',
        'Practice Problems',
        'Doubt Support',
        '2 Year Access',
        'Mobile App Access',
        'Certificate of Completion'
      ],
      syllabus: [
        {
          module: 'Mechanics',
          topics: ['Kinematics', 'Laws of Motion', 'Work Energy Power', 'Rotational Motion'],
          duration: '35 hours',
          videos: 40
        },
        {
          module: 'Thermodynamics',
          topics: ['Heat and Temperature', 'Laws of Thermodynamics', 'Kinetic Theory'],
          duration: '25 hours',
          videos: 30
        },
        {
          module: 'Waves and Optics',
          topics: ['Simple Harmonic Motion', 'Wave Motion', 'Geometrical Optics'],
          duration: '30 hours',
          videos: 35
        },
        {
          module: 'Modern Physics',
          topics: ['Photoelectric Effect', 'Bohr Model', 'Nuclear Physics'],
          duration: '30 hours',
          videos: 45
        }
      ],
      prerequisites: [
        'Basic understanding of Mathematics',
        'Class 11 and 12 Physics concepts',
        'Problem-solving aptitude'
      ],
      targetAudience: [
        'JEE Main aspirants',
        'JEE Advanced aspirants',
        'Class 11 and 12 students',
        'Physics enthusiasts'
      ],
      learningOutcomes: [
        'Master all JEE Physics topics',
        'Develop problem-solving skills',
        'Understand concepts from basics',
        'Score high in JEE Physics section'
      ],
      isPurchased: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    '2': {
      id: '2',
      title: 'NEET Biology Complete Course',
      description: 'Comprehensive Biology preparation for NEET with animated lectures and practice questions.',
      thumbnail: 'https://placehold.co/800x450?text=NEET+Biology+Complete+Course+Detailed',
      instructor: 'Dr. Priya Sharma',
      instructorBio: 'AIIMS graduate with expertise in NEET Biology preparation.',
      instructorImage: 'https://placehold.co/150x150?text=Dr+Priya+Sharma+Profile',
      price: 3999,
      originalPrice: 5999,
      duration: '95 hours',
      lessons: 120,
      category: 'NEET',
      level: 'beginner',
      rating: 4.7,
      reviews: 980,
      tags: ['Biology', 'NEET', 'Botany', 'Zoology', 'Human Physiology'],
      features: [
        'Animated Video Lectures',
        'Practice MCQs',
        'Previous Year Questions',
        '24/7 Doubt Support',
        'Digital Notes',
        'Mobile Access'
      ],
      syllabus: [
        {
          module: 'Cell Biology',
          topics: ['Cell Structure', 'Cell Division', 'Biomolecules'],
          duration: '20 hours',
          videos: 25
        },
        {
          module: 'Plant Physiology',
          topics: ['Photosynthesis', 'Respiration', 'Transport'],
          duration: '25 hours',
          videos: 30
        },
        {
          module: 'Human Physiology',
          topics: ['Digestive System', 'Circulatory System', 'Nervous System'],
          duration: '35 hours',
          videos: 40
        },
        {
          module: 'Genetics and Evolution',
          topics: ['Heredity', 'Evolution', 'Molecular Genetics'],
          duration: '15 hours',
          videos: 25
        }
      ],
      prerequisites: [
        'Class 11 and 12 Biology',
        'Basic chemistry concepts'
      ],
      targetAudience: [
        'NEET aspirants',
        'Medical entrance exam students',
        'Class 11 and 12 students'
      ],
      learningOutcomes: [
        'Complete NEET Biology syllabus',
        'Strong conceptual foundation',
        'Problem-solving techniques',
        'High NEET scores'
      ],
      isPurchased: false,
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-20T00:00:00Z'
    }
  };

  return courses[id as keyof typeof courses] || null;
};

// GET /api/courses/[id] - Fetch individual course details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = params.id;
    const course = getCourseById(courseId);

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    // In a real implementation:
    // 1. Fetch course from database
    // 2. Check user permissions/access
    // 3. Include user-specific data (progress, purchase status)
    // 4. Log course view analytics

    return NextResponse.json({
      success: true,
      course: course,
      message: 'Course details fetched successfully'
    });

  } catch (error) {
    console.error('Course fetch error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch course details',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT /api/courses/[id] - Update course (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = params.id;
    const updateData = await request.json();
    
    const existingCourse = getCourseById(courseId);
    if (!existingCourse) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    // In a real implementation:
    // 1. Validate admin permissions
    // 2. Sanitize and validate update data
    // 3. Update database
    // 4. Handle file uploads if any
    // 5. Send notifications about course updates

    const updatedCourse = {
      ...existingCourse,
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    console.log('Course updated:', updatedCourse);

    return NextResponse.json({
      success: true,
      course: updatedCourse,
      message: 'Course updated successfully'
    });

  } catch (error) {
    console.error('Course update error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update course',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/[id] - Delete course (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = params.id;
    
    const existingCourse = getCourseById(courseId);
    if (!existingCourse) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    // In a real implementation:
    // 1. Validate admin permissions
    // 2. Check if course has active students
    // 3. Handle refunds if necessary
    // 4. Delete from database
    // 5. Clean up associated files
    // 6. Send notifications

    console.log('Course deleted:', courseId);

    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully'
    });

  } catch (error) {
    console.error('Course deletion error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete course',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
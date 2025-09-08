'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'JEE', 'NEET', 'UPSC', 'SSC', 'Banking'];
  
  const mockCourses = [
    {
      id: 1,
      title: 'Complete JEE Main & Advanced Physics',
      instructor: 'Dr. Rajesh Kumar',
      price: 4999,
      originalPrice: 7999,
      rating: 4.8,
      students: 1250,
      duration: '120 hours',
      thumbnail: 'https://placehold.co/400x300?text=JEE+Physics+Course',
      category: 'JEE',
      isPurchased: true
    },
    {
      id: 2,
      title: 'NEET Biology Complete Course',
      instructor: 'Dr. Priya Sharma',
      price: 3999,
      originalPrice: 5999,
      rating: 4.7,
      students: 980,
      duration: '95 hours',
      thumbnail: 'https://placehold.co/400x300?text=NEET+Biology+Course',
      category: 'NEET',
      isPurchased: false
    },
    {
      id: 3,
      title: 'UPSC History Foundation',
      instructor: 'Prof. Anand Singh',
      price: 2999,
      originalPrice: 4499,
      rating: 4.9,
      students: 1500,
      duration: '80 hours',
      thumbnail: 'https://placehold.co/400x300?text=UPSC+History+Course',
      category: 'UPSC',
      isPurchased: false
    }
  ];

  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">← Back</Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Video Courses</h1>
          </div>
          <Badge variant="secondary">{filteredCourses.length} courses</Badge>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </header>

      {/* Courses Grid */}
      <main className="p-4">
        {filteredCourses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-gray-100">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-black bg-opacity-75 text-white">
                    {course.duration}
                  </Badge>
                  {course.isPurchased && (
                    <Badge className="absolute top-2 left-2 bg-green-500">
                      Purchased
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                    
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600">By {course.instructor}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        ⭐ {course.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        👥 {course.students.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          ₹{course.price.toLocaleString()}
                        </span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ₹{course.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      
                      {course.isPurchased ? (
                        <Button size="sm">Continue Learning</Button>
                      ) : (
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">View</Button>
                          <Button size="sm">Buy Now</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          <Link href="/" className="flex flex-col items-center py-2 px-1">
            <span className="text-xl">🏠</span>
            <span className="text-xs font-medium text-gray-600">Home</span>
          </Link>
          <Link href="/books" className="flex flex-col items-center py-2 px-1">
            <span className="text-xl">📚</span>
            <span className="text-xs font-medium text-gray-600">Books</span>
          </Link>
          <Link href="/downloaded" className="flex flex-col items-center py-2 px-1">
            <span className="text-xl">📥</span>
            <span className="text-xs font-medium text-gray-600">Downloaded</span>
          </Link>
          <Link href="/purchases" className="flex flex-col items-center py-2 px-1">
            <span className="text-xl">🛒</span>
            <span className="text-xs font-medium text-gray-600">Purchases</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
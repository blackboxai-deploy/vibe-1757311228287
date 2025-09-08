'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const courseCategories = [
    { id: 'JEE', name: 'JEE', icon: '🔬', color: 'bg-blue-500', courses: 45 },
    { id: 'NEET', name: 'NEET', icon: '🩺', color: 'bg-green-500', courses: 32 },
    { id: 'UPSC', name: 'UPSC', icon: '🏛️', color: 'bg-purple-500', courses: 28 },
    { id: 'SSC', name: 'SSC', icon: '📊', color: 'bg-orange-500', courses: 15 },
    { id: 'Banking', name: 'Banking', icon: '🏦', color: 'bg-indigo-500', courses: 12 },
    { id: 'Railways', name: 'Railways', icon: '🚄', color: 'bg-red-500', courses: 8 }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Studypur Classes</h1>
          <div className="flex gap-2">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              👤 Login
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Hero Banner */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome to Studypur Classes</h2>
            <p className="mb-4">Complete educational platform for competitive exam preparation</p>
            <div className="flex gap-2">
              <Link href="/videos">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Browse Courses
                </Button>
              </Link>
              <Link href="/live">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Join Live Classes
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Course Categories */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {courseCategories.map((category) => (
              <Link key={category.id} href={`/videos?category=${category.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${category.color}`}>
                      <span className="text-2xl text-white">{category.icon}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {category.courses} courses
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/videos">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">📺</div>
                  <h3 className="font-semibold text-gray-900">Video Courses</h3>
                  <p className="text-sm text-gray-600">Learn from experts</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/books">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">📚</div>
                  <h3 className="font-semibold text-gray-900">Books</h3>
                  <p className="text-sm text-gray-600">Digital & Physical</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/test-series">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <h3 className="font-semibold text-gray-900">Test Series</h3>
                  <p className="text-sm text-gray-600">Practice & Excel</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/live">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">🔴</div>
                  <h3 className="font-semibold text-gray-900">Live Classes</h3>
                  <p className="text-sm text-gray-600">Interactive Learning</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Why Choose Studypur Classes?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm opacity-90">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-90">Video Lectures</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm opacity-90">Expert Faculty</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm opacity-90">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bottom Navigation Placeholder */}
        <div className="text-center text-gray-500 text-sm mt-12">
          📱 Download our mobile app for better experience
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          <Link href="/" className="flex flex-col items-center py-2 px-1">
            <span className="text-xl">🏠</span>
            <span className="text-xs font-medium text-blue-600">Home</span>
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
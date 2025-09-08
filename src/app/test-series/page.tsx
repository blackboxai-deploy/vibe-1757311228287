'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function TestSeriesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const mockTestSeries = [
    {
      id: 1,
      title: 'JEE Main Mock Test Series',
      description: 'Complete mock test series for JEE Main with detailed analysis',
      thumbnail: 'https://placehold.co/400x300?text=JEE+Mock+Tests',
      icon: '📝',
      subject: 'Physics, Chemistry, Mathematics',
      totalTests: 25,
      totalQuestions: 1875,
      duration: '3 hours per test',
      price: 1999,
      isPurchased: true,
      category: 'JEE'
    },
    {
      id: 2,
      title: 'NEET Practice Test Series',
      description: 'Comprehensive test series for NEET preparation',
      thumbnail: 'https://placehold.co/400x300?text=NEET+Practice+Tests',
      icon: '🩺',
      subject: 'Physics, Chemistry, Biology',
      totalTests: 30,
      totalQuestions: 2700,
      duration: '3 hours per test',
      price: 1599,
      isPurchased: false,
      category: 'NEET'
    },
    {
      id: 3,
      title: 'UPSC Prelims Test Series',
      description: 'Comprehensive test series for UPSC Civil Services Preliminary examination',
      thumbnail: 'https://placehold.co/400x300?text=UPSC+Prelims+Tests',
      icon: '🏛️',
      subject: 'General Studies Paper I & II',
      totalTests: 20,
      totalQuestions: 2000,
      duration: '2 hours per paper',
      price: 2499,
      isPurchased: false,
      category: 'UPSC'
    }
  ];

  const filteredTests = mockTestSeries.filter(test =>
    test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">← Back</Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Test Series</h1>
          </div>
          <Badge variant="secondary">{filteredTests.length} test series</Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <Input
            placeholder="Search test series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </header>

      {/* Test Series Grid */}
      <main className="p-4">
        {filteredTests.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTests.map((test) => (
              <Card key={test.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-gray-100">
                  <img 
                    src={test.thumbnail} 
                    alt={test.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <span className="text-6xl">{test.icon}</span>
                  </div>
                  {test.isPurchased && (
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      Purchased
                    </Badge>
                  )}
                  <Badge className="absolute bottom-2 right-2 bg-blue-500">
                    {test.totalTests} Tests
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {test.category}
                      </Badge>
                      <span className="text-xs text-gray-500">{test.duration}</span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 leading-tight">
                      {test.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {test.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Subject:</span> {test.subject}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Total Tests:</span>
                          <div className="font-semibold">{test.totalTests}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Questions:</span>
                          <div className="font-semibold">{test.totalQuestions.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xl font-bold text-gray-900">
                          ₹{test.price.toLocaleString()}
                        </span>
                        <div className="text-xs text-gray-500">
                          ₹{Math.round(test.price / test.totalTests)} per test
                        </div>
                      </div>
                      
                      {test.isPurchased ? (
                        <div className="flex flex-col gap-1">
                          <Button size="sm" className="text-xs">
                            Take Test
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            View Results
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <Button variant="outline" size="sm" className="text-xs">
                            Preview
                          </Button>
                          <Button size="sm" className="text-xs">
                            Purchase
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="text-xs text-gray-600 pt-2 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 px-2 py-1 rounded">📊 Performance Analysis</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">🏆 All India Ranking</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">📈 Progress Tracking</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No test series found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* How it Works Section */}
        <div className="mt-12 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">How Test Series Work</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Purchase</h3>
              <p className="text-sm text-gray-600">Select and purchase your test series</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Take Tests</h3>
              <p className="text-sm text-gray-600">Attempt tests in exam-like conditions</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Get Analysis</h3>
              <p className="text-sm text-gray-600">Detailed performance analysis and ranking</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">4. Improve</h3>
              <p className="text-sm text-gray-600">Track progress and improve performance</p>
            </div>
          </div>
        </div>
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
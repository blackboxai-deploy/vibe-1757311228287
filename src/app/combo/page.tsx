'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function ComboCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const mockComboCourses = [
    {
      id: 1,
      title: 'JEE Complete Package',
      description: 'All subjects (Physics, Chemistry, Mathematics) for JEE Main & Advanced preparation.',
      thumbnail: 'https://placehold.co/400x300?text=JEE+Complete+Package',
      price: 12999,
      originalPrice: 23997,
      discount: 46,
      validity: '2 Years',
      coursesCount: 3,
      totalLectures: 500,
      features: [
        'All JEE Subjects',
        '500+ Video Lectures',
        'Live Doubt Sessions',
        'Mock Tests',
        'Performance Analysis',
        'Mobile App Access'
      ],
      isPurchased: false,
      category: 'JEE'
    },
    {
      id: 2,
      title: 'NEET Master Package',
      description: 'Complete NEET preparation with Physics, Chemistry, and Biology courses.',
      thumbnail: 'https://placehold.co/400x300?text=NEET+Master+Package',
      price: 9999,
      originalPrice: 17997,
      discount: 44,
      validity: '1.5 Years',
      coursesCount: 3,
      totalLectures: 400,
      features: [
        'All NEET Subjects',
        '400+ Video Lectures',
        'NEET Mock Tests',
        'Previous Year Papers',
        'Study Planner',
        'Offline Access'
      ],
      isPurchased: true,
      category: 'NEET'
    },
    {
      id: 3,
      title: 'UPSC Foundation Package',
      description: 'Comprehensive package for UPSC Civil Services preparation.',
      thumbnail: 'https://placehold.co/400x300?text=UPSC+Foundation+Package',
      price: 15999,
      originalPrice: 25999,
      discount: 38,
      validity: '3 Years',
      coursesCount: 6,
      totalLectures: 800,
      features: [
        'All UPSC Subjects',
        '800+ Video Lectures',
        'Current Affairs Updates',
        'Answer Writing Practice',
        'Mentorship Support',
        'Study Material PDFs'
      ],
      isPurchased: false,
      category: 'UPSC'
    }
  ];

  const filteredCombos = mockComboCourses.filter(combo =>
    combo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    combo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    combo.category.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="text-xl font-bold text-gray-900">Combo Courses</h1>
          </div>
          <Badge variant="secondary">{filteredCombos.length} packages</Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <Input
            placeholder="Search combo packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </header>

      {/* Value Proposition */}
      <div className="px-4 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="text-center">
          <h2 className="text-lg font-bold mb-2">📦 Best Value Combo Packages</h2>
          <p className="text-sm opacity-90">Save up to 50% when you buy multiple courses together</p>
        </div>
      </div>

      {/* Combo Courses */}
      <main className="p-4">
        {filteredCombos.length > 0 ? (
          <div className="space-y-6">
            {filteredCombos.map((combo) => (
              <Card key={combo.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video md:aspect-[3/1] bg-gray-100">
                  <img 
                    src={combo.thumbnail} 
                    alt={combo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Discount Badge */}
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1">
                    {combo.discount}% OFF
                  </Badge>

                  {/* Purchase Status */}
                  {combo.isPurchased && (
                    <Badge className="absolute top-4 left-4 bg-green-500 text-white text-sm px-3 py-1">
                      ✅ Purchased
                    </Badge>
                  )}

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <Badge variant="outline" className="text-white border-white mb-2">
                      {combo.category}
                    </Badge>
                    <h2 className="text-xl md:text-2xl font-bold">{combo.title}</h2>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {combo.description}
                    </p>

                    {/* Package Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 bg-gray-50 rounded-lg px-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{combo.coursesCount}</div>
                        <div className="text-xs text-gray-600">Courses</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{combo.totalLectures}+</div>
                        <div className="text-xs text-gray-600">Lectures</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{combo.validity}</div>
                        <div className="text-xs text-gray-600">Validity</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">₹{((combo.originalPrice - combo.price) / 1000).toFixed(0)}K</div>
                        <div className="text-xs text-gray-600">You Save</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {combo.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-green-500">✅</span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-blue-600">
                              ₹{combo.price.toLocaleString()}
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                              ₹{combo.originalPrice.toLocaleString()}
                            </span>
                            <Badge className="bg-green-500 text-white">
                              {combo.discount}% OFF
                            </Badge>
                          </div>
                          <p className="text-sm text-green-600 font-medium mt-1">
                            Save ₹{(combo.originalPrice - combo.price).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Valid for {combo.validity} • Includes all updates
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      {combo.isPurchased ? (
                        <>
                          <Button className="flex-1">
                            Access Courses
                          </Button>
                          <Button variant="outline">
                            View Progress
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                            Buy Complete Package
                          </Button>
                          <Button variant="outline">
                            Preview Courses
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-6 text-xs text-gray-500 pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <span>💳</span> Secure Payment
                      </span>
                      <span className="flex items-center gap-1">
                        <span>🔄</span> 7-day Refund
                      </span>
                      <span className="flex items-center gap-1">
                        <span>📱</span> Mobile Access
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No combo packages found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
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
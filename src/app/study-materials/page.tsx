'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function StudyMaterialsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const mockStudyMaterials = [
    {
      id: 1,
      title: 'JEE Physics Formula Sheet',
      description: 'Complete formula sheet for JEE Physics with all important formulas and constants.',
      thumbnail: 'https://placehold.co/300x200?text=Physics+Formula+Sheet',
      subject: 'Physics',
      topic: 'All Topics',
      type: 'PDF',
      size: '2.5 MB',
      downloads: 2500,
      rating: 4.9,
      isDownloaded: true,
      category: 'JEE'
    },
    {
      id: 2,
      title: 'NEET Biology Diagrams',
      description: 'Important biological diagrams for NEET with proper labeling and explanations.',
      thumbnail: 'https://placehold.co/300x200?text=Biology+Diagrams',
      subject: 'Biology',
      topic: 'Cell Biology, Human Physiology',
      type: 'PDF',
      size: '15.8 MB',
      downloads: 1800,
      rating: 4.8,
      isDownloaded: false,
      category: 'NEET'
    },
    {
      id: 3,
      title: 'UPSC Current Affairs January 2024',
      description: 'Monthly current affairs compilation for UPSC preparation with analysis.',
      thumbnail: 'https://placehold.co/300x200?text=Current+Affairs+Jan+2024',
      subject: 'General Studies',
      topic: 'Current Affairs',
      type: 'PDF',
      size: '8.3 MB',
      downloads: 3200,
      rating: 4.7,
      isDownloaded: true,
      category: 'UPSC'
    },
    {
      id: 4,
      title: 'Mathematics Quick Reference',
      description: 'Quick reference guide for important mathematical concepts and formulas.',
      thumbnail: 'https://placehold.co/300x200?text=Math+Quick+Reference',
      subject: 'Mathematics',
      topic: 'Algebra, Calculus, Trigonometry',
      type: 'PDF',
      size: '4.2 MB',
      downloads: 1500,
      rating: 4.6,
      isDownloaded: false,
      category: 'JEE'
    }
  ];

  const subjects = ['All Subjects', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'General Studies'];
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');

  const filteredMaterials = mockStudyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All Subjects' || material.subject === selectedSubject;
    return matchesSearch && matchesSubject;
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
            <h1 className="text-xl font-bold text-gray-900">Study Materials</h1>
          </div>
          <Badge variant="secondary">{filteredMaterials.length} materials</Badge>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <Input
            placeholder="Search study materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Subject Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSubject(subject)}
              className="whitespace-nowrap"
            >
              {subject}
            </Button>
          ))}
        </div>
      </header>

      {/* Study Materials */}
      <main className="p-4">
        {filteredMaterials.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMaterials.map((material) => (
              <Card key={material.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-gray-100">
                  <img 
                    src={material.thumbnail} 
                    alt={material.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Material Type Badge */}
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                    {material.type}
                  </Badge>

                  {/* Category Badge */}
                  <Badge variant="outline" className="absolute top-2 left-2 bg-white">
                    {material.category}
                  </Badge>

                  {/* Downloaded Status */}
                  {material.isDownloaded && (
                    <Badge className="absolute bottom-2 right-2 bg-green-500 text-white text-xs">
                      Downloaded
                    </Badge>
                  )}

                  {/* PDF Icon Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <span className="text-4xl text-white opacity-50">📄</span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Subject Badge */}
                    <Badge variant="outline" className="text-xs">
                      {material.subject}
                    </Badge>
                    
                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
                      {material.title}
                    </h3>
                    
                    {/* Topic */}
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Topic:</span> {material.topic}
                    </p>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {material.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        💾 {material.size}
                      </span>
                      <span className="flex items-center gap-1">
                        ⭐ {material.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        📥 {material.downloads.toLocaleString()}
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-sm font-medium text-gray-900">
                        Free Download
                      </div>
                      
                      <div className="flex gap-2">
                        {material.isDownloaded ? (
                          <>
                            <Button size="sm" className="text-xs px-3">
                              Open
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs px-2">
                              Share
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" size="sm" className="text-xs px-2">
                              Preview
                            </Button>
                            <Button size="sm" className="text-xs px-3">
                              Download
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="text-xs text-gray-500 pt-2">
                      📚 Study Material • {material.type} format • Free access
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No study materials found</h3>
            <p className="text-gray-600">Try adjusting your search or subject filter</p>
          </div>
        )}

        {/* Popular Categories */}
        <div className="mt-12 bg-white rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Formula Sheets', count: 25, icon: '📐', subject: 'Mathematics' },
              { name: 'Diagram Collections', count: 18, icon: '🧬', subject: 'Biology' },
              { name: 'Current Affairs', count: 35, icon: '📰', subject: 'General Studies' },
              { name: 'Quick Notes', count: 42, icon: '📝', subject: 'Physics' }
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedSubject(category.subject)}
                className="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors"
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="font-medium text-sm text-gray-900">{category.name}</div>
                <div className="text-xs text-gray-600">{category.count} materials</div>
              </button>
            ))}
          </div>
        </div>

        {/* Download Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Download Tips</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Downloaded materials are available offline</li>
            <li>• Use Wi-Fi for faster downloads</li>
            <li>• Materials are regularly updated with new content</li>
            <li>• Share materials with friends for collaborative learning</li>
          </ul>
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
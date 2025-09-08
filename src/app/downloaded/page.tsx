'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DownloadedPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const mockDownloadedVideos = [
    {
      id: 1,
      title: 'Introduction to Mechanics',
      course: 'Complete JEE Main & Advanced Physics',
      thumbnail: 'https://placehold.co/320x180?text=Mechanics+Video',
      duration: '45:30',
      size: '150 MB',
      downloadedAt: '2024-01-20',
      progress: 100
    },
    {
      id: 2,
      title: 'Newton\'s Laws of Motion',
      course: 'Complete JEE Main & Advanced Physics',
      thumbnail: 'https://placehold.co/320x180?text=Newtons+Laws+Video',
      duration: '52:15',
      size: '140 MB',
      downloadedAt: '2024-01-19',
      progress: 100
    }
  ];

  const mockDownloadedPDFs = [
    {
      id: 1,
      title: 'NEET Biology Quick Revision',
      author: 'Dr. Priya Sharma',
      thumbnail: 'https://placehold.co/300x400?text=Biology+Book+PDF',
      pages: 420,
      size: '25 MB',
      downloadedAt: '2024-01-18',
      type: 'Book'
    },
    {
      id: 2,
      title: 'JEE Physics Formula Sheet',
      author: 'Study Material',
      thumbnail: 'https://placehold.co/300x200?text=Physics+Formula+Sheet',
      pages: 15,
      size: '2.5 MB',
      downloadedAt: '2024-01-17',
      type: 'Study Material'
    }
  ];

  const filteredVideos = mockDownloadedVideos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPDFs = mockDownloadedPDFs.filter(pdf =>
    pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pdf.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalVideos = filteredVideos.length;
  const totalPDFs = filteredPDFs.length;
  const totalStorage = (totalVideos * 145) + (totalPDFs * 13.75); // Approximate MB

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">← Back</Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Downloaded Content</h1>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div>📱 Storage Used</div>
            <div className="font-semibold">{totalStorage.toFixed(0)} MB</div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <Input
            placeholder="Search downloaded content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Storage Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{totalVideos}</div>
            <div className="text-xs text-gray-600">Videos</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{totalPDFs}</div>
            <div className="text-xs text-gray-600">PDFs</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">0</div>
            <div className="text-xs text-gray-600">Downloading</div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <main className="p-4">
        <Tabs defaultValue="videos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="videos">
              📺 Videos ({totalVideos})
            </TabsTrigger>
            <TabsTrigger value="pdfs">
              📄 PDFs ({totalPDFs})
            </TabsTrigger>
          </TabsList>

          {/* Videos Tab */}
          <TabsContent value="videos">
            {filteredVideos.length > 0 ? (
              <div className="space-y-4">
                {filteredVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex gap-4 p-4">
                      <div className="relative w-32 aspect-video bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <button className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100">
                            <span className="text-2xl ml-1">▶️</span>
                          </button>
                        </div>
                        <Badge className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs">
                          {video.duration}
                        </Badge>
                        <Badge className="absolute top-2 right-2 bg-green-500 text-white text-xs">
                          Downloaded
                        </Badge>
                      </div>
                      
                      <div className="flex-1 min-w-0 space-y-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-600">{video.course}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>💾 {video.size}</span>
                          <span>📅 {video.downloadedAt}</span>
                          <span>⏱️ {video.duration}</span>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm">Play Offline</Button>
                          <Button variant="outline" size="sm">Remove</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📺</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No videos downloaded</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? 'Try different search terms' : 'Purchase courses and download videos for offline viewing'}
                </p>
                {!searchQuery && (
                  <Link href="/videos">
                    <Button>Browse Courses</Button>
                  </Link>
                )}
              </div>
            )}
          </TabsContent>

          {/* PDFs Tab */}
          <TabsContent value="pdfs">
            {filteredPDFs.length > 0 ? (
              <div className="space-y-4">
                {filteredPDFs.map((pdf) => (
                  <Card key={pdf.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex gap-4 p-4">
                      <div className="relative w-24 aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={pdf.thumbnail} 
                          alt={pdf.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <span className="text-2xl">📄</span>
                        </div>
                        <Badge className="absolute bottom-1 right-1 bg-red-500 text-white text-xs">
                          PDF
                        </Badge>
                        <Badge className="absolute top-1 right-1 bg-green-500 text-white text-xs">
                          ✓
                        </Badge>
                      </div>
                      
                      <div className="flex-1 min-w-0 space-y-2">
                        <Badge variant="outline" className="text-xs">
                          {pdf.type}
                        </Badge>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {pdf.title}
                        </h3>
                        <p className="text-sm text-gray-600">{pdf.author}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>📄 {pdf.pages} pages</span>
                          <span>💾 {pdf.size}</span>
                          <span>📅 {pdf.downloadedAt}</span>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm">Open PDF</Button>
                          <Button variant="outline" size="sm">Share</Button>
                          <Button variant="outline" size="sm">Remove</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No PDFs downloaded</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? 'Try different search terms' : 'Purchase books and study materials to download PDFs'}
                </p>
                {!searchQuery && (
                  <div className="flex gap-2 justify-center">
                    <Link href="/books">
                      <Button>Browse Books</Button>
                    </Link>
                    <Link href="/study-materials">
                      <Button variant="outline">Study Materials</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Storage Management */}
        <div className="mt-8 bg-white rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Storage Management</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Total Storage Used</h4>
                <p className="text-sm text-gray-600">{totalStorage.toFixed(0)} MB of downloaded content</p>
              </div>
              <Button variant="outline" size="sm">
                Clear Cache
              </Button>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>💡 <strong>Tip:</strong> Downloaded content remains available even when you're offline.</p>
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
            <span className="text-xs font-medium text-blue-600">Downloaded</span>
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
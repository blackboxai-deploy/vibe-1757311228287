'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const mockBooks = [
    {
      id: 1,
      title: 'JEE Physics Concept Book',
      author: 'Dr. Rajesh Kumar',
      price: 899,
      pages: 650,
      type: 'hardcopy',
      category: 'JEE Physics',
      thumbnail: 'https://placehold.co/300x400?text=JEE+Physics+Book',
      description: 'Comprehensive concept book for JEE Physics with solved examples',
      isPurchased: true
    },
    {
      id: 2,
      title: 'NEET Biology Quick Revision',
      author: 'Dr. Priya Sharma',
      price: 399,
      pages: 420,
      type: 'softcopy',
      category: 'NEET Biology',
      thumbnail: 'https://placehold.co/300x400?text=NEET+Biology+Book',
      description: 'Quick revision notes for NEET Biology with diagrams',
      isPurchased: true,
      isDownloaded: true
    },
    {
      id: 3,
      title: 'UPSC History Comprehensive Guide',
      author: 'Prof. Anand Singh',
      price: 1299,
      pages: 850,
      type: 'hardcopy',
      category: 'UPSC History',
      thumbnail: 'https://placehold.co/300x400?text=UPSC+History+Book',
      description: 'Complete guide to Indian History for UPSC',
      isPurchased: false
    }
  ];

  const hardCopyBooks = mockBooks.filter(book => book.type === 'hardcopy');
  const softCopyBooks = mockBooks.filter(book => book.type === 'softcopy');

  const filterBooks = (books: typeof mockBooks) => {
    return books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">← Back</Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Books & Study Materials</h1>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <Input
            placeholder="Search books, authors, subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </header>

      {/* Tabs */}
      <main className="p-4">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              All Books ({mockBooks.length})
            </TabsTrigger>
            <TabsTrigger value="hardcopy">
              📖 Hard Copy ({hardCopyBooks.length})
            </TabsTrigger>
            <TabsTrigger value="softcopy">
              📱 Soft Copy ({softCopyBooks.length})
            </TabsTrigger>
          </TabsList>

          {/* All Books */}
          <TabsContent value="all">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterBooks(mockBooks).map((book) => (
                <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-[3/4] bg-gray-100">
                      <img 
                        src={book.thumbnail} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Badge className={`absolute top-2 right-2 ${
                      book.type === 'hardcopy' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {book.type === 'hardcopy' ? '📖 Hard Copy' : '📱 Digital'}
                    </Badge>
                    {book.isPurchased && (
                      <Badge className="absolute top-2 left-2 bg-green-600">
                        Purchased
                      </Badge>
                    )}
                    {book.isDownloaded && (
                      <Badge className="absolute bottom-2 right-2 bg-purple-500">
                        Downloaded
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <Badge variant="outline" className="text-xs">
                        {book.category}
                      </Badge>
                      
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {book.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600">By {book.author}</p>
                      
                      <div className="text-xs text-gray-500">
                        {book.pages} pages • {book.type}
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {book.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{book.price.toLocaleString()}
                        </span>
                        
                        {book.isPurchased ? (
                          <div className="flex gap-1">
                            {book.type === 'softcopy' && book.isDownloaded ? (
                              <Button size="sm">Read Now</Button>
                            ) : book.type === 'softcopy' ? (
                              <Button size="sm">Download</Button>
                            ) : (
                              <Button size="sm" disabled>Ordered</Button>
                            )}
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">Preview</Button>
                            <Button size="sm">
                              {book.type === 'hardcopy' ? 'Order' : 'Buy'}
                            </Button>
                          </div>
                        )}
                      </div>

                      {book.type === 'hardcopy' && (
                        <p className="text-xs text-gray-500">
                          📦 Free delivery on orders above ₹500
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Hard Copy Books */}
          <TabsContent value="hardcopy">
            <div className="mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">📦 Physical Books</h3>
                <p className="text-blue-700 text-sm">
                  Hard copy books delivered to your doorstep. Free shipping on orders above ₹500.
                </p>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterBooks(hardCopyBooks).map((book) => (
                <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[3/4] bg-gray-100">
                    <img 
                      src={book.thumbnail} 
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-500">
                      📖 Hard Copy
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">{book.title}</h3>
                      <p className="text-sm text-gray-600">By {book.author}</p>
                      <div className="text-xs text-gray-500">{book.pages} pages</div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold">₹{book.price.toLocaleString()}</span>
                        <Button size="sm">Order Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Soft Copy Books */}
          <TabsContent value="softcopy">
            <div className="mb-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">📱 Digital Books</h3>
                <p className="text-green-700 text-sm">
                  Instant download PDFs. Access anywhere, anytime on your device.
                </p>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterBooks(softCopyBooks).map((book) => (
                <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[3/4] bg-gray-100">
                    <img 
                      src={book.thumbnail} 
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      📱 Digital
                    </Badge>
                    {book.isDownloaded && (
                      <Badge className="absolute bottom-2 right-2 bg-purple-500">
                        Downloaded
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">{book.title}</h3>
                      <p className="text-sm text-gray-600">By {book.author}</p>
                      <div className="text-xs text-gray-500">PDF format • {book.pages} pages</div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold">₹{book.price.toLocaleString()}</span>
                        {book.isDownloaded ? (
                          <Button size="sm">Read Now</Button>
                        ) : (
                          <Button size="sm">Buy & Download</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
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
            <span className="text-xs font-medium text-blue-600">Books</span>
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
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function PurchasesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const mockPurchases = [
    {
      id: 'purchase_1',
      title: 'Complete JEE Main & Advanced Physics',
      type: 'Video Course',
      amount: 4999,
      discount: 3000,
      couponCode: 'SAVE3000',
      paymentId: 'pay_123456789',
      paymentMethod: 'UPI',
      status: 'completed',
      purchasedAt: '2024-01-15T10:30:00Z',
      expiresAt: '2025-01-15T10:30:00Z',
      thumbnail: 'https://placehold.co/100x100?text=JEE+Physics'
    },
    {
      id: 'purchase_2',
      title: 'NEET Biology Quick Revision',
      type: 'Book (PDF)',
      amount: 399,
      discount: 0,
      paymentId: 'pay_987654321',
      paymentMethod: 'Credit Card',
      status: 'completed',
      purchasedAt: '2024-01-10T15:45:00Z',
      thumbnail: 'https://placehold.co/100x100?text=NEET+Book'
    },
    {
      id: 'purchase_3',
      title: 'JEE Main Mock Test Series',
      type: 'Test Series',
      amount: 1999,
      discount: 500,
      couponCode: 'TEST500',
      paymentId: 'pay_456789123',
      paymentMethod: 'Net Banking',
      status: 'completed',
      purchasedAt: '2024-01-08T12:20:00Z',
      expiresAt: '2024-12-08T12:20:00Z',
      thumbnail: 'https://placehold.co/100x100?text=JEE+Tests'
    }
  ];

  const filteredPurchases = mockPurchases.filter(purchase =>
    purchase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    purchase.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    purchase.paymentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSpent = mockPurchases.reduce((sum, purchase) => sum + purchase.amount, 0);
  const totalSaved = mockPurchases.reduce((sum, purchase) => sum + purchase.discount, 0);
  const completedPurchases = mockPurchases.filter(p => p.status === 'completed').length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.includes('Video')) return '📺';
    if (type.includes('Book')) return '📚';
    if (type.includes('Test')) return '📝';
    if (type.includes('Live')) return '🔴';
    return '🎓';
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
            <h1 className="text-xl font-bold text-gray-900">My Purchases</h1>
          </div>
        </div>

        {/* Purchase Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{completedPurchases}</div>
            <div className="text-xs text-gray-600">Completed Orders</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">₹{totalSpent.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Total Spent</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">₹{totalSaved.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Total Saved</div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <Input
            placeholder="Search purchases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </header>

      {/* Purchases List */}
      <main className="p-4">
        {filteredPurchases.length > 0 ? (
          <div className="space-y-4">
            {filteredPurchases.map((purchase) => (
              <Card key={purchase.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={purchase.thumbnail} 
                            alt={purchase.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                            <span className="text-xl">{getTypeIcon(purchase.type)}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
                            {purchase.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {purchase.type}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Order ID: {purchase.id}
                          </p>
                        </div>
                      </div>
                      
                      <Badge className={`text-xs ${getStatusColor(purchase.status)}`}>
                        ✅ {purchase.status.toUpperCase()}
                      </Badge>
                    </div>

                    {/* Purchase Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <p className="font-medium">{formatDate(purchase.purchasedAt)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Payment:</span>
                        <p className="font-medium">{purchase.paymentMethod}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Payment ID:</span>
                        <p className="font-mono text-xs">{purchase.paymentId}</p>
                      </div>
                      {purchase.expiresAt && (
                        <div>
                          <span className="text-gray-600">Expires:</span>
                          <p className="font-medium">{formatDate(purchase.expiresAt)}</p>
                        </div>
                      )}
                    </div>

                    {/* Pricing */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span>₹{purchase.amount.toLocaleString()}</span>
                        </div>
                        {purchase.discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount {purchase.couponCode ? `(${purchase.couponCode})` : ''}:</span>
                            <span>-₹{purchase.discount.toLocaleString()}</span>
                          </div>
                        )}
                        <hr className="border-gray-200" />
                        <div className="flex justify-between font-semibold">
                          <span>Total Paid:</span>
                          <span>₹{purchase.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="text-xs">
                        Access Content
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        Download Receipt
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-red-600">
                        Request Refund
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No matching purchases found' : 'No purchases yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? 'Try adjusting your search criteria'
                : 'Start learning by purchasing courses, books, or test series'
              }
            </p>
            {!searchQuery && (
              <div className="flex gap-2 justify-center">
                <Link href="/videos">
                  <Button>Browse Courses</Button>
                </Link>
                <Link href="/books">
                  <Button variant="outline">Browse Books</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link href="/videos">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">📺</div>
                  <h3 className="font-semibold text-gray-900 text-sm">Video Courses</h3>
                </CardContent>
              </Card>
            </Link>

            <Link href="/books">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">📚</div>
                  <h3 className="font-semibold text-gray-900 text-sm">Books</h3>
                </CardContent>
              </Card>
            </Link>

            <Link href="/test-series">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">📝</div>
                  <h3 className="font-semibold text-gray-900 text-sm">Test Series</h3>
                </CardContent>
              </Card>
            </Link>

            <Link href="/live">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">🔴</div>
                  <h3 className="font-semibold text-gray-900 text-sm">Live Classes</h3>
                </CardContent>
              </Card>
            </Link>
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
            <span className="text-xs font-medium text-blue-600">Purchases</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
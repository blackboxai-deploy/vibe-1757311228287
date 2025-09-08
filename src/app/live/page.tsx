'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LiveClassesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const mockLiveClasses = [
    {
      id: 1,
      title: 'JEE Physics Crash Course',
      instructor: 'Dr. Rajesh Kumar',
      thumbnail: 'https://placehold.co/400x300?text=JEE+Physics+Live+Class',
      scheduledDate: '2024-02-15T16:00:00Z',
      duration: '2 hours',
      price: 299,
      maxStudents: 100,
      enrolledStudents: 87,
      status: 'upcoming',
      isPurchased: true,
      description: 'Intensive live sessions covering important JEE Physics topics with problem solving.',
      category: 'JEE'
    },
    {
      id: 2,
      title: 'NEET Biology Doubt Session',
      instructor: 'Dr. Priya Sharma',
      thumbnail: 'https://placehold.co/400x300?text=NEET+Biology+Live+Session',
      scheduledDate: '2024-02-10T15:00:00Z',
      duration: '1.5 hours',
      price: 199,
      maxStudents: 150,
      enrolledStudents: 145,
      status: 'live',
      meetingLink: 'https://meet.studypur.com/neet-bio-doubt',
      isPurchased: true,
      isJoined: true,
      description: 'Live doubt clearing session for NEET Biology with Q&A.',
      category: 'NEET'
    },
    {
      id: 3,
      title: 'UPSC Current Affairs Discussion',
      instructor: 'Prof. Anand Singh',
      thumbnail: 'https://placehold.co/400x300?text=UPSC+Current+Affairs+Live',
      scheduledDate: '2024-02-05T18:00:00Z',
      duration: '1 hour',
      price: 99,
      maxStudents: 200,
      enrolledStudents: 156,
      status: 'completed',
      recordingUrl: 'https://recordings.studypur.com/upsc-current-affairs',
      isPurchased: false,
      description: 'Weekly current affairs discussion with expert analysis.',
      category: 'UPSC'
    }
  ];

  const filteredClasses = mockLiveClasses.filter(liveClass =>
    liveClass.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    liveClass.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    liveClass.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingClasses = mockLiveClasses.filter(c => c.status === 'upcoming').length;
  const liveNowClasses = mockLiveClasses.filter(c => c.status === 'live').length;
  const completedClasses = mockLiveClasses.filter(c => c.status === 'completed').length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      }) + ' Today';
    } else if (diffInHours < 48) {
      return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      }) + ' Tomorrow';
    } else {
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white animate-pulse';
      case 'upcoming':
        return 'bg-blue-500 text-white';
      case 'completed':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live':
        return '🔴 LIVE NOW';
      case 'upcoming':
        return '📅 Upcoming';
      case 'completed':
        return '✅ Completed';
      default:
        return status.toUpperCase();
    }
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
            <h1 className="text-xl font-bold text-gray-900">Live Classes</h1>
          </div>
          {liveNowClasses > 0 && (
            <Badge className="bg-red-500 text-white animate-pulse">
              🔴 {liveNowClasses} LIVE NOW
            </Badge>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <Input
            placeholder="Search live classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Class Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{upcomingClasses}</div>
            <div className="text-xs text-gray-600">Upcoming</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">{liveNowClasses}</div>
            <div className="text-xs text-gray-600">Live Now</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-600">{completedClasses}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
        </div>
      </header>

      {/* Live Now Alert */}
      {liveNowClasses > 0 && (
        <div className="px-4 py-3 bg-red-50 border-b border-red-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-red-700 font-medium text-sm">
              {liveNowClasses} class{liveNowClasses > 1 ? 'es' : ''} currently live! Join now.
            </span>
          </div>
        </div>
      )}

      {/* Live Classes */}
      <main className="p-4">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">
              All ({mockLiveClasses.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="text-xs">
              Upcoming ({upcomingClasses})
            </TabsTrigger>
            <TabsTrigger value="live" className="text-xs">
              🔴 Live ({liveNowClasses})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">
              Past ({completedClasses})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredClasses.length > 0 ? (
              <div className="space-y-4">
                {filteredClasses.map((liveClass) => (
                  <Card key={liveClass.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex gap-4 p-4">
                      <div className="relative w-40 aspect-video bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={liveClass.thumbnail} 
                          alt={liveClass.title}
                          className="w-full h-full object-cover"
                        />
                        
                        <Badge className={`absolute top-2 right-2 text-xs ${getStatusColor(liveClass.status)}`}>
                          {getStatusText(liveClass.status)}
                        </Badge>

                        <Badge className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs">
                          {liveClass.duration}
                        </Badge>

                        {liveClass.status === 'live' && (
                          <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex items-center justify-center">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                              <span className="text-white text-xs font-bold">LIVE</span>
                            </div>
                          </div>
                        )}

                        {liveClass.isPurchased && (
                          <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
                            Purchased
                          </Badge>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-3">
                        <div>
                          <Badge variant="outline" className="text-xs mb-2">
                            {liveClass.category}
                          </Badge>
                          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
                            {liveClass.title}
                          </h3>
                        </div>

                        <p className="text-sm text-gray-600">
                          👨‍🏫 {liveClass.instructor}
                        </p>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {liveClass.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            ⏰ {formatDate(liveClass.scheduledDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            👥 {liveClass.enrolledStudents}/{liveClass.maxStudents}
                          </span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${(liveClass.enrolledStudents / liveClass.maxStudents) * 100}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-lg font-bold text-gray-900">
                            ₹{liveClass.price.toLocaleString()}
                          </span>

                          <div className="flex gap-2">
                            {liveClass.isPurchased ? (
                              <>
                                {liveClass.status === 'live' && liveClass.meetingLink ? (
                                  <Button 
                                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 animate-pulse"
                                    onClick={() => window.open(liveClass.meetingLink, '_blank')}
                                  >
                                    🔴 Join Live
                                  </Button>
                                ) : liveClass.status === 'upcoming' ? (
                                  <Button size="sm" className="text-xs px-3" disabled>
                                    Registered
                                  </Button>
                                ) : liveClass.recordingUrl ? (
                                  <Button 
                                    size="sm" 
                                    className="text-xs px-3"
                                    onClick={() => window.open(liveClass.recordingUrl, '_blank')}
                                  >
                                    Watch Recording
                                  </Button>
                                ) : (
                                  <Button size="sm" className="text-xs px-3" disabled>
                                    Recording Soon
                                  </Button>
                                )}
                              </>
                            ) : (
                              <>
                                <Button variant="outline" size="sm" className="text-xs px-2">
                                  View Details
                                </Button>
                                <Button size="sm" className="text-xs px-3">
                                  {liveClass.status === 'live' ? 'Join Now' : 'Register'}
                                </Button>
                              </>
                            )}
                          </div>
                        </div>

                        {liveClass.enrolledStudents >= liveClass.maxStudents && (
                          <p className="text-xs text-orange-600 font-medium">⚠️ Class is full</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📺</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No classes found</h3>
                <p className="text-gray-600">
                  {searchQuery ? 'Try different search terms' : 'Live classes will be scheduled soon'}
                </p>
              </div>
            )}
          </TabsContent>

          {/* Other tabs would have similar structure */}
          <TabsContent value="upcoming">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Classes</h3>
              <p className="text-gray-600">Classes scheduled for the future will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="live">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔴</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Classes</h3>
              <p className="text-gray-600">Currently ongoing live sessions will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Past Classes</h3>
              <p className="text-gray-600">Completed classes with recordings will appear here</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* How it Works */}
        <div className="mt-12 bg-white rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">How Live Classes Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="font-semibold text-blue-900">1. Register</h3>
              <p className="text-sm text-blue-700 mt-1">Purchase and register for live classes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="font-semibold text-green-900">2. Get Notified</h3>
              <p className="text-sm text-green-700 mt-1">Receive reminders before class starts</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="font-semibold text-purple-900">3. Join & Learn</h3>
              <p className="text-sm text-purple-700 mt-1">Interact with instructors and peers</p>
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
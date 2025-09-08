'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function AdminPanel() {
  // States for different content types
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    instructor: '',
    category: '',
    price: '',
    videoUrl: '',
    thumbnail: ''
  });

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    price: '',
    pages: '',
    type: 'softcopy',
    pdfUrl: '',
    thumbnail: ''
  });

  const [testData, setTestData] = useState({
    title: '',
    description: '',
    subject: '',
    totalQuestions: '',
    duration: '',
    price: '',
    thumbnail: ''
  });

  const [liveClassData, setLiveClassData] = useState({
    title: '',
    description: '',
    instructor: '',
    scheduledDate: '',
    duration: '',
    price: '',
    maxStudents: '',
    thumbnail: ''
  });

  // Statistics (mock data)
  const stats = {
    totalUsers: 10247,
    totalCourses: 128,
    totalRevenue: 2456789,
    activeUsers: 3456,
    totalBooks: 89,
    totalTests: 45,
    liveClasses: 23
  };

  const handleAddVideo = () => {
    if (!videoData.title || !videoData.instructor || !videoData.price) {
      alert('Please fill all required fields');
      return;
    }
    
    // Simulate API call
    console.log('Adding video:', videoData);
    alert('Video course added successfully!');
    
    // Reset form
    setVideoData({
      title: '',
      description: '',
      instructor: '',
      category: '',
      price: '',
      videoUrl: '',
      thumbnail: ''
    });
  };

  const handleAddBook = () => {
    if (!bookData.title || !bookData.author || !bookData.price) {
      alert('Please fill all required fields');
      return;
    }
    
    console.log('Adding book:', bookData);
    alert('Book added successfully!');
    
    setBookData({
      title: '',
      author: '',
      description: '',
      category: '',
      price: '',
      pages: '',
      type: 'softcopy',
      pdfUrl: '',
      thumbnail: ''
    });
  };

  const handleAddTest = () => {
    if (!testData.title || !testData.subject || !testData.price) {
      alert('Please fill all required fields');
      return;
    }
    
    console.log('Adding test:', testData);
    alert('Test series added successfully!');
    
    setTestData({
      title: '',
      description: '',
      subject: '',
      totalQuestions: '',
      duration: '',
      price: '',
      thumbnail: ''
    });
  };

  const handleAddLiveClass = () => {
    if (!liveClassData.title || !liveClassData.instructor || !liveClassData.scheduledDate) {
      alert('Please fill all required fields');
      return;
    }
    
    console.log('Adding live class:', liveClassData);
    alert('Live class scheduled successfully!');
    
    setLiveClassData({
      title: '',
      description: '',
      instructor: '',
      scheduledDate: '',
      duration: '',
      price: '',
      maxStudents: '',
      thumbnail: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Manage your educational content</p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            Admin Dashboard
          </Badge>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalCourses}</div>
              <div className="text-sm text-gray-600">Video Courses</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalBooks}</div>
              <div className="text-sm text-gray-600">Books</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.totalTests}</div>
              <div className="text-sm text-gray-600">Test Series</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.liveClasses}</div>
              <div className="text-sm text-gray-600">Live Classes</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.activeUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">₹{(stats.totalRevenue / 100000).toFixed(1)}L</div>
              <div className="text-sm text-gray-600">Revenue</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content Management Tabs */}
      <Tabs defaultValue="videos" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="videos">📺 Videos</TabsTrigger>
          <TabsTrigger value="books">📚 Books</TabsTrigger>
          <TabsTrigger value="tests">📝 Tests</TabsTrigger>
          <TabsTrigger value="live">🔴 Live Classes</TabsTrigger>
        </TabsList>

        {/* Video Management */}
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>Add New Video Course</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="video-title">Course Title *</Label>
                  <Input
                    id="video-title"
                    value={videoData.title}
                    onChange={(e) => setVideoData({...videoData, title: e.target.value})}
                    placeholder="Complete JEE Physics Course"
                  />
                </div>
                
                <div>
                  <Label htmlFor="video-instructor">Instructor *</Label>
                  <Input
                    id="video-instructor"
                    value={videoData.instructor}
                    onChange={(e) => setVideoData({...videoData, instructor: e.target.value})}
                    placeholder="Dr. Rajesh Kumar"
                  />
                </div>

                <div>
                  <Label htmlFor="video-category">Category</Label>
                  <Select value={videoData.category} onValueChange={(value) => setVideoData({...videoData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JEE">JEE</SelectItem>
                      <SelectItem value="NEET">NEET</SelectItem>
                      <SelectItem value="UPSC">UPSC</SelectItem>
                      <SelectItem value="SSC">SSC</SelectItem>
                      <SelectItem value="Banking">Banking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="video-price">Price (₹) *</Label>
                  <Input
                    id="video-price"
                    type="number"
                    value={videoData.price}
                    onChange={(e) => setVideoData({...videoData, price: e.target.value})}
                    placeholder="4999"
                  />
                </div>

                <div>
                  <Label htmlFor="video-url">Video URL</Label>
                  <Input
                    id="video-url"
                    value={videoData.videoUrl}
                    onChange={(e) => setVideoData({...videoData, videoUrl: e.target.value})}
                    placeholder="https://example.com/video.mp4"
                  />
                </div>

                <div>
                  <Label htmlFor="video-thumbnail">Thumbnail URL</Label>
                  <Input
                    id="video-thumbnail"
                    value={videoData.thumbnail}
                    onChange={(e) => setVideoData({...videoData, thumbnail: e.target.value})}
                    placeholder="https://placehold.co/400x300?text=Course+Thumbnail"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="video-description">Description</Label>
                <Textarea
                  id="video-description"
                  value={videoData.description}
                  onChange={(e) => setVideoData({...videoData, description: e.target.value})}
                  placeholder="Comprehensive course covering all JEE Physics topics..."
                  rows={4}
                />
              </div>

              <Button onClick={handleAddVideo} className="w-full">
                Add Video Course
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Book Management */}
        <TabsContent value="books">
          <Card>
            <CardHeader>
              <CardTitle>Add New Book</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="book-title">Book Title *</Label>
                  <Input
                    id="book-title"
                    value={bookData.title}
                    onChange={(e) => setBookData({...bookData, title: e.target.value})}
                    placeholder="JEE Physics Concept Book"
                  />
                </div>
                
                <div>
                  <Label htmlFor="book-author">Author *</Label>
                  <Input
                    id="book-author"
                    value={bookData.author}
                    onChange={(e) => setBookData({...bookData, author: e.target.value})}
                    placeholder="Dr. Rajesh Kumar"
                  />
                </div>

                <div>
                  <Label htmlFor="book-category">Category</Label>
                  <Input
                    id="book-category"
                    value={bookData.category}
                    onChange={(e) => setBookData({...bookData, category: e.target.value})}
                    placeholder="JEE Physics"
                  />
                </div>

                <div>
                  <Label htmlFor="book-price">Price (₹) *</Label>
                  <Input
                    id="book-price"
                    type="number"
                    value={bookData.price}
                    onChange={(e) => setBookData({...bookData, price: e.target.value})}
                    placeholder="899"
                  />
                </div>

                <div>
                  <Label htmlFor="book-pages">Total Pages</Label>
                  <Input
                    id="book-pages"
                    type="number"
                    value={bookData.pages}
                    onChange={(e) => setBookData({...bookData, pages: e.target.value})}
                    placeholder="650"
                  />
                </div>

                <div>
                  <Label htmlFor="book-type">Book Type</Label>
                  <Select value={bookData.type} onValueChange={(value) => setBookData({...bookData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hardcopy">📖 Hard Copy</SelectItem>
                      <SelectItem value="softcopy">📱 Soft Copy (PDF)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {bookData.type === 'softcopy' && (
                  <div>
                    <Label htmlFor="book-pdf">PDF URL</Label>
                    <Input
                      id="book-pdf"
                      value={bookData.pdfUrl}
                      onChange={(e) => setBookData({...bookData, pdfUrl: e.target.value})}
                      placeholder="https://example.com/book.pdf"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="book-thumbnail">Thumbnail URL</Label>
                  <Input
                    id="book-thumbnail"
                    value={bookData.thumbnail}
                    onChange={(e) => setBookData({...bookData, thumbnail: e.target.value})}
                    placeholder="https://placehold.co/300x400?text=Book+Cover"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="book-description">Description</Label>
                <Textarea
                  id="book-description"
                  value={bookData.description}
                  onChange={(e) => setBookData({...bookData, description: e.target.value})}
                  placeholder="Comprehensive concept book for JEE Physics..."
                  rows={4}
                />
              </div>

              <Button onClick={handleAddBook} className="w-full">
                Add Book
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Management */}
        <TabsContent value="tests">
          <Card>
            <CardHeader>
              <CardTitle>Add New Test Series</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="test-title">Test Series Title *</Label>
                  <Input
                    id="test-title"
                    value={testData.title}
                    onChange={(e) => setTestData({...testData, title: e.target.value})}
                    placeholder="JEE Main Mock Test Series"
                  />
                </div>
                
                <div>
                  <Label htmlFor="test-subject">Subject *</Label>
                  <Input
                    id="test-subject"
                    value={testData.subject}
                    onChange={(e) => setTestData({...testData, subject: e.target.value})}
                    placeholder="Physics, Chemistry, Mathematics"
                  />
                </div>

                <div>
                  <Label htmlFor="test-questions">Total Questions</Label>
                  <Input
                    id="test-questions"
                    type="number"
                    value={testData.totalQuestions}
                    onChange={(e) => setTestData({...testData, totalQuestions: e.target.value})}
                    placeholder="1875"
                  />
                </div>

                <div>
                  <Label htmlFor="test-duration">Duration per Test</Label>
                  <Input
                    id="test-duration"
                    value={testData.duration}
                    onChange={(e) => setTestData({...testData, duration: e.target.value})}
                    placeholder="3 hours"
                  />
                </div>

                <div>
                  <Label htmlFor="test-price">Price (₹) *</Label>
                  <Input
                    id="test-price"
                    type="number"
                    value={testData.price}
                    onChange={(e) => setTestData({...testData, price: e.target.value})}
                    placeholder="1999"
                  />
                </div>

                <div>
                  <Label htmlFor="test-thumbnail">Thumbnail URL</Label>
                  <Input
                    id="test-thumbnail"
                    value={testData.thumbnail}
                    onChange={(e) => setTestData({...testData, thumbnail: e.target.value})}
                    placeholder="https://placehold.co/400x300?text=Test+Series"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="test-description">Description</Label>
                <Textarea
                  id="test-description"
                  value={testData.description}
                  onChange={(e) => setTestData({...testData, description: e.target.value})}
                  placeholder="Complete mock test series for JEE Main preparation..."
                  rows={4}
                />
              </div>

              <Button onClick={handleAddTest} className="w-full">
                Add Test Series
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Class Management */}
        <TabsContent value="live">
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Live Class</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="live-title">Class Title *</Label>
                  <Input
                    id="live-title"
                    value={liveClassData.title}
                    onChange={(e) => setLiveClassData({...liveClassData, title: e.target.value})}
                    placeholder="JEE Physics Crash Course"
                  />
                </div>
                
                <div>
                  <Label htmlFor="live-instructor">Instructor *</Label>
                  <Input
                    id="live-instructor"
                    value={liveClassData.instructor}
                    onChange={(e) => setLiveClassData({...liveClassData, instructor: e.target.value})}
                    placeholder="Dr. Rajesh Kumar"
                  />
                </div>

                <div>
                  <Label htmlFor="live-date">Scheduled Date & Time *</Label>
                  <Input
                    id="live-date"
                    type="datetime-local"
                    value={liveClassData.scheduledDate}
                    onChange={(e) => setLiveClassData({...liveClassData, scheduledDate: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="live-duration">Duration</Label>
                  <Input
                    id="live-duration"
                    value={liveClassData.duration}
                    onChange={(e) => setLiveClassData({...liveClassData, duration: e.target.value})}
                    placeholder="2 hours"
                  />
                </div>

                <div>
                  <Label htmlFor="live-price">Price (₹)</Label>
                  <Input
                    id="live-price"
                    type="number"
                    value={liveClassData.price}
                    onChange={(e) => setLiveClassData({...liveClassData, price: e.target.value})}
                    placeholder="299"
                  />
                </div>

                <div>
                  <Label htmlFor="live-students">Max Students</Label>
                  <Input
                    id="live-students"
                    type="number"
                    value={liveClassData.maxStudents}
                    onChange={(e) => setLiveClassData({...liveClassData, maxStudents: e.target.value})}
                    placeholder="100"
                  />
                </div>

                <div>
                  <Label htmlFor="live-thumbnail">Thumbnail URL</Label>
                  <Input
                    id="live-thumbnail"
                    value={liveClassData.thumbnail}
                    onChange={(e) => setLiveClassData({...liveClassData, thumbnail: e.target.value})}
                    placeholder="https://placehold.co/400x300?text=Live+Class"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="live-description">Description</Label>
                <Textarea
                  id="live-description"
                  value={liveClassData.description}
                  onChange={(e) => setLiveClassData({...liveClassData, description: e.target.value})}
                  placeholder="Intensive live sessions covering important topics..."
                  rows={4}
                />
              </div>

              <Button onClick={handleAddLiveClass} className="w-full">
                Schedule Live Class
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
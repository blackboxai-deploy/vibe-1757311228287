'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// Razorpay integration
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PurchasePage() {
  const params = useParams();
  const router = useRouter();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // Mock course data (in real app, fetch based on params.id)
  const course = {
    id: params?.id,
    title: 'Complete JEE Main & Advanced Physics',
    description: 'Master Physics concepts for JEE with comprehensive video lectures and practice problems. This course covers all important topics including Mechanics, Thermodynamics, Waves, Optics, and Modern Physics.',
    thumbnail: 'https://placehold.co/400x300?text=JEE+Physics+Course+Purchase',
    instructor: 'Dr. Rajesh Kumar',
    price: 4999,
    originalPrice: 7999,
    duration: '120 hours',
    lessons: 150,
    category: 'JEE',
    level: 'intermediate',
    rating: 4.8,
    reviews: 1250,
    features: [
      '150+ HD Video Lectures',
      'Downloadable Content',
      'PDF Study Notes',
      'Practice Problems',
      'Doubt Support',
      '2 Year Access',
      'Mobile App Access',
      'Certificate of Completion'
    ],
    highlights: [
      'Taught by IIT Faculty',
      'Previous Year Questions Covered',
      'Step-by-step Problem Solving',
      'Concept Building Approach'
    ]
  };

  // Mock coupons
  const coupons = {
    'SAVE3000': { discount: 3000, type: 'fixed' },
    'SAVE20': { discount: 20, type: 'percentage' },
    'WELCOME15': { discount: 15, type: 'percentage' },
    'STUDENT50': { discount: 50, type: 'percentage' }
  };

  const applyCoupon = () => {
    const coupon = coupons[couponCode.toUpperCase() as keyof typeof coupons];
    if (coupon) {
      let discountAmount = 0;
      if (coupon.type === 'fixed') {
        discountAmount = coupon.discount;
      } else {
        discountAmount = Math.round((course.price * coupon.discount) / 100);
      }
      setDiscount(discountAmount);
      setAppliedCoupon(couponCode.toUpperCase());
      alert(`Coupon applied! You saved ₹${discountAmount.toLocaleString()}`);
    } else {
      alert('Invalid coupon code');
      setDiscount(0);
      setAppliedCoupon('');
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setAppliedCoupon('');
  };

  const finalAmount = Math.max(course.price - discount, 0);
  const totalSavings = (course.originalPrice - course.price) + discount;

  const handlePayment = () => {
    setIsProcessingPayment(true);

    // Mock Razorpay integration
    const options = {
      key: 'rzp_test_1234567890', // Demo key
      amount: finalAmount * 100, // Amount in paise
      currency: 'INR',
      name: 'Studypur Classes',
      description: course.title,
      image: 'https://placehold.co/100x100?text=Studypur+Logo',
      handler: function (response: any) {
        console.log('Payment successful:', response);
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        router.push(`/purchase/success?payment_id=${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'Demo User',
        email: 'demo@studypur.com',
        contact: '9876543210'
      },
      theme: {
        color: '#3B82F6'
      },
      modal: {
        ondismiss: function() {
          setIsProcessingPayment(false);
          console.log('Payment cancelled');
        }
      }
    };

    // Check if Razorpay is loaded
    if (typeof window !== 'undefined' && window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      // Fallback for demo
      setTimeout(() => {
        alert('Payment completed successfully! (Demo Mode)');
        setIsProcessingPayment(false);
        router.push('/purchase/success');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-2">
          <Link href="/videos">
            <Button variant="ghost" size="sm">← Back</Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Purchase Course</h1>
        </div>
      </header>

      <main className="p-4 max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Course Details */}
          <div className="space-y-6">
            <Card>
              <div className="relative aspect-video bg-gray-100">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <Badge className="absolute top-4 right-4 bg-blue-500">
                  {course.category}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h1>
                    <p className="text-gray-600 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      👨‍🏫 {course.instructor}
                    </span>
                    <span className="flex items-center gap-1">
                      ⭐ {course.rating} ({course.reviews} reviews)
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4 bg-gray-50 rounded-lg px-4">
                    <div className="text-center">
                      <div className="font-bold text-blue-600">{course.lessons}</div>
                      <div className="text-xs text-gray-600">Lessons</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">{course.duration}</div>
                      <div className="text-xs text-gray-600">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-purple-600">{course.level}</div>
                      <div className="text-xs text-gray-600">Level</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Get</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-green-500">✅</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Course Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {course.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-blue-500">⭐</span>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Course Purchase</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Course Price:</span>
                    <span className="text-lg font-semibold">₹{course.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Original Price:</span>
                    <span className="line-through">₹{course.originalPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-green-600">
                    <span>Course Discount:</span>
                    <span>-₹{(course.originalPrice - course.price).toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between text-sm text-green-600">
                      <span>Coupon Discount ({appliedCoupon}):</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-blue-600">₹{finalAmount.toLocaleString()}</span>
                  </div>

                  <div className="text-center text-sm text-green-600 font-medium">
                    You save ₹{totalSavings.toLocaleString()} total!
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Apply Coupon Code</h4>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✅</span>
                        <span className="text-green-700 font-medium">Coupon "{appliedCoupon}" applied</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={removeCoupon} className="text-red-600">
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1"
                      />
                      <Button onClick={applyCoupon} variant="outline">
                        Apply
                      </Button>
                    </div>
                  )}
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Try: SAVE3000, SAVE20, WELCOME15, STUDENT50
                  </div>
                </div>

                {/* Payment Button */}
                <Button 
                  onClick={handlePayment} 
                  disabled={isProcessingPayment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                >
                  {isProcessingPayment ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Processing...
                    </span>
                  ) : (
                    <>
                      💳 Pay ₹{finalAmount.toLocaleString()} & Start Learning
                    </>
                  )}
                </Button>

                {/* Payment Methods */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Secure Payment via Razorpay</p>
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <span className="bg-gray-100 px-2 py-1 rounded">💳 Cards</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">📱 UPI</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">🏦 Net Banking</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">💰 Wallets</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-600">
                    <div>
                      <span className="block text-lg mb-1">🔒</span>
                      <span>256-bit SSL</span>
                    </div>
                    <div>
                      <span className="block text-lg mb-1">🔄</span>
                      <span>7-day Refund</span>
                    </div>
                    <div>
                      <span className="block text-lg mb-1">📱</span>
                      <span>Lifetime Access</span>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="text-xs text-gray-500 text-center">
                  By purchasing, you agree to our{' '}
                  <Link href="/terms" className="text-blue-600 underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-blue-600 underline">Privacy Policy</Link>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">How long do I have access?</h4>
                  <p className="text-sm text-gray-600">You get 2 years of unlimited access to all course content.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Can I download the videos?</h4>
                  <p className="text-sm text-gray-600">Yes, all videos are downloadable for offline viewing via our mobile app.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Is there a refund policy?</h4>
                  <p className="text-sm text-gray-600">We offer a 7-day no-questions-asked refund policy.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Payment methods supported?</h4>
                  <p className="text-sm text-gray-600">All major credit/debit cards, UPI, net banking, and digital wallets are supported.</p>
                </div>
              </CardContent>
            </Card>
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
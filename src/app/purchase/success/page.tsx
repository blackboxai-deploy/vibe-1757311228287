'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PurchaseSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Success Message */}
        <Card className="text-center border-green-200 bg-green-50">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-white">✅</span>
            </div>
            <h1 className="text-2xl font-bold text-green-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-green-700">
              Your course has been successfully purchased.
            </p>
          </CardContent>
        </Card>

        {/* Purchase Info */}
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-gray-900 mb-4">Course Access Activated</h3>
            <p className="text-gray-600 mb-6">
              You now have full access to your purchased course.
            </p>
            
            <div className="space-y-3">
              <Link href="/videos">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  🚀 Start Learning
                </Button>
              </Link>
              
              <Link href="/purchases">
                <Button variant="outline" className="w-full">
                  View My Purchases
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="ghost" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { NextRequest, NextResponse } from 'next/server';

// Mock Razorpay order creation
export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'INR', courseId, userId } = await request.json();

    // Validate required fields
    if (!amount || !courseId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mock Razorpay order creation
    const order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      entity: 'order',
      amount: amount * 100, // Convert to paise
      amount_paid: 0,
      amount_due: amount * 100,
      currency,
      receipt: `receipt_${courseId}_${Date.now()}`,
      status: 'created',
      attempts: 0,
      notes: {
        courseId,
        userId: userId || 'guest',
        created_at: new Date().toISOString()
      },
      created_at: Math.floor(Date.now() / 1000)
    };

    // In a real implementation, you would:
    // 1. Create order in Razorpay using their API
    // 2. Store order details in your database
    // 3. Return the order details to frontend

    console.log('Mock Razorpay Order Created:', order);

    return NextResponse.json({
      success: true,
      order: order,
      key: 'rzp_test_demo123456', // Demo Razorpay key
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle GET requests for order status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json(
      { success: false, error: 'Order ID is required' },
      { status: 400 }
    );
  }

  // Mock order status check
  const orderStatus = {
    id: orderId,
    status: 'paid', // Mock successful payment
    amount: 499900, // Amount in paise
    amount_paid: 499900,
    currency: 'INR',
    receipt: `receipt_${orderId}`,
    created_at: Math.floor(Date.now() / 1000),
    paid_at: Math.floor(Date.now() / 1000)
  };

  return NextResponse.json({
    success: true,
    order: orderStatus,
    message: 'Order status retrieved successfully'
  });
}
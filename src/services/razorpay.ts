// Razorpay Payment Integration Service for Studypur Classes

export interface PaymentOptions {
  amount: number;
  currency?: string;
  courseId: string;
  courseName: string;
  userEmail?: string;
  userName?: string;
  userPhone?: string;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  error?: string;
}

class RazorpayService {
  private readonly keyId = 'rzp_test_demo123456'; // Demo key
  private readonly keySecret = 'demo_secret_key'; // Demo secret

  // Create Razorpay order
  async createOrder(options: PaymentOptions): Promise<any> {
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: options.amount,
          currency: options.currency || 'INR',
          courseId: options.courseId,
          userId: 'demo_user',
          receipt: `receipt_${options.courseId}_${Date.now()}`
        }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create order');
      }

      return result.order;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw error;
    }
  }

  // Initialize Razorpay payment
  async initiatePayment(options: PaymentOptions): Promise<PaymentResult> {
    try {
      // Create order first
      const order = await this.createOrder(options);

      return new Promise((resolve) => {
        // Check if Razorpay is available
        if (typeof window === 'undefined' || !window.Razorpay) {
          // Fallback for demo mode
          console.log('Razorpay not loaded, using demo mode');
          setTimeout(() => {
            resolve({
              success: true,
              paymentId: `pay_demo_${Date.now()}`,
              orderId: order.id,
            });
          }, 2000);
          return;
        }

        const razorpayOptions = {
          key: this.keyId,
          amount: order.amount,
          currency: order.currency,
          name: 'Studypur Classes',
          description: options.courseName,
          order_id: order.id,
          image: '/logo.png', // Your logo URL
          handler: (response: RazorpayResponse) => {
            console.log('Payment successful:', response);
            this.verifyPayment(response, options.courseId)
              .then(() => {
                resolve({
                  success: true,
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                });
              })
              .catch((error) => {
                resolve({
                  success: false,
                  error: error.message || 'Payment verification failed'
                });
              });
          },
          prefill: {
            name: options.userName || 'Student',
            email: options.userEmail || 'student@studypur.com',
            contact: options.userPhone || '9876543210'
          },
          notes: {
            courseId: options.courseId,
            courseName: options.courseName
          },
          theme: {
            color: '#3B82F6' // Blue color matching your app theme
          },
          modal: {
            ondismiss: () => {
              resolve({
                success: false,
                error: 'Payment cancelled by user'
              });
            }
          }
        };

        const rzp = new window.Razorpay(razorpayOptions);
        rzp.open();
      });

    } catch (error) {
      console.error('Error initiating payment:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment initiation failed'
      };
    }
  }

  // Verify payment with backend
  private async verifyPayment(response: RazorpayResponse, courseId: string): Promise<void> {
    try {
      const verificationResponse = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          courseId,
          userId: 'demo_user'
        }),
      });

      const result = await verificationResponse.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Payment verification failed');
      }

      console.log('Payment verified successfully:', result);
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }

  // Check payment status
  async checkPaymentStatus(orderId: string): Promise<any> {
    try {
      const response = await fetch(`/api/payment/create-order?orderId=${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to check payment status');
      }

      return result.order;
    } catch (error) {
      console.error('Error checking payment status:', error);
      throw error;
    }
  }

  // Utility function to format amount for display
  formatAmount(amount: number, currency = 'INR'): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Utility function to validate amount
  validateAmount(amount: number): boolean {
    return amount > 0 && amount <= 15000000; // Razorpay limit: ₹1.5 crore
  }
}

// Export singleton instance
export const razorpayService = new RazorpayService();

// Export types for use in components
export type { PaymentOptions, RazorpayResponse, PaymentResult };
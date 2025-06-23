import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';
import LiveTrackingMap from '@/components/LiveTrackingMap';

// shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Define the order status type to match the OrderTracker component
type OrderStatus = 'confirmed' | 'kitchen' | 'delivery' | 'delivered';
const orderStatuses: OrderStatus[] = ['confirmed', 'kitchen', 'delivery', 'delivered'];

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');

  const [status, setStatus] = useState<OrderStatus>('confirmed');

  useEffect(() => {
    // Simulate order status progression
    const currentStatusIndex = orderStatuses.indexOf(status);
    if (currentStatusIndex < orderStatuses.length - 1) {
      const timer = setTimeout(() => {
        setStatus(orderStatuses[currentStatusIndex + 1]);
      }, 8000); // Progress to the next status every 8 seconds

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto max-w-5xl py-8 md:py-12">
          <div className="space-y-8">
            {/* Top section with status tracker */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
                  We're working on your order!
                </CardTitle>
                <CardDescription>
                  Order #FF-123456 - Estimated arrival in 15-25 minutes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrderTracker currentStatus={status} />
              </CardContent>
            </Card>

            {/* Map and Order Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Live Tracking Map */}
              <div className="lg:col-span-3">
                <LiveTrackingMap />
              </div>

              {/* Order Summary Card */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>From: The Gourmet Place</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-muted-foreground">1 x Ultimate Burger</span>
                        <span className="font-semibold">$15.99</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-muted-foreground">1 x Garlic Fries</span>
                        <span className="font-semibold">$4.50</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-muted-foreground">1 x Vanilla Shake</span>
                        <span className="font-semibold">$6.00</span>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex justify-between font-medium">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>$26.49</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span>$3.00</span>
                      </div>
                      <Separator className="my-4" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>$29.49</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;
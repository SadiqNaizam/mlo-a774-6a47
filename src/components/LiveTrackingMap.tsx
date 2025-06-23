import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Bike, Home, Store, Phone } from 'lucide-react';

const LiveTrackingMap: React.FC = () => {
  console.log('LiveTrackingMap loaded');
  const [courierPosition, setCourierPosition] = useState({ x: 10, y: 50 });
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCourierPosition(prevPos => {
        const newX = prevPos.x >= 90 ? 90 : prevPos.x + 2;
        return { ...prevPos, x: newX };
      });

      setProgress(prevProgress => {
        const newProgress = prevProgress >= 100 ? 100 : prevProgress + 2.5;
        return newProgress;
      });
    }, 2000);

    // Stop the simulation when the courier reaches the destination
    if (progress >= 100) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [progress]);

  const estimatedTime = progress >= 100 ? "Arrived" : `${Math.round(15 - (progress / 100 * 15))} min remaining`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Live Delivery Tracking</CardTitle>
        <CardDescription>
          Your order is on its way! Watch your courier in real-time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Map Placeholder */}
        <div className="relative w-full h-64 md:h-80 bg-slate-200 rounded-md overflow-hidden">
          {/* A static map-like background image */}
          <img
            src="https://placehold.co/800x400/e2e8f0/64748b?text=Map+View"
            alt="Map Placeholder"
            className="w-full h-full object-cover"
          />

          {/* Dotted line for the path */}
          <div
            className="absolute top-1/2 left-[10%] w-[80%] border-t-2 border-dashed border-gray-500"
            style={{ transform: 'translateY(-50%)' }}
          ></div>

          {/* Restaurant Icon (Start) */}
          <div className="absolute top-1/2 left-[10%] -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg">
            <Store className="h-5 w-5 text-gray-700" />
          </div>

          {/* Home Icon (End) */}
          <div className="absolute top-1/2 left-[90%] -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg">
            <Home className="h-5 w-5 text-green-600" />
          </div>

          {/* Courier Icon (Animated) */}
          <div
            className="absolute transition-all duration-1000 ease-linear"
            style={{
              top: `${courierPosition.y}%`,
              left: `${courierPosition.x}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="bg-blue-500 p-2 rounded-full shadow-xl">
              <Bike className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Restaurant</span>
            <span className="font-semibold">{estimatedTime}</span>
            <span>Your Location</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-slate-50 border-t p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Courier" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-muted-foreground">Your Courier</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-600 hover:underline cursor-pointer">
          <Phone className="h-4 w-4" />
          <span>Contact Courier</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LiveTrackingMap;
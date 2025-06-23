import React from 'react';
import { CheckCircle2, ChefHat, Truck, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type OrderStatus = 'confirmed' | 'kitchen' | 'delivery' | 'delivered';

interface OrderTrackerProps {
  currentStatus: OrderStatus;
}

const steps = [
  {
    id: 'confirmed',
    label: 'Order Confirmed',
    icon: CheckCircle2,
  },
  {
    id: 'kitchen',
    label: 'In the Kitchen',
    icon: ChefHat,
  },
  {
    id: 'delivery',
    label: 'Out for Delivery',
    icon: Truck,
  },
  {
    id: 'delivered',
    label: 'Delivered',
    icon: PackageCheck,
  },
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStatus }) => {
  console.log('OrderTracker loaded with status:', currentStatus);
  const currentStepIndex = steps.findIndex(step => step.id === currentStatus);

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500',
                    isCompleted ? 'bg-green-500 border-green-500 text-white' : '',
                    isActive ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/50' : '',
                    !isCompleted && !isActive ? 'bg-gray-100 border-gray-300 text-gray-400' : ''
                  )}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <p
                  className={cn(
                    'mt-2 text-xs sm:text-sm font-medium transition-colors duration-500',
                    isCompleted || isActive ? 'text-gray-800' : 'text-gray-500'
                  )}
                >
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-2 transition-colors duration-500',
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracker;
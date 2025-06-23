import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock, Truck } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  slug: string; // Good for key prop and future-proofing, e.g. /restaurant-menu?name=slug
  name: string;
  imageUrl: string;
  cuisine: string;
  rating: number;
  deliveryTime: string; // e.g., "25-35 min"
  deliveryFee: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  slug,
  name,
  imageUrl,
  cuisine,
  rating,
  deliveryTime,
  deliveryFee,
}) => {
  console.log(`RestaurantCard loaded for: ${name}`);

  // The link navigates to the generic menu page as specified in App.tsx.
  // In a real app, you might pass state or use query params like `/restaurant-menu?id=${id}`.
  return (
    <Link 
      to="/restaurant-menu"
      state={{ restaurantId: id }} // Pass restaurant ID via state for the menu page to use
      className="block group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xl"
      aria-label={`View menu for ${name}`}
    >
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col rounded-xl border">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Delicious+Food'}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <Badge className="absolute top-3 right-3" variant="secondary">{cuisine}</Badge>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <CardTitle className="text-lg font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
              {name}
            </CardTitle>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-2 pt-2 border-t">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              <span>
                {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
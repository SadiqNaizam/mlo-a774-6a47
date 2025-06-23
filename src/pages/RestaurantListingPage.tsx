import React, { useState, useMemo } from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';

// shadcn/ui Components for Filtering and Layout
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';

// Mock Data for Restaurants
const allRestaurants = [
  { id: '1', slug: 'the-sushi-spot', name: 'The Sushi Spot', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800', cuisine: 'Japanese', rating: 4.8, deliveryTime: '20-30 min', deliveryFee: 2.99 },
  { id: '2', slug: 'pizza-palace', name: 'Pizza Palace', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800', cuisine: 'Italian', rating: 4.5, deliveryTime: '30-40 min', deliveryFee: 0 },
  { id: '3', slug: 'taco-town', name: 'Taco Town', imageUrl: 'https://images.unsplash.com/photo-1565299585323-15d6e08547e9?q=80&w=800', cuisine: 'Mexican', rating: 4.7, deliveryTime: '15-25 min', deliveryFee: 1.50 },
  { id: '4', slug: 'burger-bliss', name: 'Burger Bliss', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800', cuisine: 'American', rating: 4.3, deliveryTime: '25-35 min', deliveryFee: 3.00 },
  { id: '5', slug: 'veggie-vibes', name: 'Veggie Vibes', imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800', cuisine: 'Vegetarian', rating: 4.9, deliveryTime: '30-40 min', deliveryFee: 0 },
  { id: '6', slug: 'curry-corner', name: 'Curry Corner', imageUrl: 'https://images.unsplash.com/photo-1565557623262-b9a25b3935de?q=80&w=800', cuisine: 'Indian', rating: 4.6, deliveryTime: '35-45 min', deliveryFee: 2.00 },
  { id: '7', slug: 'pasta-paradise', name: 'Pasta Paradise', imageUrl: 'https://images.unsplash.com/photo-1621996346565-e32644d62303?q=80&w=800', cuisine: 'Italian', rating: 4.7, deliveryTime: '25-35 min', deliveryFee: 2.50 },
  { id: '8', slug: 'ramen-republic', name: 'Ramen Republic', imageUrl: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?q=80&w=800', cuisine: 'Japanese', rating: 4.8, deliveryTime: '20-30 min', deliveryFee: 1.00 },
];

const cuisineOptions = ['Italian', 'Japanese', 'Mexican', 'American', 'Vegetarian', 'Indian'];

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');

  const [sortBy, setSortBy] = useState('rating');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [deliveryFee, setDeliveryFee] = useState([5]); // Max delivery fee

  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    setSelectedCuisines(prev =>
      checked ? [...prev, cuisine] : prev.filter(c => c !== cuisine)
    );
  };
  
  const filteredRestaurants = useMemo(() => {
    return allRestaurants
      .filter(restaurant => {
        const feeMatch = restaurant.deliveryFee <= deliveryFee[0];
        const cuisineMatch = selectedCuisines.length === 0 || selectedCuisines.includes(restaurant.cuisine);
        return feeMatch && cuisineMatch;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'deliveryTime') {
          // Simplified sort: uses the lower bound of the delivery time string
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        }
        return 0;
      });
  }, [sortBy, selectedCuisines, deliveryFee]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-1/4 xl:w-1/5">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Filter & Sort</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sort By */}
                <div>
                  <Label htmlFor="sort-by" className="text-base font-semibold">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort-by" className="w-full mt-2">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Top Rated</SelectItem>
                      <SelectItem value="deliveryTime">Fastest Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Filter by Cuisine */}
                <div>
                  <h3 className="text-base font-semibold mb-2">Cuisine</h3>
                  <div className="space-y-2">
                    {cuisineOptions.map(cuisine => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cuisine-${cuisine}`}
                          onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
                          checked={selectedCuisines.includes(cuisine)}
                        />
                        <Label htmlFor={`cuisine-${cuisine}`} className="font-normal cursor-pointer">{cuisine}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Filter by Delivery Fee */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-semibold">Max Delivery Fee</h3>
                    <span className="text-sm font-medium text-primary">${deliveryFee[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    defaultValue={[5]}
                    max={10}
                    step={0.5}
                    onValueChange={setDeliveryFee}
                  />
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Restaurant Grid */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">
              {filteredRestaurants.length > 0
                ? `${filteredRestaurants.length} Restaurants Found`
                : "No Restaurants Found"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                   <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;
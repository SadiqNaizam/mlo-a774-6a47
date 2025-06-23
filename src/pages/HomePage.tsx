import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Custom UI Components
import RestaurantCard from '../components/RestaurantCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Icons
import { Search } from 'lucide-react';

// Placeholder data for restaurants
const restaurantData = [
  {
    id: '1',
    slug: 'the-sizzling-grill',
    name: 'The Sizzling Grill',
    imageUrl: 'https://placehold.co/600x400/ef4444/white?text=Grill',
    cuisine: 'American',
    rating: 4.7,
    deliveryTime: '30-40 min',
    deliveryFee: 3.99,
  },
  {
    id: '2',
    slug: 'tokyo-sushi-house',
    name: 'Tokyo Sushi House',
    imageUrl: 'https://placehold.co/600x400/3b82f6/white?text=Sushi',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
  },
  {
    id: '3',
    slug: 'bella-italia-pizzeria',
    name: 'Bella Italia Pizzeria',
    imageUrl: 'https://placehold.co/600x400/22c55e/white?text=Pizza',
    cuisine: 'Italian',
    rating: 4.6,
    deliveryTime: '25-35 min',
    deliveryFee: 0,
  },
  {
    id: '4',
    slug: 'curry-kingdom',
    name: 'Curry Kingdom',
    imageUrl: 'https://placehold.co/600x400/f97316/white?text=Curry',
    cuisine: 'Indian',
    rating: 4.8,
    deliveryTime: '35-45 min',
    deliveryFee: 2.49,
  },
  {
    id: '5',
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://placehold.co/600x400/eab308/white?text=Tacos',
    cuisine: 'Mexican',
    rating: 4.5,
    deliveryTime: '15-25 min',
    deliveryFee: 0,
  },
  {
    id: '6',
    slug: 'pho-real',
    name: 'Pho Real',
    imageUrl: 'https://placehold.co/600x400/8b5cf6/white?text=Pho',
    cuisine: 'Vietnamese',
    rating: 4.7,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
  },
  {
    id: '7',
    slug: 'the-burger-joint',
    name: 'The Burger Joint',
    imageUrl: 'https://placehold.co/600x400/f472b6/white?text=Burger',
    cuisine: 'American',
    rating: 4.4,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
  },
  {
    id: '8',
    slug: 'veggie-delight',
    name: 'Veggie Delight',
    imageUrl: 'https://placehold.co/600x400/10b981/white?text=Salad',
    cuisine: 'Vegan',
    rating: 4.9,
    deliveryTime: '20-30 min',
    deliveryFee: 3.49,
  },
];

const HomePage = () => {
  console.log('HomePage loaded');

  // Filter for carousels
  const topRatedRestaurants = [...restaurantData].sort((a, b) => b.rating - a.rating);
  const fastestDelivery = [...restaurantData].filter(r => r.deliveryFee === 0);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-slate-50">
          <div className="absolute inset-0 bg-[url('https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-cA_vJI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-ddmfs-4x3-56eABA38332D4C2185031D794DAB3ED3.jpg')] bg-cover bg-center opacity-10"></div>
          <div className="container relative text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Your next meal, delivered.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Discover the best local restaurants and get your favorite food delivered fast.
            </p>
            <div className="mt-8 max-w-xl mx-auto flex items-center gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="search" placeholder="Search for food or restaurants" className="pl-10 h-12 text-base"/>
              </div>
              <Link to="/restaurant-listing">
                <Button size="lg">Search</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Carousel: Top Rated */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Top Rated Near You</h2>
              <Button asChild variant="link">
                <Link to="/restaurant-listing">See All &rarr;</Link>
              </Button>
            </div>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {topRatedRestaurants.map((restaurant) => (
                  <CarouselItem key={restaurant.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-3">
                    <RestaurantCard {...restaurant} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>
        
        {/* Carousel: Fastest Delivery */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="container">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Free Delivery Deals</h2>
               <Button asChild variant="link">
                <Link to="/restaurant-listing">See All &rarr;</Link>
              </Button>
            </div>
             <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {fastestDelivery.map((restaurant) => (
                  <CarouselItem key={restaurant.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-3">
                    <RestaurantCard {...restaurant} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Grid: All Restaurants */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">All Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {restaurantData.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
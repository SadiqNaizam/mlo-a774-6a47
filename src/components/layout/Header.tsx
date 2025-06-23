import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UtensilsCrossed, MapPin, Search, ShoppingCart, User } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-4">
          <UtensilsCrossed className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl hidden sm:inline-block">FoodFleet</span>
        </Link>

        {/* Address and Search */}
        <div className="flex-1 flex items-center gap-2 max-w-2xl">
          {/* Delivery Address Input */}
          <div className="relative flex-grow hidden md:flex items-center">
            <MapPin className="absolute left-3 h-5 w-5 text-muted-foreground" />
            <Input type="text" placeholder="Enter delivery address" className="pl-10" />
          </div>

          {/* Search Bar */}
          <div className="relative flex-grow w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for restaurants..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/checkout">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Open Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
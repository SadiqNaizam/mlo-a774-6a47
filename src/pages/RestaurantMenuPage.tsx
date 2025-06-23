import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'sonner';

// Import Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import shadcn/ui Components
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Import Icons
import { Star, Clock, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';

// --- MOCK DATA --- //
// In a real app, this would come from an API call using the restaurantId
const restaurantData = {
  id: '1',
  name: 'The Gourmet Kitchen',
  cuisine: 'Italian',
  rating: 4.7,
  deliveryTime: '30-45 min',
  imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
  menu: {
    Appetizers: [
      { id: 'm1', name: 'Bruschetta', description: 'Toasted bread with tomatoes, garlic, and basil.', price: 8.99, imageUrl: 'https://images.unsplash.com/photo-1505253716362-afb542c38548?q=80&w=2070&auto=format&fit=crop' },
      { id: 'm2', name: 'Stuffed Mushrooms', description: 'Mushrooms filled with cheese and herbs.', price: 10.50, imageUrl: 'https://images.unsplash.com/photo-1629552199324-93565e38f1b6?q=80&w=1964&auto=format&fit=crop' },
    ],
    'Main Courses': [
      { id: 'm3', name: 'Pasta Carbonara', description: 'Classic pasta with eggs, cheese, and pancetta.', price: 16.00, imageUrl: 'https://images.unsplash.com/photo-1600803907087-f56d462fd26b?q=80&w=1974&auto=format&fit=crop' },
      { id: 'm4', name: 'Margherita Pizza', description: 'Simple and delicious pizza with fresh mozzarella and basil.', price: 14.50, imageUrl: 'https://images.unsplash.com/photo-1598021680133-eb3a7331d3b0?q=80&w=2103&auto=format&fit=crop' },
      { id: 'm5', name: 'Grilled Salmon', description: 'Served with asparagus and lemon butter sauce.', price: 22.99, imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop' },
    ],
    Desserts: [
      { id: 'm6', name: 'Tiramisu', description: 'A coffee-flavored Italian classic.', price: 9.00, imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=2070&auto=format&fit=crop' },
    ],
  },
};

// --- TYPES --- //
interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}
interface CartItem extends MenuItem {
    quantity: number;
    specialInstructions?: string;
}

// --- SUB-COMPONENTS --- //
const MenuItemCard: React.FC<{ item: MenuItem; onAdd: () => void; }> = ({ item, onAdd }) => (
    <Card className="flex flex-col overflow-hidden">
        <div className="flex-1 p-6 flex justify-between gap-4">
            <div className="flex-1">
                <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
                <CardDescription className="text-sm mb-2">{item.description}</CardDescription>
                <p className="font-semibold">${item.price.toFixed(2)}</p>
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-md" />
            </div>
        </div>
        <CardFooter className="p-6 pt-0">
            <Button onClick={onAdd} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
        </CardFooter>
    </Card>
);


const RestaurantMenuPage: React.FC = () => {
    const location = useLocation();
    // In a real app, you'd fetch data based on `location.state?.restaurantId`
    console.log('RestaurantMenuPage loaded for restaurantId:', location.state?.restaurantId);
    
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddItemClick = (item: MenuItem) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    };
    
    const handleAddToCart = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedItem) return;

        const formData = new FormData(e.currentTarget);
        const quantity = parseInt(formData.get('quantity') as string, 10);
        const specialInstructions = formData.get('instructions') as string;

        const existingItemIndex = cart.findIndex(item => item.id === selectedItem.id);

        if (existingItemIndex > -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += quantity;
            if(specialInstructions) {
              updatedCart[existingItemIndex].specialInstructions = `${updatedCart[existingItemIndex].specialInstructions || ''}\n${specialInstructions}`.trim();
            }
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...selectedItem, quantity, specialInstructions }]);
        }

        toast.success(`${selectedItem.name} added to your order!`);
        setIsDialogOpen(false);
        setSelectedItem(null);
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) {
            setCart(cart.filter(item => item.id !== id));
        } else {
            setCart(cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
        }
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const CartContent = () => (
        <div className="flex flex-col h-full">
            {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="font-semibold">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground">Add items from the menu to get started.</p>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto -mx-4 px-4">
                    {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-4 py-4">
                            <div className="flex-1">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                    {item.quantity === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                                </Button>
                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {cart.length > 0 && (
                 <>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <Button asChild size="lg" className="mt-4 w-full">
                        <Link to="/checkout" state={{ cart, subtotal }}>Go to Checkout</Link>
                    </Button>
                 </>
            )}
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-slate-50">
                {/* Restaurant Hero Image */}
                <div className="h-48 md:h-64 w-full relative">
                    <img src={restaurantData.imageUrl} alt={restaurantData.name} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="container -mt-16 relative pb-16">
                    {/* Restaurant Info Card */}
                    <Card className="mb-8 shadow-lg">
                        <CardHeader>
                            <Breadcrumb className="mb-2">
                                <BreadcrumbList>
                                    <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem><BreadcrumbLink asChild><Link to="/restaurant-listing">Restaurants</Link></BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem><BreadcrumbPage>{restaurantData.name}</BreadcrumbPage></BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <CardTitle className="text-3xl md:text-4xl">{restaurantData.name}</CardTitle>
                            <div className="flex items-center gap-4 text-muted-foreground pt-2">
                                <Badge variant="secondary">{restaurantData.cuisine}</Badge>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 
                                    <span>{restaurantData.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" /> 
                                    <span>{restaurantData.deliveryTime}</span>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Menu and Cart Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {Object.entries(restaurantData.menu).map(([category, items]) => (
                                <section key={category}>
                                    <h2 className="text-2xl font-bold tracking-tight mb-4">{category}</h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {items.map(item => (
                                            <MenuItemCard key={item.id} item={item} onAdd={() => handleAddItemClick(item)} />
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>

                        {/* Desktop Cart */}
                        <aside className="hidden lg:block lg:col-span-1">
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>Your Order</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CartContent />
                                </CardContent>
                            </Card>
                        </aside>
                    </div>
                </div>
            </main>

            {/* Mobile Cart Sheet Trigger */}
            {cart.length > 0 && (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="lg:hidden fixed bottom-4 right-4 rounded-full h-16 w-16 shadow-lg z-50 text-lg">
                            <ShoppingCart className="h-6 w-6 mr-2" /> ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col">
                        <SheetHeader>
                            <SheetTitle>Your Order</SheetTitle>
                            <SheetDescription>Review your items before checkout.</SheetDescription>
                        </SheetHeader>
                        <div className="flex-grow overflow-y-auto">
                           <CartContent />
                        </div>
                    </SheetContent>
                </Sheet>
            )}

            {/* Customization Dialog */}
            {selectedItem && (
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <form onSubmit={handleAddToCart}>
                            <DialogHeader>
                                <DialogTitle>{selectedItem.name}</DialogTitle>
                                <DialogDescription>{selectedItem.description}</DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input id="quantity" name="quantity" type="number" defaultValue={1} min={1} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instructions">Special Instructions</Label>
                                    <Textarea id="instructions" name="instructions" placeholder="Any special requests? (e.g., no onions)" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Add to Order - ${selectedItem.price.toFixed(2)}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
            
            <Footer />
        </div>
    );
};

export default RestaurantMenuPage;
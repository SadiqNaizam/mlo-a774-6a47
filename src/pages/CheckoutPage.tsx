import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { CreditCard, Wallet, Apple } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  city: z.string().min(2, { message: "Please enter a city." }),
  zipCode: z.string().regex(/^\d{5}$/, { message: "Please enter a valid 5-digit zip code." }),
  paymentMethod: z.enum(['credit-card', 'paypal', 'apple-pay'], {
    required_error: "You need to select a payment method.",
  }),
  promoCode: z.string().optional(),
});

// Mock data for order summary
const orderItems = [
  { id: 'item1', name: 'Deluxe Sushi Platter', price: 29.99, quantity: 1 },
  { id: 'item2', name: 'Edamame', price: 5.50, quantity: 2 },
  { id: 'item3', name: 'Green Tea', price: 2.25, quantity: 2 },
];

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      zipCode: "",
      promoCode: "",
    },
  });

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Order placed:", values);
    // On successful order, navigate to the tracking page
    navigate('/order-tracking'); // Route from App.tsx
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Checkout</h1>
            <p className="text-muted-foreground mt-2">Complete your order by providing the details below.</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Column: Form Details */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Delicious Lane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Foodville" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select a way to pay for your order.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                          >
                            <Label htmlFor="credit-card" className="border rounded-md p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent [&:has([data-state=checked])]:border-primary">
                                <RadioGroupItem value="credit-card" id="credit-card" className="sr-only" />
                                <CreditCard className="h-8 w-8" />
                                <span className="font-medium">Credit Card</span>
                            </Label>
                            <Label htmlFor="paypal" className="border rounded-md p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent [&:has([data-state=checked])]:border-primary">
                                <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                                <Wallet className="h-8 w-8" />
                                <span className="font-medium">PayPal</span>
                            </Label>
                             <Label htmlFor="apple-pay" className="border rounded-md p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent [&:has([data-state=checked])]:border-primary">
                                <RadioGroupItem value="apple-pay" id="apple-pay" className="sr-only" />
                                <Apple className="h-8 w-8" />
                                <span className="font-medium">Apple Pay</span>
                            </Label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="pt-4" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {orderItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{item.name} x {item.quantity}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                   <div className="flex items-center gap-2">
                      <FormField
                          control={form.control}
                          name="promoCode"
                          render={({ field }) => (
                              <FormItem className="flex-grow">
                                  <FormControl>
                                      <Input placeholder="Promo Code" {...field} />
                                  </FormControl>
                              </FormItem>
                          )}
                      />
                      <Button type="button" variant="outline">Apply</Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button type="submit" className="w-full" size="lg">Place Order</Button>
                </CardContent>
              </Card>
            </div>
            
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
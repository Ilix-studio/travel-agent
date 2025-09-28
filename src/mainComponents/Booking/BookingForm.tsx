import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Users, MapPin, Clock, Star } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  destination?: {
    id: string;
    name: string;
    country: string;
    price: number;
    duration: string;
    rating: number;
    image: string;
  };
}

export function BookingForm({ destination }: BookingFormProps) {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [travelers, setTravelers] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate booking API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    // In real app, redirect to confirmation page
  };

  const totalPrice = destination ? destination.price * travelers : 0;

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='grid md:grid-cols-2 gap-8'>
        {/* Destination Summary */}
        {destination && (
          <Card>
            <CardHeader>
              <CardTitle>Your Destination</CardTitle>
              <CardDescription>
                Review your selected travel package
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div
                  className='h-48 bg-cover bg-center rounded-lg'
                  style={{ backgroundImage: `url(₹{destination.image})` }}
                />
                <div>
                  <h3 className='text-xl font-bold'>{destination.name}</h3>
                  <p className='text-slate-600 flex items-center gap-1'>
                    <MapPin className='w-4 h-4' />
                    {destination.country}
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-4 h-4 text-slate-500' />
                    <span className='text-sm'>{destination.duration}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 fill-amber-400 text-amber-400' />
                    <span className='text-sm font-medium'>
                      {destination.rating}
                    </span>
                  </div>
                </div>
                <div className='pt-4 border-t'>
                  <div className='flex justify-between items-center'>
                    <span>Price per person:</span>
                    <span className='font-bold text-lg'>
                      ₹{destination.price}
                    </span>
                  </div>
                  <div className='flex justify-between items-center text-lg font-bold text-amber-600'>
                    <span>Total ({travelers} travelers):</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle>Book Your Trip</CardTitle>
            <CardDescription>
              Fill in your travel details to complete your booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Travel Dates */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label>Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !departureDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {departureDate
                          ? format(departureDate, "PPP")
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='space-y-2'>
                  <Label>Return Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {returnDate ? format(returnDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Number of Travelers */}
              <div className='space-y-2'>
                <Label>Number of Travelers</Label>
                <Select
                  value={travelers.toString()}
                  onValueChange={(value) =>
                    setTravelers(Number.parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        <div className='flex items-center gap-2'>
                          <Users className='w-4 h-4' />
                          {num} {num === 1 ? "Traveler" : "Travelers"}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Information */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input id='firstName' required />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input id='lastName' required />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' required />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input id='phone' type='tel' required />
              </div>

              {/* Special Requests */}
              <div className='space-y-2'>
                <Label htmlFor='requests'>Special Requests (Optional)</Label>
                <Textarea
                  id='requests'
                  placeholder='Any special dietary requirements, accessibility needs, or other requests...'
                  rows={3}
                />
              </div>

              {/* Room Preferences */}
              <div className='space-y-2'>
                <Label>Room Type</Label>
                <Select defaultValue='standard'>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='standard'>Standard Room</SelectItem>
                    <SelectItem value='deluxe'>
                      Deluxe Room (+₹50/night)
                    </SelectItem>
                    <SelectItem value='suite'>Suite (+₹150/night)</SelectItem>
                    <SelectItem value='villa'>
                      Private Villa (+₹300/night)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Terms and Conditions */}
              <div className='flex items-center space-x-2'>
                <input
                  id='terms'
                  type='checkbox'
                  className='rounded border-slate-300'
                  required
                />
                <Label htmlFor='terms' className='text-sm'>
                  I agree to the booking terms and conditions and cancellation
                  policy
                </Label>
              </div>

              <Button
                type='submit'
                className='w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3'
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing Booking..."
                  : `Book Now - ₹{totalPrice}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

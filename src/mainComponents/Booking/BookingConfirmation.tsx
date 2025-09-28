import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Calendar,
  Users,
  MapPin,
  Mail,
  Phone,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

interface BookingConfirmationProps {
  bookingId: string;
  destination: string;
  dates: {
    departure: string;
    return: string;
  };
  travelers: number;
  totalPrice: number;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

export function BookingConfirmation({
  bookingId,
  destination,
  dates,
  travelers,
  totalPrice,
  contactInfo,
}: BookingConfirmationProps) {
  return (
    <div className='min-h-screen bg-slate-50 pt-24'>
      <div className='container mx-auto px-4 max-w-2xl'>
        {/* Success Header */}
        <div className='text-center mb-8'>
          <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <CheckCircle className='w-8 h-8 text-green-600' />
          </div>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>
            Booking Confirmed!
          </h1>
          <p className='text-slate-600'>
            Your dream vacation is all set. We've sent confirmation details to
            your email.
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className='mb-6'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>Booking Details</CardTitle>
              <Badge
                variant='secondary'
                className='bg-green-100 text-green-800'
              >
                Confirmed
              </Badge>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <span className='text-slate-500'>Booking ID:</span>
                <p className='font-mono font-medium'>{bookingId}</p>
              </div>
              <div>
                <span className='text-slate-500'>Total Amount:</span>
                <p className='font-bold text-lg text-amber-600'>
                  ₹{totalPrice}
                </p>
              </div>
            </div>

            <div className='border-t pt-4'>
              <div className='flex items-center gap-2 mb-2'>
                <MapPin className='w-4 h-4 text-slate-500' />
                <span className='font-medium'>{destination}</span>
              </div>
              <div className='flex items-center gap-2 mb-2'>
                <Calendar className='w-4 h-4 text-slate-500' />
                <span>
                  {dates.departure} - {dates.return}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Users className='w-4 h-4 text-slate-500' />
                <span>
                  {travelers} {travelers === 1 ? "Traveler" : "Travelers"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className='mb-6'>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center'>
                <span className='text-sm font-medium'>
                  {contactInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <span className='font-medium'>{contactInfo.name}</span>
            </div>
            <div className='flex items-center gap-3 text-sm text-slate-600'>
              <Mail className='w-4 h-4' />
              <span>{contactInfo.email}</span>
            </div>
            <div className='flex items-center gap-3 text-sm text-slate-600'>
              <Phone className='w-4 h-4' />
              <span>{contactInfo.phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3 text-sm'>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <span className='text-xs font-bold text-amber-700'>1</span>
                </div>
                <div>
                  <p className='font-medium'>Check your email</p>
                  <p className='text-slate-600'>
                    We've sent detailed itinerary and travel documents to{" "}
                    {contactInfo.email}
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <span className='text-xs font-bold text-amber-700'>2</span>
                </div>
                <div>
                  <p className='font-medium'>Prepare for travel</p>
                  <p className='text-slate-600'>
                    Review visa requirements and travel insurance options
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <span className='text-xs font-bold text-amber-700'>3</span>
                </div>
                <div>
                  <p className='font-medium'>Stay connected</p>
                  <p className='text-slate-600'>
                    Our team will contact you 48 hours before departure
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 mb-8'>
          <Button className='flex-1 bg-amber-500 hover:bg-amber-600 text-black'>
            <Download className='w-4 h-4 mr-2' />
            Download Itinerary
          </Button>
          <Button variant='outline' className='flex-1 bg-transparent' asChild>
            <Link to='/'>Return to Home</Link>
          </Button>
        </div>

        {/* Support Information */}
        <div className='text-center text-sm text-slate-600 pb-8'>
          <p>Need help? Contact our support team at</p>
          <p className='font-medium'>
            +1 (555) 123-4567 or support@wanderlux.com
          </p>
        </div>
      </div>
    </div>
  );
}

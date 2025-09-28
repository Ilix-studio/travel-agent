import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  MapPin,
  DollarSign,
} from "lucide-react";

const bookings = [
  {
    id: "BK001",
    customer: "Sarah Johnson",
    email: "sarah@email.com",
    destination: "Santorini, Greece",
    checkIn: "2024-04-15",
    checkOut: "2024-04-22",
    guests: 2,
    amount: 1299,
    status: "confirmed",
    bookingDate: "2024-03-15",
  },
  {
    id: "BK002",
    customer: "Michael Chen",
    email: "michael@email.com",
    destination: "Kyoto, Japan",
    checkIn: "2024-05-01",
    checkOut: "2024-05-11",
    guests: 1,
    amount: 1899,
    status: "pending",
    bookingDate: "2024-03-18",
  },
  {
    id: "BK003",
    customer: "Emma Rodriguez",
    email: "emma@email.com",
    destination: "Maldives",
    checkIn: "2024-04-20",
    checkOut: "2024-04-25",
    guests: 2,
    amount: 3499,
    status: "confirmed",
    bookingDate: "2024-03-20",
  },
  {
    id: "BK004",
    customer: "David Wilson",
    email: "david@email.com",
    destination: "Swiss Alps",
    checkIn: "2024-06-10",
    checkOut: "2024-06-16",
    guests: 4,
    amount: 2799,
    status: "cancelled",
    bookingDate: "2024-03-22",
  },
  {
    id: "BK005",
    customer: "Lisa Park",
    email: "lisa@email.com",
    destination: "Bali, Indonesia",
    checkIn: "2024-05-15",
    checkOut: "2024-05-24",
    guests: 2,
    amount: 1599,
    status: "confirmed",
    bookingDate: "2024-03-25",
  },
];

export function BookingsManager() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Bookings Management</h1>
          <p className='text-slate-600'>
            Manage customer bookings and reservations
          </p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline'>
            <Download className='w-4 h-4 mr-2' />
            Export
          </Button>
          <Button className='bg-amber-500 hover:bg-amber-600 text-black'>
            New Booking
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className='p-6'>
          <div className='flex gap-4'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4' />
              <Input
                placeholder='Search bookings...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <Button variant='outline'>
              <Filter className='w-4 h-4 mr-2' />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className='border rounded-lg p-4 hover:bg-slate-50 transition-colors'
              >
                <div className='flex items-center justify-between mb-3'>
                  <div className='flex items-center gap-3'>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    <span className='font-mono text-sm font-medium'>
                      {booking.id}
                    </span>
                  </div>
                  <div className='flex gap-1'>
                    <Button variant='ghost' size='sm'>
                      <Eye className='w-4 h-4' />
                    </Button>
                    <Button variant='ghost' size='sm'>
                      <Edit className='w-4 h-4' />
                    </Button>
                    <Button variant='ghost' size='sm'>
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                  <div className='flex items-center gap-2'>
                    <User className='w-4 h-4 text-slate-500' />
                    <div>
                      <p className='font-medium'>{booking.customer}</p>
                      <p className='text-sm text-slate-600'>{booking.email}</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <MapPin className='w-4 h-4 text-slate-500' />
                    <div>
                      <p className='font-medium'>{booking.destination}</p>
                      <p className='text-sm text-slate-600'>
                        {booking.guests} guests
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-slate-500' />
                    <div>
                      <p className='font-medium'>
                        {booking.checkIn} - {booking.checkOut}
                      </p>
                      <p className='text-sm text-slate-600'>
                        Booked: {booking.bookingDate}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <DollarSign className='w-4 h-4 text-slate-500' />
                    <div>
                      <p className='font-bold text-amber-600'>
                        ₹{booking.amount}
                      </p>
                      <p className='text-sm text-slate-600'>Total amount</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Star,
  DollarSign,
} from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    category: "Beach",
    price: 1299,
    rating: 4.9,
    bookings: 45,
    status: "active",
    image: "/santorini-white-blue.png",
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    category: "Culture",
    price: 1899,
    rating: 4.8,
    bookings: 32,
    status: "active",
    image: "/kyoto-japan-traditional-temple-cherry-blossoms.jpg",
  },
  {
    id: 3,
    name: "Machu Picchu, Peru",
    category: "Adventure",
    price: 2199,
    rating: 4.9,
    bookings: 28,
    status: "active",
    image: "/machu-picchu-ruins.png",
  },
  {
    id: 4,
    name: "Maldives",
    category: "Luxury",
    price: 3499,
    rating: 5.0,
    bookings: 38,
    status: "active",
    image: "/maldives-overwater-bungalows-crystal-clear-water.jpg",
  },
  {
    id: 5,
    name: "Swiss Alps",
    category: "Adventure",
    price: 2799,
    rating: 4.7,
    bookings: 28,
    status: "inactive",
    image: "/swiss-alps-snow-mountains-skiing.jpg",
  },
];

export function Destinations() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Destinations Management</h1>
          <p className='text-slate-600'>
            Manage your travel destinations and packages
          </p>
        </div>
        <Button className='bg-amber-500 hover:bg-amber-600 text-black'>
          <Plus className='w-4 h-4 mr-2' />
          Add Destination
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className='p-6'>
          <div className='flex gap-4'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4' />
              <Input
                placeholder='Search destinations...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <Button variant='outline'>Filter</Button>
            <Button variant='outline'>Sort</Button>
          </div>
        </CardContent>
      </Card>

      {/* Destinations Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredDestinations.map((destination) => (
          <Card key={destination.id} className='overflow-hidden'>
            <div className='relative'>
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className='w-full h-48 object-cover'
              />
              <Badge
                className={`absolute top-3 right-3 ${
                  destination.status === "active"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {destination.status}
              </Badge>
            </div>

            <CardContent className='p-4'>
              <div className='flex items-start justify-between mb-2'>
                <h3 className='font-semibold text-lg flex items-center gap-1'>
                  <MapPin className='w-4 h-4 text-amber-500' />
                  {destination.name}
                </h3>
                <Badge variant='secondary'>{destination.category}</Badge>
              </div>

              <div className='space-y-2 mb-4'>
                <div className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 fill-amber-400 text-amber-400' />
                    <span>{destination.rating}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <DollarSign className='w-4 h-4 text-green-500' />
                    <span className='font-semibold'>₹{destination.price}</span>
                  </div>
                </div>
                <p className='text-sm text-slate-600'>
                  {destination.bookings} bookings this month
                </p>
              </div>

              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='flex-1 bg-transparent'
                >
                  <Eye className='w-4 h-4 mr-1' />
                  View
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='flex-1 bg-transparent'
                >
                  <Edit className='w-4 h-4 mr-1' />
                  Edit
                </Button>
                <Button variant='outline' size='sm'>
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

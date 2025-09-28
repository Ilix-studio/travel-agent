import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: "/santorini-white-blue.png",
    price: "₹1,299",
    rating: 4.9,
    reviews: 234,
    category: "Beach",
    duration: "7 days",
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "/kyoto-japan-traditional-temple-cherry-blossoms.jpg",
    price: "₹1,899",
    rating: 4.8,
    reviews: 189,
    category: "Culture",
    duration: "10 days",
  },
  {
    id: 3,
    name: "Machu Picchu, Peru",
    image: "/machu-picchu-ruins.png",
    price: "₹2,199",
    rating: 4.9,
    reviews: 156,
    category: "Adventure",
    duration: "8 days",
  },
  {
    id: 4,
    name: "Maldives",
    image: "/maldives-overwater-bungalows-crystal-clear-water.jpg",
    price: "₹3,499",
    rating: 5.0,
    reviews: 298,
    category: "Luxury",
    duration: "5 days",
  },
  {
    id: 5,
    name: "Swiss Alps",
    image: "/swiss-alps-snow-mountains-skiing.jpg",
    price: "₹2,799",
    rating: 4.7,
    reviews: 167,
    category: "Adventure",
    duration: "6 days",
  },
  {
    id: 6,
    name: "Bali, Indonesia",
    image: "/bali-indonesia-rice-terraces-tropical.jpg",
    price: "₹1,599",
    rating: 4.8,
    reviews: 312,
    category: "Beach",
    duration: "9 days",
  },
];

export function FeaturedDestinations() {
  return (
    <section className='py-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-balance'>
            Featured Destinations
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto text-pretty'>
            Handpicked destinations that offer the perfect blend of adventure,
            culture, and relaxation
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className='overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group'
            >
              <div className='relative'>
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <Badge className='absolute top-3 left-3 bg-amber-500 text-black'>
                  {destination.category}
                </Badge>
              </div>

              <CardContent className='p-4'>
                <div className='flex items-start justify-between mb-2'>
                  <h3 className='font-semibold text-lg flex items-center gap-1'>
                    <MapPin className='w-4 h-4 text-amber-500' />
                    {destination.name}
                  </h3>
                  <span className='font-bold text-amber-600'>
                    {destination.price}
                  </span>
                </div>

                <div className='flex items-center gap-4 text-sm text-muted-foreground mb-2'>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 fill-amber-400 text-amber-400' />
                    <span>{destination.rating}</span>
                    <span>({destination.reviews})</span>
                  </div>
                  <span>{destination.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

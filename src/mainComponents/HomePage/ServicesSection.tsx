import { Card, CardContent } from "@/components/ui/card";
import { Plane, Hotel, Car, Camera, Shield, Headphones } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    description:
      "Find the best deals on flights worldwide with our exclusive partnerships",
  },
  {
    icon: Hotel,
    title: "Hotel Reservations",
    description:
      "From luxury resorts to boutique hotels, we have accommodations for every budget",
  },
  {
    icon: Car,
    title: "Car Rentals",
    description:
      "Convenient car rental services to explore your destination at your own pace",
  },
  {
    icon: Camera,
    title: "Guided Tours",
    description:
      "Expert local guides to show you hidden gems and cultural experiences",
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    description:
      "Comprehensive travel protection for peace of mind during your journey",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support whenever you need assistance",
  },
];

export function ServicesSection() {
  return (
    <section className='py-16 px-4 bg-slate-50'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-balance'>
            Complete Travel Solutions
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto text-pretty'>
            Everything you need for the perfect trip, all in one place
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {services.map((service, index) => (
            <Card key={index} className='hover:shadow-lg transition-shadow'>
              <CardContent className='p-6 text-center'>
                <div className='w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <service.icon className='w-8 h-8 text-amber-600' />
                </div>
                <h3 className='font-semibold text-lg mb-2'>{service.title}</h3>
                <p className='text-muted-foreground text-pretty'>
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

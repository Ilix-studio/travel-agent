import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "ilix",
    location: "Golaghat",
    rating: 5,
    text: "Absolutely incredible experience! The team planned every detail perfectly. Our trip to Japan was magical and stress-free.",
  },
  {
    name: "Jyotish",
    location: "Jorhat",
    rating: 5,
    text: "Best travel agency I've ever worked with. They found us amazing deals and the customer service was outstanding throughout our European adventure.",
  },
  {
    name: "John Doe",
    location: "Sivsagar",
    rating: 5,
    text: "From booking to return, everything was seamless. The local guides they arranged were knowledgeable and friendly. Highly recommend!",
  },
];

export function TestimonialsSection() {
  return (
    <section className='py-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-balance'>
            What Our Travelers Say
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto text-pretty'>
            Don't just take our word for it - hear from thousands of satisfied
            customers
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className='hover:shadow-lg transition-shadow'>
              <CardContent className='p-6'>
                <div className='flex items-center mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-5 h-5 fill-amber-400 text-amber-400'
                    />
                  ))}
                </div>

                <Quote className='w-8 h-8 text-amber-500 mb-4' />

                <p className='text-muted-foreground mb-6 text-pretty'>
                  {testimonial.text}
                </p>

                <div className='flex items-center gap-3'>
                  <div>
                    <p className='font-semibold'>{testimonial.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

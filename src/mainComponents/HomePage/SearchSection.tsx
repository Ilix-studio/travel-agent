import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function SearchSection() {
  return (
    <section className='py-16 px-4 bg-slate-50'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-balance'>
            Find Your Perfect Trip
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto text-pretty'>
            Search through thousands of destinations and find the perfect
            getaway for you
          </p>
        </div>

        <Card className='p-6 shadow-lg'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <MapPin className='w-4 h-4 text-amber-500' />
                Select Destination
              </label>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-amber-500' />
                Select Vehicle
              </label>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-amber-500' />
                Self-Drive
              </label>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium flex items-center gap-2'>
                <Users className='w-4 h-4 text-amber-500' />
                Trip Calculator
              </label>
            </div>
          </div>

          <Link to='/trips'>
            <Button className='w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold relative overflow-hidden group'>
              <div className='flex items-center justify-center gap-3'>
                <Search className='w-5 h-5' />
                <span>Search Trips</span>

                <ArrowRight className='w-5 h-5' />
              </div>
            </Button>
          </Link>
        </Card>
      </div>
    </section>
  );
}

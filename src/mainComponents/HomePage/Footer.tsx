import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className='bg-slate-900 text-white py-12 px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-xl font-bold mb-4 text-amber-400'>WanderLux</h3>
            <p className='text-slate-300 mb-4 text-pretty'>
              Your trusted partner in creating unforgettable travel experiences
              around the world.
            </p>
            <div className='flex gap-4'>
              <Facebook className='w-5 h-5 text-slate-400 hover:text-amber-400 cursor-pointer transition-colors' />
              <Twitter className='w-5 h-5 text-slate-400 hover:text-amber-400 cursor-pointer transition-colors' />
              <Instagram className='w-5 h-5 text-slate-400 hover:text-amber-400 cursor-pointer transition-colors' />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2 text-slate-300'>
              <li>
                <a href='#' className='hover:text-amber-400 transition-colors'>
                  Destinations
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-amber-400 transition-colors'>
                  Tours
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-amber-400 transition-colors'>
                  Hotels
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-amber-400 transition-colors'>
                  Flights
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='font-semibold mb-4'>Support</h4>
            <ul className='space-y-2 text-slate-300'>
              <li>
                <a href='#' className='hover:text-amber-400 transition-colors'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-amber-400 transition-colors'>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-amber-400 transition-colors'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-amber-400 transition-colors'>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='font-semibold mb-4'>Contact Info</h4>
            <div className='space-y-3 text-slate-300'>
              <div className='flex items-center gap-2'>
                <Phone className='w-4 h-4 text-amber-400' />
                <span>+91-9191919191</span>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='w-4 h-4 text-amber-400' />
                <span>info@wanderlux.com</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 text-amber-400' />
                <span>Golaghat, Assam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className='border-t border-slate-700 pt-8 mb-8'>
          <div className='text-center mb-6'>
            <h4 className='font-semibold mb-2'>Stay Updated</h4>
            <p className='text-slate-300'>
              Subscribe to get the latest travel deals and destination guides
            </p>
          </div>
          <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
            <Input
              placeholder='Enter your email'
              className='bg-slate-800 border-slate-600 text-white placeholder:text-slate-400'
            />
            <Button className='bg-amber-500 hover:bg-amber-600 text-black font-semibold'>
              Subscribe
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className='text-center text-slate-400 text-sm border-t border-slate-700 pt-6'>
          <p>&copy; 2024 WanderLux Travel Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

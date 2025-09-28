import { useState, useEffect } from "react";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  MessageCircle,
  Sparkles,
  Phone,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const carouselImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
];
HeroSection;
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='min-h-screen bg-black overflow-hidden'>
      {/* Enhanced Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl shadow-amber-500/10"
            : "bg-transparent"
        }`}
      >
        <div className='container mx-auto px-6'>
          <div className='flex items-center justify-between h-20'>
            {/* Logo with glow effect */}
            <div className='flex items-center space-x-3 group'>
              <div className='relative'>
                <div className='w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-300'>
                  <MapPin className='w-5 h-5 text-white' />
                </div>
                <div className='absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300'></div>
              </div>
              <div>
                <span className='text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
                  WanderLux
                </span>
                <div className='text-xs text-amber-400 font-medium tracking-wider'>
                  TRAVEL AGENCY
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center space-x-8'>
              {["Trips", "Destinations", "Services", "About"].map((item) => (
                <Link
                  key={item}
                  to={`${item.toLowerCase()}`}
                  className='relative group text-gray-300 hover:text-white transition-colors duration-300'
                >
                  <span className='relative z-10 font-medium'>{item}</span>
                  <div className='absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className='hidden md:flex items-center space-x-5'>
              <button
                className='border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 
               transition-all duration-300 px-6 py-3 rounded-md font-medium flex items-center gap-2'
              >
                <Phone className='h-4 w-4' />
                Call Now
              </button>

              <button
                className='bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 
               text-black shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 
               transition-all duration-300 px-6 py-3 font-semibold rounded-md flex items-center gap-2'
              >
                <MessageCircle className='h-4 w-4' />
                WhatsApp
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className='md:hidden text-white hover:bg-amber-500/20 p-2 rounded-md transition-colors'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden bg-black/95 backdrop-blur-xl border-t border-amber-500/20'>
            <div className='container mx-auto px-6 py-6 space-y-4'>
              {["Home", "Trips", "Destinations", "Services", "About"].map(
                (item) => (
                  <Link
                    key={item}
                    to={`${item.toLowerCase()}`}
                    className='block text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                )
              )}
              <div className='pt-4 border-t border-amber-500/20 space-y-4'>
                <button className='w-full border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 px-4 py-2 rounded-md flex items-center justify-center gap-2'>
                  <Phone className='h-4 w-4' />
                  Call Now
                </button>
                <button className='w-full bg-gradient-to-r from-amber-500 to-amber-700 text-black px-4 py-2 rounded-md flex items-center justify-center gap-2'>
                  <MessageCircle className='h-4 w-4' />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Enhanced Visuals */}
      <section id='home' className='relative h-screen overflow-hidden'>
        {/* Background Images with Ken Burns Effect */}
        <div className='absolute inset-0'>
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide
                  ? "opacity-100 scale-105"
                  : "opacity-0 scale-100"
              }`}
            >
              <img
                src={image}
                alt={`Travel destination ${index + 1}`}
                className='w-full h-full object-cover transition-transform duration-[6000ms] ease-out'
                style={{
                  transform:
                    index === currentSlide ? "scale(1.1)" : "scale(1.05)",
                }}
              />
              {/* Gradient Overlays */}
              <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent'></div>
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30'></div>
            </div>
          ))}
        </div>

        {/* Animated Background Elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className='absolute w-1 h-1 bg-amber-500/30 rounded-full animate-pulse'
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Hero Content */}
        <div className='relative z-10 container mx-auto px-6 h-full flex items-center'>
          <div className='max-w-4xl'>
            {/* Floating Badge */}
            <div className='inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-4 py-2 mb-8 animate-pulse'>
              <Sparkles className='h-4 w-4 text-amber-400' />
              <span className='text-sm font-medium text-amber-400'>
                Special Travel Packages Available
              </span>
            </div>

            {/* Main Headline */}
            <h1 className='text-5xl md:text-7xl font-bold mb-8 leading-tight'>
              <span className='block text-white animate-fadeIn'>
                Discover Your Next
              </span>
              <span className='block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent animate-pulse'>
                Adventure
              </span>
            </h1>

            {/* Subtitle */}
            <p className='text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed max-w-2xl'>
              From exotic beaches to mountain peaks, we craft unforgettable
              journeys tailored just for you. Experience the world like never
              before.
            </p>

            {/* Quick Stats */}
            <div className='flex flex-wrap gap-8 mb-12 text-sm'>
              <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300'>
                <MapPin className='w-5 h-5 text-amber-400' />
                <span className='text-gray-300'>150+ Destinations</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300'>
                <Calendar className='w-5 h-5 text-amber-400' />
                <span className='text-gray-300'>24/7 Support</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300'>
                <Users className='w-5 h-5 text-amber-400' />
                <span className='text-gray-300'>50k+ Happy Travelers</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-6'>
              <Link to='/trips'>
                <button className='bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-black px-10 py-6 text-lg font-semibold shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 rounded-lg flex items-center justify-center gap-2'>
                  Plan Your Trip
                  <ArrowRight className='h-5 w-5' />
                </button>
              </Link>
              <button
                className='border-2 border-white/30 text-white hover:text-black hover:bg-white/90 
               backdrop-blur-sm px-10 py-6 text-lg font-semibold 
               transition-all duration-300 hover:scale-105 rounded-lg flex items-center justify-center gap-2'
              >
                Contact WhatsApp
                <MessageCircle className='h-5 w-5' />
              </button>
            </div>

            {/* Stats Row */}
            <div className='flex gap-8 mt-16'>
              {[
                { number: "15+", label: "Years Experience" },
                { number: "50K+", label: "Happy Travelers" },
                { number: "150+", label: "Destinations" },
              ].map((stat, index) => (
                <div key={index} className='text-center group cursor-default'>
                  <div className='text-3xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors duration-300'>
                    {stat.number}
                  </div>
                  <div className='text-sm text-gray-400 uppercase tracking-wider'>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3'>
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className='group relative'
            >
              <div
                className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-amber-400 to-amber-600"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              >
                {index === currentSlide && (
                  <div className='absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-pulse'></div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className='absolute bottom-8 right-8 z-20 animate-bounce'>
          <div className='flex flex-col items-center gap-2 text-white/70'>
            <span className='text-xs uppercase tracking-wider'>Scroll</span>
            <div className='w-0.5 h-8 bg-gradient-to-b from-transparent via-white/50 to-transparent'></div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { FeaturedDestinations } from "./FeaturedDestinations";
import { Footer } from "./Footer";
import HeroSection from "./HeroSection";

import { SearchSection } from "./SearchSection";
import { ServicesSection } from "./ServicesSection";
import { TestimonialsSection } from "./TestimonialsSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <main className='min-h-screen bg-background'>
        <SearchSection />
        <FeaturedDestinations />
        <ServicesSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;

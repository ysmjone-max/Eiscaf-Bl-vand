import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FlavourGrid from "@/components/sections/FlavourGrid";
import VisualExperience from "@/components/sections/VisualExperience";
import WhyBlavand from "@/components/sections/WhyBlavand";
import CafeAtmosphere from "@/components/sections/CafeAtmosphere";
import CoffeeSection from "@/components/sections/CoffeeSection";
import TerraceSection from "@/components/sections/TerraceSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import InstagramGrid from "@/components/sections/InstagramGrid";
import LocationSection from "@/components/sections/LocationSection";
import FinalCTA from "@/components/sections/FinalCTA";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-cream text-warm-brown selection:bg-[#D4AF37]/30 selection:text-warm-brown relative">
      <Navbar />

      <Hero />
      <About />
      <FlavourGrid />
      <VisualExperience />
      <WhyBlavand />
      <CoffeeSection />
      <CafeAtmosphere />
      <TerraceSection />
      <ReviewsSection />
      <InstagramGrid />
      <LocationSection />
      <FinalCTA />

      <Footer />

      {/* Floating Back to Top Quick-Scroll Button */}
      <BackToTop />
    </main>
  );
}

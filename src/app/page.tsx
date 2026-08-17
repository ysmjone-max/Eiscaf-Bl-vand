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
import DripDivider from "@/components/animations/DripDivider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <Hero />

      {/* Cream drip from hero into the about section */}
      <DripDivider color="#F9F6F0" bgColor="#1a1a1a" />

      <About />
      <FlavourGrid />
      <VisualExperience />

      {/* Cream drip from light section into nordic-blue WhyBlavand */}
      <DripDivider color="#2C4C5B" bgColor="#F9F6F0" />

      <WhyBlavand />

      {/* Cream drip from nordic-blue back to cream */}
      <DripDivider color="#F9F6F0" bgColor="#2C4C5B" />

      <CoffeeSection />
      <CafeAtmosphere />
      <TerraceSection />
      <ReviewsSection />
      <InstagramGrid />
      <LocationSection />
      <FinalCTA />

      <Footer />
    </main>
  );
}

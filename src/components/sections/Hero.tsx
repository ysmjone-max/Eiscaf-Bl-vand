import FloatingOrbs from "@/components/animations/FloatingOrbs";
import ConeParticles from "@/components/animations/ConeParticles";
import MeltingScoop from "@/components/animations/MeltingScoop";
import HeroContent from "@/components/sections/HeroContent";

export default function Hero() {
  return (
    <section className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden flex flex-col">
      {/* Background photo */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/75" />
      </div>

      {/* Ambient warm golden glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Floating Animations */}
      <FloatingOrbs />
      <ConeParticles />
      <MeltingScoop />

      {/* Client content with translations */}
      <HeroContent />
    </section>
  );
}

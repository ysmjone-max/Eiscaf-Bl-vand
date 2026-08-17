import Link from "next/link";
import Image from "next/image";
import { businessConfig } from "@/data/config";
import { MapPin, Clock } from "lucide-react";
import FloatingOrbs from "@/components/animations/FloatingOrbs";
import ConeParticles from "@/components/animations/ConeParticles";
import MeltingScoop from "@/components/animations/MeltingScoop";
import HeroContent from "@/components/sections/HeroContent";

export default function Hero() {
  return (
    <section className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden flex flex-col">
      {/* Background photo */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/70" />
      </div>

      <FloatingOrbs />
      <ConeParticles />
      <MeltingScoop />

      {/* Logo watermark desktop only */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none hidden lg:block z-0 animate-pulse" style={{ animationDuration: '8s' }}>
        <Image src="/logo.png" alt="" width={480} height={480} className="object-contain filter drop-shadow-[0_0_50px_rgba(212,175,55,0.4)]" />
      </div>

      {/* Client content with translations */}
      <HeroContent />
    </section>
  );
}

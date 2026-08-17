"use client";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

export default function CafeAtmosphere() {
  const { t } = useLang();

  return (
    <section className="py-20 md:py-24 bg-sand text-warm-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-5xl mb-4 leading-tight">{t.atmosphere.headline}</h2>
          <p className="text-base md:text-lg text-warm-brown/80 font-light">
            {t.atmosphere.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[540px]">
          <div className="relative rounded-2xl overflow-hidden min-h-[280px]">
            <Image 
              src="https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?q=80&w=2070&auto=format&fit=crop" 
              alt="Cafe Atmosphere" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700" 
              sizes="(max-width: 768px) 100vw, 50vw" 
            />
          </div>
          <div className="grid grid-rows-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden min-h-[180px]">
              <Image 
                src="https://images.unsplash.com/photo-1495474472205-16284eb86b38?q=80&w=2070&auto=format&fit=crop" 
                alt="Coffee Break" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
                sizes="(max-width: 768px) 100vw, 50vw" 
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden min-h-[180px]">
              <Image 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
                alt="Restaurant Interior" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
                sizes="(max-width: 768px) 100vw, 50vw" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

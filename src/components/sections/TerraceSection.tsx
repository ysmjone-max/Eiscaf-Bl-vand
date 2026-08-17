"use client";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

export default function TerraceSection() {
  const { t } = useLang();

  return (
    <section className="py-20 md:py-24 bg-cream text-warm-brown overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-full md:w-1/2">
            <h2 className="font-playfair text-3xl md:text-5xl mb-6 leading-tight">
              {t.terrace.headline1} <br/>
              {t.terrace.headline2} <br/>
              <span className="italic text-nordic-blue">{t.terrace.headline3}</span>
            </h2>
            <p className="text-base md:text-lg text-warm-brown/80 font-light mb-8 max-w-md leading-relaxed">
              {t.terrace.description}
            </p>
          </div>

          <div className="w-full md:w-1/2 relative aspect-video md:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
            <Image 
              src="https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?q=80&w=2070&auto=format&fit=crop" 
              alt="Outdoor Seating" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700" 
              sizes="(max-width: 768px) 100vw, 50vw" 
            />
          </div>

        </div>
      </div>
    </section>
  );
}

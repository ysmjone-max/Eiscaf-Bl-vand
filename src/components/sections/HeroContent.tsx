"use client";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { businessConfig } from "@/data/config";

export default function HeroContent() {
  const { t } = useLang();

  return (
    <div className="relative z-10 flex flex-col justify-between h-full px-4 max-w-5xl mx-auto w-full py-4">
      {/* Navbar spacer */}
      <div className="h-16 md:h-20 flex-shrink-0" />

      {/* Headline block — vertically centred */}
      <div className="flex flex-col items-center text-center flex-1 justify-center gap-5 px-2">
        <h1
          className="font-playfair text-[clamp(2rem,8vw,5.5rem)] text-cream font-bold leading-[1.05]"
          style={{ textShadow: "0 2px 40px rgba(0,0,0,0.35)" }}
        >
          {t.hero.line1}
          <br />
          <em className="font-normal italic">{t.hero.line2}</em>
        </h1>

        <p className="text-[clamp(0.9rem,2.5vw,1.2rem)] text-cream/85 max-w-xl font-light leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Link href="#eis"
            className="w-full sm:w-auto bg-cream text-nordic-blue px-8 py-3.5 rounded-full font-semibold text-sm md:text-base shadow-lg hover:shadow-2xl hover:-translate-y-0.5 hover:bg-white transition-all duration-300">
            🍦 {t.hero.cta1}
          </Link>
          <Link href="#location"
            className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-cream/50 text-cream px-8 py-3.5 rounded-full font-medium text-sm md:text-base hover:bg-white/20 transition-all">
            {t.hero.cta2}
          </Link>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pb-16 md:pb-4 flex-shrink-0">
        <a href={businessConfig.googleMapsUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-cream/90 text-xs md:text-sm bg-black/25 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/40 transition-colors">
          <MapPin size={14} />
          <span>Knooper Weg 169 · Kiel</span>
        </a>
        <div className="flex items-center gap-2 text-cream/90 text-xs md:text-sm bg-black/25 backdrop-blur-sm px-4 py-2 rounded-full">
          <Clock size={14} />
          <span>{t.hero.hours}</span>
        </div>
      </div>
    </div>
  );
}

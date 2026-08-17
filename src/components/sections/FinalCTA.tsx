"use client";
import Link from "next/link";
import { businessConfig } from "@/data/config";
import { useLang } from "@/context/LangContext";

export default function FinalCTA() {
  const { t } = useLang();
  const f = t.finalCta;

  return (
    <section className="relative py-24 md:py-32 text-cream text-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-warm-brown/72" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-6xl mb-6 leading-tight">{f.headline}</h2>
        <p className="text-lg md:text-xl font-light mb-10 text-cream/85 max-w-2xl mx-auto">{f.sub}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href={businessConfig.googleMapsUrl} target="_blank" rel="noopener noreferrer"
            className="bg-cream text-nordic-blue px-9 py-4 rounded-full font-semibold hover:bg-sand transition-colors text-sm md:text-base">
            {f.cta1}
          </a>
          <Link href="#eis"
            className="bg-transparent border-2 border-cream/70 text-cream px-9 py-4 rounded-full font-medium hover:bg-cream/10 transition-colors text-sm md:text-base">
            {f.cta2}
          </Link>
        </div>
      </div>
    </section>
  );
}

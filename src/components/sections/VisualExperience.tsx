"use client";

import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { Sparkles } from "lucide-react";

// Curated high-res, mouth-watering aesthetic café, gelato, waffle, and coffee photography
const visualCards = [
  {
    src: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?q=80&w=1200&auto=format&fit=crop",
    titleDe: "Frisches Pistaziengelato & Waffeln",
    titleEn: "Fresh Pistachio Gelato & Waffles",
    tag: "Gelato",
  },
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
    titleDe: "Dänische Gemütlichkeit & Hygge",
    titleEn: "Danish Hygge Atmosphere",
    tag: "Ambiente",
  },
  {
    src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop",
    titleDe: "Elbgold Espresso & Cappuccino",
    titleEn: "Elbgold Specialty Coffee",
    tag: "Kaffee",
  },
  {
    src: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=1200&auto=format&fit=crop",
    titleDe: "Bunte Fruchtsorbets & Beeren",
    titleEn: "Vibrant Fruit Sorbets & Berries",
    tag: "Fruchtig",
  },
  {
    src: "https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?q=80&w=1200&auto=format&fit=crop",
    titleDe: "Sonnige Außenterrasse in Kiel",
    titleEn: "Sunny Outdoor Terrace in Kiel",
    tag: "Terrasse",
  },
];

export default function VisualExperience() {
  const { lang } = useLang();

  return (
    <section id="galerie" className="py-20 md:py-28 bg-cream overflow-hidden border-t border-b border-sand/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-nordic-blue text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <Sparkles size={13} className="text-[#D4AF37]" />
              <span>{lang === "de" ? "Visuelle Impressionen" : "Visual Impressions"}</span>
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl text-warm-brown leading-tight">
              {lang === "de" ? "Momente voller Geschmack." : "Moments of Pure Flavour."}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-warm-brown/65 max-w-sm">
            {lang === "de"
              ? "Ein Blick in unsere Gelateria, Kaffeespezialitäten und die entspannte Atmosphäre am Knooper Weg."
              : "A glimpse into our gelateria, specialty coffee, and the relaxed coastal atmosphere in Kiel."}
          </p>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        className="flex gap-5 px-4 md:px-8 w-full overflow-x-auto snap-x pb-6 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {visualCards.map((card, idx) => (
          <div
            key={idx}
            className="group relative min-w-[280px] sm:min-w-[340px] md:min-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden snap-center shrink-0 shadow-md border border-sand/50"
          >
            <Image
              src={card.src}
              alt={lang === "de" ? card.titleDe : card.titleEn}
              fill
              className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 85vw, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
              <span className="inline-block bg-[#D4AF37]/90 text-warm-brown text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 shadow">
                {card.tag}
              </span>
              <h3 className="font-playfair text-lg sm:text-xl font-bold leading-snug drop-shadow-sm">
                {lang === "de" ? card.titleDe : card.titleEn}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

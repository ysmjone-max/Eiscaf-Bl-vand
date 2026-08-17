"use client";

import { useState } from "react";
import WaffleCone from "@/components/animations/WaffleCone";
import { useLang } from "@/context/LangContext";

// Individual flavour theme colors for realistic gelato visuals (mapped by index/order)
const scoopColorMap = [
  "#FFF8DC", // Vanilla
  "#3D2314", // Chocolate
  "#FAF7F2", // Stracciatella
  "#DC4C64", // Raspberry
  "#FBE384", // Lemon
  "#F7A844", // Mango
  "#F48B96", // Strawberry
  "#9BB38D", // Pistachio
  "#C99E74", // Hazelnut
  "#E8DFD5", // Cookies
  "#C8863A", // Salted Caramel
  "#F7D6DE", // Yogurt Passion Fruit
  "#D65A6E", // Amarena Cherry
  "#6B4934", // Coffee
  "#B5DEC9", // Mint Chocolate
  "#D2A274", // Danish Cinnamon Dream
  "#7FB069", // Woodruff
  "#EBF3E8", // Coconut
];

function MiniScoopIcon({ color }: { color: string }) {
  return (
    <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
      {/* Scoop */}
      <circle cx="17" cy="14" r="12" fill={color} className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" />
      {/* Shine highlight */}
      <ellipse cx="13" cy="10" rx="3.5" ry="5.5" fill="white" opacity="0.4" transform="rotate(-30 13 10)" />
      {/* Waffle Cone */}
      <polygon points="17,38 7,20 27,20" fill="#D4A76A" />
      <line x1="17" y1="38" x2="11" y2="22" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
      <line x1="17" y1="38" x2="23" y2="22" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
      <line x1="9" y1="28" x2="25" y2="28" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
    </svg>
  );
}

type FlavourItem = {
  name: string;
  category: string;
  description: string;
  isVegan?: boolean;
};

function FlipCard({ flavour, index, hoverText }: { flavour: FlavourItem; index: number; hoverText: string }) {
  const [flipped, setFlipped] = useState(false);
  const color = scoopColorMap[index % scoopColorMap.length];

  return (
    <div
      className="relative cursor-pointer group"
      style={{ perspective: "1000px", height: "210px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
      aria-label={`${flavour.name} – ${flavour.description}`}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 bg-cream rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl border border-sand/40 transition-all duration-300 group-hover:border-[#D4AF37]/40"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="pr-2">
                <h3 className="font-playfair text-xl font-bold text-warm-brown leading-tight group-hover:text-nordic-blue transition-colors">
                  {flavour.name}
                </h3>
                <p className="text-[11px] font-semibold text-nordic-blue/60 uppercase tracking-widest mt-1">
                  {flavour.category}
                </p>
              </div>
              <MiniScoopIcon color={color} />
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-sand/30">
            {flavour.isVegan ? (
              <span className="text-[10px] uppercase tracking-widest bg-sage/20 text-sage px-2 py-0.5 rounded-sm font-bold">
                🌱 Vegan
              </span>
            ) : (
              <span className="text-[10px] uppercase tracking-widest text-warm-brown/40 font-semibold">
                Gelato
              </span>
            )}
            <span className="text-xs text-nordic-blue font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              {hoverText}
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: "#2C4C5B",
            color: "#F9F6F0",
          }}
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between shadow-xl border border-[#D4AF37]/30"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-playfair text-xl font-bold text-cream">{flavour.name}</h3>
              <MiniScoopIcon color={color} />
            </div>
            <p className="text-sm font-light leading-relaxed text-cream/90">{flavour.description}</p>
          </div>
          <div className="flex justify-between items-center pt-2">
            {flavour.isVegan && (
              <span className="text-[9px] uppercase tracking-widest border border-cream/50 text-cream px-2 py-0.5 rounded-sm font-semibold">
                🌱 Vegan
              </span>
            )}
            <span className="text-[11px] text-sand uppercase tracking-wider font-semibold ml-auto">
              Blåvand Gelato
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlavourGrid() {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState("all");

  const flavoursList = t.flavours.items;
  const categories = ["all", ...Array.from(new Set(flavoursList.map((f) => f.category)))];

  const filtered =
    activeCategory === "all"
      ? flavoursList
      : flavoursList.filter((f) => f.category === activeCategory);

  return (
    <section id="eis" className="py-20 md:py-28 bg-sand/20 text-warm-brown overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with decorative cone */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <p className="text-nordic-blue text-xs font-semibold uppercase tracking-widest mb-3">
              {t.flavours.eyebrow}
            </p>
            <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl leading-tight max-w-xl">
              {t.flavours.headline}
              <br />
              <span className="italic font-normal">{t.flavours.subheadline}</span>
            </h2>
            <p className="text-warm-brown/70 mt-4 text-sm md:text-base font-light max-w-lg leading-relaxed">
              {t.flavours.note}
            </p>
          </div>
          {/* Animated waffle cone decoration */}
          <div className="hidden sm:block self-center md:self-auto">
            <WaffleCone className="text-nordic-blue/35 w-20 md:w-24 flex-shrink-0" />
          </div>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-nordic-blue text-cream shadow-md scale-105"
                  : "bg-cream text-warm-brown hover:bg-sand/70 border border-sand/50"
              }`}
            >
              {cat === "all" ? t.flavours.all : cat}
            </button>
          ))}
        </div>

        {/* Flip card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((flavour, i) => (
            <div
              key={flavour.name}
              style={{
                animation: `fadeSlideIn 0.4s ease-out both`,
                animationDelay: `${i * 0.04}s`,
              }}
            >
              <FlipCard flavour={flavour} index={i} hoverText={t.flavours.hoverHint} />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  );
}

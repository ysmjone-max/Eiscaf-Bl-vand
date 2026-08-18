"use client";

import { useState } from "react";
import WaffleCone from "@/components/animations/WaffleCone";
import { useLang } from "@/context/LangContext";

// Individual flavour theme colors for authentic gelato visuals
const flavourColorMap: Record<
  string,
  {
    scoopColor: string;
    drizzleColor?: string;
    backBg: string;
    text: string;
    isCup?: boolean;
  }
> = {
  // German & English mapping
  Vanille: { scoopColor: "#FFF6DB", drizzleColor: "#F5E6B3", backBg: "#2C4C5B", text: "#F9F6F0" },
  Vanilla: { scoopColor: "#FFF6DB", drizzleColor: "#F5E6B3", backBg: "#2C4C5B", text: "#F9F6F0" },
  Schokolade: { scoopColor: "#3E2316", drizzleColor: "#221109", backBg: "#4A3C31", text: "#F9F6F0" },
  Chocolate: { scoopColor: "#3E2316", drizzleColor: "#221109", backBg: "#4A3C31", text: "#F9F6F0" },
  Stracciatella: { scoopColor: "#FDFAF5", drizzleColor: "#2B170B", backBg: "#2C4C5B", text: "#F9F6F0" },
  Himbeere: { scoopColor: "#D93856", drizzleColor: "#B51A38", backBg: "#849383", text: "#F9F6F0" },
  Raspberry: { scoopColor: "#D93856", drizzleColor: "#B51A38", backBg: "#849383", text: "#F9F6F0" },
  Zitrone: { scoopColor: "#FCE46D", drizzleColor: "#E5C83B", backBg: "#2C4C5B", text: "#F9F6F0" },
  Lemon: { scoopColor: "#FCE46D", drizzleColor: "#E5C83B", backBg: "#2C4C5B", text: "#F9F6F0" },
  Mango: { scoopColor: "#F69C28", drizzleColor: "#D8790A", backBg: "#4A3C31", text: "#F9F6F0" },
  Erdbeere: { scoopColor: "#F27685", drizzleColor: "#D64759", backBg: "#849383", text: "#F9F6F0" },
  Strawberry: { scoopColor: "#F27685", drizzleColor: "#D64759", backBg: "#849383", text: "#F9F6F0" },
  Pistazie: { scoopColor: "#9CB58B", drizzleColor: "#759163", backBg: "#2C4C5B", text: "#F9F6F0" },
  Pistachio: { scoopColor: "#9CB58B", drizzleColor: "#759163", backBg: "#2C4C5B", text: "#F9F6F0" },
  Haselnuss: { scoopColor: "#C89D6E", drizzleColor: "#996D3D", backBg: "#4A3C31", text: "#F9F6F0" },
  Hazelnut: { scoopColor: "#C89D6E", drizzleColor: "#996D3D", backBg: "#4A3C31", text: "#F9F6F0" },
  Cookies: { scoopColor: "#F2ECE4", drizzleColor: "#3B2416", backBg: "#2C4C5B", text: "#F9F6F0" },
  "Cookies & Cream": { scoopColor: "#F2ECE4", drizzleColor: "#3B2416", backBg: "#2C4C5B", text: "#F9F6F0" },
  "Salted Caramel": { scoopColor: "#C88232", drizzleColor: "#8C4E08", backBg: "#4A3C31", text: "#F9F6F0" },
  "Joghurt-Maracuja": { scoopColor: "#F7D6DE", drizzleColor: "#F59E0B", backBg: "#849383", text: "#F9F6F0" },
  "Yogurt Passion Fruit": { scoopColor: "#F7D6DE", drizzleColor: "#F59E0B", backBg: "#849383", text: "#F9F6F0" },
  Amarena: { scoopColor: "#FCF5EC", drizzleColor: "#8A182C", backBg: "#2C4C5B", text: "#F9F6F0" },
  "Amarena Cherry": { scoopColor: "#FCF5EC", drizzleColor: "#8A182C", backBg: "#2C4C5B", text: "#F9F6F0" },
  Kaffee: { scoopColor: "#6B4832", drizzleColor: "#422818", backBg: "#4A3C31", text: "#F9F6F0" },
  "Coffee Gelato": { scoopColor: "#6B4832", drizzleColor: "#422818", backBg: "#4A3C31", text: "#F9F6F0" },
  "Minze-Schoko": { scoopColor: "#B5DEC9", drizzleColor: "#221109", backBg: "#2C4C5B", text: "#F9F6F0" },
  "Mint Chocolate": { scoopColor: "#B5DEC9", drizzleColor: "#221109", backBg: "#2C4C5B", text: "#F9F6F0" },
  "Dänischer Zimt-Traum": { scoopColor: "#D4A572", drizzleColor: "#8A4C18", backBg: "#4A3C31", text: "#F9F6F0" },
  "Danish Cinnamon Dream": { scoopColor: "#D4A572", drizzleColor: "#8A4C18", backBg: "#4A3C31", text: "#F9F6F0" },
  Waldmeister: { scoopColor: "#7FB069", drizzleColor: "#588544", backBg: "#849383", text: "#F9F6F0" },
  Woodruff: { scoopColor: "#7FB069", drizzleColor: "#588544", backBg: "#849383", text: "#F9F6F0" },
  Kokosnuss: { scoopColor: "#F5F8F5", drizzleColor: "#D1DDD1", backBg: "#2C4C5B", text: "#F9F6F0" },
  Coconut: { scoopColor: "#F5F8F5", drizzleColor: "#D1DDD1", backBg: "#2C4C5B", text: "#F9F6F0" },
};

// Realistic Gelato Cone or Cup Graphic Component
function GelatoServingGraphic({
  flavourName,
  index,
}: {
  flavourName: string;
  index: number;
}) {
  const spec = flavourColorMap[flavourName] || {
    scoopColor: "#FFF6DB",
    drizzleColor: "#E5C83B",
    backBg: "#2C4C5B",
    text: "#F9F6F0",
  };

  // Alternate between waffle cones and gelato cups for visual variety
  const isCup = index % 3 === 2;

  if (isCup) {
    return (
      <svg
        width="44"
        height="50"
        viewBox="0 0 44 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 flex-shrink-0"
      >
        {/* Generous Gelato Scoop in Cup */}
        <circle
          cx="22"
          cy="18"
          r="15"
          fill={spec.scoopColor}
          className="filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.15)]"
        />
        {/* Flavour Sauce Drizzle / Ripple */}
        {spec.drizzleColor && (
          <path
            d="M13 14 C17 10 20 20 25 12 C28 17 31 13 32 18"
            stroke={spec.drizzleColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
        )}
        {/* Specular Highlight */}
        <ellipse
          cx="17"
          cy="12"
          rx="4"
          ry="6.5"
          fill="white"
          opacity="0.45"
          transform="rotate(-25 17 12)"
        />
        {/* Gelateria Cup (Nordic Blue with Gold Rim) */}
        <polygon points="8,26 36,26 32,46 12,46" fill="#2C4C5B" />
        <line x1="7" y1="26" x2="37" y2="26" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
        {/* Cup brand line */}
        <line x1="14" y1="36" x2="30" y2="36" stroke="rgba(249,246,240,0.4)" strokeWidth="1" />
        {/* Mini spoon */}
        <line x1="30" y1="12" x2="35" y2="3" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="35" cy="3" r="2" fill="#D4AF37" />
      </svg>
    );
  }

  return (
    <svg
      width="44"
      height="56"
      viewBox="0 0 44 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 flex-shrink-0"
    >
      {/* Generous Gelato Scoop on Cone */}
      <circle
        cx="22"
        cy="18"
        r="15"
        fill={spec.scoopColor}
        className="filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.15)]"
      />
      {/* Flavour Sauce Drizzle / Swirl */}
      {spec.drizzleColor && (
        <path
          d="M13 14 C17 10 20 20 25 12 C28 17 31 13 32 18"
          stroke={spec.drizzleColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
      )}
      {/* Specular Highlight */}
      <ellipse
        cx="17"
        cy="12"
        rx="4"
        ry="6.5"
        fill="white"
        opacity="0.45"
        transform="rotate(-25 17 12)"
      />
      {/* Crisp Waffle Cone */}
      <polygon points="22,53 9,26 35,26" fill="#D9A86C" />
      {/* Waffle Cone cross-hatch lines */}
      <line x1="22" y1="53" x2="14" y2="28" stroke="rgba(0,0,0,0.14)" strokeWidth="1" />
      <line x1="22" y1="53" x2="22" y2="26" stroke="rgba(0,0,0,0.14)" strokeWidth="1" />
      <line x1="22" y1="53" x2="30" y2="28" stroke="rgba(0,0,0,0.14)" strokeWidth="1" />
      <line x1="12" y1="36" x2="32" y2="36" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      <line x1="16" y1="44" x2="28" y2="44" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      {/* Cone rim */}
      <line x1="8" y1="26" x2="36" y2="26" stroke="#C49354" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

type FlavourItem = {
  name: string;
  category: string;
  description: string;
  isVegan?: boolean;
};

function FlipCard({
  flavour,
  index,
  hoverText,
}: {
  flavour: FlavourItem;
  index: number;
  hoverText: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const spec = flavourColorMap[flavour.name] || {
    scoopColor: "#FFF6DB",
    backBg: "#2C4C5B",
    text: "#F9F6F0",
  };

  return (
    <div
      className="relative group cursor-pointer"
      style={{ perspective: "1000px", height: "215px" }}
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
          className="absolute inset-0 bg-cream rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl border border-sand/40 transition-all duration-300 group-hover:border-[#D4AF37]/50"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="pr-3">
                <h3 className="font-playfair text-xl font-bold text-warm-brown leading-tight group-hover:text-nordic-blue transition-colors">
                  {flavour.name}
                </h3>
                <p className="text-[11px] font-semibold text-nordic-blue/60 uppercase tracking-widest mt-1">
                  {flavour.category}
                </p>
              </div>

              {/* Custom Gelato Cone / Cup Graphic */}
              <GelatoServingGraphic flavourName={flavour.name} index={index} />
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-sand/30">
            {flavour.isVegan ? (
              <span className="text-[10px] uppercase tracking-widest bg-sage/20 text-sage px-2.5 py-0.5 rounded-sm font-bold">
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

        {/* Back (Revealed on 3D Flip) */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: spec.backBg,
            color: spec.text,
          }}
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between shadow-xl border border-[#D4AF37]/40"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-playfair text-xl font-bold text-cream">{flavour.name}</h3>
              <GelatoServingGraphic flavourName={flavour.name} index={index} />
            </div>
            <p className="text-sm font-light leading-relaxed text-cream/90">{flavour.description}</p>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-cream/20">
            {flavour.isVegan && (
              <span className="text-[9px] uppercase tracking-widest border border-cream/50 text-cream px-2 py-0.5 rounded-sm font-semibold">
                🌱 Vegan
              </span>
            )}
            <span className="text-[11px] text-[#D4AF37] uppercase tracking-wider font-semibold ml-auto">
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
            <span className="text-nordic-blue text-xs font-semibold uppercase tracking-widest block mb-2">
              {t.flavours.eyebrow}
            </span>
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
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-nordic-blue text-cream shadow-md scale-105"
                  : "bg-cream text-warm-brown hover:bg-sand/70 border border-sand/50"
              }`}
            >
              {cat === "all" ? t.flavours.all : cat}
            </button>
          ))}
        </div>

        {/* 3D Flip Card Grid */}
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

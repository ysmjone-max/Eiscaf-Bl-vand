"use client";

import { useState } from "react";
import WaffleCone from "@/components/animations/WaffleCone";
import { useLang } from "@/context/LangContext";
import FreezerReveal from "@/components/effects/FreezerReveal";
import Scoop3D from "@/components/3d/Scoop3D";
import { Rotate3D, Sparkles, X } from "lucide-react";

// Individual flavour theme colors for realistic gelato visuals
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
  onOpen3D,
}: {
  flavour: FlavourItem;
  index: number;
  hoverText: string;
  onOpen3D: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const color = scoopColorMap[index % scoopColorMap.length];

  return (
    <div
      className="relative group"
      style={{ perspective: "1000px", height: "230px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
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
              <div className="pr-2">
                <h3 className="font-playfair text-xl font-bold text-warm-brown leading-tight group-hover:text-nordic-blue transition-colors">
                  {flavour.name}
                </h3>
                <p className="text-[11px] font-semibold text-nordic-blue/60 uppercase tracking-widest mt-1">
                  {flavour.category}
                </p>
              </div>

              {/* 3D Scoop Mini Preview */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen3D();
                }}
                className="relative cursor-pointer group/scoop flex-shrink-0"
                title="Click to spin in 3D"
              >
                <Scoop3D
                  flavourName={flavour.name}
                  color={color}
                  size={46}
                  autoRotate={true}
                  interactive={false}
                  className="filter drop-shadow-md group-hover/scoop:scale-110 transition-transform"
                />
                <span className="absolute -bottom-1 -right-1 bg-nordic-blue text-cream p-1 rounded-full text-[9px] shadow opacity-80 group-hover/scoop:opacity-100">
                  <Rotate3D size={10} />
                </span>
              </div>
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen3D();
              }}
              className="text-xs text-nordic-blue hover:text-warm-brown font-medium transition-colors inline-flex items-center gap-1.5 bg-sand/30 hover:bg-sand/60 px-2.5 py-1 rounded-full cursor-pointer"
            >
              <Rotate3D size={12} className="text-[#D4AF37]" />
              <span>3D Spin</span>
            </button>
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
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between shadow-xl border border-[#D4AF37]/40"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-playfair text-xl font-bold text-cream">{flavour.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen3D();
                }}
                className="bg-white/15 hover:bg-white/30 text-cream p-1.5 rounded-full transition-all cursor-pointer"
                title="Open 3D Studio"
              >
                <Rotate3D size={14} className="text-[#D4AF37]" />
              </button>
            </div>
            <p className="text-sm font-light leading-relaxed text-cream/90">{flavour.description}</p>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-cream/20">
            {flavour.isVegan && (
              <span className="text-[9px] uppercase tracking-widest border border-cream/50 text-cream px-2 py-0.5 rounded-sm font-semibold">
                🌱 Vegan
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen3D();
              }}
              className="text-[11px] text-[#D4AF37] uppercase tracking-wider font-semibold ml-auto hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>3D Vorschau</span> ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlavourGrid() {
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState("all");
  const [active3DFlavour, setActive3DFlavour] = useState<{ flavour: FlavourItem; index: number } | null>(null);

  const flavoursList = t.flavours.items;
  const categories = ["all", ...Array.from(new Set(flavoursList.map((f) => f.category)))];

  const filtered =
    activeCategory === "all"
      ? flavoursList
      : flavoursList.filter((f) => f.category === activeCategory);

  return (
    <section id="eis" className="py-20 md:py-28 bg-sand/20 text-warm-brown overflow-hidden relative">
      <FreezerReveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Header with decorative cone */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-nordic-blue text-xs font-semibold uppercase tracking-widest">
                  {t.flavours.eyebrow}
                </span>
                <span className="bg-[#D4AF37]/20 text-warm-brown text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#D4AF37]/40 flex items-center gap-1">
                  <Sparkles size={10} className="text-[#D4AF37]" />
                  <span>3D Interactive</span>
                </span>
              </div>

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

          {/* Flip card grid with 3D Preview Triggers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((flavour, i) => (
              <div
                key={flavour.name}
                style={{
                  animation: `fadeSlideIn 0.4s ease-out both`,
                  animationDelay: `${i * 0.04}s`,
                }}
              >
                <FlipCard
                  flavour={flavour}
                  index={i}
                  hoverText={t.flavours.hoverHint}
                  onOpen3D={() => setActive3DFlavour({ flavour, index: i })}
                />
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
      </FreezerReveal>

      {/* 3D Scoop Studio Modal */}
      {active3DFlavour && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
          onClick={() => setActive3DFlavour(null)}
        >
          <div
            className="relative bg-cream/95 text-warm-brown rounded-3xl p-8 max-w-md w-full shadow-2xl border border-sand/80 flex flex-col items-center text-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActive3DFlavour(null)}
              className="absolute top-4 right-4 text-warm-brown/60 hover:text-warm-brown bg-sand/40 hover:bg-sand p-2 rounded-full transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <span className="text-xs uppercase tracking-widest font-semibold text-nordic-blue/70 mb-1">
              {active3DFlavour.flavour.category}
            </span>
            <h3 className="font-playfair text-3xl font-bold mb-2 text-warm-brown">
              {active3DFlavour.flavour.name}
            </h3>
            <p className="text-xs text-warm-brown/60 mb-4 flex items-center gap-1.5">
              <Rotate3D size={14} className="text-[#D4AF37]" />
              <span>{lang === "de" ? "Klicken & ziehen zum Drehen" : "Click & drag to rotate in 3D"}</span>
            </p>

            {/* 3D Scoop Canvas */}
            <div className="relative my-2 p-4 bg-gradient-to-b from-sand/30 to-sand/60 rounded-2xl border border-sand/50 shadow-inner flex items-center justify-center w-full">
              <Scoop3D
                flavourName={active3DFlavour.flavour.name}
                color={scoopColorMap[active3DFlavour.index % scoopColorMap.length]}
                size={220}
                autoRotate={true}
                interactive={true}
                className="filter drop-shadow-2xl"
              />
            </div>

            <p className="text-sm font-light text-warm-brown/85 leading-relaxed mt-4">
              {active3DFlavour.flavour.description}
            </p>

            {active3DFlavour.flavour.isVegan && (
              <span className="mt-3 text-xs uppercase tracking-wider bg-sage/20 text-sage px-3 py-1 rounded-full font-bold">
                🌱 100% Vegan
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

"use client";
import { useLang } from "@/context/LangContext";

export default function WhyBlavand() {
  const { t } = useLang();
  const w = t.why;

  return (
    <section id="why" className="py-16 md:py-28 bg-nordic-blue text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <p className="text-sand text-xs font-semibold uppercase tracking-widest mb-3">{w.eyebrow}</p>
          <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl max-w-2xl leading-tight">{w.headline}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {w.features.map((f) => (
            <div key={f.id} className="relative pt-7 border-t border-cream/20">
              <span className="absolute top-0 left-0 -mt-px font-playfair text-5xl text-cream/10 leading-none select-none">{f.id}</span>
              <h3 className="text-base font-semibold mb-2 mt-2 tracking-wide">{f.title}</h3>
              <p className="text-cream/65 font-light leading-relaxed text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

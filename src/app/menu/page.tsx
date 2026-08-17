"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

export default function MenuPage() {
  const { t } = useLang();
  const m = t.menuPage;
  const flavoursList = t.flavours.items;
  const categories = Array.from(new Set(flavoursList.map((f) => f.category)));

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Banner */}
      <div className="relative pt-32 pb-20 bg-nordic-blue text-cream text-center overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="/logo.png" alt="" fill className="object-contain filter drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <p className="text-sand text-xs font-semibold uppercase tracking-widest mb-4">Blåvand Eiscafé · Kiel</p>
          <h1 className="font-playfair text-5xl md:text-6xl mb-4">{m.title}</h1>
          <p className="text-cream/70 font-light text-lg">
            {m.subtitle}
          </p>
        </div>
      </div>

      {/* Menu Content */}
      <div className="py-20 bg-cream text-warm-brown flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

          {/* Note */}
          <div className="bg-sand/40 rounded-2xl px-8 py-5 text-center text-sm text-warm-brown/70 italic border border-sand/50">
            {m.note}
          </div>

          {/* Gelato sections by category */}
          {categories.map((category) => (
            <section key={category}>
              <h2 className="font-playfair text-3xl md:text-4xl mb-8 pb-4 border-b border-sand/60 text-warm-brown">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                {flavoursList.filter((f) => f.category === category).map((flavour, i) => (
                  <div key={i} className="group flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-base group-hover:text-nordic-blue transition-colors flex items-center gap-2">
                        {flavour.name}
                        {"isVegan" in flavour && flavour.isVegan && (
                          <span className="text-[9px] uppercase tracking-widest bg-sage/20 text-sage px-2 py-0.5 rounded-sm font-bold">
                            🌱 Vegan
                          </span>
                        )}
                      </h3>
                      <p className="text-warm-brown/65 font-light mt-1 text-sm leading-relaxed">{flavour.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Coffee */}
          <section>
            <h2 className="font-playfair text-3xl md:text-4xl mb-2 pb-4 border-b border-sand/60 text-warm-brown">
              {m.coffeeHeading}
            </h2>
            <p className="text-sm text-warm-brown/60 italic mb-8">{m.coffeeSub}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {t.coffee.menu.map((item, i) => (
                <div key={i} className="flex justify-between items-baseline group">
                  <div>
                    <h3 className="font-semibold text-base group-hover:text-nordic-blue transition-colors">{item.name}</h3>
                    <p className="text-warm-brown/65 font-light mt-1 text-sm">{item.description}</p>
                  </div>
                  <div className="font-semibold pl-6 text-nordic-blue text-sm">{item.price}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Waffles */}
          <section>
            <h2 className="font-playfair text-3xl md:text-4xl mb-2 pb-4 border-b border-sand/60 text-warm-brown">
              {m.wafflesHeading}
            </h2>
            <p className="text-sm text-warm-brown/60 italic mb-8">{m.wafflesSub}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              {m.waffles.map((item, i) => (
                <div key={i} className="flex justify-between items-baseline group">
                  <div>
                    <h3 className="font-semibold text-base group-hover:text-nordic-blue transition-colors">{item.name}</h3>
                    <p className="text-warm-brown/65 font-light mt-1 text-sm">{item.description}</p>
                  </div>
                  <div className="font-semibold pl-6 text-nordic-blue text-sm">{item.price}</div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Back CTA */}
      <div className="bg-sand/30 py-12 text-center border-t border-sand/40">
        <Link href="/" className="inline-block bg-nordic-blue text-cream px-8 py-3.5 rounded-full font-medium hover:bg-nordic-blue/90 transition-colors shadow-sm">
          ← {m.backHome}
        </Link>
      </div>
    </main>
  );
}

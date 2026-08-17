"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

export default function CoffeeSection() {
  const { t } = useLang();
  const c = t.coffee;

  return (
    <section id="kaffee" className="py-16 md:py-24 bg-cream text-warm-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="text-nordic-blue text-xs font-semibold uppercase tracking-widest mb-4">{c.eyebrow}</p>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl mb-5">{c.headline}</h2>
            <p className="text-base md:text-lg text-warm-brown/75 font-light mb-8 leading-relaxed">{c.description}</p>
            <div className="space-y-5 mb-8">
              {c.menu.slice(0, 4).map((item, i) => (
                <div key={i} className="flex justify-between items-baseline border-b border-sand/50 pb-2">
                  <div>
                    <h4 className="font-semibold text-sm md:text-base">{item.name}</h4>
                    <p className="text-xs text-warm-brown/55 font-light mt-0.5">{item.description}</p>
                  </div>
                  <div className="font-semibold text-nordic-blue text-sm ml-4">{item.price}</div>
                </div>
              ))}
            </div>
            <Link href="/menu"
              className="inline-block border border-warm-brown text-warm-brown px-7 py-3 rounded-full font-medium text-sm hover:bg-warm-brown hover:text-cream transition-colors">
              {c.cta}
            </Link>
          </div>
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-sm">
            <Image src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1936&auto=format&fit=crop"
              alt="Coffee and Gelato" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

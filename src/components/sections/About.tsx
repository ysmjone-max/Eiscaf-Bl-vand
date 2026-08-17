"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="about" className="py-16 md:py-24 bg-cream text-warm-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2070&auto=format&fit=crop"
              alt="Café Interior"
              fill className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-nordic-blue text-xs font-semibold uppercase tracking-widest mb-4">{a.eyebrow}</p>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">{a.headline}</h2>
            <div className="space-y-4 text-base md:text-lg text-warm-brown/75 font-light leading-relaxed mb-8">
              <p>{a.p1}</p>
              <p>{a.p2}</p>
            </div>
            <Link href="#why"
              className="inline-flex items-center text-nordic-blue font-medium hover:opacity-70 transition-opacity group pb-1 border-b-2 border-nordic-blue/30 hover:border-nordic-blue self-start">
              {a.cta}
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

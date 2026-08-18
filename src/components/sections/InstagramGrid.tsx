"use client";

import Image from "next/image";
import { businessConfig } from "@/data/config";
import { useLang } from "@/context/LangContext";

const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Curated aesthetic Instagram grid photos
const instagramPhotos = [
  {
    src: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?q=80&w=600&auto=format&fit=crop",
    caption: "Pistachio & Strawberry Dream 🍦",
  },
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
    caption: "Hygge afternoons at Knooper Weg ☕",
  },
  {
    src: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=600&auto=format&fit=crop",
    caption: "Sun, Gelato & Good Vibes ✨",
  },
  {
    src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop",
    caption: "Elbgold Coffee + Fresh Waffles 🧇",
  },
  {
    src: "https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?q=80&w=600&auto=format&fit=crop",
    caption: "Terrace season in Kiel ☀️",
  },
  {
    src: "https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=600&auto=format&fit=crop",
    caption: "Fresh batches churned daily 🍨",
  },
];

export default function InstagramGrid() {
  const { t, lang } = useLang();

  return (
    <section id="galerie-insta" className="py-20 md:py-24 bg-sand/25 border-t border-sand/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-nordic-blue text-xs font-semibold uppercase tracking-widest block mb-2">
              @eiscafe_blavand
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl text-warm-brown">{t.instagram.headline}</h2>
          </div>
          <a
            href={`https://instagram.com/${businessConfig.contact.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-warm-brown px-6 py-3 rounded-full hover:shadow-lg transition-all font-semibold text-xs md:text-sm shadow-sm hover:scale-105"
          >
            <InstagramIcon size={18} />
            <span>{businessConfig.contact.instagram}</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {instagramPhotos.map((item, idx) => (
            <a
              key={idx}
              href={`https://instagram.com/${businessConfig.contact.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm border border-sand/50"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:opacity-100 opacity-0 transition-opacity flex flex-col items-center justify-center p-3 text-center text-cream">
                <InstagramIcon className="text-[#D4AF37] mb-2 transform group-hover:scale-110 transition-transform" size={26} />
                <p className="text-[11px] font-medium leading-tight line-clamp-2">{item.caption}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

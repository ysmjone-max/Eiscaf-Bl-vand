"use client";
import Image from "next/image";
import { businessConfig } from "@/data/config";
import { useLang } from "@/context/LangContext";

const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const images = [
  "https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522228115018-d838bcce5c3a?q=80&w=600&auto=format&fit=crop"
];

export default function InstagramGrid() {
  const { t } = useLang();

  return (
    <section id="galerie" className="py-20 md:py-24 bg-sand/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="font-playfair text-3xl md:text-5xl text-warm-brown">{t.instagram.headline}</h2>
          </div>
          <a 
            href={`https://instagram.com/${businessConfig.contact.instagram.replace("@", "")}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-cream text-warm-brown px-6 py-3 rounded-full hover:bg-white transition-colors shadow-sm font-medium text-sm"
          >
            <InstagramIcon size={18} />
            {businessConfig.contact.instagram}
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <a key={idx} href={`https://instagram.com/${businessConfig.contact.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="relative aspect-square rounded-xl overflow-hidden group">
              <Image 
                src={src} 
                alt="Instagram post" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700" 
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <InstagramIcon className="text-white transform group-hover:scale-110 transition-transform" size={28} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

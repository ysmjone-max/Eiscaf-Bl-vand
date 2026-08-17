"use client";
import Link from "next/link";
import Image from "next/image";
import { businessConfig } from "@/data/config";
import { MapPin, Mail, Phone } from "lucide-react";
import { useLang } from "@/context/LangContext";

import AnimatedLogo from "@/components/animations/AnimatedLogo";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const n = t.nav;

  return (
    <footer className="bg-warm-brown text-cream pt-14 pb-8 md:pb-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <AnimatedLogo size={60} backdropVariant="gold" glow={true} />
              <span className="font-playfair text-lg leading-tight">Blåvand<br />Eiscafé</span>
            </div>
            <p className="text-cream/65 text-xs leading-relaxed mb-4">{f.tagline}</p>
            <a href={`https://instagram.com/${businessConfig.contact.instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cream/65 hover:text-white transition-colors inline-block">
              <InstagramIcon />
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-widest text-[10px] text-sand">{f.nav}</h4>
            <ul className="space-y-2.5 text-cream/65 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">{n.home}</Link></li>
              <li><Link href="#eis" className="hover:text-white transition-colors">{n.ice}</Link></li>
              <li><Link href="/menu" className="hover:text-white transition-colors">Speisekarte</Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors">{n.about}</Link></li>
              <li><Link href="#galerie" className="hover:text-white transition-colors">{n.gallery}</Link></li>
              <li><Link href="#location" className="hover:text-white transition-colors">{n.contact}</Link></li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-widest text-[10px] text-sand">{f.address}</h4>
            <ul className="space-y-3 text-cream/65 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <a href={businessConfig.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Knooper Weg 169<br />24118 Kiel
                </a>
              </li>
              {businessConfig.contact.phone && (
                <li className="flex items-center gap-2">
                  <Phone size={14} className="flex-shrink-0" />
                  <a href={`tel:${businessConfig.contact.phone}`} className="hover:text-white transition-colors">{businessConfig.contact.phone}</a>
                </li>
              )}
              {businessConfig.contact.email && (
                <li className="flex items-center gap-2">
                  <Mail size={14} className="flex-shrink-0" />
                  <a href={`mailto:${businessConfig.contact.email}`} className="hover:text-white transition-colors">{businessConfig.contact.email}</a>
                </li>
              )}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-widest text-[10px] text-sand">{f.hours}</h4>
            <div className="text-cream/65 text-sm space-y-1.5">
              <p>{t.location.mon}</p>
              <p className="font-semibold text-white">11:00 – 20:00 Uhr</p>
              <p className="text-[11px] text-cream/45 italic mt-3">{t.location.note}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/15 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-cream/45">
          <p>&copy; {new Date().getFullYear()} Blåvand Eiscafé · Kiel</p>
          <div className="flex gap-5">
            <Link href="/impressum" className="hover:text-white transition-colors">{f.legal[0]}</Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">{f.legal[1]}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MapPin, IceCream, Coffee, Phone, Clock, ChevronRight } from "lucide-react";
import { useLang } from "@/context/LangContext";
import AnimatedLogo from "@/components/animations/AnimatedLogo";
import { businessConfig } from "@/data/config";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, t, toggle } = useLang();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: t.nav.home, href: "#" },
    { label: t.nav.ice, href: "#eis" },
    { label: t.nav.coffee, href: "#kaffee" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.gallery, href: "#galerie" },
    { label: t.nav.contact, href: "#location" },
  ];

  const solid = isScrolled || isMobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-sand/40 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo */}
            <Link href="#" className="flex-shrink-0 flex items-center gap-3 group">
              <AnimatedLogo
                size={solid ? 52 : 62}
                backdropVariant={solid ? "blue" : "dark"}
                glow={true}
              />
              <div className="flex flex-col">
                <span
                  className={`font-playfair text-lg sm:text-xl font-bold tracking-wide transition-colors leading-tight ${
                    solid ? "text-warm-brown" : "text-cream"
                  }`}
                >
                  Blåvand
                </span>
                <span
                  className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest ${
                    solid ? "text-[#D4AF37]" : "text-[#D4AF37]"
                  }`}
                >
                  Eiscafé Kiel
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-[#D4AF37] ${
                    solid ? "text-warm-brown" : "text-cream"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/menu"
                className={`text-sm font-medium tracking-wide transition-colors hover:text-[#D4AF37] ${
                  solid ? "text-warm-brown" : "text-cream"
                }`}
              >
                Speisekarte
              </Link>
            </nav>

            {/* Desktop right: lang toggle + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language toggle */}
              <button
                onClick={toggle}
                className={`text-xs font-bold tracking-widest px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                  solid
                    ? "border-warm-brown/30 text-warm-brown hover:bg-warm-brown hover:text-cream"
                    : "border-cream/50 text-cream hover:bg-cream/20"
                }`}
                aria-label="Switch language"
              >
                {lang === "de" ? "EN" : "DE"}
              </button>

              <Link
                href="#location"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
                  solid
                    ? "bg-nordic-blue text-cream hover:bg-nordic-blue/90"
                    : "bg-cream text-nordic-blue hover:bg-white"
                }`}
              >
                {t.nav.visit}
              </Link>
            </div>

            {/* Mobile: lang toggle + hamburger button */}
            <div className="md:hidden flex items-center gap-2.5">
              <button
                onClick={toggle}
                className={`text-[11px] font-bold tracking-widest px-3 py-1 rounded-full border transition-all cursor-pointer ${
                  solid ? "border-warm-brown/30 text-warm-brown" : "border-cream/60 text-cream bg-black/20"
                }`}
                aria-label="Switch language"
              >
                {lang === "de" ? "EN" : "DE"}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  solid
                    ? "text-warm-brown bg-sand/40 hover:bg-sand"
                    : "text-cream bg-black/25 backdrop-blur-sm hover:bg-black/40"
                }`}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Modern Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-cream text-warm-brown shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-slideLeft"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-5 border-b border-sand/60">
                <div className="flex items-center gap-3">
                  <AnimatedLogo size={52} backdropVariant="blue" glow={true} />
                  <div>
                    <h3 className="font-playfair text-base font-bold leading-tight">Blåvand Eiscafé</h3>
                    <p className="text-[11px] text-[#D4AF37] font-semibold">Knooper Weg 169 · Kiel</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full bg-sand/40 text-warm-brown hover:bg-sand transition-colors cursor-pointer"
                  aria-label="Schließen"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-5 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-3 rounded-xl font-playfair text-lg text-warm-brown hover:bg-sand/40 hover:text-nordic-blue transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={16} className="opacity-40" />
                  </Link>
                ))}

                <Link
                  href="/menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-3 rounded-xl font-playfair text-lg text-warm-brown hover:bg-sand/40 hover:text-nordic-blue transition-colors"
                >
                  <span>📜 Speisekarte (Vollständig)</span>
                  <ChevronRight size={16} className="opacity-40" />
                </Link>
              </nav>
            </div>

            {/* Drawer Bottom Info & Quick Actions */}
            <div className="pt-6 border-t border-sand/60 space-y-4">
              <div className="flex items-center justify-between bg-sand/30 p-3 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-nordic-blue" />
                  <span>{lang === "de" ? "Täglich 11:00 – 20:00 Uhr" : "Daily 11:00 – 20:00"}</span>
                </div>
                <button
                  onClick={toggle}
                  className="font-bold text-[11px] bg-nordic-blue text-cream px-2.5 py-1 rounded-md cursor-pointer"
                >
                  {lang === "de" ? "EN" : "DE"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={businessConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-nordic-blue text-cream py-3 rounded-xl text-xs font-semibold shadow-sm text-center"
                >
                  <MapPin size={14} />
                  <span>Route</span>
                </a>

                {businessConfig.contact.phone && (
                  <a
                    href={`tel:${businessConfig.contact.phone}`}
                    className="flex items-center justify-center gap-1.5 bg-sand/60 text-warm-brown py-3 rounded-xl text-xs font-semibold hover:bg-sand transition-colors text-center"
                  >
                    <Phone size={14} />
                    <span>Anrufen</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-cream/95 backdrop-blur-md border-t border-sand/60 z-40 flex justify-around items-center h-14 shadow-lg">
        <Link
          href="#location"
          className="flex flex-col items-center gap-0.5 text-nordic-blue hover:scale-105 transition-transform"
        >
          <MapPin size={17} />
          <span className="text-[9px] font-bold tracking-wider uppercase">Route</span>
        </Link>
        <Link
          href="#eis"
          className="flex flex-col items-center gap-0.5 text-warm-brown hover:text-nordic-blue transition-colors"
        >
          <IceCream size={17} />
          <span className="text-[9px] font-bold tracking-wider uppercase">{t.nav.ice}</span>
        </Link>
        <Link
          href="/menu"
          className="flex flex-col items-center gap-0.5 text-warm-brown hover:text-nordic-blue transition-colors"
        >
          <Coffee size={17} />
          <span className="text-[9px] font-bold tracking-wider uppercase">Menü</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-0.5 text-warm-brown hover:text-nordic-blue transition-colors cursor-pointer"
        >
          <Menu size={17} />
          <span className="text-[9px] font-bold tracking-wider uppercase">Mehr</span>
        </button>
      </div>

      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideLeft {
          animation: slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}

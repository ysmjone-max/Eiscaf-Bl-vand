"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MapPin, IceCream, Coffee } from "lucide-react";
import { useLang } from "@/context/LangContext";

import AnimatedLogo from "@/components/animations/AnimatedLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, t, toggle } = useLang();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home,    href: "/" },
    { label: t.nav.ice,     href: "#eis" },
    { label: t.nav.coffee,  href: "#kaffee" },
    { label: t.nav.about,   href: "#about" },
    { label: t.nav.gallery, href: "#galerie" },
    { label: t.nav.contact, href: "#location" },
  ];

  const solid = isScrolled || isMobileMenuOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${solid ? "bg-cream/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <AnimatedLogo
              size={solid ? 48 : 54}
              backdropVariant={solid ? "blue" : "dark"}
              glow={true}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:opacity-60 ${solid ? "text-warm-brown" : "text-cream"}`}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right: lang toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggle}
              className={`text-xs font-bold tracking-widest px-3 py-1.5 rounded-full border transition-all ${
                solid
                  ? "border-warm-brown/30 text-warm-brown hover:bg-warm-brown hover:text-cream"
                  : "border-cream/50 text-cream hover:bg-cream/15"
              }`}
              aria-label="Switch language"
            >
              {lang === "de" ? "EN" : "DE"}
            </button>
            <Link href="#location"
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${solid ? "bg-nordic-blue text-cream hover:bg-nordic-blue/90" : "bg-cream text-nordic-blue hover:bg-cream/90"}`}>
              {t.nav.visit}
            </Link>
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggle}
              className={`text-xs font-bold tracking-widest px-3 py-1.5 rounded-full border transition-all ${
                solid ? "border-warm-brown/30 text-warm-brown" : "border-cream/50 text-cream"
              }`}
              aria-label="Switch language"
            >
              {lang === "de" ? "EN" : "DE"}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menü öffnen"
              className={`transition-colors ${solid ? "text-warm-brown" : "text-cream"}`}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-md absolute top-16 left-0 right-0 border-t border-sand/40 shadow-xl">
          <nav className="px-6 py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-xl font-playfair text-warm-brown border-b border-sand/30 last:border-0">
                {item.label}
              </Link>
            ))}
            <Link href="#location" onClick={() => setIsMobileMenuOpen(false)}
              className="mt-5 bg-nordic-blue text-cream text-center py-3.5 rounded-full font-medium text-sm">
              📍 {t.nav.visit}
            </Link>
          </nav>
        </div>
      )}

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-cream/95 backdrop-blur-md border-t border-sand/50 z-50 flex justify-around items-center h-14">
        <Link href="#location" className="flex flex-col items-center gap-0.5 text-nordic-blue">
          <MapPin size={18} />
          <span className="text-[9px] font-semibold tracking-wide uppercase">Route</span>
        </Link>
        <Link href="#eis" className="flex flex-col items-center gap-0.5 text-warm-brown hover:text-nordic-blue transition-colors">
          <IceCream size={18} />
          <span className="text-[9px] font-semibold tracking-wide uppercase">{t.nav.ice}</span>
        </Link>
        <Link href="/menu" className="flex flex-col items-center gap-0.5 text-warm-brown hover:text-nordic-blue transition-colors">
          <Coffee size={18} />
          <span className="text-[9px] font-semibold tracking-wide uppercase">Menü</span>
        </Link>
      </div>
    </header>
  );
}

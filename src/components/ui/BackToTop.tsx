"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
      className="fixed bottom-20 md:bottom-8 right-5 z-40 p-3 rounded-full bg-cream/90 hover:bg-cream text-nordic-blue shadow-xl border border-sand/80 backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center animate-fadeIn"
      style={{ animationDuration: "0.3s" }}
    >
      <ArrowUp size={18} className="text-nordic-blue" />
    </button>
  );
}

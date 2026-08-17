"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useLang } from "@/context/LangContext";
import { Sparkles, RefreshCw } from "lucide-react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function FreezerReveal({ children, className = "" }: Props) {
  const { lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [clearedPercent, setClearedPercent] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  // Initialize Frost Canvas
  const drawFrost = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.globalCompositeOperation = "source-over";

    // Frosted glass icy blue-white gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "rgba(225, 238, 245, 0.94)");
    gradient.addColorStop(0.5, "rgba(240, 248, 255, 0.96)");
    gradient.addColorStop(1, "rgba(215, 230, 240, 0.93)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add icy noise & crystal specks
    const numSpecks = Math.floor((canvas.width * canvas.height) / 800);
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    for (let i = 0; i < numSpecks; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 2 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add condensation streaks
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height * 0.7;
      const len = Math.random() * 80 + 30;
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x + (Math.random() * 4 - 2), startY + len);
      ctx.stroke();
    }

    setClearedPercent(0);
    setIsFullyRevealed(false);
  }, []);

  // Wipe at coordinates
  const wipeAt = useCallback((x: number, y: number, radius = 55) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setHasInteracted(true);

    ctx.globalCompositeOperation = "destination-out";

    // Soft feathered circular wipe with watery edge
    const radial = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius);
    radial.addColorStop(0, "rgba(0, 0, 0, 1)");
    radial.addColorStop(0.7, "rgba(0, 0, 0, 0.85)");
    radial.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Occasional tiny water drop wipe streaks
    if (Math.random() > 0.6) {
      const dropRad = ctx.createRadialGradient(x, y + radius * 0.8, 1, x, y + radius * 0.8, 8);
      dropRad.addColorStop(0, "rgba(0, 0, 0, 0.9)");
      dropRad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = dropRad;
      ctx.beginPath();
      ctx.arc(x, y + radius * 0.8, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  // Scroll auto-reveal
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isFullyRevealed) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When section enters the viewport, gradually wipe from center outwards
      if (rect.top < windowHeight * 0.75 && rect.bottom > 0) {
        const progress = Math.min(1, Math.max(0, (windowHeight * 0.75 - rect.top) / (windowHeight * 0.6)));
        const canvas = canvasRef.current;
        if (canvas) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const maxRadius = Math.max(canvas.width, canvas.height) * 0.75;
          wipeAt(centerX, centerY, maxRadius * progress);
          if (progress > 0.85) {
            setIsFullyRevealed(true);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [wipeAt, isFullyRevealed]);

  // Handle pointer interactions
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    wipeAt(x, y, 65);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || e.touches.length === 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    wipeAt(x, y, 75);
  };

  // Initial draw & resize handler
  useEffect(() => {
    drawFrost();
    const handleResize = () => drawFrost();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrost]);

  const clearAllFrost = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsFullyRevealed(true);
    setHasInteracted(true);
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Underlying Content (The Gelato Showcase) */}
      <div className="relative z-0">{children}</div>

      {/* Frost Overlay Canvas */}
      {!isFullyRevealed && (
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onTouchMove={handleTouchMove}
          className="absolute inset-0 z-20 cursor-crosshair w-full h-full touch-none select-none transition-opacity duration-700"
          style={{
            pointerEvents: isFullyRevealed ? "none" : "auto",
          }}
        />
      )}

      {/* Futuristic Frost Glass Floating Controls & Hint */}
      {!isFullyRevealed && (
        <div className="absolute top-6 right-6 z-30 flex items-center gap-3 pointer-events-auto">
          <div className="hidden sm:flex items-center gap-2 bg-nordic-blue/80 backdrop-blur-md text-cream text-xs px-4 py-2 rounded-full border border-cream/20 shadow-lg animate-pulse">
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span>
              {lang === "de"
                ? "❄️ Wische über das Glas, um die Theke aufzudecken"
                : "❄️ Wipe the frosted glass to reveal the gelato display"}
            </span>
          </div>

          <button
            onClick={clearAllFrost}
            className="bg-cream/90 hover:bg-cream text-nordic-blue text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-sand transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer"
            title={lang === "de" ? "Glas sofort enteisen" : "Defrost showcase"}
          >
            <Sparkles size={13} className="text-[#D4AF37]" />
            <span>{lang === "de" ? "Enteisen" : "Defrost"}</span>
          </button>
        </div>
      )}

      {/* Defrosted Reset Button when revealed */}
      {isFullyRevealed && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => {
              setIsFullyRevealed(false);
              setTimeout(drawFrost, 50);
            }}
            className="opacity-40 hover:opacity-100 bg-sand/60 hover:bg-cream text-warm-brown text-[11px] px-3 py-1.5 rounded-full border border-sand/80 transition-all flex items-center gap-1 cursor-pointer"
            title={lang === "de" ? "Theke wieder vereisen" : "Re-freeze glass"}
          >
            <RefreshCw size={11} />
            <span>{lang === "de" ? "Frost-Modus" : "Frost mode"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

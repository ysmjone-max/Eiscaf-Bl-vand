"use client";
import { getAssetPath } from "@/utils/asset";

type Props = {
  size?: number;
  glow?: boolean;
  withBackdrop?: boolean;
  backdropVariant?: "dark" | "blue" | "cream" | "gold";
  className?: string;
};

export default function AnimatedLogo({
  size = 58,
  glow = true,
  withBackdrop = true,
  backdropVariant = "dark",
  className = "",
}: Props) {
  const backdropStyles = {
    dark: "bg-warm-brown/95 shadow-xl border border-sand/40",
    blue: "bg-nordic-blue/95 shadow-xl border border-sand/40",
    cream: "bg-cream/95 shadow-md border border-sand/70",
    gold: "bg-gradient-to-br from-warm-brown/95 via-[#34241a] to-nordic-blue/95 shadow-xl border border-[#D4AF37]/60",
  };

  const logoSrc = getAssetPath("/logo.png");

  return (
    <div
      className={`relative flex items-center justify-center rounded-full group cursor-pointer select-none transition-transform duration-500 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <style>{`
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes goldenPulse {
          0%, 100% {
            box-shadow: 0 0 10px 2px rgba(212, 175, 55, 0.25), 0 0 20px 4px rgba(212, 175, 55, 0.1);
          }
          50% {
            box-shadow: 0 0 18px 5px rgba(212, 175, 55, 0.45), 0 0 32px 8px rgba(212, 175, 55, 0.2);
          }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1.5px); }
        }
        .orbit-ring {
          animation: orbitSpin 24s linear infinite;
        }
        .golden-glow {
          animation: goldenPulse 4s ease-in-out infinite;
        }
        .logo-float {
          animation: logoFloat 4s ease-in-out infinite;
        }
      `}</style>

      {/* Outer ambient golden glow */}
      {glow && (
        <div
          className="golden-glow absolute -inset-1 rounded-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Rotating golden orbit dashed ring */}
      <div
        className="orbit-ring absolute -inset-1 rounded-full pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity"
        style={{
          border: "1.5px dashed #D4AF37",
          zIndex: 1,
        }}
      />

      {/* Background disc container zoomed out for 100% visibility of outer circle text */}
      <div
        className={`relative z-10 w-full h-full rounded-full flex items-center justify-center overflow-hidden p-2 backdrop-blur-md transition-all duration-300 ${
          withBackdrop ? backdropStyles[backdropVariant] : ""
        }`}
      >
        <div className="logo-float w-full h-full relative flex items-center justify-center p-0.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="Blåvand Eiscafé"
            width={size}
            height={size}
            className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform scale-95"
          />
        </div>
      </div>
    </div>
  );
}

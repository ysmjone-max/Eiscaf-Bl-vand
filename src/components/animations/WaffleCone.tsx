/**
 * WaffleCone — animated SVG of a waffle cone that draws itself on scroll into view
 * Used as a decorative section element
 */
"use client";
import { useEffect, useRef } from "react";

export default function WaffleCone({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && svgRef.current) {
          svgRef.current.classList.add("is-visible");
        }
      },
      { threshold: 0.3 }
    );
    if (svgRef.current) observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`waffle-cone-svg ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <style>{`
        .waffle-cone-svg path,
        .waffle-cone-svg line,
        .waffle-cone-svg circle {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          transition: stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .waffle-cone-svg.is-visible path,
        .waffle-cone-svg.is-visible line,
        .waffle-cone-svg.is-visible circle {
          stroke-dashoffset: 0;
        }
        .waffle-cone-svg.is-visible path:nth-child(2) { transition-delay: 0.1s; }
        .waffle-cone-svg.is-visible path:nth-child(3) { transition-delay: 0.3s; }
        .waffle-cone-svg.is-visible line            { transition-delay: 0.5s; }
        .waffle-cone-svg.is-visible circle          { transition-delay: 0.7s; }
      `}</style>

      {/* Cone outline */}
      <path
        d="M20 80 L60 195 L100 80 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Cone waffle grid */}
      <path
        d="M30 95 Q60 85 90 95 M35 110 Q60 100 85 110 M40 125 Q60 115 80 125 M45 140 Q60 132 75 140 M50 155 Q60 148 70 155"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Vertical cone lines */}
      <line x1="60" y1="195" x2="40" y2="88" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="195" x2="60" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="195" x2="80" y2="88" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* First scoop */}
      <circle cx="60" cy="55" r="28" stroke="currentColor" strokeWidth="2" />
      {/* Second scoop */}
      <circle cx="60" cy="20" r="20" stroke="currentColor" strokeWidth="2" />
      {/* Shine on top scoop */}
      <circle cx="52" cy="13" r="5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}

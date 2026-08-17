/**
 * MeltingScoop v2 — more dramatic, with drip trails, wobble and glow
 */
"use client";
import { useRef } from "react";

export default function MeltingScoop() {
  return (
    <div className="absolute right-0 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none z-1 hidden md:block">
      <svg
        viewBox="0 0 220 340"
        width="200"
        height="310"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 0 24px rgba(249,246,240,0.18))" }}
      >
        <style>{`
          @keyframes scoopMorph {
            0%, 100% { d: path("M110 30 C65 30 35 62 35 105 C35 148 62 175 78 192 C85 200 90 212 96 230 L110 252 L124 230 C130 212 135 200 142 192 C158 175 185 148 185 105 C185 62 155 30 110 30 Z"); }
            25%       { d: path("M110 30 C63 30 33 64 33 108 C33 148 59 178 76 196 C83 205 88 218 95 238 L110 260 L125 238 C132 218 137 205 144 196 C161 178 187 148 187 108 C187 64 157 30 110 30 Z"); }
            55%       { d: path("M110 30 C67 30 37 60 37 103 C37 145 63 173 80 190 C87 198 92 210 97 228 L110 248 L123 228 C128 210 133 198 140 190 C157 173 183 145 183 103 C183 60 153 30 110 30 Z"); }
            75%       { d: path("M110 30 C62 30 32 63 32 107 C32 150 60 177 77 194 C84 202 89 214 95 234 L110 256 L125 234 C131 214 136 202 143 194 C160 177 188 150 188 107 C188 63 158 30 110 30 Z"); }
          }
          @keyframes drip1 {
            0%,50%    { opacity:0; ry:0; cy:232; }
            60%       { opacity:0.7; ry:10; cy:236; }
            80%       { opacity:0.9; ry:20; cy:248; }
            95%,100%  { opacity:0; ry:22; cy:270; }
          }
          @keyframes drip2 {
            0%,60%    { opacity:0; ry:0; cy:235; }
            70%       { opacity:0.6; ry:8;  cy:240; }
            88%       { opacity:0.8; ry:16; cy:252; }
            98%,100%  { opacity:0; ry:17; cy:272; }
          }
          @keyframes drip3 {
            0%,40%    { opacity:0; ry:0; cy:230; }
            52%       { opacity:0.5; ry:12; cy:240; }
            78%       { opacity:0.7; ry:22; cy:255; }
            93%,100%  { opacity:0; ry:24; cy:278; }
          }
          @keyframes coneRock {
            0%,100% { transform: rotate(0deg) translateX(0px); }
            30%     { transform: rotate(1.2deg) translateX(1px); }
            70%     { transform: rotate(-0.8deg) translateX(-1px); }
          }
          @keyframes glowPulse {
            0%,100% { opacity: 0.12; }
            50%     { opacity: 0.22; }
          }
          @keyframes shine {
            0%,100% { opacity: 0.12; }
            40%     { opacity: 0.28; }
          }
          .scoop-body { animation: scoopMorph 7s ease-in-out infinite; }
          .drip-1     { animation: drip1 7s 0.6s ease-in-out infinite; }
          .drip-2     { animation: drip2 7s 1.4s ease-in-out infinite; }
          .drip-3     { animation: drip3 7s 0.2s ease-in-out infinite; }
          .cone-group { animation: coneRock 7s ease-in-out infinite; transform-origin: 110px 252px; }
          .glow       { animation: glowPulse 7s ease-in-out infinite; }
          .shine-dot  { animation: shine 7s 0.5s ease-in-out infinite; }
        `}</style>

        {/* Ambient glow halo */}
        <ellipse className="glow" cx="110" cy="120" rx="82" ry="88" fill="rgba(249,246,240,1)" />

        {/* Scoop */}
        <path
          className="scoop-body"
          d="M110 30 C65 30 35 62 35 105 C35 148 62 175 78 192 C85 200 90 212 96 230 L110 252 L124 230 C130 212 135 200 142 192 C158 175 185 148 185 105 C185 62 155 30 110 30 Z"
          fill="rgba(249,246,240,0.92)"
        />

        {/* Shine highlights */}
        <ellipse className="shine-dot" cx="88" cy="72" rx="14" ry="22" fill="white" transform="rotate(-25 88 72)" />
        <ellipse cx="76" cy="62" rx="5" ry="8" fill="white" opacity="0.25" transform="rotate(-20 76 62)" />

        {/* Drip trails */}
        <ellipse className="drip-1" cx="95"  cy="232" rx="7"  ry="0" fill="rgba(249,246,240,0.88)" />
        <ellipse className="drip-2" cx="123" cy="235" rx="5"  ry="0" fill="rgba(249,246,240,0.8)"  />
        <ellipse className="drip-3" cx="110" cy="230" rx="9"  ry="0" fill="rgba(249,246,240,0.85)" />

        {/* Cone */}
        <g className="cone-group">
          {/* Main cone shape */}
          <polygon points="110,330 60,252 160,252" fill="rgba(210,175,120,0.85)" />
          {/* Waffle grid lines diagonal */}
          <line x1="110" y1="330" x2="75"  y2="258" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" />
          <line x1="110" y1="330" x2="92"  y2="252" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" />
          <line x1="110" y1="330" x2="110" y2="252" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" />
          <line x1="110" y1="330" x2="128" y2="252" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" />
          <line x1="110" y1="330" x2="145" y2="258" stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" />
          {/* Horizontal grid lines */}
          <line x1="67"  y1="270" x2="153" y2="270" stroke="rgba(0,0,0,0.09)" strokeWidth="1" />
          <line x1="73"  y1="284" x2="147" y2="284" stroke="rgba(0,0,0,0.09)" strokeWidth="1" />
          <line x1="81"  y1="300" x2="139" y2="300" stroke="rgba(0,0,0,0.09)" strokeWidth="1" />
          <line x1="90"  y1="316" x2="130" y2="316" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
          {/* Cone highlight */}
          <polygon points="110,330 60,252 85,252" fill="rgba(255,255,255,0.08)" />
        </g>
      </svg>
    </div>
  );
}

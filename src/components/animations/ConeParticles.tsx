/**
 * ConeParticles v2 — more cones, better silhouettes, subtle rotation, depth layers
 */
"use client";

const cones = [
  { size: 28, left: "4%",   bottom: "20%", delay: "0s",    duration: "22s", rotate: -18, opacity: 0.35 },
  { size: 18, left: "16%",  bottom: "55%", delay: "3.5s",  duration: "27s", rotate: 12,  opacity: 0.25 },
  { size: 36, left: "28%",  bottom: "75%", delay: "8s",    duration: "20s", rotate: -6,  opacity: 0.20 },
  { size: 14, left: "44%",  bottom: "30%", delay: "1.8s",  duration: "24s", rotate: 22,  opacity: 0.30 },
  { size: 24, left: "58%",  bottom: "60%", delay: "5.5s",  duration: "21s", rotate: -28, opacity: 0.22 },
  { size: 20, left: "70%",  bottom: "35%", delay: "10s",   duration: "23s", rotate: 8,   opacity: 0.28 },
  { size: 12, left: "82%",  bottom: "68%", delay: "2.2s",  duration: "18s", rotate: -12, opacity: 0.32 },
  { size: 32, left: "91%",  bottom: "45%", delay: "6.8s",  duration: "25s", rotate: 15,  opacity: 0.18 },
  { size: 10, left: "50%",  bottom: "85%", delay: "14s",   duration: "19s", rotate: -5,  opacity: 0.20 },
  { size: 22, left: "38%",  bottom: "10%", delay: "0.5s",  duration: "26s", rotate: 30,  opacity: 0.25 },
];

const ConeSVG = ({ size, rotate, opacity }: { size: number; rotate: number; opacity: number }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 48 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotate}deg)`, opacity }}
  >
    {/* Double scoop */}
    <circle cx="24" cy="22" r="16" fill="rgba(249,246,240,0.85)" />
    <circle cx="24" cy="7"  r="10" fill="rgba(249,246,240,0.75)" />
    {/* Top scoop shine */}
    <circle cx="19" cy="4"  r="3"  fill="rgba(255,255,255,0.5)" />
    {/* Bottom scoop shine */}
    <ellipse cx="17" cy="17" rx="5" ry="7" fill="rgba(255,255,255,0.25)" transform="rotate(-20 17 17)" />
    {/* Cone */}
    <polygon points="24,68 6,36 42,36" fill="rgba(210,175,100,0.80)" />
    {/* Cone waffle lines */}
    <line x1="24" y1="68" x2="11"  y2="38" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
    <line x1="24" y1="68" x2="17"  y2="36" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
    <line x1="24" y1="68" x2="24"  y2="36" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
    <line x1="24" y1="68" x2="31"  y2="36" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
    <line x1="24" y1="68" x2="37"  y2="38" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
    <line x1="9"  y1="48" x2="39"  y2="48" stroke="rgba(0,0,0,0.10)" strokeWidth="0.8" />
    <line x1="13" y1="56" x2="35"  y2="56" stroke="rgba(0,0,0,0.10)" strokeWidth="0.8" />
    <line x1="17" y1="62" x2="31"  y2="62" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
  </svg>
);

export default function ConeParticles() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <style>{`
        @keyframes driftCone {
          0%    { transform: translateY(0) translateX(0) rotate(0deg);    opacity: 0; }
          8%    { opacity: 1; }
          25%   { transform: translateY(-18px) translateX(10px) rotate(4deg); }
          50%   { transform: translateY(-35px) translateX(-5px) rotate(-3deg); }
          75%   { transform: translateY(-50px) translateX(8px) rotate(5deg); }
          92%   { opacity: 1; }
          100%  { transform: translateY(-70px) translateX(-6px) rotate(-2deg); opacity: 0; }
        }
      `}</style>
      {cones.map((cone, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: cone.left,
            bottom: cone.bottom,
            opacity: 0,
            animation: `driftCone ${cone.duration} ${cone.delay} ease-in-out infinite`,
          }}
        >
          <ConeSVG size={cone.size} rotate={cone.rotate} opacity={cone.opacity} />
        </div>
      ))}
    </div>
  );
}

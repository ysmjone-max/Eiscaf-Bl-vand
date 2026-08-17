/**
 * FloatingOrbs v2 — more varied, gelato-authentic colours, pulsing, with inner glow
 */
"use client";

const orbs = [
  { size: 22, left: "6%",   delay: "0s",    duration: "13s", color: "#A8BFA8", glow: "#849383" },  // pistachio
  { size: 34, left: "18%",  delay: "2.2s",  duration: "17s", color: "#F5C2C2", glow: "#E08080" },  // strawberry
  { size: 14, left: "32%",  delay: "5.5s",  duration: "11s", color: "#F9F0E0", glow: "#E8D8B8" },  // vanilla
  { size: 26, left: "47%",  delay: "1s",    duration: "15s", color: "#D4A96A", glow: "#B8882A" },  // salted caramel
  { size: 10, left: "60%",  delay: "4.2s",  duration: "9s",  color: "#F5C2C2", glow: "#D08080" },  // raspberry
  { size: 40, left: "73%",  delay: "3.1s",  duration: "20s", color: "#A8BFA8", glow: "#6A9368" },  // pistachio large
  { size: 16, left: "86%",  delay: "6.8s",  duration: "14s", color: "#F9F0E0", glow: "#DACA9A" },  // vanilla
  { size: 20, left: "40%",  delay: "8.4s",  duration: "16s", color: "#C8A87A", glow: "#A07840" },  // hazelnut
  { size: 12, left: "12%",  delay: "9.2s",  duration: "12s", color: "#8EA8B8", glow: "#4C7888" },  // nordic blue
  { size: 28, left: "92%",  delay: "0.6s",  duration: "18s", color: "#F5C2C2", glow: "#D07878" },  // strawberry
  { size: 18, left: "55%",  delay: "11s",   duration: "14s", color: "#B8C8A8", glow: "#788A68" },  // mint
  { size: 8,  left: "78%",  delay: "7s",    duration: "10s", color: "#F9F0E0", glow: "#E0D0A0" },  // tiny vanilla
];

export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(110vh) scale(0.75) rotate(0deg); opacity: 0; }
          8%   { opacity: 1; }
          50%  { transform: translateY(50vh) scale(1) rotate(180deg); }
          92%  { opacity: 1; }
          100% { transform: translateY(-15vh) scale(0.9) rotate(360deg); opacity: 0; }
        }
        @keyframes wobbleFull {
          0%,100% { border-radius: 50%; }
          20%     { border-radius: 48% 52% 56% 44% / 50% 44% 56% 50%; }
          40%     { border-radius: 53% 47% 44% 56% / 56% 50% 44% 50%; }
          60%     { border-radius: 47% 53% 52% 48% / 44% 53% 47% 56%; }
          80%     { border-radius: 52% 48% 48% 52% / 52% 46% 54% 48%; }
        }
        @keyframes orbPulse {
          0%,100% { box-shadow: 0 0 6px 2px var(--orb-glow); }
          50%     { box-shadow: 0 0 14px 5px var(--orb-glow); }
        }
      `}</style>

      {orbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: "-80px",
            left: orb.left,
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            opacity: 0,
            animation: `
              floatUp ${orb.duration} ${orb.delay} ease-in-out infinite,
              wobbleFull ${parseFloat(orb.duration) * 0.5}s ${orb.delay} ease-in-out infinite,
              orbPulse ${parseFloat(orb.duration) * 0.3}s ${orb.delay} ease-in-out infinite
            `,
            ["--orb-glow" as string]: `${orb.glow}60`,
            boxShadow: `0 0 8px 2px ${orb.glow}40`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

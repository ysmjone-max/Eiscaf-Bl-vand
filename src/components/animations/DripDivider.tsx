/**
 * DripDivider — a slow cream drip SVG used as a section divider
 * Place between sections for visual flair
 */
export default function DripDivider({ color = "#F9F6F0", bgColor = "#2C4C5B" }: { color?: string; bgColor?: string }) {
  return (
    <div style={{ backgroundColor: bgColor, lineHeight: 0 }} className="overflow-hidden">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "80px" }}
      >
        <style>{`
          @keyframes dripDrop {
            0%, 40%  { d: path("M0 0 L1440 0 L1440 20 Q1200 20 1080 36 Q960 52 840 36 Q720 20 600 36 Q480 52 360 36 Q240 20 120 36 Q60 44 0 36 Z"); }
            70%      { d: path("M0 0 L1440 0 L1440 20 Q1200 20 1080 42 Q960 64 840 42 Q720 20 600 46 Q480 72 360 46 Q240 20 120 42 Q60 51 0 42 Z"); }
            100%     { d: path("M0 0 L1440 0 L1440 20 Q1200 20 1080 36 Q960 52 840 36 Q720 20 600 36 Q480 52 360 36 Q240 20 120 36 Q60 44 0 36 Z"); }
          }
          .drip-wave { animation: dripDrop 5s ease-in-out infinite; }
        `}</style>
        <path
          className="drip-wave"
          d="M0 0 L1440 0 L1440 20 Q1200 20 1080 36 Q960 52 840 36 Q720 20 600 36 Q480 52 360 36 Q240 20 120 36 Q60 44 0 36 Z"
          fill={color}
        />
        {/* Small hanging drip blobs */}
        <ellipse cx="360" cy="54" rx="10" ry="14" fill={color}>
          <animate attributeName="cy" values="52;60;52" dur="5s" repeatCount="indefinite" />
          <animate attributeName="ry" values="14;18;14" dur="5s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="840" cy="50" rx="7" ry="10" fill={color}>
          <animate attributeName="cy" values="48;56;48" dur="5s" begin="0.8s" repeatCount="indefinite" />
          <animate attributeName="ry" values="10;14;10" dur="5s" begin="0.8s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="1080" cy="58" rx="12" ry="16" fill={color}>
          <animate attributeName="cy" values="56;66;56" dur="5s" begin="1.5s" repeatCount="indefinite" />
          <animate attributeName="ry" values="16;21;16" dur="5s" begin="1.5s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="120" cy="52" rx="8" ry="12" fill={color}>
          <animate attributeName="cy" values="50;58;50" dur="5s" begin="2s" repeatCount="indefinite" />
        </ellipse>
      </svg>
    </div>
  );
}

import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SectionLabel } from "../components/SectionLabel";
import { C, CLICKS, MONO, SANS, SCENES } from "../theme";

/* Real numbers (resume + live APIs, Nov 2026) */
const TILES = [
  {
    value: 2200,
    suffix: "+",
    label: "problems solved",
    sub: "LeetCode · CodeChef · Codeforces",
    color: C.cyan,
  },
  {
    value: 2033,
    suffix: "",
    label: "LeetCode rating",
    sub: "Knight · top 2.1%",
    color: "#FFA116",
  },
  {
    value: 1717,
    suffix: "",
    label: "CodeChef rating",
    sub: "3★",
    color: "#B58863",
  },
  {
    value: 1320,
    suffix: "",
    label: "Codeforces max",
    sub: "Pupil",
    color: "#1890FF",
  },
];

/* LeetCode contest rating history (16 contests) from the live API */
const HISTORY = [
  1471, 1564, 1627, 1673, 1726, 1793, 1820, 1854, 1905, 1941, 1905, 1937, 1976,
  2011, 1987, 2033,
];

const CHART = { left: 160, top: 640, width: 1600, height: 300 };

export const StatsScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const exit = interpolate(frame, [190, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const min = 1400;
  const max = 2080;
  const pts = HISTORY.map((r, i) => ({
    x: CHART.left + (i / (HISTORY.length - 1)) * CHART.width,
    y: CHART.top + CHART.height - ((r - min) / (max - min)) * CHART.height,
  }));
  const path = pts
    .map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const draw = interpolate(frame, [118, 182], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lastPt = pts[pts.length - 1];

  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <div style={{ position: "absolute", left: 160, top: 110 }}>
        <SectionLabel index="02" text="numbers" />
        <div
          style={{
            marginTop: 14,
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 64,
            color: C.heading,
          }}
        >
          Pulled live from the contest sites.
        </div>
      </div>

      {/* tiles */}
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 300,
          display: "flex",
          gap: 32,
        }}
      >
        {TILES.map((t, i) => {
          const land = CLICKS.stats[i] - SCENES.stats.from;
          const s = spring({
            frame: frame - land,
            fps,
            config: { damping: 14, stiffness: 170 },
          });
          const count = interpolate(frame, [land, land + 22], [0, t.value], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={t.label}
              style={{
                width: 376,
                height: 260,
                borderRadius: 16,
                background: C.surface,
                border: `1px solid ${C.line}`,
                borderTop: `3px solid ${t.color}`,
                padding: "30px 30px",
                opacity: s,
                transform: `translateY(${(1 - s) * 50}px) scale(${0.92 + s * 0.08})`,
              }}
            >
              <div
                style={{
                  fontFamily: SANS,
                  fontWeight: 800,
                  fontSize: 84,
                  color: t.color,
                  lineHeight: 1,
                }}
              >
                {Math.round(count).toLocaleString("en-IN")}
                {t.suffix}
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: SANS,
                  fontWeight: 600,
                  fontSize: 30,
                  color: C.heading,
                }}
              >
                {t.label}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: MONO,
                  fontSize: 22,
                  color: C.body,
                }}
              >
                {t.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* rating line */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        <line
          x1={CHART.left}
          x2={CHART.left + CHART.width}
          y1={CHART.top + CHART.height}
          y2={CHART.top + CHART.height}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={2}
          opacity={draw > 0 ? 1 : 0}
        />
        <path
          d={path}
          fill="none"
          stroke={C.cyan}
          strokeWidth={5}
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
        {draw >= 1 && (
          <circle cx={lastPt.x} cy={lastPt.y} r={11} fill={C.mint} />
        )}
      </svg>
      <div
        style={{
          position: "absolute",
          left: CHART.left,
          top: CHART.top + CHART.height + 18,
          fontFamily: MONO,
          fontSize: 22,
          color: C.body,
          opacity: draw > 0 ? 1 : 0,
        }}
      >
        LeetCode contest rating · 16 contests · 1471 → 2033
      </div>
    </AbsoluteFill>
  );
};

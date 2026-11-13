import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SectionLabel } from "../components/SectionLabel";
import { C, MONO, SANS } from "../theme";

/* Outcomes taken from src/data/projects.ts and the resume */
const PROJECTS = [
  {
    title: "Rubik's Cube Solver",
    line: "Scan a real cube. Solved in under 100 ms.",
    tags: ["React", "Three.js", "FastAPI", "OpenCV"],
    img: "rubiks.webp",
  },
  {
    title: "StudySync",
    line: "50+ users in its first two weeks.",
    tags: ["Next.js", "Supabase", "PWA"],
    img: "studysync.webp",
  },
  {
    title: "DSA Visualizer",
    line: "Sorting, graphs and DP, one step at a time.",
    tags: ["React", "TypeScript"],
    img: "dsa.webp",
  },
  {
    title: "GolfGive",
    line: "Live scores, prize draws, Stripe donations.",
    tags: ["Next.js", "Supabase", "Stripe"],
    img: "golfgive.webp",
  },
  {
    title: "Trackpad Writer",
    line: "A ₹200 drawing tablet from a laptop trackpad.",
    tags: ["AutoHotkey"],
    img: "trackpad.webp",
  },
];

const SLOT = 54; // frames per project, on the beat grid (54 ≈ 3.6 beats)

export const ProjectsScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = Math.min(PROJECTS.length - 1, Math.floor(frame / SLOT));
  const local = frame - active * SLOT;
  const p = PROJECTS[active];

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 18, stiffness: 140 },
  });
  const isLast = active === PROJECTS.length - 1;
  const leave = isLast
    ? interpolate(frame, [250, 270], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : interpolate(local, [SLOT - 8, SLOT], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  const text = (delay: number) => {
    const s = spring({ frame: local - delay, fps, config: { damping: 200 } });
    return {
      opacity: s * (1 - leave),
      transform: `translateY(${(1 - s) * 24}px)`,
    };
  };

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 120, top: 90 }}>
        <SectionLabel index="03" text="projects" />
      </div>

      {/* browser frame */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 190,
          width: 1060,
          height: 720,
          borderRadius: 18,
          overflow: "hidden",
          background: C.surface,
          border: `1px solid ${C.line}`,
          boxShadow: "0 40px 120px rgba(0,0,0,0.55)",
          opacity: enter * (1 - leave),
          transform: `translateX(${(1 - enter) * 140 - leave * 80}px)`,
        }}
      >
        <div
          style={{
            height: 46,
            background: "#161B22",
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "0 18px",
          }}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div
              key={c}
              style={{ width: 13, height: 13, borderRadius: 7, background: c }}
            />
          ))}
        </div>
        <Img
          src={staticFile(`assets/${p.img}`)}
          style={{
            width: "100%",
            height: 674,
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>

      {/* text */}
      <div style={{ position: "absolute", left: 1260, top: 330, width: 560 }}>
        <div
          style={{ fontFamily: MONO, fontSize: 26, color: C.body, ...text(4) }}
        >
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(PROJECTS.length).padStart(2, "0")}
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 70,
            lineHeight: 1.05,
            color: C.heading,
            ...text(7),
          }}
        >
          {p.title}
        </div>
        <div
          style={{
            marginTop: 26,
            fontFamily: SANS,
            fontSize: 36,
            lineHeight: 1.35,
            color: C.cyan,
            ...text(11),
          }}
        >
          {p.line}
        </div>
        <div
          style={{
            marginTop: 34,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            ...text(15),
          }}
        >
          {p.tags.map((t) => (
            <div
              key={t}
              style={{
                fontFamily: MONO,
                fontSize: 22,
                color: C.mint,
                border: `1px solid rgba(167,243,208,0.3)`,
                borderRadius: 999,
                padding: "8px 18px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* progress ticks */}
      <div
        style={{
          position: "absolute",
          left: 1260,
          top: 860,
          display: "flex",
          gap: 12,
        }}
      >
        {PROJECTS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === active ? 54 : 22,
              height: 6,
              borderRadius: 3,
              background: i <= active ? C.cyan : "rgba(255,255,255,0.12)",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

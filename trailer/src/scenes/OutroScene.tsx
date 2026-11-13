import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, CLICKS, DISPLAY, MONO, SANS, SCENES } from "../theme";

/* The URL button — the cursor clicks its centre */
export const VISIT_BTN = { x: 960, y: 800 };

export const OutroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clickLocal = CLICKS.outroVisit - SCENES.outro.from;

  const ydk = spring({ frame, fps, config: { damping: 16, stiffness: 110 } });
  const name = spring({ frame: frame - 16, fps, config: { damping: 200 } });
  const status = spring({ frame: frame - 28, fps, config: { damping: 200 } });
  const btn = spring({
    frame: frame - 40,
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const pressed = frame >= clickLocal && frame < clickLocal + 6;
  const fadeOut = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Spotlight sweeps across YDK, like the footer on the site
  const spotX = interpolate(frame, [0, 110], [520, 1400], {
    extrapolateRight: "clamp",
  });
  const dotOn = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ alignItems: "center", opacity: 1 - fadeOut }}>
      <div
        style={{
          marginTop: 90,
          fontFamily: DISPLAY,
          fontSize: 420,
          lineHeight: 1,
          letterSpacing: 24,
          color: C.cyan,
          opacity: ydk,
          transform: `translateY(${(1 - ydk) * 60}px)`,
          WebkitMaskImage: `radial-gradient(circle 420px at ${spotX - 360}px 50%, #000 0%, rgba(0,0,0,0.35) 70%)`,
          maskImage: `radial-gradient(circle 420px at ${spotX - 360}px 50%, #000 0%, rgba(0,0,0,0.35) 70%)`,
        }}
      >
        YDK
      </div>

      <div
        style={{
          marginTop: -10,
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 64,
          color: C.heading,
          opacity: name,
        }}
      >
        Dinesh Krishna
      </div>

      <div
        style={{
          marginTop: 18,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: MONO,
          fontSize: 30,
          color: C.mint,
          opacity: status,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: C.mint,
            opacity: dotOn ? 1 : 0.35,
          }}
        />
        Open to 2027 SWE internships
      </div>

      <div
        style={{
          position: "absolute",
          left: VISIT_BTN.x,
          top: VISIT_BTN.y,
          transform: `translate(-50%, -50%) scale(${(0.9 + btn * 0.1) * (pressed ? 0.95 : 1)})`,
          opacity: btn,
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: 38,
          color: C.bg,
          background: pressed ? C.mint : C.cyan,
          padding: "22px 44px",
          borderRadius: 14,
          whiteSpace: "nowrap",
        }}
      >
        portfolio.dineshydk.tech →
      </div>
    </AbsoluteFill>
  );
};

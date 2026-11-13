import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, MONO, SANS } from "../theme";

const NAME = "Dinesh Krishna";

export const NameScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const exit = interpolate(frame, [128, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const underline = interpolate(frame, [22, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sub = spring({ frame: frame - 36, fps, config: { damping: 200 } });
  const meta = spring({ frame: frame - 62, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: 1 - exit,
        transform: `translateY(${-exit * 60}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: 168,
            color: C.heading,
            letterSpacing: -4,
            display: "flex",
          }}
        >
          {Array.from(NAME).map((ch, i) => {
            const s = spring({
              frame: frame - i * 1.6,
              fps,
              config: { damping: 14, stiffness: 160 },
            });
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  opacity: s,
                  transform: `translateY(${(1 - s) * 70}px)`,
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>

        <div
          style={{
            height: 8,
            width: 760,
            borderRadius: 4,
            background: C.cyan,
            transform: `scaleX(${underline})`,
            transformOrigin: "left",
            marginTop: 6,
          }}
        />

        <div
          style={{
            marginTop: 44,
            fontFamily: SANS,
            fontWeight: 600,
            fontSize: 48,
            color: C.body,
            opacity: sub,
            transform: `translateY(${(1 - sub) * 24}px)`,
          }}
        >
          Software engineering student · Competitive programmer
        </div>

        <div
          style={{
            marginTop: 26,
            fontFamily: MONO,
            fontSize: 30,
            color: C.mint,
            opacity: meta,
            transform: `translateY(${(1 - meta) * 18}px)`,
          }}
        >
          IIT (ISM) Dhanbad · B.Tech CSE · 2028
        </div>
      </div>
    </AbsoluteFill>
  );
};
